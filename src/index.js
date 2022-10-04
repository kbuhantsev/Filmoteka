import MovieDatabase from './js/MovieDatabaseAPI';
import Pagination from 'tui-pagination';
import refs from './js/refs';
import { renderGallery } from './js/rendering';
import { setGalleryClickListeners } from './js/gallery-card-modal';

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
  renderGallery(refs.gallery, galleryItems);
  setGalleryClickListeners();
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
  renderGallery(refs.gallery, galleryItems);

  handleSearchResult();
  setGalleryClickListeners();

  tuiInstance.setItemsPerPage(results.length);
  tuiInstance.setTotalItems(total_pages);
  if (pageNumber === 1) {
    tuiInstance.reset(total_pages);
  }
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

export { MovieAPI };
