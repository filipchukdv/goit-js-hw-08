const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopRef.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyRandomColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startRef.addEventListener('click', onStartClick);

function onStartClick() {
  startRef.disabled = true;
  stopRef.disabled = false;
  timerId = setInterval(changeBodyRandomColor, 1000);
}

stopRef.addEventListener('click', onStopClick);

function onStopClick() {
  startRef.disabled = false;
  stopRef.disabled = true;
  clearInterval(timerId);
}
