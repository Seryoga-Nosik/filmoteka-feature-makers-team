import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import getRefs from '../../refs';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

export function addToQueue(e) {
  if (e.target.textContent === 'REMOVE FROM QUEUE') return;

  onAuthStateChanged(auth, user => {
    if (user) {
      //   console.log(user.displayName); //Test
      const path = 'queue';
      const uid = user.uid;

      getData(uid, path, e, setData);
    }
  });
}

export function addToWatched(e) {
  if (e.target.textContent === 'REMOVE FROM WATCHED') return;
  onAuthStateChanged(auth, user => {
    if (user) {
      //   console.log(user.displayName); //Test
      const path = 'watched';
      const uid = user.uid;

      getData(uid, path, e, setData);
    }
  });
}

function getData(uid, path, e, setData) {
  get(child(dbRef, `users/${uid}/${path}/id`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const films = snapshot.val();
        // console.log(`${path} films - `, films); //Test
        //
        const newId = Number(getRefs().modal.dataset.id);
        // console.log('newId ', newId); //Test
        //
        films.push(newId);
        // console.log(films); //Test
        //
        setData(uid, path, films, e);
      } else {
        setNewData(uid, path, e);
        // console.log(`${path} films - No data available`);//Test
      }
    })
    .catch(error => {
      console.error(error);
    });
}
function setNewData(uid, path, e) {
  const film = Number(getRefs().modal.dataset.id);
  set(ref(db, `users/${uid}/${path}/`), {
    id: [film],
  })
    .then(() => {
      // Data saved successfully!
      //   console.log('Data saved successfully!');//Test

      setColorBtn(e);
    })
    .catch(error => {
      // The write failed...
      console.log('Error: ', error);
    });
}

function setData(uid, path, films, e) {
  set(ref(db, `users/${uid}/${path}/`), {
    id: films,
  })
    .then(() => {
      // Data saved successfully!
      //   console.log('Data saved successfully!');//Test

      setColorBtn(e);
    })
    .catch(error => {
      // The write failed...
      console.log('Error: ', error);
    });
}

function setColorBtn(e) {
  if (e.target.textContent === 'ADD TO WATCHED') {
    e.target.textContent = 'REMOVE FROM WATCHED';
    getRefs().addToQueueBtn.setAttribute('disabled', true);
  } else {
    e.target.textContent = 'REMOVE FROM QUEUE';
    getRefs().addToWatchedBtn.setAttribute('disabled', true);
  }

  e.target.style.background = '#ff6b01';
  e.target.style.color = '#fff';
  e.target.style.borderColor = '#fff';
}
