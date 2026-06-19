import { state }                             from '../state.js';
import { EXERCISES_DB, MUSCLE_ORDER, MUSCLE_FILTERS, CHIP_EMOJI, getMuscleImg, resolveExoImg } from '../data/exercises.js';
import { animateList, emptyStateHTML }        from '../utils.js';

export function buildGroups(exoList) {
  const groups = {};
  MUSCLE_ORDER.forEach(m => { groups[m] = []; });
  exoList.forEach(e => { if (!groups[e.muscle]) groups[e.muscle] = []; groups[e.muscle].push(e); });
  return groups;
}

export function renderExercices(muscleFilter = 'Tous', search = '') {
  const list = document.getElementById('exo-list');
  let f = EXERCISES_DB;
  if (muscleFilter !== 'Tous') f = f.filter(e => e.muscle === muscleFilter);
  if (search) f = f.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );
  if (!f.length) {
    list.innerHTML = emptyStateHTML(
      '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8.5 13.5l5-5M13.5 13.5l-5-5"/>',
      'Aucun exercice trouvé', 'Essaie un autre filtre ou terme'
    );
    return;
  }

  const groups    = buildGroups(f);
  const muscleKeys = Object.entries(groups).filter(([, exos]) => exos.length > 0).map(([m]) => m);

  list.innerHTML = muscleKeys.map(muscle => {
    const exos  = groups[muscle];
    const secId = 'section-' + muscle.replace(/[^a-zA-Z]/g, '');
    return `<div class="muscle-section" id="${secId}">
      <div class="muscle-group-header">
        <span class="drag-handle" data-section="${muscle}" title="Glisser pour réorganiser"
              onmousedown="sectionDragStart(event,'${muscle}')"
              ontouchstart="sectionDragStart(event,'${muscle}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="19" r="1.2" fill="currentColor"/><circle cx="15" cy="5" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="19" r="1.2" fill="currentColor"/></svg>
        </span>
        <span class="muscle-group-img"><img src="${getMuscleImg(muscle) || ''}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;display:${getMuscleImg(muscle) ? 'block' : 'none'}"></span>
        <span class="muscle-group-name">${muscle}</span>
        <span class="muscle-group-count">${exos.length}</span>
      </div>
      ${exos.map(e => {
        const gif = resolveExoImg(e);
        return `<div class="exo-item" onclick="openExoPreview('${e.id}')">
          <div class="exo-icon-wrap">
            ${gif
              ? `<img src="${gif}" class="exo-thumb" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
                 <div class="exo-icon" style="display:none">${e.emoji}</div>`
              : `<div class="exo-icon">${e.emoji}</div>`}
          </div>
          <div class="exo-info">
            <div class="exo-name">${e.name}</div>
            <div class="exo-tags">${e.tags.slice(0, 3).map(t => `<span class="exo-tag">${t}</span>`).join('')}</div>
          </div>
          <svg width="14" height="14" fill="none" stroke="var(--muted)" stroke-width="2.2" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9 18l6-6-6-6"/></svg>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');

  animateList(list);
  state.muscleOrder = muscleKeys;
}

export function filterExercices(val) {
  renderExercices(state.currentFilterMuscle, val);
}

export function filterMuscle(muscle) {
  state.currentFilterMuscle = muscle;
  renderChips();
  renderExercices(muscle, document.getElementById('exo-search').value);
}

export function buildFilterChips() {
  state.chipOrder = MUSCLE_FILTERS.map(f => f.value);
  renderChips();
  initChipPointerDrag();
}

export function renderChips() {
  const container = document.getElementById('muscle-filter-chips');
  container.innerHTML = state.chipOrder.map(val => {
    const f      = MUSCLE_FILTERS.find(x => x.value === val);
    if (!f) return '';
    const img    = getMuscleImg(val);
    const active = val === state.currentFilterMuscle;
    return `<div class="muscle-chip${active ? ' active' : ''}${val === 'Tous' ? ' chip-all' : ''}" data-muscle="${val}">
      <div class="chip-img-wrap">
        ${img ? `<img src="${img}" alt="${val}">` : `<span class="chip-emoji">${CHIP_EMOJI[val] || '💪'}</span>`}
      </div>
      <div class="chip-label">${val}</div>
    </div>`;
  }).join('');
  document.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (state.chipDragging) return;
      filterMuscle(chip.dataset.muscle);
    });
  });
  initChipPointerDrag();
}

