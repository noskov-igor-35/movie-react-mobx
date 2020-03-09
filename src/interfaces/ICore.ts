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
    pageSize: string;
    page: string;
    params: IRouteParams;
    changeTheme: Function;
    changeSize: Function;
    navigate: Function;
}