// ─────────────────────────────────────────────────────────────────
//  ZEROWEIGHT — app.js (entry point, slim orchestrator)
//  All business logic lives in the imported modules.
// ─────────────────────────────────────────────────────────────────
import { auth, db, workoutsCol, historyCol } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';
import { onSnapshot, query, where, orderBy, doc, setDoc }
  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

import { state }               from './state.js';

// DB
import { seedDefaultWorkouts } from './db.js';

// Stripe
import { loadPremiumStatus, handleStripeReturn, startCheckout, openCustomerPortal }
  from './stripe.js';

// Auth
import { openAuth, closeAuthScreen, togglePwd, authSubmit, authGoogle, authReset, authSignOut }
  from './auth.js';

// UI — modals
import { openModal, closeModal, initModalOverlays } from './ui/modals.js';

// Skill tree & goal overlay
import { openSkillTree, closeSkillTree, renderSkillTree,
         openGoalOverlay, closeGoalOverlay, updateGoalBanner,
         setGoalExo, clearGoal, toggleGoalExo, openExoFromSkillTree,
         updateProgressAfterSession, showUnlockNotif }
  from './ui/skillTree.js';

// UI — preview
import { openExoPreview, openExoFromGuided, openExoPreviewFromPicker,
         addExoFromPreview, closePreview, closePreviewBackToPicker }
  from './ui/preview.js';

// UI — workouts
import { renderWorkouts, openNewWorkout, editWorkout, deleteWorkout,
         renderWorkoutExoPicker, removeWorkoutExo, addSet, removeSet, updateSet,
         saveWorkout, switchToExoPickerMode, pickExo }
  from './ui/workouts.js';

// UI — exercises
import { renderExercices, filterExercices, filterMuscle,
         buildFilterChips, sectionDragStart, renderPickerExos, filterPickerExos }
  from './ui/exercises.js';

// UI — history
import { renderHistory, toggleSessionDetail, openSessionDetail,
         historyChangeDay, historySetDay, pinInput, pinBackspace, resetAllHistory,
         initHistoryResetGestures }
  from './ui/history.js';

// UI — session
import { startSession, renderSession, validateSet, undoSet, toggleSet,
         updateSessionProgress, endSession, openActiveSession }
  from './ui/session.js';

// UI — guided programs
import { renderGuidedPrograms, openGuidedProgram, startGuidedSession }
  from './ui/guided.js';

// ── Wire cross-module callbacks (breaks circular imports) ──
state.onRefreshPicker = renderWorkoutExoPicker;
state.onPickExo       = pickExo;
state.onRenderPicker  = () => renderPickerExos(document.getElementById('picker-search')?.value || '');

// ── Splash / loader ──
let splashDismissed = false;
function dismissSplash() {
  if (splashDismissed) return;
  splashDismissed = true;
  document.getElementById('splash').classList.add('hide');
}
function showAppLoader() { document.getElementById('app-loader').classList.add('visible'); }
function hideAppLoader()  { document.getElementById('app-loader').classList.remove('visible'); }
function showWelcomeAnim(user) {
  if (localStorage.getItem('zw_welcomed')) return;
  localStorage.setItem('zw_welcomed', '1');
  const name = user.displayName
    ? user.displayName.split(' ')[0]
    : (user.email ? user.email.split('@')[0] : '');
  document.getElementById('welcome-name').textContent = name ? `Bienvenue, ${name} !` : 'Bienvenue !';
  const el = document.getElementById('welcome-anim');
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2400);
}

// ── Tab navigation ──
function switchTab(id, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'exercices')  renderExercices(state.currentFilterMuscle);
  if (id === 'historique') renderHistory();
}

// ── Stripe return detection ──
handleStripeReturn();