export function initChipPointerDrag() {
  const container = document.getElementById('muscle-filter-chips');
  const fresh = container.cloneNode(true);
  container.parentNode.replaceChild(fresh, container);
  const c = document.getElementById('muscle-filter-chips');

  c.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (state.chipDragging) return;
      filterMuscle(chip.dataset.muscle);
    });
  });

  let pointerDownChip = null;
  let startX = 0, startY = 0;
  let chipDragTimer  = null;
  let isDraggingChip = false;

  c.addEventListener('pointerdown', e => {
    const chip = e.target.closest('.muscle-chip');
    if (!chip) return;
    pointerDownChip = chip;
    startX = e.clientX; startY = e.clientY;
    isDraggingChip = false;
    chipDragTimer = setTimeout(() => {
      isDraggingChip    = true;
      state.chipDragging = chip.dataset.muscle;
      chip.classList.add('dragging-chip');
      try { chip.setPointerCapture(e.pointerId); } catch {}
    }, 300);
  }, { passive: true });

  c.addEventListener('pointermove', e => {
    if (!pointerDownChip) return;
    const dx = Math.abs(e.clientX - startX);
    if (!isDraggingChip && dx > 8) { clearTimeout(chipDragTimer); pointerDownChip = null; return; }
    if (!isDraggingChip) return;
    e.preventDefault();
    pointerDownChip.style.pointerEvents = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    pointerDownChip.style.pointerEvents = '';
    const target = el && el.closest('.muscle-chip');
    c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    if (target && target !== pointerDownChip) {
      target.classList.add('drag-over-chip');
      const from = state.chipOrder.indexOf(state.chipDragging);
      const to   = state.chipOrder.indexOf(target.dataset.muscle);
      if (from >= 0 && to >= 0 && from !== to) {
        state.chipOrder.splice(from, 1);
        state.chipOrder.splice(to, 0, state.chipDragging);
        if (from < to) c.insertBefore(pointerDownChip, target.nextSibling);
        else           c.insertBefore(pointerDownChip, target);
      }
    }
  }, { passive: false });

  c.addEventListener('pointerup', () => {
    clearTimeout(chipDragTimer);
    if (pointerDownChip) {
      pointerDownChip.classList.remove('dragging-chip');
      c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    }
    state.chipDragging = null;
    pointerDownChip    = null;
    isDraggingChip     = false;
  }, { passive: true });

  c.addEventListener('pointercancel', () => {
    clearTimeout(chipDragTimer);
    if (pointerDownChip) pointerDownChip.classList.remove('dragging-chip');
    c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    state.chipDragging = null; pointerDownChip = null; isDraggingChip = false;
  }, { passive: true });
}

export function sectionDragStart(event, muscle) {
  event.stopPropagation();
  const section = document.getElementById('section-' + muscle.replace(/[^a-zA-Z]/g, ''));
  if (!section) return;
  state.draggedMuscle = muscle;
  section.classList.add('dragging');
  const list = document.getElementById('exo-list');

  function onMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    section.style.pointerEvents = 'none';
    const el = document.elementFromPoint(clientX, clientY);
    section.style.pointerEvents = '';
    const target = el && el.closest('.muscle-section');
    if (target && target !== section) {
      const rect = target.getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) list.insertBefore(section, target);
      else list.insertBefore(section, target.nextSibling);
    }
  }
  function onEnd() {
    section.classList.remove('dragging');
    state.draggedMuscle = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onEnd);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onEnd);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend',  onEnd);
}

export function renderPickerExos(search) {
  let f = EXERCISES_DB;
  if (search) f = f.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.muscle.toLowerCase().includes(search.toLowerCase())
  );
  const groups = buildGroups(f);
  document.getElementById('picker-exo-list').innerHTML = Object.entries(groups)
    .filter(([, exos]) => exos.length > 0)
    .map(([muscle, exos]) => `
      <div class="muscle-group-header">
        ${getMuscleImg(muscle) ? `<img src="${getMuscleImg(muscle)}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;flex-shrink:0">` : ''}
        <span class="muscle-group-name">${muscle}</span>
      </div>
      ${exos.map(e => {
        const already = state.workoutExercises.some(we => we.exoId === e.id);
        const gif     = resolveExoImg(e);
        return `<div class="exo-item${already ? ' exo-already' : ''}">
          <div class="exo-icon-wrap" onclick="openExoPreviewFromPicker('${e.id}')">
            ${gif
              ? `<img src="${gif}" class="exo-thumb" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="exo-icon" style="display:none">${e.emoji}</div>`
              : `<div class="exo-icon">${e.emoji}</div>`}
          </div>
          <div class="exo-info" onclick="openExoPreviewFromPicker('${e.id}')">
            <div class="exo-name">${e.name}</div>
            <div class="exo-tags">${e.tags.slice(0, 2).map(t => `<span class="exo-tag">${t}</span>`).join('')}</div>
          </div>
          ${already
            ? `<span class="exo-check">✓</span>`
            : `<div class="exo-add-btn" onclick="pickExo('${e.id}')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>`
          }
        </div>`;
      }).join('')}
    `).join('');
}

export function filterPickerExos(val) { renderPickerExos(val); }
