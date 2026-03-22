// ══════════════════════════════════════════════
//  ZEROWEIGHT — app.js
// ══════════════════════════════════════════════

const EXERCISES_DB = [
  { id:'pu',      name:'Pompes',              emoji:'💪', tags:['Push','Poitrine','Triceps'], type:'Push' },
  { id:'puw',     name:'Pompes larges',        emoji:'🏋️', tags:['Push','Poitrine'],          type:'Push' },
  { id:'pud',     name:'Pompes diamant',       emoji:'💎', tags:['Push','Triceps'],            type:'Push' },
  { id:'pue',     name:'Pompes explosives',    emoji:'💥', tags:['Push','Poitrine','Cardio'],  type:'Push' },
  { id:'dip',     name:'Dips (chaise)',        emoji:'🪑', tags:['Push','Triceps','Épaules'],  type:'Push' },
  { id:'pike',    name:'Pike Push-up',         emoji:'🔺', tags:['Push','Épaules'],            type:'Push' },
  { id:'hs',      name:'Handstand Push-up',    emoji:'🤸', tags:['Push','Épaules'],            type:'Push' },
  { id:'row',     name:'Tractions (barre)',    emoji:'🦾', tags:['Pull','Dos','Biceps'],       type:'Pull' },
  { id:'chinup',  name:'Chin-ups',             emoji:'⬆️', tags:['Pull','Biceps','Dos'],       type:'Pull' },
  { id:'invrow',  name:'Rowing inversé',       emoji:'🔄', tags:['Pull','Dos'],                type:'Pull' },
  { id:'sq',      name:'Squats',               emoji:'🦵', tags:['Legs','Quadriceps','Fessiers'], type:'Legs' },
  { id:'sqj',     name:'Squats sautés',        emoji:'⚡', tags:['Legs','Cardio'],             type:'Legs' },
  { id:'bsq',     name:'Bulgarian Split Squat',emoji:'🎯', tags:['Legs','Fessiers'],           type:'Legs' },
  { id:'lunge',   name:'Fentes',               emoji:'🚶', tags:['Legs','Fessiers','Quadriceps'], type:'Legs' },
  { id:'glute',   name:'Hip Thrust sol',       emoji:'🍑', tags:['Legs','Fessiers'],           type:'Legs' },
  { id:'calf',    name:'Mollets',              emoji:'🦿', tags:['Legs','Mollets'],            type:'Legs' },
  { id:'plank',   name:'Planche',              emoji:'🔥', tags:['Core','Abdos'],              type:'Core' },
  { id:'lleg',    name:'Levé de jambes',       emoji:'📐', tags:['Core','Abdos'],              type:'Core' },
  { id:'crunch',  name:'Crunchs',              emoji:'✨', tags:['Core','Abdos'],              type:'Core' },
  { id:'mntclimb',name:'Mountain Climbers',    emoji:'🏔️', tags:['Core','Cardio'],             type:'Core' },
  { id:'russ',    name:'Russian Twist',        emoji:'🌀', tags:['Core','Obliques'],           type:'Core' },
  { id:'burpee',  name:'Burpees',              emoji:'🌪️', tags:['Cardio','Full Body'],        type:'Cardio' },
  { id:'jj',      name:'Jumping Jacks',        emoji:'⭐', tags:['Cardio'],                    type:'Cardio' },
  { id:'highk',   name:'High Knees',           emoji:'🏃', tags:['Cardio','Core'],             type:'Cardio' },
];

// ── STATE ──
let workouts         = JSON.parse(localStorage.getItem('zw_workouts') || '[]');
let history          = JSON.parse(localStorage.getItem('zw_history')  || '[]');
let currentWorkout   = null;
let sessionExercises = [];
let sessionSeconds   = 0;
let activeTimerInterval = null;
let currentFilterType   = 'Tous';
let editingWorkoutId    = null;
let workoutExercises    = [];

