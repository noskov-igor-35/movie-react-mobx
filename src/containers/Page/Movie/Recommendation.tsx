import * as React from 'react';
import { observer, inject } from 'mobx-react';
// import { IMoviePageProps } from '../../interfaces/IContainer';

@inject('movieStore', 'coreStore')
@observer class Recommendation extends React.Component<any> {
    render(): JSX.Element {
        const { movie } = this.props.movieStore;
        const { theme } = this.props.coreStore;
        return (
            <div className={ `d-flex flex-shrink-0 p-3
                              transition ${ theme === 'light' ? 'bg-light' : 'bg-dark-green'}` }>
                ssadasdasd
            </div>
        );
    }
}

export default Recommendation;