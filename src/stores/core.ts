import { observable, action, configure, computed } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import { IRouteParams } from '../interfaces/ICore';

configure({ enforceActions: 'observed' });

const PAGE_SIZES = {
    's': { min: 0, max: 480, },
    'm': { min: 481, max: 768, }, 
    'l': { min: 769, max: 1024, },
    'xl': { min: 1025, max: 1600, },
    'xxl': { min: 1601, max: 10000, },
}

class coreStore extends RouterStore {
    @observable theme: string = 'light';
    @observable screenWidth: number;

    constructor() {
        super();
        this.screenWidth = window.innerWidth;
    };

    @action changeTheme(theme: string): void {
        this.theme = theme;
    };

    @action changeSize(width: number): void {
        this.screenWidth = width;
    }

    @action navigate(page: string = null, params: IRouteParams = {}): void {
        const clearParams: IRouteParams = {};
        const paramsArr = [];
        for (let prop in params) {
            if (params.hasOwnProperty(prop) && params[prop] ) {
                clearParams[prop] = params[prop];
                paramsArr.push(`${ prop }=${ params[prop] }`);
            }
        }
        this.push( page ? `/${page}/${paramsArr.join('/')}` : '/');
    }

    @computed get page(): string {
        return this.location.pathname.split('/')[1] || 'home';
    }

    @computed get params(): {} {
        const paramsArr = this.location.pathname.split('/').slice(2);
        const params = {};

        paramsArr.forEach((paramString: string) => {
            params[paramString.split('=')[0]] = paramString.split('=')[1];
        });
        
        return params;
    }

    @computed get pageSize(): string {
        for (let size in PAGE_SIZES) {
            if (PAGE_SIZES.hasOwnProperty(size)) {
                if (PAGE_SIZES[size].min < this.screenWidth && PAGE_SIZES[size].max > this.screenWidth) return size;
            }
        }
    }
};

export default new coreStore();

/** First code my child
 * ;();
 * 
 * '
 * /-;|||||||||||||||||||||||||
 * 90-]
 * /'
 */