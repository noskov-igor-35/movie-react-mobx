import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
// @ts-ignore
import Logo from '../../images/logo.png';
import { IProps, IHeaderState } from '../../interfaces/IContainer';

const SEARCH_DELAY = 1000;

@inject('coreStore')
@observer class Header extends React.Component<IProps, IHeaderState> {
    setTimeout: number;
    searchRef: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.search = this.search.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.goHome = this.goHome.bind(this);

        this.searchRef = React.createRef();
        this.state = {
            search: '',
        }
    }

    changeTheme(): void {
        this.props.coreStore.changeTheme(this.props.coreStore.theme === 'light' ? 'dark' : 'light');
    }

    updateDimensions(): void {
        this.props.coreStore.changeSize(window.innerWidth);
    }

    static getDerivedStateFromProps(props: IProps, state: IHeaderState) {
        // Из-за навешивания события при сбросе поиска не меняется defaultValue, запоминаем новое значение из роутера
        const search: string = props.coreStore?.params?.search ?? '';
        return state.search !== search ? {
            search,
        } : null;
    }

    search(e: React.ChangeEvent<HTMLInputElement>): void {
        const search: string = e.target.value;
        // Если уже ожидается установка значения? удалим старое
        if (this.setTimeout) clearTimeout(this.setTimeout);

        // Добавим ожидание установки значения, чтобы обработка происходила только после паузы
        this.setTimeout = window.setTimeout(() => {
            if (this.props.coreStore.params.search !== search || !(!this.props.coreStore.params.search && !search)) {
                this.props.coreStore.navigate('home', { page: 1, search });
            }
        }, SEARCH_DELAY);
    }

    goHome(): void {
        this.props.coreStore.navigate();
    }

    render(): JSX.Element {
        const { theme, page, isMobile, params } = this.props.coreStore;
        const defaultSearch: string = params?.search || '';
        const showSearchForm: boolean = page === 'home';
        return (
            <Navbar bg={ theme === 'light' ? 'info' : 'dark-green' } 
                    className="d-flex flex-shrink-0 justify-content-between transition-duration__05">
                <Navbar.Brand className="d-flex align-items-center text-white cursor__pointer" 
                              onClick={ this.goHome }>
                    <img src={ Logo } width="32" height="32" className="mr-2" />{ isMobile ? '' : 'React Movie' }
                </Navbar.Brand>
                <div className='d-flex align-items-center'>
                    {
                        showSearchForm ?
                            <input ref={ this.searchRef }
                                   defaultValue={ defaultSearch }
                                   type="text" 
                                   placeholder="Поиск" 
                                   className="sm-2 form-control" 
                                   onInput={ this.search }/> :
                            <div></div>
                    }
                    <a className={ `d-flex ml-3 text-${ theme === 'light' ? "light" : "warning" } cursor__pointer` }>
                        <i className={ `fas ${ theme === 'light' ?  "fa-moon" : "fa-sun" } fa-2x` }
                           onClick={ this.changeTheme }></i>
                    </a>
                    {
                        /*<a className="d-flex ml-3 text-danger cursor__pointer">
                            <i className="fas fa-heart fa-2x"></i>
                        </a>*/
                    }
                </div>
            </Navbar>
        );
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate(prevProps: IProps, prevState: IHeaderState): void {
        // Из-за навешивания события при сбросе поиска не меняется defaultValue, меняем значение вручную
        if ((this.state.search !== prevState.search) && this.searchRef.current) {
            this.searchRef.current.value = this.state.search;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
}

export default Header;
