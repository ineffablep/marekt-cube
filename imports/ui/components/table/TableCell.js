import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TableCell = ({ row, column, className, style }) => {
    let cellVal = row[column.id];
    if (column.dataType && (column.dataType === 'date' || column.dataType === 'dateTime')) {
        cellVal = moment(cellVal).format('DD/MM/YYYY');
    }
    return (
        <td className={'re-tc ' + className} style={style}> {cellVal} </td>
    );
};


TableCell.propTypes = {
    row: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

TableCell.defaultProps = {
    className: '',
    style: {}
};
export default TableCell;
