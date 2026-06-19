import { state }                        from '../state.js';
import { getExo, resolveExoImg }         from '../data/exercises.js';
import { saveWorkoutToDb, deleteWorkoutFromDb } from '../db.js';
import { openModal, closeModal }          from './modals.js';
import { openExoPreview }                 from './preview.js';
import { escapeHTML, animateList, emptyStateHTML } from '../utils.js';

function estimateDuration(exercises) {
  if (!exercises.length) return null;
  let sec = 5 * 60;
  exercises.forEach(we => {
    const ex = getExo(we.exoId);
    const isIso = ex && ex.tags.some(t => t === 'Isométrique');
    we.sets.forEach(s => {
      const reps = parseInt(s.reps) || 10;
      sec += isIso ? reps + 45 : reps * 3.5 + 60;
    });
  });
  return Math.ceil(sec / 60 / 5) * 5;
}

function estimateDays(exercises) {
  if (!exercises.length) return null;
  const totalSets = exercises.reduce((acc, we) => acc + we.sets.length, 0);
  const muscles   = new Set(exercises.map(we => getExo(we.exoId)?.muscle).filter(Boolean));
  if (muscles.size >= 5 || totalSets > 24) return 3;
  if (muscles.size >= 3 || totalSets > 12) return 4;
  return 5;
}

function updateEstimates() {
  const durEl  = document.getElementById('estimate-duration');
  const daysEl = document.getElementById('estimate-days');
  if (!durEl || !daysEl) return;
  const dur  = estimateDuration(state.workoutExercises);
  const days = estimateDays(state.workoutExercises);
  durEl.textContent  = dur  ? `~${dur} min`    : '—';
  daysEl.textContent = days ? `${days}× / sem.` : '—';
  durEl.classList.toggle('empty',  !dur);
  daysEl.classList.toggle('empty', !days);
}

export function renderWorkouts() {
  const list = document.getElementById('workout-list');
  if (!state.workouts.length) {
    list.innerHTML = emptyStateHTML(
      '<rect x="2" y="5" width="5" height="14" rx="1.5"/><rect x="17" y="5" width="5" height="14" rx="1.5"/><path d="M7 9h10M7 15h10"/>',
      'Aucun programme', 'Crée ton premier entraînement !'
    );
    return;
  }
  list.innerHTML = state.workouts.map(w => {
    const exos    = w.exercises || [];
    const preview = exos.slice(0, 3).map(e => {
      const ex = getExo(e.exoId);
      return ex ? `<div class="exo-preview"><span class="exo-preview-name">${ex.emoji} ${ex.name}</span><span class="exo-preview-sets">${e.sets.length} série${e.sets.length > 1 ? 's' : ''}</span></div>` : '';
    }).join('');
    const more = exos.length > 3 ? `<div class="exo-more">+${exos.length - 3} exercice${exos.length - 3 > 1 ? 's' : ''}</div>` : '';
    return `<div class="workout-card" onclick="editWorkout('${w.id}')">
      <div class="workout-card-header">
        <div class="workout-name">${escapeHTML(w.name)}</div>
        <div class="card-actions-col">
          <div class="workout-badge">${exos.length} exo${exos.length > 1 ? 's' : ''}</div>
          <div class="card-btn-row">
            <div class="icon-btn icon-btn--sm" onclick="event.stopPropagation();editWorkout('${w.id}')">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div class="icon-btn icon-btn--sm icon-btn--danger" onclick="event.stopPropagation();deleteWorkout('${w.id}')">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="workout-meta">
        <div class="meta-item"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>${w.days}× / semaine</div>
        <div class="meta-item"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>~${w.duration} min</div>
      </div>
      ${exos.length ? `<div class="workout-exercises">${preview}${more}</div>` : ''}
      <div class="card-start-wrap"><button class="start-btn" onclick="event.stopPropagation();startSession('${w.id}')">DÉMARRER</button></div>
    </div>`;
  }).join('');
  animateList(list);
}

export function openNewWorkout() {
  state.editingWorkoutId  = null;
  state.workoutExercises  = [];
  document.getElementById('input-workout-name').value = '';
  document.getElementById('modal-workout-title').textContent = 'NOUVEAU PROGRAMME';
  renderWorkoutExoPicker();
  updateEstimates();
  openModal('modal-workout');
}

