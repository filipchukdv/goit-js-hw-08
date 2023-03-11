import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const date = new Date();
    if (selectedDate - date < 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.disabled = false;
      inputRef.disabled = true;
    }
  },
};

const startBtnRef = document.querySelector('button[data-start]');
const timerRef = document.querySelector('.timer');
const inputRef = document.querySelector('input[type="text"]');

function onStartClick() {
  startBtnRef.disabled = true;
  interval = setInterval(timerHandler, 1000);
}

function timerHandler() {
  const date = new Date();
  const remainMs = selectedDate - date;

  let { days, hours, minutes, seconds } = convertMs(remainMs);

  if (remainMs < 1000) {
    days = '00';
    hours = '00';
    minutes = '00';
    seconds = '00';
    clearInterval(interval);
    Notify.success('The timer has ran out');
    inputRef.disabled = false;
  }

  const markup = `<div class="field">
        <span class="value" data-days>${days}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${hours}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${minutes}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${seconds}</span>
        <span class="label">Seconds</span>
      </div>`;
  timerRef.innerHTML = markup;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, '0');
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    '0'
  );
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

startBtnRef.addEventListener('click', onStartClick);
startBtnRef.disabled = true;

flatpickr(inputRef, flatpickrOptions);
