import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import getRefs from '../../refs';
//import frow watched and queue
import { render } from '../my-library';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

export function addToQueue(e) {
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
        const newId = Number(getRefs().modal.dataset.id);
        // console.log('newId ', newId); //Test

        // Remove from firebase or write to firebase
        if (
          e.target.textContent === 'REMOVE FROM QUEUE' ||
          e.target.textContent === 'REMOVE FROM WATCHED'
        ) {
          const indexFilm = films.indexOf(newId);
          films.splice(indexFilm, 1);
          // console.log(films); //Test
          setData(uid, path, films, e);
          render(films,path)
        } else {
          films.push(newId);
          // console.log(films); //Test
          setData(uid, path, films, e);
        }
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
    e.target.style.background = '#ff6b01';
    e.target.style.color = '#fff';
    e.target.style.borderColor = '#fff';
    // console.log(e.target.style.background);//Test

    getRefs().addToQueueBtn.setAttribute('disabled', true);
    getRefs().addToQueueBtn.style.background = '#fff';
    getRefs().addToQueueBtn.style.color = '#8c8c8c';
    getRefs().addToQueueBtn.style.borderColor = '#8c8c8c';
  } else if (e.target.textContent === 'REMOVE FROM WATCHED') {
    e.target.textContent = 'ADD TO WATCHED';
    e.target.style.background = '';
    e.target.style.color = '';
    e.target.style.borderColor = '';
    // console.log(e.target.style.background);//Test

    getRefs().addToQueueBtn.removeAttribute('disabled');
    getRefs().addToQueueBtn.style.color = '';
    getRefs().addToQueueBtn.style.borderColor = '';
    getRefs().addToQueueBtn.style.background = '';
  } else if (e.target.textContent === 'ADD TO QUEUE') {
    e.target.textContent = 'REMOVE FROM QUEUE';
    e.target.style.background = '#ff6b01';
    e.target.style.color = '#fff';
    e.target.style.borderColor = '#fff';

    getRefs().addToWatchedBtn.setAttribute('disabled', true);
    getRefs().addToWatchedBtn.style.background = '#fff';
    getRefs().addToWatchedBtn.style.color = '#8c8c8c';
    getRefs().addToWatchedBtn.style.borderColor = '#8c8c8c';
  } else {
    e.target.textContent = 'ADD TO QUEUE';
    e.target.style.background = '';
    e.target.style.color = '';
    e.target.style.borderColor = '';

    getRefs().addToWatchedBtn.removeAttribute('disabled');
    getRefs().addToWatchedBtn.style.color = '';
    getRefs().addToWatchedBtn.style.borderColor = '';
    getRefs().addToWatchedBtn.style.background = '';
  }
}
