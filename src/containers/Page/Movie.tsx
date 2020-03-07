import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
// import { IMoviePageProps } from '../../interfaces/IContainer';

@inject('movieStore', 'coreStore')
@observer class Movie extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    render(): JSX.Element {
        const { movie } = this.props.movieStore;
        const { theme } = this.props.coreStore;
        return (
            movie ?
            <div className='d-flex flex-grow-1 flex-shrink-0 flex-column'>
                { JSON.stringify(movie) }
            </div> : 
            <div className='d-flex flex-grow-1 flex-shrink-0  justify-content-center align-items-center'>
                <Spinner className='transition' 
                         animation='border' 
                         variant={ theme === 'light' ? 'info' : 'warning' } />
            </div>
        );
    }

    componentDidUpdate(prevProps: any): void {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.coreStore.setUrlParams(this.props.location.pathname, this.props.match.params);
            this.props.movieStore.getMovie(this.props.match.params.id);
        }
    }

    componentDidMount(): void {
        this.props.coreStore.setUrlParams(this.props.location.pathname, this.props.match.params);
        this.props.movieStore.getMovie(this.props.match.params.id);
    }
}

export default Movie;