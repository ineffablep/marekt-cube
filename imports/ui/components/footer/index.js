import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const year = new Date().getFullYear();

const Footer = ({ lang }) => {
    return (
        <div className="app-footer">
            <span>
                {lang.company}  ©  {year}
            </span>
        </div>
    );
};

Footer.propTypes = {
    lang: PropTypes.object.isRequired
};


export default Footer;
