import getRefs from '../refs';

const refs = getRefs();

const iconLight = document.querySelector('[data-theme="light"]');
const iconSun = document.querySelector('.icon-sun');

refs.themeBtn.addEventListener('click', onThemeChange);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const THEME_KEY = 'theme';

function onThemeChange(event) {
  if (event.target === iconLight || event.target === iconSun) {
    console.log('light!');
    replaceTheme(Theme.LIGHT, Theme.DARK);
  } else {
    replaceTheme(Theme.DARK, Theme.LIGHT);
    console.log('dark');
  }
}

function replaceTheme(oldTheme, newTheme) {
  document.body.classList.replace(oldTheme, newTheme);

  localStorage.setItem(THEME_KEY, newTheme);
}

function savedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    document.body.classList.value = savedTheme;
  } else {
    document.body.classList.value = Theme.LIGHT;
  }
}

savedTheme();
