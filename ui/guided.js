import { state }                       from '../state.js';
import { EXERCISES_DB, resolveExoImg } from '../data/exercises.js';
import { GUIDED_PROGRAMS }             from '../data/programs.js';
import { isPremium, PREMIUM_PRICE }    from '../stripe.js';
import { openModal, closeModal }       from './modals.js';
import { openExoFromGuided }           from './preview.js';
import { fmtTime }                          from '../utils.js';
import { renderSession, updateSessionProgress } from './session.js';

export function renderGuidedPrograms() {
  const premium = isPremium();
  document.getElementById('guided-list').innerHTML = GUIDED_PROGRAMS.map(p => `
    <div class="guided-card${premium ? '' : ' guided-card--locked'}" onclick="openGuidedProgram('${p.id}')">
      <div class="guided-card-left">
        <div class="guided-card-emoji">${p.emoji}</div>
        <div class="guided-card-info">
          <div class="guided-card-name">${p.name}</div>
          <div class="guided-card-meta">
            <span class="guided-tag-pill" style="color:${p.tagColor};border-color:${p.tagColor}20;background:${p.tagColor}15">${p.tag}</span>
            <span class="guided-card-stat">${p.duration}</span>
            <span class="guided-card-stat">${p.freq}</span>
          </div>
        </div>
      </div>
      ${premium
        ? `<div class="guided-lock-icon guided-lock-icon--open"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0"/></svg></div>`
        : `<div class="guided-price-wrap">
             <div class="guided-price-lock"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
             <div class="guided-price">${PREMIUM_PRICE}</div>
           </div>`
      }
    </div>
  `).join('');

  const list = document.getElementById('guided-list');
  [...list.children].forEach((child, i) => {
    child.classList.add('anim-item');
    child.style.animationDelay = `${Math.min(i, 7) * 0.048}s`;
  });
}

export function openGuidedProgram(id) {
  const p = GUIDED_PROGRAMS.find(x => x.id === id);
  if (!p) return;
  state.currentGuidedProgramId = id;

  document.getElementById('guided-modal-emoji').textContent = p.emoji;
  document.getElementById('guided-modal-name').textContent  = p.name;
  document.getElementById('guided-modal-tag').innerHTML     = `<span class="guided-tag-pill" style="color:${p.tagColor};border-color:${p.tagColor}20;background:${p.tagColor}15">${p.tag}</span>`;
  document.getElementById('guided-modal-meta').innerHTML    = `<span>${p.level}</span> · <span>${p.duration}</span> · <span>${p.freq}</span>`;
  document.getElementById('guided-modal-desc').textContent  = p.desc;

  const premium = isPremium();
  // preview is now an array of exercise IDs
  document.getElementById('guided-modal-preview').innerHTML = p.preview.map(exoId => {
    const ex = EXERCISES_DB.find(e => e.id === exoId);
    if (!ex) return '';
    if (premium) {
      const img = resolveExoImg(ex);
      return `<div class="guided-exo-card" onclick="openExoFromGuided('${ex.id}')">
        <div class="guided-exo-thumb">
          ${img ? `<img src="${img}" alt="${ex.name}">` : `<span>${ex.emoji}</span>`}
        </div>
        <div class="guided-exo-info">
          <div class="guided-exo-name">${ex.name}</div>
          <div class="guided-exo-muscle">${ex.muscle} · ${ex.tags.slice(0, 2).join(', ')}</div>
          <div class="guided-exo-desc">${ex.desc}</div>
        </div>
        <svg style="flex-shrink:0;opacity:.4" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
      </div>`;
    }
    return `<div class="guided-preview-item guided-preview-item--link" onclick="openExoFromGuided('${ex.id}')">
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      ${ex.name}
      <svg style="margin-left:auto;flex-shrink:0;opacity:.5" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
    </div>`;
  }).join('');

  document.getElementById('guided-lock').style.display      = premium ? 'none' : 'flex';
  document.getElementById('guided-start-btn').style.display = premium ? 'flex' : 'none';
  document.getElementById('btn-subscribe').style.display    = premium ? 'none' : 'flex';
  openModal('modal-guided');
}

export function startGuidedSession() {
  const p = GUIDED_PROGRAMS.find(x => x.id === state.currentGuidedProgramId);
  if (!p) return;
  const exercises = p.preview
    .map(id => EXERCISES_DB.find(e => e.id === id))
    .filter(Boolean)
    .map(ex => ({ exoId: ex.id, sets: [{reps:10},{reps:10},{reps:10}] }));
  if (!exercises.length) return;

  closeModal('modal-guided');
  const w = { id: 'guided_' + p.id, name: p.name, days: 3, duration: 45, exercises };
  state.currentWorkout   = w;
  state.sessionSeconds   = 0;
  state.sessionExercises = exercises.map(e => ({
    ...e, setsStatus: e.sets.map(s => ({ ...s, done: false })),
  }));

  document.getElementById('session-title').textContent   = w.name.toUpperCase();

  renderSession();
  updateSessionProgress();

  openModal('modal-session');
  clearInterval(state.activeTimerInterval);
  state.activeTimerInterval = setInterval(() => {
    state.sessionSeconds++;
    const t = fmtTime(state.sessionSeconds);
    document.getElementById('session-timer').textContent   = t;
    document.getElementById('active-bar-time').textContent = t;
  }, 1000);
  document.getElementById('active-bar-name').textContent = w.name;
  document.getElementById('active-bar-exo').textContent  = 'Tap pour reprendre';
  document.getElementById('active-bar').classList.add('visible');
}
