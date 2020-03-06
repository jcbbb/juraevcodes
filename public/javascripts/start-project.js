import { select, selectAll } from './helpers.js';

const fieldsets = selectAll('fieldset');
const next = select('.fieldset__next-btn');
const prev = select('.fieldset__prev-btn');
let currentField = 0;

// Shows the first fieldset by default
const showField = (current) => {
  fieldsets[current].style.display = 'block';
  if (current > 0) {
    prev.removeAttribute('disabled');
  } else {
    prev.setAttribute('disabled', 'disabled');
  }
  if (current === fieldsets.length - 1) {
    next.textContent = 'Submit';
  } else {
    next.textContent = 'Next';
  }
};
showField(currentField);

const step = (int) => {
  fieldsets[currentField].style.display = 'none';

  currentField += int;

  if (currentField >= fieldsets.length) {
    //
  }
  showField(currentField);
};
next.addEventListener('click', () => {
  step(1);
});
prev.addEventListener('click', () => {
  step(-1);
});
