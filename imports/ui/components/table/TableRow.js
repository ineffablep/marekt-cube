import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import uuid from 'uuid';


const TableRow = ({ row, columns, className, style, onEdit, onDelete, showDeleteBtn, showEditBtn, showViewBtn }) => {
    return (
        <tr className={'re-tr ' + className} style={style} >
            {columns.map(_ => <TableCell key={uuid.v4()} id={_.id} row={row} />)}
            {(showDeleteBtn || showEditBtn|| showViewBtn) && <td className="re-td-action-btn">
                {showViewBtn && <button onClick={() => onView(row)}> <i className="fa fa-eye re-eye" aria-hidden="true" /> </button>}
                {showEditBtn && <button onClick={() => onEdit(row)}> <i className="fa fa-edit re-edit" aria-hidden="true" /> </button>}
                {showDeleteBtn && <button onClick={() => onDelete(row)}> <i className="fa fa-close re-delete" aria-hidden="true" /> </button>}
            </td>}
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    showEditBtn: PropTypes.bool,
    showDeleteBtn: PropTypes.bool,
    showViewBtn: PropTypes.bool,
    onView: PropTypes.func
};

TableRow.defaultProps = {
    className: '',
    style: {},
    showDeleteBtn: true,
    showEditBtn: true,
    showViewBtn: true
};

export default TableRow;
