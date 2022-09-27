import MovieDatabase from './js/MovieDatabaseAPI';

const MovieAPI = new MovieDatabase();

async function getTrandVideo() {
  const { page, results, total_pages } = await MovieAPI.getTrending(1);
  console.log(page);
  console.log(results);
  console.log(total_pages);
}

getTrandVideo();
