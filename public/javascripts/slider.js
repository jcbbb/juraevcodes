import { select, selectAll, createElement, json, log } from './helpers.js';
import { lazyLoad } from './lazyload.js';

(() => {
  const slider = select('.slider__slider-group');
  const nextBtn = select('.slider__next');
  const prevBtn = select('.slider__prev');
  const shotsBtn = selectAll('.card__shots');
  let imageWidth;

  function removePreviousImages(prevImages) {
    prevImages.forEach((prevImg) => {
      prevImg.remove();
    });
  }
  function moveSlide(count, width) {
    slider.style.transform = `translateX(-${width * count}px)`;
  }
  shotsBtn.forEach((shotBtn) => {
    shotBtn.addEventListener('click', (event) => {
      let counter = 0;
      function fetchSlides() {
        fetch('data/slides.json', {
          mode: 'no-cors',
        })
          .then(json.validate)
          .then(json.read)
          .then(getIDsAndMatch)
          .catch(log.error);
      }
      fetchSlides();
      function getIDsAndMatch(response) {
        const IDs = [];
        response.forEach((obj) => {
          IDs.push(obj.id);
        });

        // Get matching id with target element
        const matched = IDs.filter((id) => event.target.dataset.id == id);
        if (matched) {
          removePreviousImages(selectAll('.slider img'));
          for (let i = 0; i < response[matched].imgSrc.length; i += 1) {
            const img = createElement('img', {
              src: response[matched].placeholder,
              'data-src': response[matched].imgSrc[i],
              srcset: response[matched].srcSet[i].src,
              alt: response[matched].alt[i],
              loading: response[matched].loading,
            });
            slider.appendChild(img);
          }
          const sliderImages = selectAll('.slider img');
          sliderImages.forEach(lazyLoad);
          sliderImages[0].addEventListener('load', () => {
            imageWidth = sliderImages[0].width;
          });
          window.onresize = () => {
            imageWidth = sliderImages[0].width;
          };
          nextBtn.addEventListener('click', () => {
            if (counter === sliderImages.length - 1) {
              counter = -1;
            }
            counter += 1;
            moveSlide(counter, imageWidth);
          });
          prevBtn.addEventListener('click', () => {
            if (counter === 0) {
              counter = sliderImages.length;
            }
            counter -= 1;
            moveSlide(counter, imageWidth);
          });
        }
      }
    });
  });
  // Close slider when clicked anywhere outside slider;
  const sliderContainer = select('.slider');
  const closeBtn = select('.slider__close');
  document.addEventListener('click', (e) => {
    if (e.target === sliderContainer) {
      closeBtn.click();
    }
  });
})();
