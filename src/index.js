import MovieDatabase from './js/MovieDatabaseAPI';

const refs = {
  gallery: document.querySelector('.gallery'),
};

let galleryItems = [];

const MovieAPI = new MovieDatabase();

async function getTrandVideo() {
  const { page, results, total_pages } = await MovieAPI.getTrending(1);
  console.log(results);
  galleryItems = results;
  renderGallery(galleryItems);
}

function renderGallery(items) {
  refs.gallery.innerHTML = '';

  const markup = items
    .map(item => {
      const { poster_path, release_date, genres, id, title, overview } = item;
      const genresStr = genres.map(elem => elem.name).join(', ');
      return `
      <div class="gallery__card" data-id=${id}>
        <a href="#" class="gallery__link">
          <img
            src=${'https://image.tmdb.org/t/p/w780/' + poster_path}
            class="gallery__image"
            alt=${title}
            loading="lazy"
            height="575"
            width="395"
          />
        </a>
        <p class="gallery__title">${title}</p>
        <p class="gallery__genre">${genresStr} | ${release_date}</p>
      </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}

getTrandVideo();
