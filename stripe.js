import { db, auth, functions } from './firebase.js';
import { doc, getDoc }         from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { httpsCallable }       from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-functions.js';
import { state }               from './state.js';
import { openAuth }            from './auth.js';

export const PREMIUM_PRICE  = '9.99€ / mois';
export const PREMIUM_EMAILS = ['prout@hotmail.fr', 'hirionne@gmail.com', 'dimitrilenet372@gmail.com'];

export function isPremium() { return state.premiumStatus; }

export async function loadPremiumStatus(user) {
  if (!user || user.isAnonymous) { state.premiumStatus = false; return; }
  if (PREMIUM_EMAILS.includes((user.email || '').toLowerCase())) { state.premiumStatus = true; return; }
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    state.premiumStatus = snap.exists() ? !!(snap.data().isPremium) : false;
  } catch {
    state.premiumStatus = false;
  }
}

export async function startCheckout() {
  const user = auth.currentUser;
  if (!user) { openAuth('login'); return; }
  const btn = document.getElementById('btn-subscribe');
  if (btn) { btn.textContent = 'Chargement…'; btn.disabled = true; }
  try {
    const { data } = await httpsCallable(functions, 'createCheckoutSession')();
    window.location.href = data.url;
  } catch (e) {
    alert('Erreur : ' + e.message);
    if (btn) { btn.textContent = 'Devenir Premium — ' + PREMIUM_PRICE; btn.disabled = false; }
  }
}

export async function openCustomerPortal() {
  const btn = document.getElementById('btn-portal');
  if (btn) { btn.textContent = 'Chargement…'; btn.disabled = true; }
  try {
    const { data } = await httpsCallable(functions, 'createPortalLink')();
    window.location.href = data.url;
  } catch (e) {
    alert('Erreur : ' + e.message);
    if (btn) { btn.textContent = 'Gérer mon abonnement'; btn.disabled = false; }
  }
}

export function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('premium') === 'success') {
    history.replaceState({}, '', window.location.pathname);
    state._stripeSuccessReturn = true;
  }
}
