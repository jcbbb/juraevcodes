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
export const state = {
  closeForm: (form) => {
    const el = form;
    el.style.display = 'none';
    return el;
  },
  disableButton: (cta) => {
    const btn = cta;
    btn.innerHTML = '<i class="fa-spin fal fa-circle-notch"></i>';
    btn.setAttribute('disabled', 'disabled');
    return btn;
  },
  enableButton: (cta) => {
    const btn = cta;
    btn.removeChild(btn.childNodes[0]);
    btn.textContent = 'Send';
    btn.removeAttribute('disabled');
    return btn;
  },
};
export const json = {
  read: (response) => response.json(),
  validate: (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  },
};
export const log = {
  error: (err) => {
    throw err;
  },
  message: (response) => {
    const messageDiv = select('.messageDiv');
    messageDiv.textContent = response.msg;
    messageDiv.classList.add('messageDiv--active');
    setTimeout(() => {
      messageDiv.classList.remove('messageDiv--active');
    }, 4500);
  },
};
