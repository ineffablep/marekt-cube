import React from 'react';
import PropTypes from 'prop-types';
import SideNav from '../sideNav';
import Footer from '../footer';
import Routes from '../routes';
const Layout = ({ lang, sideNavStyle, mainStyle, onHideMenu, onShowMenu, sideNavs, ...rest }) => {
    return (
        <div className="app-container">
            <SideNav sideNavStyle={sideNavStyle}
                onHideMenu={onHideMenu}
                onShowMenu={onShowMenu}
                navs={sideNavs}
                lang={lang} />
            <main className="app-main" style={mainStyle}>
                <Routes />
            </main>
            <Footer lang={lang} />
        </div>
    );
};

Layout.propTypes = {
    lang: PropTypes.object.isRequired,
    sideNavStyle: PropTypes.object,
    mainStyle: PropTypes.object.isRequired,
    onHideMenu: PropTypes.func.isRequired,
    onShowMenu: PropTypes.func.isRequired,
    sideNavs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            icon: PropTypes.string
        }))
    }))
};

export default Layout;
