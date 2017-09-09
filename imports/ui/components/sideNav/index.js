import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import './index.scss';
import RenderNavLink from './RenderNavLink';

const SideNav = ({ sideNavStyle, onHideMenu, onShowMenu, lang, navs }) => {
    return (
        <nav className="app-nav">
            <div className="sidenav" style={sideNavStyle}>
                <Link to="/"
                    className="brand-link">
                    <img
                        alt={lang.company}
                        height={60}
                        className="brand-img" src="/logo.png" />
                </Link>
                <button
                    className="app-button close-nav "
                    onClick={onHideMenu}>
                    &#9776;
                </button>
                <div className="nav">
                    {
                        navs && navs.map(_ =>
                            <div className="nav-items" key={uuid.v4()}>
                                {_.heading && _.heading.length && <h4 className="nav-item-heading"> {_.heading} </h4>}
                                <ul className="app-ul">
                                    {
                                        _.nav && <li key={uuid.v4()}>
                                            <RenderNavLink {..._.nav} />
                                        </li>
                                    }
                                    {_.children && _.children.map(item =>
                                        <li key={uuid.v4()}>
                                            <RenderNavLink {...item} />
                                        </li>)}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="close-nav-brand">
                <Link to="/" className="brand-link">
                    <img
                        alt={lang.company}
                        height={60}
                        className="brand-img"
                        src="/logo.png" /> </Link>
                <button
                    className="app-button open-nav"
                    onClick={onShowMenu}>
                    &#9776;
                </button>
            </div>
        </nav>
    );
};

SideNav.propTypes = {
    sideNavStyle: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired,
    onHideMenu: PropTypes.func.isRequired,
    onShowMenu: PropTypes.func.isRequired,
    navs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string,
        nav: PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            icon: PropTypes.string,
            badge: PropTypes.number,
            activeClassName: PropTypes.string,
            className: PropTypes.string
        }),
        children: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            icon: PropTypes.string,
            badge: PropTypes.number,
            activeClassName: PropTypes.string,
            className: PropTypes.string
        }))
    }))
};

export default SideNav;
