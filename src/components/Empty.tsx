import * as React from 'react';
import { IComponent } from '../interfaces/IComponent';

function Empty(props: IComponent): JSX.Element {
    const { theme } = props;
    return (
        <div className='d-flex justify-content-center my-5 py-5'>
            <h4 className={ `font-weight-bold transition-duration__05 
                          ${ theme === 'light' ? 'text-dark' : 'text-warning' }` }>
                По Вашему запросу ничего не найдено
            </h4>
        </div>
    );
}

export default Empty;