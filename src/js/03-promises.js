import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormClick);

function onFormClick(e) {
  e.preventDefault();
  const { amount, delay, step } = e.target.elements;
  let totalDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    setTimeout(createPromise, totalDelay, i, totalDelay);
    console.log('totalDelay :', totalDelay);
    totalDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
