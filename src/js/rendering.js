export function renderGallery(parent, items) {
  parent.innerHTML = '';

  const markup = items
    .map(item => {
      const { poster_path, release_date, genres, id, title } = item;
      const genresStr = genres.map(elem => elem.name).join(', ');
      return `
      <div class="gallery__card" data-id=${id}>
        <a href="#" class="gallery__link">
          <img 
            src=${
              !!poster_path
                ? 'https://image.tmdb.org/t/p/w780/' + poster_path
                : '#'
            }
            class="gallery__image"
            alt=${!!poster_path ? title : 'broken'}
            loading="lazy"
            height="575"
            width="395"            
          />
        </a>
        <ul class="gallery__descr-list">
          <li><p class="gallery__title">${title}</p></li>
          <li><p class="gallery__genre">${genresStr} | ${release_date.slice(
        0,
        4
      )}</p></li>
      </ul>
      </div>`;
    })
    .join('');
  parent.insertAdjacentHTML('afterbegin', markup);
}

export function rengerGalleryCard(parent, item) {
  const {
    id,
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    trailer,
  } = item;

  removeOldMarkup(parent, 'image');
  removeOldMarkup(parent, 'description');

  const markup = `
  <div class="image">
    <img
      class="image__picture"
      src=${
        !!poster_path
          ? 'https://image.tmdb.org/t/p/w780' + poster_path
          : 'https://cdn.create.vista.com/api/media/small/324908572/stock-vector-3d-cinema-film-strip-in'
      }
      alt="${title}"
    />
  </div>
  <div class="description">
    <p class="description__title">${title}</p>
    <ul class="description-list">
      <li class="description-list__item">
        <ul class="description-list__values">
          <li class="description-list__title">Vote / Votes</li>
          <li class="description-list__value">
            <span class="description-list__value--vote-orange">${vote_average.toFixed(
              1
            )}</span>
            /
            <span class="description-list__value--vote-grey">${vote_count}</span>
          </li>
        </ul>
      </li>
      <li class="description-list__item">
        <ul class="description-list__values">
          <li class="description-list__title">Popularity</li>
          <li class="description-list__value">${popularity}</li>
        </ul>
      </li>
      <li class="description-list__item">
        <ul class="description-list__values">
          <li class="description-list__title">Original Title</li>
          <li class="description-list__value">${original_title}</li>
        </ul>
      </li>
      <li class="description-list__item">
        <ul class="description-list__values">
          <li class="description-list__title">Genre</li>
          <li class="description-list__value">${genres
            .map(genre => genre.name)
            .join(', ')}</li>
        </ul>
      </li>
    </ul>
    <div class="film-about">
      <p class="film-about__header">About</p>
      <p class="film-about__text">
        ${overview}
      </p>
    </div>
    <div class="buttons">
      <button type="button" class="btn btn-watch-modal" id="btn-to-watched" data-id ="${id}">
        ADD TO WATCHED
      </button>
      <button type="button" class="btn btn-queue-modal" id="btn-to-queue" data-id ="${id}">
       ADD TO QUEUE
      </button>
      ${
        trailer
          ? '<button type="button" class="btn btn-queue-modal" id="btn-watch-trailer" data-trailer-id=' +
            trailer.key +
            '>WATCH TRAILER</button>'
          : ''
      }
    </div>
  </div>
  `;

  parent.insertAdjacentHTML('beforeend', markup);
}

function removeOldMarkup(parent, className) {
  for (let element of parent.children) {
    if (element.classList.contains(className)) {
      element.remove();
    }
  }
}
