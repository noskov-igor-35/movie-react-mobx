import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
import Previewer from '../../components/Previewer';
import Pagination from '../../components/Pagination';
import { IHomePageProps } from '../../interfaces/IContainer';
import { IMovie } from '../../interfaces/IMovie';

@inject('movieStore', 'themeStore')
@observer class Home extends React.Component<IHomePageProps> {
    constructor(props: IHomePageProps) {
        super(props);
        this.changePages = this.changePages.bind(this);
    }
    changePages(page: number):void {
        this.props.history.push('/page/' + page);
    }
    render(): JSX.Element {
        const { movies, page, pageCount } = this.props.movieStore;
        const { theme } = this.props.themeStore;
        return (
            movies ?
            <div className='d-flex flex-grow-1 flex-shrink-0 flex-column'>
                <div className='d-flex justify-content-around flex-wrap'>
                    {
                        movies.map((movie: IMovie): React.ReactNode => {
                            return <Previewer key={ movie.id } data={ movie } theme={ theme }/>
                        })
                    }
                </div>
                <div className='d-flex flex-grow-1 justify-content-center my-4'>
                    <Pagination page={ page } pageCount={ pageCount } theme={ theme } onChangePage={ this.changePages}/>
                </div>
            </div> : 
            <div className='d-flex flex-grow-1 flex-shrink-0  justify-content-center align-items-center'>
                <Spinner className='transition-duration__05' 
                         animation='border' 
                         variant={ theme === 'light' ? 'info' : 'warning' } />
            </div>
        );
    }

    componentDidUpdate(prevProps: IHomePageProps): void {
        if (this.props.match.params.page !== prevProps.match.params.page) {
            this.props.movieStore.getMoviePage(this.props.match.params.page || '1');
        }
    }

    componentDidMount(): void {
        this.props.movieStore.getMoviePage(this.props.match.params.page || '1');
    }
}

export default Home;