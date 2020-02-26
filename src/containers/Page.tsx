import * as React from 'react';
import { Provider } from 'mobx-react';
import store from '../stores/store';
import Header from './Page/Header';
import Router from './Page/Router'
import './Page/Page.scss';

function Page(): JSX.Element {
    return (
        <div className='d-flex flex-column flex-fill overflow__hidden'>
            <Provider Provider {...store}>
                <Header/>
                <Router/>
            </Provider>
        </div>
    );
};

export default Page;
