export const select = (element) => document.querySelector(element);
export const selectAll = (elements) => document.querySelectorAll(elements);
export const createElement = (tag, attributes) => {
  const element = document.createElement(tag, { attributes });
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
};
export const closeForm = (form) => {
  form.style.display = 'none';
};
export const disableButton = (cta) => {
  cta.innerHTML = '<i class="fa-spin fal fa-circle-notch"></i>';
  cta.setAttribute('disabled', 'disabled');
};
export const enableButton = (cta) => {
  cta.removeChild(cta.childNodes[0]);
  cta.textContent = 'Send';
  cta.removeAttribute('disabled');
};
export const validate = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
export const readJSON = (response) => response.json();
export const logMessage = (response) => {
  const messageDiv = select('.messageDiv');
  messageDiv.textContent = response.msg;
  messageDiv.classList.add('messageDiv--active');
  setTimeout(() => {
    messageDiv.classList.remove('messageDiv--active');
  }, 4500);
};
export const logError = (err) => {
  throw err;
};
