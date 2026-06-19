import { db, auth, workoutsCol, historyCol } from './firebase.js';
import { doc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

export async function saveWorkoutToDb(w) {
  if (!auth.currentUser) return;
  await setDoc(doc(db, 'workouts', w.id), { ...w, userId: auth.currentUser.uid }).catch(() => {});
}

export async function deleteWorkoutFromDb(id) {
  if (!auth.currentUser) return;
  await deleteDoc(doc(db, 'workouts', id)).catch(() => {});
}

export async function saveSessionToDb(session) {
  if (!auth.currentUser) return;
  await setDoc(doc(db, 'sessionHistory', session.id), { ...session, userId: auth.currentUser.uid }).catch(() => {});
}

export async function deleteSessionFromDb(id) {
  if (!auth.currentUser) return;
  await deleteDoc(doc(db, 'sessionHistory', id)).catch(() => {});
}

export async function seedDefaultWorkouts(uid) {
  const defaults = [
    { id:`default1_${uid}`, name:'Full Body Débutant', days:3, duration:40, exercises:[
        { exoId:'pu',    sets:[{reps:10},{reps:10},{reps:8}] },
        { exoId:'sq',    sets:[{reps:15},{reps:15},{reps:12}] },
        { exoId:'plank', sets:[{reps:30},{reps:30},{reps:20}] },
        { exoId:'lunge', sets:[{reps:10},{reps:10}] },
    ]},
    { id:`default2_${uid}`, name:'Upper Body Burn', days:2, duration:35, exercises:[
        { exoId:'pu',   sets:[{reps:12},{reps:12},{reps:10}] },
        { exoId:'pud',  sets:[{reps:8},{reps:8}] },
        { exoId:'dip',  sets:[{reps:10},{reps:10}] },
        { exoId:'pike', sets:[{reps:8},{reps:8}] },
    ]},
  ];
  for (const w of defaults) await saveWorkoutToDb(w);
}
