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
    id?: string;
}

export interface IСoreStore extends IRouter {
    theme: string;
    screenWidth: number;
    isMobile: boolean;
    page: string;
    params: IRouteParams;
    changeTheme: Function;
    changeSize: Function;
    navigate: Function;
    setUrlParams: Function;
}