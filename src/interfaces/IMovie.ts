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

interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface ISpokenLanguages {
    iso_639_1: string;
    name: string;
}

interface IProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IMovieFull extends IMovie {
    belongs_to_collection: boolean;
    budget: number;
    homepage: string;
    imdb_id: string;
    production_companies: IProductionCompanies[];
    production_countries: IProductionCountries[];
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string;
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
    movie: IMovieFull;
    movies: IMovie[];
    getMovie: Function;
    getMoviePage: Function;
}

export interface IServerGenresData {
    genres: IGenres[];
}

export interface IGenres {
    id: number;
    name: string;
}
