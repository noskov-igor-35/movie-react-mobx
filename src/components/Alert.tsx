import * as React from 'react';
import { createPortal } from 'react-dom';
import Alert from 'react-bootstrap/Alert'
import './Alert/Alert.scss'
import { IAlert, IAlertState } from '../interfaces/IComponent';

class AlertTemplate extends React.Component<IAlert> {
    constructor(props: IAlert) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose(): void {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render(): JSX.Element {
        const { theme, title, text } = this.props;
        return (
            <div className='Alert'>
                { this.props.children ? 
                    <Alert className={ `${ theme === 'light' ?
                        'bg-info Alert-bg__info' :
                        'bg-dark-green Alert-bg__green'} transition` }
                           onClose={ this.onClose }
                           dismissible>
                        { this.props.children }
                    </Alert> :
                    <Alert className={ `${ theme === 'light' ?
                    'bg-info Alert-bg__info' :
                    'bg-dark-green Alert-bg__green'} transition` }
                           onClose={ this.onClose }
                           dismissible>
                        <Alert.Heading className={ `${ theme === 'light' ? 
                                                    'text-light' :
                                                    'text-warning' } transition` }>
                            { title }
                        </Alert.Heading>
                        <p className={ `${ theme === 'light' ? 'text-light' : 'text-warning' } transition` }>
                            { text }
                        </p>
                    </Alert>
                }
            </div>
        );
    }
}

class AlertPortal extends React.Component<IAlert, IAlertState> {
    constructor(props: IAlert) {
        super(props);
        this.state = {
            isOpen: true
        }
        this.onClose = this.onClose.bind(this);
        this.toogleModal = this.toogleModal.bind(this);
    }

    onClose(): void {
        this.toogleModal(false);
    }

    toogleModal(isOpen = true): void {
        this.setState(() => ({ isOpen }));
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render(): JSX.Element {
        return createPortal(
            this.state.isOpen &&
                    <AlertTemplate title={ this.props.title }
                                   theme={ this.props.theme }
                                   text={ this.props.text }
                                   onClose={ this.onClose }>
                        { this.props.children }
                    </AlertTemplate>,
            document.getElementById('portal')
        );
    }
}

export default AlertPortal;