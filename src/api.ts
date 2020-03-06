import { IServerMovieData, IServerGenresData, IMovieData, IMovie, IGenres, IMovieFull } from './interfaces/IMovie';

const URL: string = 'https://api.themoviedb.org/3/';
const LANGUAGE: string = '&language=ru-RU';
const API: string = '?api_key=fceda9b573bf2b2c108c1f9c2bc407d1';

// Метод добавляющий перечень жанров в список фильмов
function addGenresInMovieList(movies: IMovie[], genres: IGenres[]): IMovie[] {
  // Обходим все фильмы
  return movies.map((movie: IMovie) => {
    // Получаем список жанров на основе имеющихся id жанров
    const genres_name: string[] = movie.genre_ids.map((genreId: number): string => {
      // Находим запись у которой id совпадает с id жанра из списка фильмов и возвращаем из записи имя
      return genres.find((genre: IGenres): boolean => genre.id === genreId).name;
    });
    // Добавляем полученный перечень жанров и возвращаем щапись фильма
    movie.genres = genres_name;
    return movie;
  })
}

// Метод получения списка похожих фильмов
/*function getRecommendationsList(id) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}movie/${id}/recommendations${API}${LANGUAGE}`)
    .then(response => response.json())
    .then(data => resolve(data))
    .catch((e) => reject(e));
  });
}*/

// Метод получения списка фильмов c перечнем жанров по номеру страницы
function getMovieListWithGenres(page: string, search = null): Promise<IMovieData> {
  return new Promise((resolve, reject) => {
    Promise.all([getMovieList(page, search), getGenreList()])
    .then((data: [IMovieData, IGenres[]]) => {
      resolve({
        page: data[0].page,
        maxPage: data[0].maxPage,
        movies: addGenresInMovieList(data[0].movies, data[1])
      })
    }).catch((e: Error) => reject(e));
  });
}

// Метод получения списка фильмов по номеру страницы
function getMovieList(page: string, search?: string): Promise<IMovieData> {
  return new Promise((resolve, reject) => {
    const url = search ?
    `${ URL }search/movie${ API }${ LANGUAGE }&page=${ page }&query=${ search }` :
    `${ URL }movie/popular${ API }${ LANGUAGE }&page=${ page }`;
    fetch(url)
    .then((response: Response) => response.json())
    .then((data: IServerMovieData) => {
      const movies: IMovie[] = data.results || [];//data.results[0].poster_path
      movies.forEach((movie: IMovie) => {
        movie.poster_path = `http://image.tmdb.org/t/p/w500${ movie.poster_path }`;
      });
      resolve({
        page: data.page,
        maxPage: data.total_pages,
        movies
      })
    }).catch((e: Error) => reject(e));
  });
}

// Метод получения перечня жанров
function getGenreList(): Promise<IGenres[]> {
  return new Promise((resolve, reject) => {
    fetch(`${URL}genre/movie/list${API}${LANGUAGE}`)
    .then((response: Response) => response.json())
    .then((data: IServerGenresData) => resolve(data.genres))
    .catch((e: Error) => reject(e));
  });
}

// Метод получения данных о фильме
function getMovie(id: string) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}movie/${id}${API}${LANGUAGE}`)
    .then((response: Response) => response.json())
    .then((data: IMovieFull) => resolve(data))
    .catch((e: Error) => reject(e));
  });
};

export {
  //getRecommendationsList,
  getMovieListWithGenres,
  getMovie,
};