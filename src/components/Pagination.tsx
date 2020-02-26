import * as React from 'react';
import PaginationItem from './Pagination/PaginationItem';
import './Pagination/Pagination.scss'
import { IPagination } from '../interfaces/IComponent';

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
        const { page, pageCount, theme } = this.props;

        // Расчет крайних значений
        const minPage: number = page - 2 < 1 ? 1 : page - 2;
        const maxPage: number = page + 2 > pageCount ? pageCount : page + 2;

        // Переходы назад
        const items: React.ReactNodeArray = [
            <PaginationItem key='first' 
                            type='first' 
                            page={ 1 } 
                            isDisabled={ page === 1 } 
                            theme={ theme } 
                            onClick={ this.onClick }/>,
            <PaginationItem key='prev' 
                            type='prev' 
                            page={ page - 1 } 
                            isDisabled={ page === 1 } 
                            theme={ theme }
                            onClick={ this.onClick }/>
        ];

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
        items.push(
            <PaginationItem key='next' 
                            type='next' 
                            page={ page + 1 } 
                            isDisabled={ page === pageCount } 
                            theme={ theme }
                            onClick={ this.onClick }/>,
            <PaginationItem key='last' 
                            type='last' 
                            page={ pageCount } 
                            isDisabled={ page === pageCount } 
                            theme={ theme }
                            onClick={ this.onClick }/>
        );

        return (
            <div role='group' className='Pagination'>{ items }</div>
        );
    }
}

export default Pagination;
