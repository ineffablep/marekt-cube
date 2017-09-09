import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const RenderNavLink = ({ to, title, icon, badge, activeClassName, className }) => {
    return <NavLink to={to}
        activeClassName={'nav-item-active ' + activeClassName}
        className={'nav-item ' + className}>
        <i className={icon + ' nav-item-icon'} aria-hidden="true" />
        <span className="nav-item-text"> {title} </span>
        {badge && badge > 0 ? <span className="app-badge">{badge}</span> : null}
    </NavLink>;
};
RenderNavLink.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
    badge: PropTypes.number,
    activeClassName: PropTypes.string,
    className: PropTypes.string
};

export default RenderNavLink;
