// Shared mutable state — imported by all modules, mutated in place
export const state = {
  workouts:             [],
  sessionHistory:       [],
  currentWorkout:       null,
  sessionExercises:     [],
  sessionSeconds:       0,
  activeTimerInterval:  null,
  currentFilterMuscle:  'Tous',
  editingWorkoutId:     null,
  workoutExercises:     [],
  previewExoId:         null,
  historyViewDate:      (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })(),
  pinCurrent:           '',
  premiumStatus:        false,
  currentGuidedProgramId: null,
  historyUnsub:         null,
  workoutsUnsub:        null,
  chipOrder:            [],
  chipDragging:         null,
  draggedMuscle:        null,
  muscleOrder:          [],
  splashDismissed:      false,
  _stripeSuccessReturn: false,

  // Cross-module callbacks wired by app.js at init to avoid circular imports
  onRefreshPicker:      null,
  onPickExo:            null,
};
