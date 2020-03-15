
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { IPagination, IPaginationItem, IPaginationItemIcons } from '../interfaces/IComponent';
import './Pagination/Pagination.scss';


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
                    className={ `font-weight-bold transition${ isActive ? ' btn-isActive' : '' }` }
                    onClick={ this.onClick }>
                { type ? <i className={`fas ${ ICONS[type] }`}></i> : page }
            </Button>
        );
    }
}


class Pagination extends React.Component<IPagination> {
    constructor(props: IPagination) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(id: number): void {
        if (this.props.onChangePage) {
            this.props.onChangePage(id);
        }
    }

    render(): JSX.Element {
        const { page, pageCount, theme, isFull } = this.props;

        // Расчет крайних значений
        const step: number = isFull ? 2 : 1;
        const minPage: number = page - step < 1 ? 1 : page - step;
        const maxPage: number = page + step > pageCount ? pageCount : page + step;

        // Переходы назад
        const items: React.ReactNodeArray = [
            <PaginationItem key='first' 
                            type='first' 
                            page={ 1 } 
                            isDisabled={ page === 1 } 
                            theme={ theme } 
                            onClick={ this.onClick }/>,
        ];
        if (isFull) {
            items.push(
                <PaginationItem key='prev' 
                                type='prev' 
                                page={ page - 1 } 
                                isDisabled={ page === 1 } 
                                theme={ theme }
                                onClick={ this.onClick }/>,
            );
        }

        // Кнопки
        for (let number: number = minPage; number <= maxPage; number++) {
            items.push(
                <PaginationItem key={ number }
                                page={ number }
                                isActive={ page === number }
                                theme={ theme }
                                onClick={ this.onClick }/>
            );
        }

        // Переходы вперед
        if (isFull) {
            items.push(
                <PaginationItem key='next' 
                                type='next' 
                                page={ page + 1 } 
                                isDisabled={ page === pageCount } 
                                theme={ theme }
                                onClick={ this.onClick }/>,
            );
        }
        items.push(
            <PaginationItem key='last' 
                            type='last' 
                            page={ pageCount } 
                            isDisabled={ page === pageCount } 
                            theme={ theme }
                            onClick={ this.onClick }/>,
        );

        return (
            <div role='group' className='Pagination'>{ items }</div>
        );
    }
}

export default Pagination;
