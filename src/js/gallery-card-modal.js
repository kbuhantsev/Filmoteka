import refs from './refs';
import { rengerGalleryCard } from './rendering';
import { MovieAPI } from '../index';

function setGalleryClickListeners() {
  const filmCards = document.querySelectorAll('.gallery__card');
  filmCards.forEach(filmCard =>
    filmCard.addEventListener('click', onGalleryCardClick)
  );

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.code;

      if (key === 'Escape') {
        refs.modalWindow.classList.remove('active');
        refs.overlay.classList.remove('active');
        refs.modalWindow.style.top = '50%';
      }
    },
    false
  );

  refs.overlay.addEventListener('click', function () {
    refs.modalWindow.classList.remove('active');
    this.classList.remove('active');
    refs.modalWindow.style.top = '50%';
  });
}

function onGalleryCardClick(event) {
  event.preventDefault();

  const cardNode = event.currentTarget;
  const filmCard = MovieAPI.getFilmFromResults(cardNode.dataset.id);

  rengerGalleryCard(refs.modalWindow, filmCard);

  if (window.matchMedia('(max-width: 768px)').matches) {
    refs.modalWindow.style.top = window.pageYOffset + 'px';
  }

  refs.modalWindow.classList.add('active');
  refs.overlay.classList.add('active');
}

export { setGalleryClickListeners };
