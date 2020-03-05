import { select, state, log, json } from './helpers.js';

(() => {
  const form = select('.question-form');
  const stillCta = select('.still__cta');
  const questionFormContainer = select('.question-form-container');
  const questionFormClose = select('.question-form-inner__close');
  const questionFormCta = select('.question-form__cta');

  const showQuestionForm = () => {
    questionFormContainer.style.display = 'flex';
  };
  stillCta.addEventListener('click', showQuestionForm);

  questionFormClose.addEventListener('click', () => {
    state.closeForm(questionFormContainer);
  });
  document.addEventListener('click', (e) => {
    if (e.target === questionFormContainer) {
      questionFormClose.click();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      questionFormClose.click();
    }
  });
  const activeBtnAndClose = (response) => {
    if (response.status) {
      setTimeout(() => {
        state.enableButton(questionFormCta);
        state.closeForm(questionFormContainer);
      }, 2500);
    } else return false;
    return response;
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.disableButton(questionFormCta);
    const data = {
      email: select('.question-form__input').value,
      message: select('.question-form__textarea').value,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch('/pricing/question', options)
      .then(json.validate)
      .then(json.read)
      .then(activeBtnAndClose)
      .then(log.message)
      .catch(log.error);
  });
})();
