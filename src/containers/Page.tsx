import * as React from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import store from '../stores/store';
import Header from './Page/Header';
import Content from './Page/Content'
import './Page/Page.scss';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, store.coreStore);

function Page(): JSX.Element {
    return (
        <div className='d-flex flex-column flex-fill overflow__hidden'>
            <Provider Provider { ...store }>
                <Router history={ history }>
                    <Header/>
                    <Content/>
                </Router>
            </Provider>
        </div>
    );
};

export default Page;
