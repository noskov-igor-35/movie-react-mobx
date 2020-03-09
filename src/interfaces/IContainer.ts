import { IСoreStore } from './ICore';
import { IMovieStore } from './IMovie';

interface IRouter {
    match?: {
        path: string;
        url: string;
        isExact: boolean;
        params: {
            page: string;
            search: string;
            id: string;
        }
    };
    history?: History;
}

export interface IProps extends IRouter {
    coreStore?: IСoreStore;
    location?: Location;
}

export interface IHeaderState {
    search: string;
}

export interface IHomePageProps extends IProps {
    movieStore?: IMovieStore;
}

export interface IMoviePageProps extends IProps {
    movieStore?: IMovieStore;
}