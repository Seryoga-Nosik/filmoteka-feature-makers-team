import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
import getRefs from '../../refs';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

export function comparisonWithFirebase() {
  onAuthStateChanged(auth, user => {
    if (user) {
      //   console.log(user.displayName); //Test

      const uid = user.uid;

      let path = 'queue';
      getData(uid, path);
      path = 'watched';
      getData(uid, path);
    }
  });
}

function getData(uid, path) {
  get(child(dbRef, `users/${uid}/${path}/id`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const films = snapshot.val();
        // console.log(`${path} films - `, films); //Test

        comparison(films, path);
      } else {
        console.log(`${path} films - No data available`);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function comparison(films, path) {
  const filmId = Number(getRefs().modal.dataset.id);
  //   console.log(filmId); //Test
  if (films.includes(filmId)) {
    if (path === 'watched') {
      setColorAddToWatchedBtn();
    } else {
      setColorAddToQueueBtn();
    }
  }
}

function setColorAddToWatchedBtn() {
  getRefs().addToWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  getRefs().addToQueueBtn.setAttribute('disabled', true);

  getRefs().addToWatchedBtn.style.background = '#ff6b01';
  getRefs().addToWatchedBtn.style.color = '#fff';
  getRefs().addToWatchedBtn.style.borderColor = '#fff';
}

function setColorAddToQueueBtn() {
  getRefs().addToQueueBtn.textContent = 'REMOVE FROM QUEUE';
  getRefs().addToWatchedBtn.setAttribute('disabled', true);

  getRefs().addToQueueBtn.style.background = '#ff6b01';
  getRefs().addToQueueBtn.style.color = '#fff';
  getRefs().addToQueueBtn.style.borderColor = '#fff';
}
