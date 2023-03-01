import throttle from 'lodash.throttle';

const emailRef = document.querySelector('input[type="email"]');
const messageRef = document.querySelector('textarea[name="message"]');
const formRef = document.querySelector('.feedback-form');

let storage = {};

if (localStorage.getItem('feedback-form-state')) {
  try {
    storage = JSON.parse(localStorage.getItem('feedback-form-state'));
    console.log('storage :', storage);
    emailRef.value = storage.email;
    messageRef.value = storage.textarea;
  } catch (error) {
    console.log(error);
  }
}

function onInputChange(event) {
  const type = event.target.type;
  const value = event.target.value;
  storage[type] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(storage));
}

function onFormSubmit(event) {
  event.preventDefault();
  storage = null;
  localStorage.clear();
  emailRef.value = '';
  messageRef.value = '';
}

emailRef.addEventListener('input', throttle(onInputChange, 500));
messageRef.addEventListener('input', throttle(onInputChange, 500));
formRef.addEventListener('submit', onFormSubmit);
