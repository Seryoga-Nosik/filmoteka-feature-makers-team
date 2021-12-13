import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
//import frow watched and queue
import { render } from '../my-library';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

// watcehd [425909, 522402, 664574]
// queue [774741, 585245, 802217]

export function fetchWatchedFilms() {
  onAuthStateChanged(auth, user => {
    if (user) {
      // console.log(user.displayName); //Test
      const path = 'watched';
      getData(user.uid, path);
    }
  });
}

export function fetchQueueFilms() {
  onAuthStateChanged(auth, user => {
    if (user) {
      // console.log(user.displayName); //Test
      const path = 'queue';
      getData(user.uid, path);
    }
  });
}

function getData(uid, path) {
    get(child(dbRef, `users/${uid}/${path}/id`))
        .then(snapshot => {
          if (snapshot.exists()) {
            const films = snapshot.val();
            // console.log(`${path} films - `, films); //Test
            // Вставить код запуска функции для рендера карточек с аргументом films
            render(films,path)
          } else {
            console.log(`${path} films - No data available`);
          }
        })
        .catch(error => {
          console.error(error);
        });
}

// fetchWatchedFilms();
// fetchQueueFilms();