export function editWorkout(id) {
  const w = state.workouts.find(x => x.id === id);
  if (!w) return;
  state.editingWorkoutId = id;
  state.workoutExercises = w.exercises.map(e => ({ exoId: e.exoId, sets: e.sets.map(s => ({...s})) }));
  document.getElementById('input-workout-name').value = w.name;
  document.getElementById('modal-workout-title').textContent = 'MODIFIER LE PROGRAMME';
  renderWorkoutExoPicker();
  updateEstimates();
  openModal('modal-workout');
}

export function deleteWorkout(id) {
  if (!confirm('Supprimer ce programme ?')) return;
  deleteWorkoutFromDb(id);
}

export function renderWorkoutExoPicker() {
  updateEstimates();
  const c = document.getElementById('workout-exo-picker');
  if (!state.workoutExercises.length) { c.innerHTML = ''; return; }
  c.innerHTML = state.workoutExercises.map((we, i) => {
    const ex = getExo(we.exoId);
    if (!ex) return '';
    return `<div class="picker-exo-card">
      <div class="picker-exo-header">
        <span class="picker-exo-emoji" style="cursor:pointer" onclick="openExoPreview('${ex.id}',true)">${ex.emoji}</span>
        <div class="picker-exo-info" style="cursor:pointer" onclick="openExoPreview('${ex.id}',true)">
          <div class="picker-exo-name">${ex.name}</div>
          <div class="picker-exo-muscle">${ex.muscle}</div>
        </div>
        <button class="set-remove" onclick="removeWorkoutExo(${i})"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
      <div class="sets-editor">${we.sets.map((s, si) => `
        <div class="set-row">
          <div class="set-num">${si + 1}</div>
          <input class="set-input" type="number" value="${s.reps}" placeholder="10" onchange="updateSet(${i},${si},this.value)">
          <div class="set-label">${ex.name.toLowerCase().includes('planche') ? 'sec' : 'reps'}</div>
          <button class="set-remove" onclick="removeSet(${i},${si})"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>`).join('')}</div>
      <button class="add-set-btn add-set-btn--mt" onclick="addSet(${i})">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Ajouter une série
      </button>
    </div>`;
  }).join('');
}

export function removeWorkoutExo(i) {
  state.workoutExercises.splice(i, 1);
  renderWorkoutExoPicker();
}

export function addSet(i) {
  const last = state.workoutExercises[i].sets.slice(-1)[0];
  state.workoutExercises[i].sets.push({ reps: last ? last.reps : 10 });
  renderWorkoutExoPicker();
}

export function removeSet(i, si) {
  if (state.workoutExercises[i].sets.length <= 1) return;
  state.workoutExercises[i].sets.splice(si, 1);
  renderWorkoutExoPicker();
}

export function updateSet(i, si, val) {
  state.workoutExercises[i].sets[si].reps = parseInt(val) || 10;
}

export async function saveWorkout() {
  const name = document.getElementById('input-workout-name').value.trim();
  if (!name)                         { alert('Donne un nom au programme !'); return; }
  if (!state.workoutExercises.length) { alert('Ajoute au moins un exercice !'); return; }
  const w = {
    id:        state.editingWorkoutId || ('w' + crypto.randomUUID()),
    name,
    days:      estimateDays(state.workoutExercises)     || 3,
    duration:  estimateDuration(state.workoutExercises) || 40,
    exercises: state.workoutExercises,
  };
  await saveWorkoutToDb(w);
  closeModal('modal-workout');
}

export function switchToExoPickerMode() {
  closeModal('modal-workout');
  state.onRenderPicker?.();
  document.getElementById('picker-search').value = '';
  openModal('modal-exo-picker');
}

export function pickExo(id) {
  if (!state.workoutExercises.some(we => we.exoId === id)) {
    state.workoutExercises.push({ exoId: id, sets: [{reps:10},{reps:10},{reps:10}] });
  }
  closeModal('modal-exo-picker');
  renderWorkoutExoPicker();
  openModal('modal-workout');
}
