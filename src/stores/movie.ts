import { observable, action, configure, runInAction } from 'mobx';
import { getMovie, getMovieListWithGenres } from '../api';
import { IMovieData, IMovie, IMovieFull } from '../interfaces/IMovie';

configure({ enforceActions: 'observed' });

class movieStore {
    @observable page: number = null;
    @observable pageCount: number = null;
    @observable movie: IMovieFull = null;
    @observable movies: IMovie[] = null;

    @action.bound getMoviePage(page: string, search: string = null): void {
        getMovieListWithGenres(page, search).then((res: IMovieData) => {
            runInAction(() => {
                this.movies = res.movies;
                this.pageCount = res.maxPage;
                this.page = res.page;
            });
        });
    };

    @action.bound getMovie(movie: string): void {
        getMovie(movie).then((res: IMovieFull) => {
            runInAction(() => {
                this.movie = res;
            });
        });
    };
};

export default new movieStore();