import React from 'react';
import PropTypes from 'prop-types';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';
const Pagination = ({ currentPage, totalPages, onPaginationClick, totalRecords, pageSize, pageLimit, onPageSizeChangeClick }) => {
    return (
        <div className="re-pagination-container">
            <div className="pull-left">
                <button className="re-pagination-total-records"> Total Records: {totalRecords} </button>
            </div>
            <div className="re-pagination-btns pull-right">
                <RenderBtn icon="fa fa-angle-left"
                    title="Previous"
                    show
                    onClick={() => onPaginationClick(currentPage - 1)} />
                <RenderBtn text={currentPage + ' of ' + totalPages}
                    show />
                <RenderBtn icon="fa fa-angle-right" title="Next"
                    show
                    onClick={() => onPaginationClick(currentPage + 1)} />
                <button className="re-pagination-total-records"> Go To: </button>
                <select value={this.currentPage}
                    className="re-tbar-btn"
                    onChange={(e) => onPaginationClick(parseInt(e.target.value, 10))}>
                    {
                        Array.from(Array(totalPages).keys()).map(_ => {
                            return <option key={uuid.v4()} value={_ + 1}>{_ + 1} </option>;
                        })
                    }
                </select>
                {
                    pageSize && pageSize.length > 0 &&
                    <span>
                        <button className="re-pagination-total-records"> Records per Page: </button>
                        <select value={this.pageLimit}
                            className="re-tbar-btn"
                            onChange={(e) => onPageSizeChangeClick(parseInt(e.target.value, 10))}>
                            {
                                pageSize.map(_ => {
                                    return <option key={uuid.v4()} value={_}>{_} </option>;
                                })
                            }
                        </select>
                    </span>
                }
            </div>
        </div>
    );
};
Pagination.propTypes = {

    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    totalPages: PropTypes.number,
    totalRecords: PropTypes.number,
    pageSize: PropTypes.array,
    onPaginationClick: PropTypes.func,
    onPageSizeChangeClick: PropTypes.func

};
export default Pagination;
