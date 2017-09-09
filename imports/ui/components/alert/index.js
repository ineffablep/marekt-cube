import React from 'react';
import PropTypes from 'prop-types';


const Alert = ({ className, header, message }) => {
    return (
        <div className={'alert ' + className}>
            <dl>
                <dt>{header}</dt>
                <dd>{message}</dd>
            </dl>
        </div>
    );
};

Alert.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    message: PropTypes.string
};
export default Alert;
