
import { IProps } from './IContainer';
import { IMovie } from './IMovie';

export interface IPreviewer extends IProps {
    data: IMovie;
    theme: string;
}

export interface IPagination extends IProps {
    page: number;
    pageCount: number;
    theme: string;
    onChangePage: Function;
}

export interface IPaginationItem extends IProps {
    type?: string;
    page: number;
    isActive?: boolean;
    isDisabled?: boolean; 
    theme: string;
    onClick: Function;
}

export interface IPaginationItemIcons {
    first: string;
    prev: string;
    next: string;
    last: string;
}