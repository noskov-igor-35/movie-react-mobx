import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
import Previewer from '../../components/Previewer';
import Pagination from '../../components/Pagination';
import Empty from '../../components/Empty';
import { IHomePageProps } from '../../interfaces/IContainer';
import { IMovie } from '../../interfaces/IMovie';

@inject('movieStore', 'coreStore')
@observer class Home extends React.Component<IHomePageProps> {
    constructor(props: IHomePageProps) {
        super(props);
        this.openCard = this.openCard.bind(this);
        this.changePages = this.changePages.bind(this);
    }

    openCard(movie: number) {
        this.props.coreStore.navigate('movie', { id: `${ movie }` });
    }

    changePages(page: number):void {
        let search = this.props.match.params.search;
        this.props.coreStore.navigate('home', { page, search });
    }

    render(): JSX.Element {
        const { movies, page, pageCount } = this.props.movieStore;
        const { theme } = this.props.coreStore;
        return (
            movies ?
            <div className='d-flex flex-grow-1 flex-shrink-0 flex-column'>
                <div className='d-flex justify-content-around flex-wrap'>
                    {   movies.length ?
                        movies.map((movie: IMovie): React.ReactNode => {
                            return <Previewer key={ movie.id } data={ movie } theme={ theme } onClick={ this.openCard }/>
                        }) : <Empty theme={ theme }/>
                    }
                </div>
                { pageCount > 1 ?
                    <div className='d-flex flex-grow-1 justify-content-center my-4'>
                        <Pagination page={ page } 
                                    pageCount={ pageCount } 
                                    theme={ theme } 
                                    onChangePage={ this.changePages}/>
                    </div> : <div></div>
                }
            </div> : 
            <div className='d-flex flex-grow-1 flex-shrink-0  justify-content-center align-items-center'>
                <Spinner className='transition-duration__05' 
                         animation='border' 
                         variant={ theme === 'light' ? 'info' : 'warning' } />
            </div>
        );
    }

    componentDidUpdate(prevProps: IHomePageProps): void {
        if (this.props.match.params.page !== prevProps.match.params.page || 
            this.props.match.params.search !== prevProps.match.params.search) {
            this.props.coreStore.setUrlParams(this.props.location.pathname, this.props.match.params);
            this.props.movieStore.getMoviePage(this.props.match.params.page || '1', this.props.match.params.search);
        }
    }

    componentDidMount(): void {
        this.props.coreStore.setUrlParams(this.props.location.pathname, this.props.match.params);
        this.props.movieStore.getMoviePage(this.props.match.params.page || '1', this.props.match.params.search);
    }
}

export default Home;