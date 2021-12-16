import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import getRefs from '../../refs';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginGoogleBtn = getRefs().loginGoogleBtn;
const logoutGoogleBtn = getRefs().logoutGoogleBtn;

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

      removeSingOut();
      showSingIn();
      document.location.reload();

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
    name.classList.add('user-name');
    // name.style.fontSize = '14px';
    if (!document.getElementById('user-name')) {
      document.getElementById('login').prepend(name);
      document.querySelector('.sing-in').remove();
      // console.log('show User name'); //Test
    }
  } else {
    shoeSignOut();
  }
}
function shoeSignOut() {
  const signOut = document.createElement('p');
  signOut.textContent = 'Sign out';
  signOut.id = 'sing-out';
  signOut.classList.add('sign-out');
  // signOut.style.fontSize = '14px';
  if (!document.getElementById('sing-out')) {
    document.getElementById('login').prepend(signOut);
    document.querySelector('.sing-in').remove();
    // console.log('show Sign out'); //Test
  }
}

function showSingIn() {
  const signIn = document.createElement('p');
  signIn.textContent = 'Sign in';
  signIn.id = 'sign-in';
  // signIn.style.fontSize = '14px';
  signIn.classList.add('sing-in');
  document.getElementById('login').before(signIn);
}

function removeUserName() {
  const userName = document.getElementById('user-name');
  if (userName) userName.remove();
}

function removeSingOut() {
  const singOut = document.getElementById('sing-out');
  if (singOut) singOut.remove();
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
