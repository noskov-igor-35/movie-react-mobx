import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
import Info from './Movie/Info';
// import Recommendation from './Movie/Recommendation';
import { IMoviePageProps } from '../../interfaces/IContainer';

@inject('movieStore', 'coreStore')
@observer class Movie extends React.Component<IMoviePageProps> {
    constructor(props: IMoviePageProps) {
        super(props);
    }
    render(): JSX.Element {
        const { movie } = this.props.movieStore;
        const { theme } = this.props.coreStore;
        return (
            movie?.id === Number(this.props.match.params.id) ?
            <div className='my-4 mx-4'>
                <Info/>
                {
                /*    <div className='mt-4'>
                    <Recommendation/>
                </div>*/
                }
            </div> : 
            <div className='d-flex flex-grow-1 flex-shrink-0  justify-content-center align-items-center'>
                <Spinner className='transition' 
                         animation='border' 
                         variant={ theme === 'light' ? 'info' : 'warning' } />
            </div>
        );
    }

    componentDidUpdate(prevProps: IMoviePageProps): void {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.movieStore.getMovie(this.props.match.params.id);
        }
    }

    componentDidMount(): void {
        this.props.movieStore.getMovie(this.props.match.params.id);
    }
}

export default Movie;