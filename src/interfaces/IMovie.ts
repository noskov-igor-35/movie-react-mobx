export interface IMovie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    genres?: string[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}
  
export interface IServerMovieData {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovie[];
}

export interface IMovieData {
    page: number;
    maxPage: number;
    movies: IMovie[];
}

export interface IMovieStore {
    page: number;
    pageCount: number;
    movies: IMovie[];
    getMoviePage: Function;
}

export interface IServerGenresData {
    genres: IGenres[];
}

export interface IGenres {
    id: number;
    name: string;
}
