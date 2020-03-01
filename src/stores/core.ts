import { observable, action, configure } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import { IRouteParams } from '../interfaces/ICore';

configure({ enforceActions: 'observed' });

class coreStore extends RouterStore {
    @observable theme: string = 'light';
    @observable page: string = '';
    @observable params: IRouteParams;

    @action changeTheme(theme: string): void {
        this.theme = theme;
    };

    @action setUrlParams(params: IRouteParams) {
        this.params = { ...params };
    }

    @action navigate(page: string, params: IRouteParams) {
        const clearParams = {};
        const paramsArr = [];
        for (var prop in params) {
            if (params.hasOwnProperty(prop) && params[prop] ) {
                clearParams[prop] = params[prop];
                paramsArr.push(`${ prop }=${ params[prop] }`);
            }
        }
        this.page = page;
        this.params = clearParams;
        this.push(`/${page}/${paramsArr.join('/')}`);
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