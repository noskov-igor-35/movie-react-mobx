import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
// @ts-ignore
import Logo from '../../images/logo.png';
import { IProps } from '../../interfaces/IContainer';

const SEARCH_DELAY = 1000;

@inject('coreStore')
@observer class Header extends React.Component<IProps> {
    setTimeout: number;
    constructor(props: IProps) {
        super(props);
        this.search = this.search.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme(): void {
        this.props.coreStore.changeTheme(this.props.coreStore.theme === 'light' ? 'dark' : 'light');
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

    render(): JSX.Element {
        const { theme, params } = this.props.coreStore;
        return (
            <Navbar bg={ theme === 'light' ? 'info' : 'dark-green' } 
                    className="d-flex flex-shrink-0 justify-content-between transition-duration__05">
                <Navbar.Brand className="d-flex align-items-center text-white cursor__pointer">
                    <img src={ Logo } width="32" height="32" className="mr-2" /> React Movie
                </Navbar.Brand>
                <div className='d-flex align-items-center'>
                    <FormControl defaultValue={ params?.search || '' } 
                                 type="text" 
                                 placeholder="Поиск" 
                                 className="sm-2" 
                                 onInput={ this.search }/>
                    <a className={ `d-flex ml-3 text-${ theme === 'light' ? "light" : "warning" } cursor__pointer` }>
                        <i className={ `fas ${ theme === 'light' ?  "fa-moon" : "fa-sun" } fa-2x` }
                           onClick={ this.changeTheme }></i>
                    </a>
                    <a className="d-flex ml-3 text-danger cursor__pointer">
                        <i className="fas fa-heart fa-2x"></i>
                    </a>
                </div>
            </Navbar>
        );
    }
}

export default Header;
