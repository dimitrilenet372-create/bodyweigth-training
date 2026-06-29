import { state }                       from '../state.js';
import { getExo, resolveExoImg, YOUTUBE_MAP } from '../data/exercises.js';
import { openModal, closeModal }        from './modals.js';
import { buildProgressionPanel }        from './skillTree.js';

// Single internal implementation — callers pass what changes
function _showPreview(exoId, opts = {}) {
  state.previewExoId = exoId;
  const ex = getExo(exoId);
  if (!ex) return;

  const ytId = YOUTUBE_MAP[exoId];
  const gif  = resolveExoImg(ex);

  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t => `<span class="exo-tag">${t}</span>`).join('');
  document.getElementById('preview-progression').innerHTML = buildProgressionPanel(exoId);

  const mediaWrap = document.getElementById('preview-media-wrap');
  if (ytId) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-video-wrap"><iframe
      src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&rel=0&modestbranding=1"
      allow="autoplay; encrypted-media" allowfullscreen frameborder="0" class="preview-iframe"></iframe></div>`;
  } else if (gif) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-gif-wrap"><img src="${gif}" class="preview-gif-img" alt="${ex.name}"></div>`;
  } else {
    mediaWrap.style.display = 'none';
    mediaWrap.innerHTML = '';
  }

  const backBtn      = document.getElementById('preview-back-btn');
  const standaloneBtn = document.getElementById('preview-standalone-btn');
  const addBtn        = document.getElementById('preview-add-btn');

  if (opts.backFn) {
    backBtn.textContent = '← Retour';
    backBtn.onclick     = opts.backFn;
    backBtn.style.display = 'block';
  } else {
    backBtn.style.display = 'none';
  }

  standaloneBtn.style.display = opts.showStandalone !== false && !opts.backFn ? 'block' : 'none';

  if (opts.showAdd !== false && !opts.backFn) {
    addBtn.style.display = 'flex';
    addBtn.textContent = '+ AJOUTER';
    addBtn.disabled = false;
    addBtn.onclick = addExoFromPreview;
  } else if (opts.addFn) {
    const alreadyAdded = state.workoutExercises.some(we => we.exoId === exoId);
    addBtn.style.display = 'flex';
    addBtn.textContent = alreadyAdded ? '✓ DÉJÀ AJOUTÉ' : '+ AJOUTER';
    addBtn.disabled    = alreadyAdded;
    addBtn.onclick     = opts.addFn;
  } else {
    addBtn.style.display = 'none';
  }

  openModal('modal-preview');
}

// ── Public entry points ──

export function openExoPreview(exoId, fromWorkout = false) {
  if (fromWorkout) {
    _showPreview(exoId, {
      backFn: () => {
        document.getElementById('preview-media-wrap').innerHTML = '';
        closeModal('modal-preview');
        openModal('modal-workout');
      },
    });
    closeModal('modal-workout');
  } else {
    _showPreview(exoId, { showStandalone: true, showAdd: true });
  }
}

export function openExoFromGuided(exoId) {
  _showPreview(exoId, {
    backFn: () => {
      document.getElementById('preview-media-wrap').innerHTML = '';
      closeModal('modal-preview');
      openModal('modal-guided');
    },
  });
  closeModal('modal-guided');
}

export function openExoPreviewFromPicker(exoId) {
  _showPreview(exoId, {
    backFn: () => {
      document.getElementById('preview-media-wrap').innerHTML = '';
      closeModal('modal-preview');
      state.onRenderPicker?.();
      openModal('modal-exo-picker');
    },
    addFn: () => {
      state.onPickExo?.(exoId);
    },
  });
  closeModal('modal-exo-picker');
}

export function addExoFromPreview() {
  const id = state.previewExoId;
  if (id && !state.workoutExercises.some(we => we.exoId === id)) {
    state.workoutExercises.push({ exoId: id, sets: [{reps:10},{reps:10},{reps:10}] });
  }
  document.getElementById('preview-media-wrap').innerHTML = '';
  closeModal('modal-preview');
  state.onRefreshPicker?.();
  openModal('modal-workout');
}

export function closePreview() {
  document.getElementById('preview-media-wrap').innerHTML = '';
  closeModal('modal-preview');
}

export function closePreviewBackToPicker() {
  document.getElementById('preview-media-wrap').innerHTML = '';
  closeModal('modal-preview');
  state.onRenderPicker?.();
  openModal('modal-exo-picker');
}
