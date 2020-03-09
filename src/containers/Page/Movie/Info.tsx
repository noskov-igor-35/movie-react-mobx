import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { getStringDateFromSQL, timeOnTheClock } from '../../../helpers';
import './Info/Info.scss';
// import { IMoviePageProps } from '../../interfaces/IContainer';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w500';

@inject('movieStore', 'coreStore')
@observer class Info extends React.Component<any> {
    render(): JSX.Element {
        const { movie } = this.props.movieStore;
        const { theme } = this.props.coreStore;

        const logoPath: string = `${POSTER_PATH}${movie.poster_path}`;
        const title: string = movie.title || movie.original_title;
        const subTitle: string = movie.title ? movie.original_title : null;
        const genres: string = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : null;
        const releaseDate: string = movie.release_date ? getStringDateFromSQL(movie.release_date) : 'неизвестна';

        return (
            <div className='d-flex flex-shrink-0 flex-column flex-md-row'>
                <div className='flex-shrink-0 mr-md-4'>
                    <div className={ `d-inline-flex p-3 
                                      transition ${ theme === 'light' ? 'bg-light' : 'bg-dark-green'} ` }>
                        <div>
                            <img className='movie-info__logo' src={ logoPath } alt={ title } />
                        </div>
                    </div>
                </div>
                <div className={ `flex-fill mt-4 mt-md-0 p-3
                                    transition ${ theme === 'light' ? 'bg-light' : 'bg-dark-green'} ` }>
                    <h2 className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition` }>
                        { title }
                    </h2>
                    <h4 className={ `${ theme === 'light' ? 'text-secondary' : 'text-warning'} transition` }>
                        { subTitle }
                    </h4>
                    <p className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition mb-1` }>
                        Дата релиза: { releaseDate }
                    </p>
                    <p className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition` }>
                        { movie.overview }
                    </p>
                    <p className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition mb-1` }>
                        Жанр: { genres }
                    </p>
                    <p className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition mb-0` }>
                        Продолжительность: { `${ movie.runtime ?? 0 } мин. / ${ timeOnTheClock(movie.runtime) }` }
                    </p>
                </div>
            </div>
        );
    }
}

export default Info;