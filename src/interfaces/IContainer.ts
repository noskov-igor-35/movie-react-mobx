import { IThemeStore } from './ITheme';
import { IMovieStore } from './IMovie';

export interface IProps {
    themeStore?: IThemeStore;
}

interface IRouter {
    match: {
        path: string;
        url: string;
        isExact: boolean;
        params: {
            page: string;
        }
    };
    history: {
        length: number;
        action: string;
        location: {
            pathname: string;
            search: string;
            hash: string;
            state: undefined;
            key: string;
        };
        createHref: Function;
        push: Function;
        replace: Function;
        go: Function;
        goBack: Function;
        goForward: Function;
        block: Function;
        listen: Function;
    }
}

export interface IHomePageProps extends IProps, IRouter {
    movieStore?: IMovieStore;
}