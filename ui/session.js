import { state }          from '../state.js';
import { getExo, resolveExoImg } from '../data/exercises.js';
import { saveSessionToDb }  from '../db.js';
import { openModal, closeModal } from './modals.js';
import { fmtTime }          from '../utils.js';

export function startSession(workoutId) {
  const w = state.workouts.find(x => x.id === workoutId);
  if (!w) return;
  state.currentWorkout   = w;
  state.sessionSeconds   = 0;
  state.sessionExercises = w.exercises.map(e => ({
    ...e,
    setsStatus: e.sets.map(s => ({ ...s, done: false })),
  }));
  document.getElementById('session-title').textContent = w.name.toUpperCase();
  renderSession();
  updateSessionProgress();
  openModal('modal-session');

  clearInterval(state.activeTimerInterval);
  state.activeTimerInterval = setInterval(() => {
    state.sessionSeconds++;
    const t = fmtTime(state.sessionSeconds);
    document.getElementById('session-timer').textContent    = t;
    document.getElementById('active-bar-time').textContent  = t;
  }, 1000);

  document.getElementById('active-bar-name').textContent = w.name;
  document.getElementById('active-bar-exo').textContent  = 'Tap pour reprendre';
  document.getElementById('active-bar').classList.add('visible');
}

export function renderSession() {
  document.getElementById('session-exo-list').innerHTML = state.sessionExercises.map((we, i) => {
    const ex      = getExo(we.exoId);
    if (!ex) return '';
    const allDone = we.setsStatus.every(s => s.done);
    const gif     = resolveExoImg(ex);
    return `<div class="session-exo-card${allDone ? ' session-exo-card--done' : ''}">
      <div class="session-exo-top">
        ${gif
          ? `<img src="${gif}" class="session-exo-img" loading="lazy" onerror="this.style.display='none'">`
          : `<span class="session-exo-emoji">${ex.emoji}</span>`}
        <div class="session-exo-info">
          <div class="session-exo-name">${ex.name}</div>
          <div class="session-exo-muscle">${ex.muscle}</div>
        </div>
        ${allDone ? `<span class="session-done-badge">✓ FAIT</span>` : ''}
      </div>
      <div class="session-sets-list">
        ${we.setsStatus.map((s, si) => `
        <div class="session-set-row${s.done ? ' session-set-row--done' : ''}">
          <div class="session-set-num">${si + 1}</div>
          ${s.done
            ? `<div class="session-set-result"><span class="session-set-actual">${s.actualReps}</span><span class="session-set-target-done">/ ${s.reps}</span></div>`
            : `<div class="session-set-target">${s.reps} reps</div>
               <input class="session-reps-input" type="number" id="actual-${i}-${si}" value="${s.reps}" min="0" max="999">`
          }
          <button onclick="${s.done ? `undoSet(${i},${si})` : `validateSet(${i},${si})`}" class="btn-validate${s.done ? ' btn-validate--done' : ''}">
            ${s.done ? '✓' : 'OK'}
          </button>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

export function validateSet(exoI, setI) {
  const input  = document.getElementById(`actual-${exoI}-${setI}`);
  const actual = parseInt(input?.value) || state.sessionExercises[exoI].setsStatus[setI].reps;
  state.sessionExercises[exoI].setsStatus[setI].done       = true;
  state.sessionExercises[exoI].setsStatus[setI].actualReps = actual;
  renderSession();
  updateSessionProgress();
}

export function undoSet(exoI, setI) {
  state.sessionExercises[exoI].setsStatus[setI].done       = false;
  state.sessionExercises[exoI].setsStatus[setI].actualReps = undefined;
  renderSession();
  updateSessionProgress();
}

export function toggleSet(exoI, setI) {
  state.sessionExercises[exoI].setsStatus[setI].done ? undoSet(exoI, setI) : validateSet(exoI, setI);
}

export function updateSessionProgress() {
  const total = state.sessionExercises.length;
  const done  = state.sessionExercises.filter(e => e.setsStatus.every(s => s.done)).length;
  document.getElementById('session-progress').textContent = `${done}/${total} exercices`;
  const bar = document.getElementById('session-progress-bar');
  if (bar) bar.style.width = (total ? Math.round(done / total * 100) : 0) + '%';
}

export function endSession() {
  const allDone = state.sessionExercises.every(e => e.setsStatus.every(s => s.done));
  if (!confirm(allDone
    ? 'GG ! Enregistrer cette séance ?'
    : 'Terminer maintenant ? (tous les exos ne sont pas validés)')) return;
  clearInterval(state.activeTimerInterval);
  const session = {
    id:           's' + crypto.randomUUID(),
    name:         state.currentWorkout.name,
    date:         new Date().toISOString(),
    duration:     state.sessionSeconds,
    exercises:    state.sessionExercises.length,
    exercisesList: state.sessionExercises.map(e => ({
      exoId:          e.exoId,
      setsCompleted:  e.setsStatus.filter(s => s.done).length,
      totalSets:      e.setsStatus.length,
    })),
  };
  saveSessionToDb(session);
  document.getElementById('active-bar').classList.remove('visible');
  closeModal('modal-session');
  state.currentWorkout = null;
}

export function openActiveSession() {
  if (state.currentWorkout) openModal('modal-session');
}
