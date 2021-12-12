import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginGoogleBtn = document.getElementById('login-google');
const logoutGoogleBtn = document.getElementById('logout-google');

logoutGoogleBtn.style.display = 'none';
checkAuthState();

// Login
loginGoogleBtn.addEventListener('click', e => {
  e.preventDefault();

  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      loginGoogleBtn.style.display = 'none';
      logoutGoogleBtn.style.display = 'block';
      showUserName(user.displayName);
      // console.log(`${user.displayName} - login with Google.`);//Test
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode + errorMessage);
      console.log(email);
      console.log(credential);
    });
});

// Logout
logoutGoogleBtn.addEventListener('click', e => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      removeUserName();
      loginGoogleBtn.style.display = 'block';
      logoutGoogleBtn.style.display = 'none';
      // console.log(`Logout.`);//Test
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode + errorMessage);
      console.log(email);
      console.log(credential);
    });
});

function showUserName(user) {
  if (document.documentElement.clientWidth > 767) {
    const name = document.createElement('p');
    name.textContent = user;
    name.id = 'user-name';
    if (!document.getElementById('user-name')) {
      document.getElementById('login').prepend(name);
    }
  }
}

function removeUserName() {
  const userName = document.getElementById('user-name');
  if (userName) userName.remove();
}

function checkAuthState() {
  onAuthStateChanged(auth, user => {
    if (user) {
      loginGoogleBtn.style.display = 'none';
      logoutGoogleBtn.style.display = 'block';
      showUserName(user.displayName);
    }
  });
}

