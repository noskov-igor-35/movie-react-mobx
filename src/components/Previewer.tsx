import * as React from 'react';
import Card from 'react-bootstrap/Card';
import './Previewer/Previewer.scss'
import { IPreviewer } from '../interfaces/IComponent';

class Previewer extends React.Component<IPreviewer> {
    render(): JSX.Element {
        const { data, theme } = this.props;
        return (
            <div className='Previewer d-flex my-3 mx-4'>
                <Card bg={ theme === 'light' ? 'light' : 'dark' } className='transition-duration__05'>
                    <Card.Img variant='top' src={ data.poster_path }/>
                    <Card.Body>
                        <Card.Title className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition-duration__05`}>
                            { data.title }
                        </Card.Title>
                        <Card.Subtitle className={ `${ theme === 'light' ? 'text-secondary' : 'text-warning'} my-2 transition-duration__05` }>
                            { data.original_title }
                        </Card.Subtitle>
                        <Card.Text className={ `Previewer-genres ${ theme === 'light' ? 'text-dark' : 'text-light'} my-2 font-italic transition-duration__05` }>
                            { `Жанры: ${data.genres.join(', ')}` }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Previewer;
