import MovieDatabase from './js/MovieDatabaseAPI';
import Pagination from 'tui-pagination';

import { setGalleryClickListeners } from './js/gallery-card-modal';

const refs = {
  gallery: document.querySelector('.gallery'),
  formSearch: document.querySelector('.search-form'),
  tuiContainer: document.getElementById('tui-pagination-container'),
  parSearchError: document.querySelector('.search-error'),
};

refs.formSearch.addEventListener('submit', formOnSearch);

let galleryItems = [];
let isSearchingResult = false;
let searchQuery = '';
const MovieAPI = new MovieDatabase();
getTrandVideo();

const tuiInstance = new Pagination(refs.tuiContainer, {
  totalItems: 100,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
});

tuiInstance.on('afterMove', event => {
  const currentPage = event.page;
  if (isSearchingResult) {
    searchVideo(searchQuery, currentPage);
  } else {
    getTrandVideo(currentPage);
  }
});

async function getTrandVideo(pageNumber = 1) {
  const { page, results, total_pages } = await MovieAPI.getTrending(pageNumber);

  galleryItems = results;
  renderGallery(galleryItems);
  if (pageNumber === 1) {
    tuiInstance.reset(total_pages);
  }
}

async function searchVideo(query, pageNumber = 1) {
  const { page, results, total_pages } = await MovieAPI.searchMovie(
    query,
    pageNumber
  );
  galleryItems = results;
  renderGallery(galleryItems);

  tuiInstance.setItemsPerPage(results.length);
  tuiInstance.setTotalItems(total_pages);
  if (pageNumber === 1) {
    tuiInstance.reset(total_pages);
  }
}

async function getMovie(movieID) {
  const movieObj = await MovieAPI.getMovie(movieID);
  console.log(movieObj);
}

function renderGallery(items) {
  refs.gallery.innerHTML = '';

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
  refs.gallery.insertAdjacentHTML('afterbegin', markup);

  handleSearchResult();

  setGalleryClickListeners();
}

function handleSearchResult() {
  if (!refs.gallery.childElementCount) {
    refs.parSearchError.classList.remove('visually-hidden');
  } else {
    refs.parSearchError.classList.add('visually-hidden');
  }
}

function formOnSearch(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements['formInput'].value.trim();
  if (searchQuery) {
    isSearchingResult = true;
    searchVideo(searchQuery);
  } else {
    isSearchingResult = false;
    getTrandVideo();
  }
}
