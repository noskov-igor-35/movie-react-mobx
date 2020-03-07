import * as React from 'react';
import Card from 'react-bootstrap/Card';
import './Previewer/Previewer.scss'
import { IPreviewer } from '../interfaces/IComponent';

class Previewer extends React.Component<IPreviewer> {
    constructor(props: IPreviewer) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(): void {
        if (this.props.onClick) {
            this.props.onClick(this.props.data.id);
        }
    }

    render(): JSX.Element {
        const { data, theme } = this.props;
        return (
            <div className='Previewer d-flex my-3 mx-4 cursor__pointer' onClick={ this.onClick }>
                <Card className={ `transition ${ theme === 'light' ? 'bg-light' : 'bg-dark-green'}` }>
                    <Card.Img variant='top' src={ data.poster_path }/>
                    <Card.Body>
                        <Card.Title className={ `${ theme === 'light' ? 'text-dark' : 'text-light' } transition`}>
                            { data.title }
                        </Card.Title>
                        <Card.Subtitle className={ `${ theme === 'light' ? 'text-secondary' : 'text-warning'} my-2 transition` }>
                            { data.original_title }
                        </Card.Subtitle>
                        <Card.Text className={ `Previewer-genres ${ theme === 'light' ? 'text-dark' : 'text-light'} my-2 font-italic transition` }>
                            { `Жанры: ${data.genres.join(', ')}` }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Previewer;
