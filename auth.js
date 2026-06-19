import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';

const AUTH_ERRORS = {
  'auth/email-already-in-use': 'Cet email est déjà utilisé.',
  'auth/invalid-email':        'Adresse email invalide.',
  'auth/weak-password':        'Mot de passe trop court (6 car. min).',
  'auth/invalid-credential':   'Email ou mot de passe incorrect.',
  'auth/user-not-found':       'Aucun compte avec cet email.',
  'auth/wrong-password':       'Mot de passe incorrect.',
};

export function openAuth(mode = 'welcome') {
  const screen = document.getElementById('auth-screen');
  screen.classList.add('visible');
  ['welcome','signup','login','reset'].forEach(s => {
    document.getElementById(`auth-slide-${s}`).classList.toggle('auth-slide--hidden', s !== mode);
  });
  document.getElementById('auth-error-signup') && (document.getElementById('auth-error-signup').textContent = '');
  document.getElementById('auth-error-login')  && (document.getElementById('auth-error-login').textContent  = '');
}

export function closeAuthScreen() {
  document.getElementById('auth-screen').classList.remove('visible');
}

export function togglePwd(id, el) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  el.style.color = inp.type === 'text' ? 'var(--accent)' : 'var(--muted)';
}

export async function authSubmit(mode) {
  const errEl = document.getElementById(`auth-error-${mode}`);
  errEl.textContent = '';
  let email, password;
  if (mode === 'signup') {
    const name    = document.getElementById('auth-name').value.trim();
    email         = document.getElementById('auth-email').value.trim();
    password      = document.getElementById('auth-password').value;
    const confirm = document.getElementById('auth-confirm').value;
    if (!name || !email || !password) { errEl.textContent = 'Remplis tous les champs.'; return; }
    if (password !== confirm)         { errEl.textContent = 'Les mots de passe ne correspondent pas.'; return; }
  } else {
    email    = document.getElementById('auth-login-email').value.trim();
    password = document.getElementById('auth-login-password').value;
    if (!email || !password) { errEl.textContent = 'Remplis tous les champs.'; return; }
  }
  try {
    if (mode === 'signup') await createUserWithEmailAndPassword(auth, email, password);
    else                   await signInWithEmailAndPassword(auth, email, password);
    closeAuthScreen();
  } catch (e) {
    errEl.textContent = AUTH_ERRORS[e.code] || 'Une erreur est survenue.';
  }
}

export async function authGoogle() {
  const btns = document.querySelectorAll('.btn-google');
  const orig = btns[0]?.innerHTML;
  btns.forEach(b => {
    b.disabled = true;
    b.innerHTML = `<div class="app-loader-spinner" style="width:20px;height:20px;border-width:2px;margin:0 auto"></div>`;
  });
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
      alert(AUTH_ERRORS[e.code] || 'Erreur Google : ' + e.message);
    }
  } finally {
    btns.forEach(b => { b.disabled = false; if (orig) b.innerHTML = orig; });
  }
}

export async function authReset() {
  const email = document.getElementById('auth-reset-email').value.trim();
  const errEl = document.getElementById('auth-error-reset');
  const okEl  = document.getElementById('auth-success-reset');
  errEl.textContent = ''; okEl.textContent = '';
  if (!email) { errEl.textContent = 'Entre ton adresse email.'; return; }
  try {
    await sendPasswordResetEmail(auth, email);
    okEl.textContent = 'Email envoyé ! Vérifie ta boîte mail.';
    document.getElementById('auth-reset-email').value = '';
  } catch (e) {
    errEl.textContent = AUTH_ERRORS[e.code] || 'Une erreur est survenue.';
  }
}

export async function authSignOut() {
  await signOut(auth);
  openAuth('welcome');
}
