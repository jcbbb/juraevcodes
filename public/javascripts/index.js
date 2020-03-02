import { select, selectAll } from './helpers.js';
import { lazyLoad } from './lazyload.js';

(() => {
  const navbar = select('.header');
  const images = selectAll("img[loading='lazy']");

  images.forEach(lazyLoad);

  // Stick the navbar to top after some scroll
  function stickToTOp() {
    if (window.pageYOffset > 100) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
  window.onscroll = () => {
    stickToTOp();
  };
})();