// ── Auth state ──
onAuthStateChanged(auth, async user => {
  dismissSplash();
  const btn = document.getElementById('auth-header-btn');
  if (!btn) return;

  if (state.historyUnsub)  { state.historyUnsub();  state.historyUnsub  = null; }
  if (state.workoutsUnsub) { state.workoutsUnsub(); state.workoutsUnsub = null; }

  if (user && !user.isAnonymous) {
    const initials = (user.displayName || user.email || '?').slice(0, 2).toUpperCase();
    btn.innerHTML = `<span class="auth-avatar">${initials}</span>`;
    btn.title     = user.email || '';
    btn.onclick   = () => { if (confirm(`Déconnexion de ${user.email} ?`)) authSignOut(); };
    closeAuthScreen();

    const isFirst = !localStorage.getItem('zw_welcomed');
    if (!isFirst) showAppLoader();
    await loadPremiumStatus(user);

    state.workoutsUnsub = onSnapshot(
      query(workoutsCol, where('userId', '==', user.uid)),
      snap => {
        state.workouts = snap.docs.map(d => d.data());
        if (snap.empty) {
          setDoc(doc(db, 'users', user.uid), { isPremium: false }, { merge: true })
            .catch(() => {})
            .then(() => seedDefaultWorkouts(user.uid));
        } else {
          renderWorkouts();
        }
      }
    );

    state.historyUnsub = onSnapshot(
      query(historyCol, where('userId', '==', user.uid), orderBy('date', 'desc')),
      snap => {
        state.sessionHistory = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }));
        renderHistory();
      },
      (err) => console.warn('[history] snapshot error:', err.code)
    );

    if (!isFirst) hideAppLoader();
    if (isFirst)  showWelcomeAnim(user);
  } else {
    state.premiumStatus  = false;
    state.workouts       = [];
    state.sessionHistory = [];
    renderWorkouts();
    renderHistory();
    if (!user) {
      btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      btn.title   = 'Connexion / Inscription';
      btn.onclick = () => openAuth('welcome');
      openAuth('welcome');
    }
  }

  renderGuidedPrograms();

  if (state._stripeSuccessReturn && user && !user.isAnonymous) {
    state._stripeSuccessReturn = false;
    if (state.premiumStatus) {
      setTimeout(() => alert('🎉 Premium activé ! Bienvenue dans le Premium.'), 300);
    } else {
      let attempts = 0;
      const poll = async () => {
        attempts++;
        await loadPremiumStatus(user);
        if (state.premiumStatus) {
          renderGuidedPrograms();
          alert('🎉 Premium activé ! Bienvenue dans le Premium.');
        } else if (attempts < 10) {
          setTimeout(poll, 3000);
        } else {
          alert('Paiement reçu. Recharge la page dans quelques instants.');
        }
      };
      setTimeout(poll, 3000);
    }
  }
});

// ── Init ──
initModalOverlays();
initHistoryResetGestures();
buildFilterChips();
renderWorkouts();
renderExercices();
updateGoalBanner();

// ── Global exports for inline onclick handlers ──
Object.assign(window, {
  // Tabs
  switchTab, openActiveSession, openModal, closeModal,
  // Skill tree & Goal overlay
  openSkillTree, closeSkillTree, openGoalOverlay, closeGoalOverlay,
  setGoalExo, clearGoal, toggleGoalExo, openExoFromSkillTree,
  // Programmes
  openNewWorkout, editWorkout, deleteWorkout, saveWorkout, startSession,
  // Exercices
  filterExercices, filterMuscle,
  openExoPreview, openExoFromGuided, openExoPreviewFromPicker,
  addExoFromPreview, closePreview, closePreviewBackToPicker,
  // Picker
  switchToExoPickerMode, filterPickerExos, pickExo,
  // Sets
  removeWorkoutExo, addSet, removeSet, updateSet,
  // Session
  toggleSet, validateSet, undoSet, endSession,
  // Drag sections
  sectionDragStart,
  // Historique
  historyChangeDay, historySetDay, openSessionDetail, toggleSessionDetail,
  // PIN / reset
  pinInput, pinBackspace, resetAllHistory,
  // Programmes guidés
  openGuidedProgram, startGuidedSession,
  // Auth
  openAuth, authSubmit, authSignOut, authReset, authGoogle, closeAuthScreen, togglePwd,
  // Stripe
  startCheckout, openCustomerPortal,
});
