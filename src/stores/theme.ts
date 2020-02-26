import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class themeStore {
    @observable theme: string = 'light';

    @action changeTheme(theme: string): void {
        this.theme = theme;
    };
};

export default new themeStore();