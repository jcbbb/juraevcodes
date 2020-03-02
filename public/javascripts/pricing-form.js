import {
  select,
  selectAll,
  closeForm,
  disableButton,
  enableButton,
  validate,
  readJSON,
  logMessage,
  logError,
} from './helpers.js';

(() => {
  const form = select('.pricing-form');
  const pricingFormBtns = selectAll('.pricing-card__btn');
  const pricingForm = select('.pricing-form-container');
  const pricingFormClose = select('.form-container__close');
  const planOptions = selectAll('.pricing-form__radio');
  const formCta = select('.pricing-form__cta');

  const showPricingForm = (e) => {
    pricingForm.style.display = 'flex';
    planOptions.forEach((option) => {
      if (e.target.dataset.id === option.dataset.id) {
        option.setAttribute('checked', 'true');
      }
    });
  };
  pricingFormBtns.forEach((btn) => {
    btn.addEventListener('click', showPricingForm);
  });

  pricingFormClose.addEventListener('click', () => {
    closeForm(pricingForm);
  });

  // Close pricing-form when clicked outside of form
  document.addEventListener('click', (e) => {
    if (e.target === pricingForm) {
      pricingFormClose.click();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      pricingFormClose.click();
    }
  });

  const activeBtnAndClose = (response) => {
    if (response.status) {
      setTimeout(() => {
        enableButton(formCta);
        closeForm(pricingForm);
      }, 2500);
    } else return false;
    return response;
  };

  // Send user input to handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    disableButton(formCta);
    const data = {
      name: select('input[name="name"]').value,
      email: select('input[name="email"]').value,
      phone: select('input[name="phone"]').value,
      plan: select('input[name="plans"]:checked').value,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch('/pricing', options)
      .then(validate)
      .then(readJSON)
      .then(activeBtnAndClose)
      .then(logMessage)
      .catch(logError);
  });
})();
