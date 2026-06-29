const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({ region: 'europe-west1' });

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const APP_URL = process.env.APP_URL || 'http://localhost';

// ── 1. Créer une session Stripe Checkout ──
exports.createCheckoutSession = onCall({ cors: true, invoker: 'public' }, async (req) => {
  const user = req.auth;
  if (!user) throw new HttpsError('unauthenticated', 'Connexion requise.');

  const userDoc = await db.collection('users').doc(user.uid).get();

  if (userDoc.exists && userDoc.data().isPremium) {
    throw new HttpsError('already-exists', 'Vous êtes déjà abonné.');
  }

  let customerId = userDoc.exists ? userDoc.data().stripeCustomerId : null;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.token.email,
      metadata: { firebaseUID: user.uid },
    });
    customerId = customer.id;
    await db.collection('users').doc(user.uid).set({ stripeCustomerId: customerId }, { merge: true });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    success_url: `${APP_URL}?premium=success`,
    cancel_url:  `${APP_URL}?premium=cancel`,
    allow_promotion_codes: true,
  });

  return { url: session.url };
});

// ── 2. Portail client Stripe (gérer l'abonnement) ──
exports.createPortalLink = onCall({ cors: true, invoker: 'public' }, async (req) => {
  const user = req.auth;
  if (!user) throw new HttpsError('unauthenticated', 'Connexion requise.');

  const userDoc = await db.collection('users').doc(user.uid).get();
  const customerId = userDoc.exists ? userDoc.data().stripeCustomerId : null;
  if (!customerId) throw new HttpsError('not-found', 'Aucun abonnement trouvé.');

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: APP_URL,
  });

  return { url: session.url };
});

// ── 3. Webhook Stripe ──
exports.stripeWebhook = onRequest({ rawBody: true }, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error('Webhook signature invalide:', e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  const getUIDFromCustomer = async (customerId) => {
    const snap = await db.collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
    return snap.empty ? null : snap.docs[0].id;
  };

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Ne pas accorder le premium si le paiement n'est pas encore confirmé
      if (session.payment_status !== 'paid') break;
      const uid = await getUIDFromCustomer(session.customer);
      if (uid) {
        await db.collection('users').doc(uid).set({
          isPremium: true,
          subscriptionId: session.subscription,
          subscriptionStatus: 'active',
        }, { merge: true });
      }
      break;
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const uid = await getUIDFromCustomer(sub.customer);
      if (uid) {
        const active = ['active', 'trialing'].includes(sub.status);
        await db.collection('users').doc(uid).set({
          isPremium: active,
          subscriptionStatus: sub.status,
        }, { merge: true });
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      const uid = await getUIDFromCustomer(sub.customer);
      if (uid) {
        await db.collection('users').doc(uid).set({
          isPremium: false,
          subscriptionStatus: 'canceled',
        }, { merge: true });
      }
      break;
    }
  }

  res.json({ received: true });
});
