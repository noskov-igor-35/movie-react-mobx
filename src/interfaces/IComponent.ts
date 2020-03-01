
import { IProps } from './IContainer';
import { IMovie } from './IMovie';

export interface IComponent extends IProps {
    theme: string;
}

export interface IPreviewer extends IComponent {
    data: IMovie;
}

export interface IPagination extends IComponent {
    page: number;
    pageCount: number;
    onChangePage: Function;
}

export interface IPaginationItem extends IComponent {
    type?: string;
    page: number;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick: Function;
}

export interface IPaginationItemIcons {
    first: string;
    prev: string;
    next: string;
    last: string;
}