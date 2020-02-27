import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import { IProps } from '../../interfaces/IContainer';

@inject('themeStore')
@observer class Router extends React.Component<IProps> {
    render(): JSX.Element {
        const { theme } = this.props.themeStore;
        return (
            <div className={ `d-flex flex-column flex-fill overflow__auto transition-duration__05
                             ${ theme === 'light' ? 'bg-white' : 'bg-emerald' }` }>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        <Route exact path='/page/:page' component={ Home }/>
                        <Route path='/movie/:userId' component={ Movie }/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Router;
