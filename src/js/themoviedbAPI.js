import axios from 'axios';

const API_KEY = '99eb21030dfb3afeff4792ddc8f57a63';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiPixabay {
  constructor() {
    this.page = 1;
    this.totalPages = 1000;
  }

  // https://api.themoviedb.org/3/trending/movie/week?api_key=<<api_key>>
  getTrending(page) {
    const URL = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}&include_adult=false`;
    return axiosGet(URL);
  }

  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  getMovie(movieID) {
    const URL = `${BASE_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`;
    return axiosGet(URL);
  }

  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=titanic&page=1&include_adult=false
  searchMovie(query, page = 1) {
    const URL = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    return axiosGet(URL);
  }

  async #axiosGet(URL) {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
