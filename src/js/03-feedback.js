import throttle from 'lodash.throttle';

const emailRef = document.querySelector('input[type="email"]');
const messageRef = document.querySelector('textarea[name="message"]');
const formRef = document.querySelector('.feedback-form');
const key = 'feedback-form-state';

let storage = {};

if (localStorage.getItem(key)) {
  try {
    storage = JSON.parse(localStorage.getItem(key));
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
  localStorage.setItem(key, JSON.stringify(storage));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log('email :' + storage.email);
  console.log('message :' + storage.textarea);
  storage = {};
  localStorage.clear();
  emailRef.value = '';
  messageRef.value = '';
}

emailRef.addEventListener('input', throttle(onInputChange, 500));
messageRef.addEventListener('input', throttle(onInputChange, 500));
formRef.addEventListener('submit', onFormSubmit);
