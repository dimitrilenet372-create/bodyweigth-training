import { state }              from '../state.js';
import { db }                 from '../firebase.js';
import { doc, deleteDoc }     from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { getExo }             from '../data/exercises.js';
import { escapeHTML, animateList, emptyStateHTML, countUp } from '../utils.js';
import { openModal, closeModal } from './modals.js';

export function renderHistory() {
  const all   = state.sessionHistory.slice();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  countUp(document.getElementById('stat-sessions'), all.filter(s => new Date(s.date).getMonth() === today.getMonth()).length);

  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    if (all.some(s => new Date(s.date).toDateString() === d.toDateString())) streak++;
    else if (i > 0) break;
  }
  document.getElementById('stat-streak').innerHTML = `${streak}<span>j</span>`;

  const dayLabels = ['L','M','M','J','V','S','D'];
  const monday = new Date(today);
  monday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
  document.getElementById('streak-row').innerHTML = Array.from({ length: 7 }, (_, i) => {
    const d          = new Date(monday); d.setDate(monday.getDate() + i);
    const done       = all.some(s => new Date(s.date).toDateString() === d.toDateString());
    const isToday    = d.toDateString() === today.toDateString();
    const isSelected = d.toDateString() === state.historyViewDate.toDateString();
    return `<div class="streak-day${done?' done':''}${isToday?' today':''}${isSelected?' selected':''}" onclick="historySetDay('${d.toISOString()}')">${dayLabels[i]}</div>`;
  }).join('');

  const isToday = state.historyViewDate.toDateString() === today.toDateString();
  document.getElementById('history-nav-date').textContent = isToday
    ? "AUJOURD'HUI"
    : state.historyViewDate.toLocaleDateString('fr-FR', {weekday:'short', day:'numeric', month:'short'}).toUpperCase();
  const nextBtn = document.getElementById('history-nav-next');
  nextBtn.disabled      = state.historyViewDate >= today;
  nextBtn.style.opacity = state.historyViewDate >= today ? '0.3' : '1';
  document.getElementById('history-section-title').textContent = isToday ? 'SÉANCES DU JOUR' : 'SÉANCES';

  const daySessions = all.filter(s => new Date(s.date).toDateString() === state.historyViewDate.toDateString());
  const hl = document.getElementById('history-list');
  if (!daySessions.length) {
    hl.innerHTML = emptyStateHTML(
      '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
      isToday ? 'Aucune séance aujourd\'hui' : 'Aucune séance ce jour-là',
      isToday ? 'Lance ton premier entraînement !' : 'Choisis un autre jour'
    );
    return;
  }

  hl.innerHTML = daySessions.map(s => {
    const d = new Date(s.date);
    return `<div class="history-entry">
      <div class="history-item" id="hist-${s.id}" onclick="toggleSessionDetail('${s.id}')">
        <div class="history-dot"></div>
        <div class="history-info">
          <div class="history-name">${escapeHTML(s.name)}</div>
          <div class="history-date">${d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})} · ${s.exercises} exercice${s.exercises > 1 ? 's' : ''}</div>
        </div>
        <div class="history-item-right">
          <div class="history-duration">${Math.floor(s.duration/60)}min</div>
          <svg class="history-chevron" width="14" height="14" fill="none" stroke="var(--muted)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
      <div class="history-exo-expand" id="expand-${s.id}"></div>
    </div>`;
  }).join('');
  animateList(hl);
}

function buildSessionExoHTML(s) {
  if (s.exercisesList && s.exercisesList.length) {
    return s.exercisesList.map(e => {
      const ex  = getExo(e.exoId);
      if (!ex) return '';
      const pct = e.totalSets > 0 ? Math.round(e.setsCompleted / e.totalSets * 100) : 0;
      return `<div class="expand-exo-row">
        <span class="expand-exo-emoji">${ex.emoji}</span>
        <div class="expand-exo-info">
          <div class="expand-exo-name">${ex.name}</div>
          <div class="expand-exo-sets">${e.setsCompleted}/${e.totalSets} séries</div>
        </div>
        <div class="expand-exo-badge${pct===100?' done':''}">${pct===100?'✓':pct+'%'}</div>
      </div>`;
    }).join('');
  }
  const matchingWorkout = state.workouts.find(w => w.name === s.name);
  if (matchingWorkout && matchingWorkout.exercises && matchingWorkout.exercises.length) {
    return `<div class="expand-exo-note">Programme (détail exact non disponible)</div>` +
      matchingWorkout.exercises.map(e => {
        const ex = getExo(e.exoId);
        if (!ex) return '';
        return `<div class="expand-exo-row">
          <span class="expand-exo-emoji">${ex.emoji}</span>
          <div class="expand-exo-info">
            <div class="expand-exo-name">${ex.name}</div>
            <div class="expand-exo-sets">${e.sets.length} série${e.sets.length>1?'s':''} · ${e.sets[0].reps} reps</div>
          </div>
          <div class="expand-exo-badge">—</div>
        </div>`;
      }).join('');
  }
  return `<div class="expand-exo-note" style="padding:14px 16px">Programme introuvable ou supprimé.</div>`;
}

