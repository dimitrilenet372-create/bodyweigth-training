import { state }           from '../state.js';
import { getExo }          from '../data/exercises.js';
import { openModal, closeModal } from './modals.js';

// ── Progression chains data ──
export const PROGRESSION_CHAINS = [
  {
    id:'push', name:'Pompes', emoji:'💪',
    steps:[
      { exoId:'incline',    label:'Débutant',      pr_unlock:15  },
      { exoId:'pu',         label:'Intermédiaire', pr_unlock:20  },
      { exoId:'puw',        label:'Intermédiaire', pr_unlock:20  },
      { exoId:'pud',        label:'Avancé',        pr_unlock:15  },
      { exoId:'decline',    label:'Avancé',        pr_unlock:15  },
      { exoId:'pue',        label:'Avancé',        pr_unlock:10  },
      { exoId:'puarch',     label:'Expert',        pr_unlock:8   },
      { exoId:'pseudo',     label:'Expert',        pr_unlock:8   },
      { exoId:'pu1arm',     label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'pull', name:'Tractions', emoji:'🏋️',
    steps:[
      { exoId:'invrow',     label:'Débutant',      pr_unlock:15  },
      { exoId:'negpull',    label:'Intermédiaire', pr_unlock:5   },
      { exoId:'chinup',     label:'Intermédiaire', pr_unlock:10  },
      { exoId:'row',        label:'Intermédiaire', pr_unlock:12  },
      { exoId:'widepull',   label:'Avancé',        pr_unlock:10  },
      { exoId:'commpull',   label:'Avancé',        pr_unlock:8   },
      { exoId:'archerpull', label:'Expert',        pr_unlock:6   },
      { exoId:'typewpull',  label:'Expert',        pr_unlock:5   },
      { exoId:'muscleup',   label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'squat', name:'Squats', emoji:'🦵',
    steps:[
      { exoId:'sq',         label:'Débutant',      pr_unlock:20  },
      { exoId:'sqj',        label:'Intermédiaire', pr_unlock:15  },
      { exoId:'stepup',     label:'Intermédiaire', pr_unlock:15  },
      { exoId:'lunge',      label:'Intermédiaire', pr_unlock:15  },
      { exoId:'bsq',        label:'Avancé',        pr_unlock:12  },
      { exoId:'lungej',     label:'Avancé',        pr_unlock:10  },
      { exoId:'shrimp',     label:'Expert',        pr_unlock:8   },
      { exoId:'pistol',     label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'handstand', name:'Handstand', emoji:'🤸',
    steps:[
      { exoId:'pike',       label:'Débutant',      pr_unlock:10  },
      { exoId:'wallwalk',   label:'Intermédiaire', pr_unlock:5   },
      { exoId:'hshold',     label:'Avancé',        pr_unlock:15  },
      { exoId:'hs',         label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'core', name:'Abdos / Core', emoji:'🔥',
    steps:[
      { exoId:'crunch',     label:'Débutant',      pr_unlock:20  },
      { exoId:'lleg',       label:'Débutant',      pr_unlock:15  },
      { exoId:'hollow',     label:'Intermédiaire', pr_unlock:20  },
      { exoId:'hangknee',   label:'Intermédiaire', pr_unlock:15  },
      { exoId:'vup',        label:'Avancé',        pr_unlock:15  },
      { exoId:'dragon',     label:'Avancé',        pr_unlock:10  },
      { exoId:'toesbar',    label:'Expert',        pr_unlock:8   },
      { exoId:'lsit',       label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'planche', name:'Planche', emoji:'⚖️',
    steps:[
      { exoId:'plank',      label:'Débutant',      pr_unlock:45  },
      { exoId:'planchelean',label:'Intermédiaire', pr_unlock:10  },
      { exoId:'frogstand',  label:'Intermédiaire', pr_unlock:10  },
      { exoId:'crowstand',  label:'Avancé',        pr_unlock:15  },
      { exoId:'tucplanche', label:'Elite',         pr_unlock:null },
    ]
  },
  {
    id:'pull_adv', name:'Levers', emoji:'🎯',
    steps:[
      { exoId:'skincat',    label:'Débutant',      pr_unlock:8   },
      { exoId:'fronttuck',  label:'Intermédiaire', pr_unlock:10  },
      { exoId:'backlev',    label:'Avancé',        pr_unlock:10  },
      { exoId:'humanflag',  label:'Elite',         pr_unlock:null },
    ]
  },
];

export const EXO_CHAIN_MAP = {};
PROGRESSION_CHAINS.forEach(chain => {
  chain.steps.forEach((step, i) => {
    EXO_CHAIN_MAP[step.exoId] = { chainId: chain.id, stepIndex: i };
  });
});

// ── Progress storage ──
export function getProgress() {
  return JSON.parse(localStorage.getItem('zw_progress') || '{}');
}
function saveProgress(p) {
  localStorage.setItem('zw_progress', JSON.stringify(p));
}

export function updateProgressAfterSession(sessionExercises) {
  const progress = getProgress();
  const newUnlocks = [];

  sessionExercises.forEach(we => {
    if (!progress[we.exoId]) progress[we.exoId] = { pr:0, totalSets:0, totalReps:0 };
    const p = progress[we.exoId];
    we.setsStatus.forEach(s => {
      if (s.done) {
        const reps = s.actualReps ?? s.reps ?? 0;
        p.totalSets++;
        p.totalReps += reps;
        if (reps > p.pr) p.pr = reps;
      }
    });
  });

  PROGRESSION_CHAINS.forEach(chain => {
    const first = chain.steps[0];
    if (!progress[first.exoId]) progress[first.exoId] = { pr:0, totalSets:0, totalReps:0 };
    progress[first.exoId].unlocked = true;

    chain.steps.forEach((step, i) => {
      if (i === 0) return;
      const prev = chain.steps[i - 1];
      const prevProgress = progress[prev.exoId];
      const alreadyUnlocked = progress[step.exoId]?.unlocked;
      if (!alreadyUnlocked && prevProgress && prev.pr_unlock && prevProgress.pr >= prev.pr_unlock) {
        if (!progress[step.exoId]) progress[step.exoId] = { pr:0, totalSets:0, totalReps:0 };
        progress[step.exoId].unlocked = true;
        newUnlocks.push(step.exoId);
      }
    });
  });

  saveProgress(progress);
  return newUnlocks;
}

// ── Unlock helpers ──
export function isExoUnlocked(exoId) {
  const info = EXO_CHAIN_MAP[exoId];
  if (!info) return true;
  if (info.stepIndex === 0) return true;
  const progress = getProgress();
  return !!(progress[exoId]?.unlocked) || (progress[exoId]?.pr > 0);
}

export function getExoProgress(exoId) {
  return getProgress()[exoId] || { pr:0, totalSets:0, totalReps:0, unlocked:false };
}

export function getGlobalLevel() {
  const progress = getProgress();
  let unlocked = 0, total = 0;
  PROGRESSION_CHAINS.forEach(chain => {
    chain.steps.forEach((step, i) => {
      total++;
      if (i === 0 || progress[step.exoId]?.unlocked) unlocked++;
    });
  });
  return { unlocked, total, pct: total ? Math.round(unlocked / total * 100) : 0 };
}

// ── Progression panel (used in exercise preview) ──
export function buildProgressionPanel(exoId) {
  const info = EXO_CHAIN_MAP[exoId];
  if (!info) return '';
  const chain   = PROGRESSION_CHAINS.find(c => c.id === info.chainId);
  const step    = chain.steps[info.stepIndex];
  const exoP    = getExoProgress(exoId);
  const unlocked = isExoUnlocked(exoId);

  if (!unlocked) {
    const prevStep = chain.steps[info.stepIndex - 1];
    const prevP    = getExoProgress(prevStep.exoId);
    const needed   = prevStep.pr_unlock;
    const pct      = Math.min(100, Math.round((prevP.pr / needed) * 100));
    return `<div class="prog-panel prog-panel--locked">
      <div class="prog-header">
        <span class="prog-chain">${chain.emoji} ${chain.name}</span>
        <span class="prog-badge prog-badge--locked">🔒 Verrouillé</span>
      </div>
      <div class="prog-unlock-msg">Atteins <strong>${needed} reps</strong> sur <strong>${getExo(prevStep.exoId)?.name}</strong> pour débloquer</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
      <div class="prog-bar-label">${prevP.pr} / ${needed} reps — ton meilleur</div>
    </div>`;
  }

  const nextStep = chain.steps[info.stepIndex + 1];
  const pr = exoP.pr;

  if (!nextStep) {
    return `<div class="prog-panel prog-panel--elite">
      <div class="prog-header">
        <span class="prog-chain">${chain.emoji} ${chain.name}</span>
        <span class="prog-badge prog-badge--elite">⭐ Elite</span>
      </div>
      <div class="prog-stats-row">
        <div class="prog-stat"><div class="prog-stat-val">${pr}</div><div class="prog-stat-lbl">PR reps</div></div>
        <div class="prog-stat"><div class="prog-stat-val">${exoP.totalSets}</div><div class="prog-stat-lbl">Séries totales</div></div>
      </div>
    </div>`;
  }

  const needed = step.pr_unlock || 0;
  const pct    = needed ? Math.min(100, Math.round((pr / needed) * 100)) : 100;
  const nextEx = getExo(nextStep.exoId);
  const badgeSlug = step.label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  return `<div class="prog-panel">
    <div class="prog-header">
      <span class="prog-chain">${chain.emoji} ${chain.name}</span>
      <span class="prog-badge prog-badge--${badgeSlug}">${step.label}</span>
    </div>
    <div class="prog-stats-row">
      <div class="prog-stat"><div class="prog-stat-val">${pr}</div><div class="prog-stat-lbl">PR reps</div></div>
      <div class="prog-stat"><div class="prog-stat-val">${exoP.totalSets}</div><div class="prog-stat-lbl">Séries</div></div>
      <div class="prog-stat"><div class="prog-stat-val">${pct}%</div><div class="prog-stat-lbl">Vers niveau sup.</div></div>
    </div>
    <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
    <div class="prog-bar-label">Prochain : <strong>${nextEx?.name}</strong> — ${pr} / ${needed} reps</div>
  </div>`;
}

export function showUnlockNotif(exoIds) {
  if (!exoIds?.length) return;
  const names = exoIds.map(id => getExo(id)?.name).filter(Boolean).join(', ');
  const notif = document.createElement('div');
  notif.className = 'unlock-notif';
  notif.innerHTML = `<div class="unlock-notif-inner">🔓 Nouveau débloqué !<br><strong>${names}</strong></div>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('visible'), 50);
  setTimeout(() => { notif.classList.remove('visible'); setTimeout(() => notif.remove(), 400); }, 4000);
}

// ── Goal system ──
export function getGoal() { return localStorage.getItem('zw_goal') || null; }

export function setGoalExo(exoId) {
  localStorage.setItem('zw_goal', exoId);
  updateGoalBanner();
  renderSkillTree();
}

export function clearGoal() {
  localStorage.removeItem('zw_goal');
  updateGoalBanner();
  renderSkillTree();
}

export function toggleGoalExo(exoId) {
  if (getGoal() === exoId) clearGoal();
  else setGoalExo(exoId);
}

function renderGoalContent() {
  const exoId = getGoal();
  if (!exoId) return '';
  const info = EXO_CHAIN_MAP[exoId];
  if (!info) return '';
  const chain = PROGRESSION_CHAINS.find(c => c.id === info.chainId);
  if (!chain) return '';
  const ex = getExo(exoId);
  const prevStep = chain.steps[info.stepIndex - 1];
  if (!prevStep) return '';
  const prevEx  = getExo(prevStep.exoId);
  const current = (getProgress()[prevStep.exoId]?.pr) || 0;
  const needed  = prevStep.pr_unlock;
  const pct     = Math.min(100, Math.round((current / needed) * 100));

  return `
    <div class="goal-ov-label">OBJECTIF EN COURS</div>
    <div class="goal-ov-name">${chain.emoji} ${ex.name}</div>
    <div class="goal-ov-chain">${chain.name}</div>
    <div class="goal-ov-section">
      <div class="goal-ov-sub">Pour débloquer :</div>
      <div class="goal-ov-req">Atteins <strong>${needed} reps</strong> sur <strong>${prevEx.name}</strong></div>
      <div class="goal-bar-wrap" style="margin-top:10px">
        <div class="goal-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="goal-bar-label">${current} / ${needed} reps — ton meilleur</div>
    </div>
    <button class="btn-cancel" style="width:100%;margin-top:18px" onclick="clearGoal();closeGoalOverlay()">Supprimer l'objectif</button>`;
}

export function updateGoalBanner() {
  const exoId = getGoal();
  const btn = document.getElementById('goal-header-btn');
  if (btn) btn.style.display = exoId ? 'flex' : 'none';
  const box = document.getElementById('goal-overlay-box');
  if (box && document.getElementById('goal-overlay')?.classList.contains('open')) {
    box.innerHTML = renderGoalContent();
  }
}

export function openGoalOverlay() {
  const box = document.getElementById('goal-overlay-box');
  if (box) box.innerHTML = renderGoalContent();
  document.getElementById('goal-overlay')?.classList.add('open');
}

export function closeGoalOverlay() {
  document.getElementById('goal-overlay')?.classList.remove('open');
}

// ── Skill tree ──
export function openSkillTree() {
  renderSkillTree();
  document.getElementById('skill-tree').classList.add('open');
}

export function closeSkillTree() {
  document.getElementById('skill-tree').classList.remove('open');
}

export function renderSkillTree() {
  const progress = getProgress();
  const { unlocked, total } = getGlobalLevel();

  document.getElementById('skill-tree-global').innerHTML =
    `<div class="st-global-badge">${unlocked}<span>/${total}</span></div>`;

  document.getElementById('skill-tree-body').innerHTML =
    PROGRESSION_CHAINS.map(chain => {
      const nodesHTML = chain.steps.map((step, i) => {
        const ex   = getExo(step.exoId);
        if (!ex) return '';
        const exoP   = progress[step.exoId] || { pr:0, totalSets:0 };
        const locked = !isExoUnlocked(step.exoId);
        const isLast = i === chain.steps.length - 1;
        const isGoal = getGoal() === step.exoId;

        const connectorHTML = i > 0 ? `
          <div class="st-connector ${locked ? 'st-connector--locked' : 'st-connector--done'}">
            <div class="st-connector-line"></div>
            <div class="st-connector-label">${chain.steps[i-1].pr_unlock} reps</div>
          </div>` : '';

        return `${connectorHTML}
          <div class="st-node ${locked ? 'st-node--locked' : 'st-node--unlocked'} ${!locked && isLast ? 'st-node--elite' : ''} ${isGoal ? 'st-node--goal' : ''}"
               style="cursor:${locked ? 'default' : 'pointer'}" ${!locked ? `onclick="openExoFromSkillTree('${step.exoId}')"` : ''}>
            <div class="st-node-circle">
              ${locked
                ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`
                : `<span>${ex.emoji}</span>`}
              ${!locked && step.pr_unlock && !isLast ? `<div class="st-node-ring" style="--pct:${exoP.pr > 0 ? Math.min(100, Math.round(exoP.pr / step.pr_unlock * 100)) : 0}%"></div>` : ''}
            </div>
            <div class="st-node-info">
              <div class="st-node-name">${ex.name}</div>
              <div class="st-node-label ${locked ? 'st-node-label--locked' : ''}">${locked ? `🔒 ${step.label}` : `✓ ${step.label}`}</div>
              ${!locked && exoP.pr > 0 ? `<div class="st-node-pr">PR : ${exoP.pr} reps</div>` : ''}
              ${locked ? `<button class="st-goal-btn${isGoal ? ' st-goal-btn--active' : ''}" onclick="event.stopPropagation(); toggleGoalExo('${step.exoId}')">
                ${isGoal ? '★ Objectif actif' : '☆ Objectif'}
              </button>` : ''}
            </div>
          </div>`;
      }).join('');

      return `<div class="st-chain">
        <div class="st-chain-header">
          <span class="st-chain-emoji">${chain.emoji}</span>
          <span class="st-chain-name">${chain.name}</span>
          <span class="st-chain-count">${chain.steps.filter(s => isExoUnlocked(s.exoId)).length}/${chain.steps.length}</span>
        </div>
        <div class="st-chain-nodes">${nodesHTML}</div>
      </div>`;
    }).join('');
}

// ── Open preview from skill tree (back button returns to skill tree) ──
export function openExoFromSkillTree(exoId) {
  const ex = getExo(exoId);
  if (!ex) return;
  state.previewExoId = exoId;

  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t => `<span class="exo-tag">${t}</span>`).join('');
  document.getElementById('preview-progression').innerHTML = buildProgressionPanel(exoId);

  const mediaWrap = document.getElementById('preview-media-wrap');
  mediaWrap.style.display = 'none';
  mediaWrap.innerHTML = '';

  const backBtn = document.getElementById('preview-back-btn');
  backBtn.textContent = '← Arbre';
  backBtn.onclick = () => {
    closeModal('modal-preview');
    document.getElementById('skill-tree').classList.add('open');
  };
  backBtn.style.display = 'block';
  document.getElementById('preview-standalone-btn').style.display = 'none';
  document.getElementById('preview-add-btn').style.display = 'none';

  document.getElementById('skill-tree').classList.remove('open');
  openModal('modal-preview');
}
