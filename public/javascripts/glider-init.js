(() => {
  const glider = new Glider(document.querySelector('.glider'), {
    slidesToShow: 3,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next',
      draggable: true,
    },
  });
})();
