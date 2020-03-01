import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import { IProps } from '../../interfaces/IContainer';

const ANIMATE_STEP = 250;
const ANIMATE_DELAY = 50;

@inject('coreStore')
@observer class Content extends React.Component<IProps> {
    scrollContainer: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.scrollContainer = React.createRef();
    }

    render(): JSX.Element {
        const { theme } = this.props.coreStore;
        return (
            <div ref={ this.scrollContainer } className={`d-flex flex-fill flex-column transition-duration__05 overflow__auto ${ theme === 'light' ? 'bg-white' : 'bg-emerald' }`}>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route exact path='/home/page=:page' component={ Home }/>
                    <Route exact path='/home/page=:page/search=:search' component={ Home }/>
                    <Route path='/movie/:userId' component={ Movie }/>
                </Switch>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        // Если сменили страницу, то отскролим контент вверх
        if (this.props.location.pathname !== prevProps.location.pathname) {
          const list = this.scrollContainer.current;

          // Сролл будет постепенным, создавая эффект анимации
          let scrollAnimate = setInterval(() => {
            list.scrollTop = list.scrollTop >= ANIMATE_STEP ? list.scrollTop - ANIMATE_STEP : 0;
            if (!list.scrollTop) clearInterval(scrollAnimate);
          }, ANIMATE_DELAY);
        }
    }

    
}

export default withRouter(Content);
