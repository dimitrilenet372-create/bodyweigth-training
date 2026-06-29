import { PROGRESSION_CHAINS } from './ui/skillTree.js';
import { setGoalExo }         from './ui/skillTree.js';

const KEY = 'zw_onboarding';

export function getOnboarding() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}
export function needsOnboarding() { return !getOnboarding(); }

// Pré-débloque les nœuds selon le niveau déclaré
function applyLevelToProgress(level) {
  const unlockDepth = level === 'advanced' ? 2 : level === 'intermediate' ? 1 : 0;
  if (!unlockDepth) return;
  const progress = JSON.parse(localStorage.getItem('zw_progress') || '{}');
  PROGRESSION_CHAINS.forEach(chain => {
    chain.steps.forEach((step, i) => {
      if (i > 0 && i <= unlockDepth) {
        if (!progress[step.exoId]) progress[step.exoId] = {};
        if (!progress[step.exoId].unlocked) progress[step.exoId].unlocked = true;
      }
    });
  });
  localStorage.setItem('zw_progress', JSON.stringify(progress));
}

const GOAL_MAP = {
  skills: { beginner: 'pike',    intermediate: 'fronttuck', advanced: 'humanflag' },
  force:  { beginner: 'pu',      intermediate: 'widepull',  advanced: 'pu1arm'    },
  forme:  { beginner: 'sq',      intermediate: 'bsq',       advanced: 'pistol'    },
  poids:  { beginner: 'incline', intermediate: 'sqj',       advanced: 'lsit'      },
};

// Sauvegarde les réponses, applique les pré-déblocages et propose un objectif
export function submitOnboarding(data) {
  localStorage.setItem(KEY, JSON.stringify({ ...data, done: true }));
  applyLevelToProgress(data.level);
  const suggestedGoal = GOAL_MAP[data.goal]?.[data.level];
  if (suggestedGoal) setGoalExo(suggestedGoal);
  closeOnboarding();
}

// ── UI ──

let currentStep = 0;
const STEPS = ['goal', 'level', 'frequency'];

const CONTENT = {
  goal: {
    title: 'Quel est ton objectif ?',
    options: [
      { value: 'skills',  emoji: '🤸', label: 'Apprendre des skills',   sub: 'Handstand, muscle up, L-sit…' },
      { value: 'force',   emoji: '💪', label: 'Gagner en force',         sub: 'Plus de répétitions, plus lourd' },
      { value: 'forme',   emoji: '🏃', label: 'Me remettre en forme',    sub: 'Reprendre une activité régulière' },
      { value: 'poids',   emoji: '⚖️', label: 'Perdre du poids',         sub: 'Cardio et dépense énergétique' },
    ],
  },
  level: {
    title: 'Quel est ton niveau actuel ?',
    options: [
      { value: 'beginner',      emoji: '🌱', label: 'Débutant',      sub: 'Je fais peu ou pas de sport' },
      { value: 'intermediate',  emoji: '⚡', label: 'Intermédiaire', sub: 'Je m\'entraîne de temps en temps' },
      { value: 'advanced',      emoji: '🔥', label: 'Avancé',        sub: 'Je m\'entraîne sérieusement' },
    ],
  },
  frequency: {
    title: 'Combien de fois par semaine ?',
    options: [
      { value: '2',    emoji: '📅', label: '2 fois',         sub: 'Idéal pour débuter' },
      { value: '3-4',  emoji: '📆', label: '3 à 4 fois',     sub: 'Progression régulière' },
      { value: 'daily',emoji: '🗓️', label: 'Tous les jours', sub: 'Haute intensité' },
    ],
  },
};

const answers = {};

function renderStep() {
  const key  = STEPS[currentStep];
  const data = CONTENT[key];
  const box  = document.getElementById('ob-box');
  if (!box) return;

  box.innerHTML = `
    <div class="ob-header">
      <div class="ob-dots">
        ${STEPS.map((_, i) => `<div class="ob-dot${i === currentStep ? ' ob-dot--active' : i < currentStep ? ' ob-dot--done' : ''}"></div>`).join('')}
      </div>
      <div class="ob-title">${data.title}</div>
    </div>
    <div class="ob-options">
      ${data.options.map(o => `
        <button class="ob-option" data-value="${o.value}" onclick="window._obSelect('${o.value}')">
          <span class="ob-option-emoji">${o.emoji}</span>
          <span class="ob-option-text">
            <span class="ob-option-label">${o.label}</span>
            <span class="ob-option-sub">${o.sub}</span>
          </span>
        </button>
      `).join('')}
    </div>
    ${currentStep > 0 ? `<button class="ob-back" onclick="window._obBack()">← Retour</button>` : ''}
  `;
}

window._obSelect = function(value) {
  const key = STEPS[currentStep];
  answers[key] = value;

  // Highlight selected
  document.querySelectorAll('.ob-option').forEach(btn => {
    btn.classList.toggle('ob-option--selected', btn.dataset.value === value);
  });

  setTimeout(() => {
    currentStep++;
    if (currentStep >= STEPS.length) {
      submitOnboarding(answers);
    } else {
      renderStep();
    }
  }, 250);
};

window._obBack = function() {
  if (currentStep > 0) { currentStep--; renderStep(); }
};

export function openOnboarding() {
  currentStep = 0;
  Object.keys(answers).forEach(k => delete answers[k]);
  const overlay = document.getElementById('ob-overlay');
  if (overlay) { overlay.classList.add('active'); renderStep(); }
}

export function closeOnboarding() {
  const overlay = document.getElementById('ob-overlay');
  if (overlay) overlay.classList.remove('active');
}
