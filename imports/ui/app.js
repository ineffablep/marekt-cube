import React, { Component } from 'react';
import Layout from './components/layout';
import lang from '../../resources/json/lang/en-GB.json';
import sideNavs from '../../resources/json/data/nav.json';
import './app.scss';
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sideNavStyle: { width: '250px' },
            mainStyle: { marginLeft: '250px' }
        };
    }

    onHideMenu = () => {
        this.setState({
            sideNavStyle: { width: '0' },
            mainStyle: { marginLeft: '0' }
        });
    }

    onShowMenu = () => {
        this.setState({
            sideNavStyle: { width: '250px' },
            mainStyle: { marginLeft: '250px' }
        });
    }

    render() {
        return <Layout lang={lang}
            sideNavs={sideNavs}
            onHideMenu={this.onHideMenu}
            onShowMenu={this.onShowMenu}
            sideNavStyle={this.state.sideNavStyle}
            mainStyle={this.state.mainStyle}
        />;
    }
}
