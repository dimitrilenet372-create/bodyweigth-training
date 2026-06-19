import { initializeApp }  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { getFunctions }  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-functions.js';
import { getAuth }       from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';

const firebaseConfig = {
  apiKey:            'AIzaSyBdb3K3X-sysepTYeVUFXhoQrgwl7VWpIA',
  authDomain:        'zeroweigth.firebaseapp.com',
  projectId:         'zeroweigth',
  storageBucket:     'zeroweigth.firebasestorage.app',
  messagingSenderId: '830641664692',
  appId:             '1:830641664672:web:fc1eed3ad8da709f635de1',
};

const firebaseApp = initializeApp(firebaseConfig);

export const db          = getFirestore(firebaseApp);
export const auth        = getAuth(firebaseApp);
export const functions   = getFunctions(firebaseApp, 'europe-west1');
export const workoutsCol = collection(db, 'workouts');
export const historyCol  = collection(db, 'sessionHistory');