// Seed default programs if empty
if (workouts.length === 0) {
  workouts = [
    {
      id: 'default1',
      name: 'Full Body Débutant',
      days: 3, duration: 40,
      exercises: [
        { exoId:'pu',    sets:[{reps:10},{reps:10},{reps:8}] },
        { exoId:'sq',    sets:[{reps:15},{reps:15},{reps:12}] },
        { exoId:'plank', sets:[{reps:30},{reps:30},{reps:20}] },
        { exoId:'lunge', sets:[{reps:10},{reps:10}] },
      ]
    },
    {
      id: 'default2',
      name: 'Upper Body Burn',
      days: 2, duration: 35,
      exercises: [
        { exoId:'pu',   sets:[{reps:12},{reps:12},{reps:10}] },
        { exoId:'pud',  sets:[{reps:8},{reps:8}] },
        { exoId:'dip',  sets:[{reps:10},{reps:10}] },
        { exoId:'pike', sets:[{reps:8},{reps:8}] },
      ]
    }
  ];
  save();
}

// ── HELPERS ──
function save() {
  localStorage.setItem('zw_workouts', JSON.stringify(workouts));
  localStorage.setItem('zw_history',  JSON.stringify(history));
}

function getExo(id) {
  return EXERCISES_DB.find(e => e.id === id);
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ══════════════════════════════════════════════
//  RENDER — PROGRAMMES
// ══════════════════════════════════════════════
function renderWorkouts() {
  const list = document.getElementById('workout-list');
  if (workouts.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">🏋️</div>
        <p>Aucun programme.<br>Crée ton premier entraînement !</p>
      </div>`;
    return;
  }

  list.innerHTML = workouts.map(w => {
    const exos   = w.exercises || [];
    const preview = exos.slice(0, 3).map(e => {
      const ex = getExo(e.exoId);
      return ex ? `
        <div class="exo-preview">
          <span class="exo-preview-name">${ex.emoji} ${ex.name}</span>
          <span class="exo-preview-sets">${e.sets.length} série${e.sets.length > 1 ? 's' : ''}</span>
        </div>` : '';
    }).join('');
    const more = exos.length > 3
      ? `<div class="exo-more">+${exos.length - 3} exercice${exos.length - 3 > 1 ? 's' : ''}</div>`
      : '';

    return `
    <div class="workout-card" style="margin-bottom:14px">
      <div class="workout-card-header">
        <div>
          <div class="workout-name">${w.name}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          <div class="workout-badge">${exos.length} exo${exos.length > 1 ? 's' : ''}</div>
          <div style="display:flex;gap:6px">
            <div class="icon-btn" style="width:28px;height:28px;border-radius:7px"
                 onclick="event.stopPropagation();editWorkout('${w.id}')" title="Modifier">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div class="icon-btn" style="width:28px;height:28px;border-radius:7px;background:rgba(255,79,106,.1);border-color:rgba(255,79,106,.2);color:#ff4f6a"
                 onclick="event.stopPropagation();deleteWorkout('${w.id}')" title="Supprimer">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="workout-meta">
        <div class="meta-item">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          ${w.days}× / semaine
        </div>
        <div class="meta-item">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          ~${w.duration} min
        </div>
      </div>

      ${exos.length ? `<div class="workout-exercises">${preview}${more}</div>` : ''}

      <div style="padding:12px 18px 18px">
        <button class="start-btn" onclick="startSession('${w.id}')">▶ DÉMARRER</button>
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  RENDER — EXERCICES
// ══════════════════════════════════════════════
function renderExercices(filter = 'Tous', search = '') {
  const list = document.getElementById('exo-list');
  let filtered = EXERCISES_DB;
  if (filter !== 'Tous') filtered = filtered.filter(e => e.type === filter);
  if (search)            filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">🔍</div>
        <p>Aucun exercice trouvé.</p>
      </div>`;
    return;
  }

  const groups = {};
  filtered.forEach(e => {
    if (!groups[e.type]) groups[e.type] = [];
    groups[e.type].push(e);
  });

  list.innerHTML = Object.entries(groups).map(([type, exos]) => `
    <div class="exo-category">${type}</div>
    ${exos.map(e => `
      <div class="exo-item">
        <div class="exo-icon">${e.emoji}</div>
        <div class="exo-info">
          <div class="exo-name">${e.name}</div>
          <div class="exo-tags">
            ${e.tags.map(t => `<span class="exo-tag ${t.toLowerCase()}">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('')}
  `).join('');
}

function filterExercices(val) {
  renderExercices(currentFilterType, val);
}

function filterChip(type, el) {
  currentFilterType = type;
  document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderExercices(type, document.getElementById('exo-search').value);
}

// ══════════════════════════════════════════════
//  RENDER — HISTORIQUE
// ══════════════════════════════════════════════
function renderHistory() {
  const sessions = history.slice().reverse();

  // Sessions this month
  const thisMonth = sessions.filter(s => {
    const d = new Date(s.date);
    return d.getMonth() === new Date().getMonth();
  }).length;
  document.getElementById('stat-sessions').textContent = thisMonth;

  // Streak
  let streak = 0;
  const today = new Date(); today.setHours(0,0,0,0);
  for (let i = 0; i < 30; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const ds = d.toDateString();
    if (sessions.some(s => new Date(s.date).toDateString() === ds)) streak++;
    else if (i > 0) break;
  }
  document.getElementById('stat-streak').innerHTML = `${streak}<span>j</span>`;

  // 7-day row
  const days = ['L','M','M','J','V','S','D'];
  const row  = document.getElementById('streak-row');
  row.innerHTML = Array.from({length:7}, (_,i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6 - i));
    const done    = sessions.some(s => new Date(s.date).toDateString() === d.toDateString());
    const isToday = d.toDateString() === today.toDateString();
    return `<div class="streak-day${done?' done':''}${isToday&&!done?' today':''}">
      ${days[d.getDay()===0 ? 6 : d.getDay()-1]}
    </div>`;
  }).join('');

  // List
  const hl = document.getElementById('history-list');
  if (sessions.length === 0) {
    hl.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">📋</div>
        <p>Aucune séance terminée.<br>Lance ton premier entraînement !</p>
      </div>`;
    return;
  }
  hl.innerHTML = sessions.slice(0, 20).map(s => {
    const d       = new Date(s.date);
    const dateStr = d.toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' });
    const mins    = Math.floor(s.duration / 60);
    return `
    <div class="history-item">
      <div class="history-dot"></div>
      <div class="history-info">
        <div class="history-name">${s.name}</div>
        <div class="history-date">${dateStr} · ${s.exercises} exercices</div>
      </div>
      <div class="history-duration">${mins}min</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════════
function switchTab(id, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'exercices')  renderExercices();
  if (id === 'historique') renderHistory();
}

// ══════════════════════════════════════════════
//  WORKOUT MODAL
// ══════════════════════════════════════════════
function openNewWorkout() {
  editingWorkoutId = null;
  workoutExercises = [];
  document.getElementById('input-workout-name').value     = '';
  document.getElementById('input-workout-days').value     = '';
  document.getElementById('input-workout-duration').value = '';
  document.getElementById('modal-workout-title').textContent = 'NOUVEAU PROGRAMME';
  renderWorkoutExoPicker();
  openModal('modal-workout');
}

function editWorkout(id) {
  const w = workouts.find(x => x.id === id);
  if (!w) return;
  editingWorkoutId = id;
  workoutExercises = w.exercises.map(e => ({
    exoId: e.exoId,
    sets: e.sets.map(s => ({...s}))
  }));
  document.getElementById('input-workout-name').value     = w.name;
  document.getElementById('input-workout-days').value     = w.days;
  document.getElementById('input-workout-duration').value = w.duration;
  document.getElementById('modal-workout-title').textContent = 'MODIFIER LE PROGRAMME';
  renderWorkoutExoPicker();
  openModal('modal-workout');
}

function deleteWorkout(id) {
  if (!confirm('Supprimer ce programme ?')) return;
  workouts = workouts.filter(w => w.id !== id);
  save(); renderWorkouts();
}

function renderWorkoutExoPicker() {
  const container = document.getElementById('workout-exo-picker');
  if (workoutExercises.length === 0) { container.innerHTML = ''; return; }

  container.innerHTML = workoutExercises.map((we, i) => {
    const ex = getExo(we.exoId);
    if (!ex) return '';
    return `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <span style="font-size:18px">${ex.emoji}</span>
        <span style="font-size:14px;font-weight:500;flex:1;color:var(--text)">${ex.name}</span>
        <button class="set-remove" onclick="removeWorkoutExo(${i})">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="sets-editor">
        ${we.sets.map((s, si) => `
        <div class="set-row">
          <div class="set-num">${si+1}</div>
          <input class="set-input" type="number" value="${s.reps}" placeholder="10"
            onchange="updateSet(${i},${si},this.value)" style="max-width:60px">
          <div class="set-label">${ex.name.toLowerCase().includes('planche') ? 'sec' : 'reps'}</div>
          <button class="set-remove" onclick="removeSet(${i},${si})">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>`).join('')}
      </div>
      <button class="add-set-btn" style="margin-top:8px" onclick="addSet(${i})">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Ajouter une série
      </button>
    </div>`;
  }).join('');
}

function removeWorkoutExo(i) {
  workoutExercises.splice(i, 1);
  renderWorkoutExoPicker();
}

function addSet(i) {
  const last = workoutExercises[i].sets.slice(-1)[0];
  workoutExercises[i].sets.push({ reps: last ? last.reps : 10 });
  renderWorkoutExoPicker();
}

function removeSet(i, si) {
  if (workoutExercises[i].sets.length <= 1) return;
  workoutExercises[i].sets.splice(si, 1);
  renderWorkoutExoPicker();
}

function updateSet(i, si, val) {
  workoutExercises[i].sets[si].reps = parseInt(val) || 10;
}

function saveWorkout() {
  const name     = document.getElementById('input-workout-name').value.trim();
  const days     = parseInt(document.getElementById('input-workout-days').value)     || 3;
  const duration = parseInt(document.getElementById('input-workout-duration').value) || 40;
  if (!name)                       { alert('Donne un nom au programme !'); return; }
  if (workoutExercises.length === 0) { alert('Ajoute au moins un exercice !'); return; }

  if (editingWorkoutId) {
    const idx = workouts.findIndex(w => w.id === editingWorkoutId);
    if (idx >= 0) workouts[idx] = { id: editingWorkoutId, name, days, duration, exercises: workoutExercises };
  } else {
    workouts.push({ id: 'w' + Date.now(), name, days, duration, exercises: workoutExercises });
  }
  save(); renderWorkouts();
  closeModal('modal-workout');
}

// ══════════════════════════════════════════════
//  EXO PICKER
// ══════════════════════════════════════════════
function switchToExoPickerMode() {
  closeModal('modal-workout');
  renderPickerExos('');
  document.getElementById('picker-search').value = '';
  openModal('modal-exo-picker');
}

function renderPickerExos(search) {
  const list = document.getElementById('picker-exo-list');
  let filtered = EXERCISES_DB;
  if (search) filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  list.innerHTML = filtered.map(e => {
    const already = workoutExercises.some(we => we.exoId === e.id);
    return `
    <div class="exo-item" onclick="pickExo('${e.id}')">
      <div class="exo-icon">${e.emoji}</div>
      <div class="exo-info">
        <div class="exo-name">${e.name}</div>
        <div class="exo-tags">
          ${e.tags.map(t => `<span class="exo-tag ${t.toLowerCase()}">${t}</span>`).join('')}
        </div>
      </div>
      ${already
        ? `<div style="color:var(--accent);font-size:12px;font-weight:700">✓</div>`
        : `<div class="exo-add-btn">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>`}
    </div>`;
  }).join('');
}

function filterPickerExos(val) { renderPickerExos(val); }

function pickExo(id) {
  if (!workoutExercises.some(we => we.exoId === id)) {
    workoutExercises.push({ exoId: id, sets: [{reps:10},{reps:10},{reps:10}] });
  }
  closeModal('modal-exo-picker');
  renderWorkoutExoPicker();
  openModal('modal-workout');
}

// ══════════════════════════════════════════════
//  SESSION
// ══════════════════════════════════════════════
function startSession(workoutId) {
  const w = workouts.find(x => x.id === workoutId);
  if (!w) return;
  currentWorkout = w;
  sessionSeconds = 0;
  sessionExercises = w.exercises.map(e => ({
    ...e,
    setsStatus: e.sets.map(s => ({ ...s, done: false }))
  }));

  document.getElementById('session-title').textContent = w.name.toUpperCase();
  renderSession();
  updateSessionProgress();
  openModal('modal-session');

  // Start timer
  clearInterval(activeTimerInterval);
  activeTimerInterval = setInterval(() => {
    sessionSeconds++;
    const t = fmtTime(sessionSeconds);
    document.getElementById('session-timer').textContent = t;
    document.getElementById('active-bar-time').textContent = t;
  }, 1000);

  // Active bar
  document.getElementById('active-bar-name').textContent = w.name;
  document.getElementById('active-bar-exo').textContent  = 'Tap pour reprendre';
  document.getElementById('active-bar').classList.add('visible');
}

function renderSession() {
  const list = document.getElementById('session-exo-list');
  const total = sessionExercises.length;
  const done  = sessionExercises.filter(e => e.setsStatus.every(s => s.done)).length;
  const allDoneGlobal = done === total;

  list.innerHTML = sessionExercises.map((we, i) => {
    const ex      = getExo(we.exoId);
    if (!ex) return '';
    const allDone = we.setsStatus.every(s => s.done);
    return `
    <div style="background:var(--surface2);border:1px solid ${allDone ? 'rgba(61,232,160,.25)' : 'var(--border)'};border-radius:14px;padding:14px 16px;margin-bottom:12px;transition:all .3s;${allDone ? 'opacity:.65' : ''}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <span style="font-size:20px">${ex.emoji}</span>
        <span style="font-size:15px;font-weight:600;flex:1;color:var(--text)">${ex.name}</span>
        ${allDone ? `<span style="color:var(--success);font-size:11px;font-weight:700;letter-spacing:1px">✓ FAIT</span>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${we.setsStatus.map((s, si) => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;border:1px solid ${s.done ? 'rgba(61,232,160,.2)' : 'var(--border)'};transition:all .2s">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--accent);width:20px;flex-shrink:0">${si+1}</div>
          <div style="flex:1;font-size:13px;color:${s.done ? 'var(--muted)' : 'var(--text)'}">${s.reps} reps</div>
          <button onclick="toggleSet(${i},${si})"
            style="padding:6px 16px;border-radius:8px;border:1px solid ${s.done ? 'var(--success)' : 'var(--border2)'};background:${s.done ? 'rgba(61,232,160,.1)' : 'var(--surface3)'};color:${s.done ? 'var(--success)' : 'var(--muted)'};cursor:pointer;font-size:12px;font-weight:700;font-family:'DM Sans',sans-serif;transition:all .15s;letter-spacing:.5px">
            ${s.done ? '✓ OK' : 'Valider'}
          </button>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');

  // Terminer button — always visible, changes style when all done
  list.innerHTML += `
    <button class="btn-end-session ${allDoneGlobal ? 'all-done' : ''}" onclick="endSession()">
      ${allDoneGlobal ? '🏆 SÉANCE TERMINÉE !' : '⏹ TERMINER LA SÉANCE'}
    </button>`;
}

function toggleSet(exoI, setI) {
  sessionExercises[exoI].setsStatus[setI].done = !sessionExercises[exoI].setsStatus[setI].done;
  renderSession();
  updateSessionProgress();
}

function updateSessionProgress() {
  const total = sessionExercises.length;
  const done  = sessionExercises.filter(e => e.setsStatus.every(s => s.done)).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('session-progress').textContent = `${done}/${total} exercices`;
  const bar = document.getElementById('session-progress-bar');
  if (bar) bar.style.width = pct + '%';
}

function endSession() {
  const allDone = sessionExercises.every(e => e.setsStatus.every(s => s.done));
  const msg = allDone
    ? '💪 GG ! Enregistrer cette séance ?'
    : 'Terminer la séance maintenant ? (tous les exos ne sont pas validés)';
  if (!confirm(msg)) return;

  clearInterval(activeTimerInterval);
  history.push({
    id:        's' + Date.now(),
    name:      currentWorkout.name,
    date:      new Date().toISOString(),
    duration:  sessionSeconds,
    exercises: sessionExercises.length
  });
  save();
  document.getElementById('active-bar').classList.remove('visible');
  closeModal('modal-session');
  currentWorkout = null;
  renderHistory();
}

function openActiveSession() {
  if (currentWorkout) openModal('modal-session');
}

// ══════════════════════════════════════════════
//  MODAL UTILS
// ══════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modals on overlay click (not session)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target !== overlay) return;
    if (overlay.id === 'modal-session') return;
    closeModal(overlay.id);
  });
});

// ── INIT ──
renderWorkouts();
renderExercices();
