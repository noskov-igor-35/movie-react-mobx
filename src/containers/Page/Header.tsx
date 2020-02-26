import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
// @ts-ignore
import Logo from '../../images/logo.png';
import { IProps } from '../../interfaces/IContainer';

@inject('themeStore')
@observer class Header extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme(): void {
        this.props.themeStore.changeTheme(this.props.themeStore.theme === 'light' ? 'dark' : 'light');
    }

    render(): JSX.Element {
        const { theme } = this.props.themeStore;
        return (
            <Navbar bg={ theme === 'light' ? 'info' : 'dark' } 
                    className="d-flex flex-shrink-0 justify-content-between transition-duration__05">
                <Navbar.Brand className="d-flex align-items-center text-white cursor__pointer">
                    <img src={ Logo } width="32" height="32" className="mr-2" /> React Movie
                </Navbar.Brand>
                <div className='d-flex align-items-center'>
                    <FormControl type="text" placeholder="Поиск" className="sm-2" />
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
