import { observable, action, configure, runInAction } from 'mobx';
import { getMovieListWithGenres } from '../api';
import { IMovieData, IMovie } from '../interfaces/IMovie';

configure({ enforceActions: 'observed' });

class movieStore {
    @observable page: number = null;
    @observable pageCount: number = null;
    @observable movies: IMovie[] = null;

    @action.bound getMoviePage(page: string): void {
        getMovieListWithGenres(page).then((res: IMovieData) => {
            runInAction(() => {
                this.movies = res.movies;
                this.pageCount = res.maxPage;
                this.page = res.page;
            });
        });
    };
};

export default new movieStore();