import { select, state, log, json } from './helpers.js';

const form = select('.contact-form');
const formCta = select('.contact-form__cta');

const activeBtn = (response) => {
  if (response.status) {
    setTimeout(() => {
      state.enableButton(formCta);
    }, 2500);
  } else return false;
  return response;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  state.disableButton(formCta);

  const data = {
    fname: select('input[name="fname"]').value,
    lname: select('input[name="lname"]').value,
    email: select('input[name="contact-email"]').value,
    subject: select('input[name="contact-subject"]').value,
    details: select('textarea[name="contact-details"]').value,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch('/contact', options)
    .then(json.validate)
    .then(json.read)
    .then(activeBtn)
    .then(log.message)
    .catch(log.error);
});
