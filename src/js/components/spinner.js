import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function runSpinner() {
  Loading.pulse('Loading...', {
    svgColor: '#ff6b01',
    svgSize: '120px',
    messageFontSize: '20px',
    messageColor: '#ff6b01',
  });
}

export function stopSpinner() {
  Loading.remove();
  // Loading.remove(1000);
}
