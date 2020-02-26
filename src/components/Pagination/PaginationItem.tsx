import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { IPaginationItem, IPaginationItemIcons } from '../../interfaces/IComponent';


const ICONS: IPaginationItemIcons = {
    first: 'fa-angle-double-left',
    prev: 'fa-angle-left',
    next: 'fa-angle-right',
    last: 'fa-angle-double-right',
}

class PaginationItem extends React.Component<IPaginationItem> {
    constructor(props: IPaginationItem) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(): void {
        this.props.onClick(this.props.page);
    }

    render(): JSX.Element {
        const { type, page, isActive, isDisabled, theme } = this.props;

        // TODO: написать enum
        const variant = isActive ? ( theme === 'light' ? 'info' : 'dark') : ( theme === 'light' ? 'light' : 'warning' );

        return (
            <Button variant={ variant } 
                    active={ isActive } 
                    disabled={ isActive || isDisabled } 
                    className={ `font-weight-bold transition-duration__05${ isActive ? ' btn-isActive' : '' }` }
                    onClick={ this.onClick }>
                { type ? <i className={`fas ${ ICONS[type] }`}></i> : page }
            </Button>
        );
    }
}

export default PaginationItem;
