interface IRouter {
    location: Location;
    history: History;
    push: Function;
    replace: Function;
    go: Function;
    goBack: Function;
    goForward: Function;
}

export interface IRouteParams {
    page?: number;
    search?: string;
}

export interface IСoreStore extends IRouter {
    theme: string;
    page: string;
    params: IRouteParams;
    changeTheme: Function;
    navigate: Function;
    setUrlParams: Function;
}