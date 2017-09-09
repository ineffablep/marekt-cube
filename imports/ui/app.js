import connect from '../lib/connect';
import './app.scss';

import { onHideMenu, onShowMenu } from '../actions';
import AppState from '../state/appState';

import Layout from './components/layout';

const App = connect(AppState, [onHideMenu, onShowMenu])(Layout);
export default App;