export function toggleSessionDetail(sessionId) {
  const expand = document.getElementById('expand-' + sessionId);
  const item   = document.getElementById('hist-' + sessionId);
  if (!expand || !item) return;
  const isOpen = expand.classList.contains('open');
  document.querySelectorAll('.history-exo-expand.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.history-item.expanded').forEach(el => el.classList.remove('expanded'));
  if (!isOpen) {
    const s = state.sessionHistory.find(x => x.id === sessionId);
    if (s) expand.innerHTML = buildSessionExoHTML(s);
    expand.classList.add('open');
    item.classList.add('expanded');
  }
}

export const openSessionDetail = toggleSessionDetail;

export function historyChangeDay(delta) {
  const next = new Date(state.historyViewDate);
  next.setDate(next.getDate() + delta);
  state.historyViewDate = next;
  renderHistory();
}

export function historySetDay(iso) {
  state.historyViewDate = new Date(iso);
  state.historyViewDate.setHours(0, 0, 0, 0);
  renderHistory();
  requestAnimationFrame(() => {
    const sel = document.querySelector('.streak-day.selected');
    if (sel) { sel.classList.add('bouncing'); sel.addEventListener('animationend', () => sel.classList.remove('bouncing'), {once:true}); }
  });
  document.getElementById('history-list').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── PIN / reset history ──
const _PIN_HASH = '8a27d2f6acea99db2e2b1fa0a5736b29cb6c46c72143a8d0bbf534f624ac1a72';

async function _hashPin(pin) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function pinInput(digit) {
  if (state.pinCurrent.length >= 4) return;
  state.pinCurrent += digit;
  updatePinDisplay();
  if (state.pinCurrent.length === 4) {
    _hashPin(state.pinCurrent).then(hash => {
      if (hash === _PIN_HASH) {
        state.pinCurrent = '';
        closeModal('modal-pin');
        resetAllHistory();
      } else {
        document.getElementById('pin-display').classList.add('pin-shake');
        setTimeout(() => {
          document.getElementById('pin-display').classList.remove('pin-shake');
          state.pinCurrent = '';
          updatePinDisplay();
        }, 500);
      }
    });
  }
}

export function pinBackspace() {
  state.pinCurrent = state.pinCurrent.slice(0, -1);
  updatePinDisplay();
}

function updatePinDisplay() {
  document.querySelectorAll('#pin-display span').forEach((s, i) => {
    s.classList.toggle('filled', i < state.pinCurrent.length);
  });
}

export async function resetAllHistory() {
  await Promise.all(state.sessionHistory.map(s => deleteDoc(doc(db, 'sessionHistory', s.id))));
  document.getElementById('btn-reset-history').style.display = 'none';
}

function showResetBtn() {
  document.getElementById('btn-reset-history').style.display = 'flex';
}

export function initHistoryResetGestures() {
  let t = null;
  const el = document.getElementById('history-section-title');
  if (!el) return;
  el.addEventListener('touchstart', () => { t = setTimeout(showResetBtn, 700); }, { passive: true });
  el.addEventListener('touchend',   () => clearTimeout(t));
  el.addEventListener('mousedown',  () => { t = setTimeout(showResetBtn, 700); });
  el.addEventListener('mouseup',    () => clearTimeout(t));
  el.addEventListener('mouseleave', () => clearTimeout(t));

  let seq = '';
  document.addEventListener('keydown', e => {
    if ('9833'.startsWith(seq + e.key)) {
      seq += e.key;
      if (seq === '9833') { showResetBtn(); seq = ''; }
    } else {
      seq = '9833'.startsWith(e.key) ? e.key : '';
    }
  });
}
