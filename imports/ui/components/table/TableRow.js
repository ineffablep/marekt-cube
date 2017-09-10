import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';


const TableRow = ({ row, columns, className, style, editBtn, deleteBtn, viewBtn, customBtns }) => {
    const primaryKeyCol = columns.find(_ => _.isPrimaryKey);
    const id = row && (primaryKeyCol && row[primaryKeyCol.id] || row.id);
    return (
        <tr className={'re-tr ' + className} style={style} >
            {columns.filter(_ => _.show).map(_ => <TableCell key={uuid.v4()} column={_} row={row} />)}
            {(editBtn && editBtn.show || deleteBtn && deleteBtn.show || viewBtn && viewBtn.show || customBtns) &&
                <td className="re-td-action-btn">
                    {viewBtn && viewBtn.show &&
                        <RenderBtn
                            {...viewBtn}
                            title={viewBtn.title || 'View Record'}
                            className={' no-border ' + viewBtn.className}
                            icon={(!viewBtn.icon && !viewBtn.text) ? 'fa fa-eye' : viewBtn.icon}
                            id={id} />}
                    {editBtn && editBtn.show &&
                        <RenderBtn {...editBtn}
                            className={' no-border ' + editBtn.className}
                            title={editBtn.title || 'Edit Record'}
                            icon={(!editBtn.icon && !editBtn.text) ? 'fa fa-edit' : editBtn.icon} id={id} />}
                    {deleteBtn && deleteBtn.show && <RenderBtn {...deleteBtn} id={id}
                        title={deleteBtn.title || 'Delete Record'}
                        className={' no-border ' + deleteBtn.className}
                        icon={(!deleteBtn.icon && !deleteBtn.text) ? 'fa fa-trash' : deleteBtn.icon}
                    />}
                    {customBtns && customBtns && customBtns.map(_ => {
                        _.show = true;
                        return <RenderBtn {..._} className={' no-border ' + _.className} key={uuid.v4()} id={id} />;
                    })}
                </td>}
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    editBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    viewBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    deleteBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    customBtns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }))
};

TableRow.defaultProps = {
    className: '',
    style: {}
};

export default TableRow;
