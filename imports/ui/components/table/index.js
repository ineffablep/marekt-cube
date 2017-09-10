import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import FilteredBtns from './FilteredBtns';
import './index.css';
import ToolbarBtns from './ToolbarBtns';
import Pagination from './Pagination';

export class Table extends Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilterRemoveClick = this.onFilterRemoveClick.bind(this);
        this.onGlobalSearchChange = this.onGlobalSearchChange.bind(this);
        this.onColumnChooserClick = this.onColumnChooserClick.bind(this);
        this.onColumnSelect = this.onColumnSelect.bind(this);
        this.onPaginationClick = this.onPaginationClick.bind(this);
        let filteredData = this.props.filteredData || new Map(),
            totalRows = props.pagination.totalRows || 0,
            limit = props.pagination.limit || 10;
        this.state = {
            data: this.props.data,
            backData: this.props.data,
            columns: this.props.columns,
            filteredData: filteredData,
            totalPages: Math.round(totalRows / limit),
            sortMap: new Map(),
            showSelect: false,
            filteredKeys: Array.from(filteredData.keys())
        };
    }

    onSort(id, type) {
        if (this.props.serverSideSort) {
            this.props.onSort(id, type);
        } else {
            let col = this.props.columns.find(_ => _.id === id);
            if (col) {
                let sortData = this.sortData(id, col.dataType, type, col.dateFormat || 'DD/MM/YYY');
                this.setState({ data: sortData, backData: sortData });
            }
        }
        let icon = this.props.noSortIcon;
        if (type === 'asc') {
            icon = this.props.ascIcon;
        } else if (type === 'desc') {
            icon = this.props.descIcon;
        }
        let map = this.state.sortMap;
        map.set(id, { type, icon });
        this.setState({ sortMap: map });
    }

    onFilter(id, filteredData) {
        let map = this.state.filteredData;
        map.set(id, filteredData);
        this.setState({ filteredData: map, filteredKeys: Array.from(map.keys()) });
        if (this.props.serverSideFilter) {
            this.props.onFilter(this.state.filteredData);
        } else {
            let dataToFilter = this.state.backData;
            this.state.filteredData.forEach((value, id) => {
                let selectedValues = value.filter(_ => _.checked).map(_ => _.value);
                if (selectedValues && selectedValues.length > 0) {
                    dataToFilter = dataToFilter.filter(_ => selectedValues.includes(_[id]));
                }
            });
            this.setState({ data: dataToFilter });
        }
    }

    onFilterRemoveClick(id) {
        let fmap = this.state.filteredData;
        let fd = fmap.get(id);
        fd.forEach(_ => _.checked = false);
        let keys = this.state.filteredKeys.filter(_ => _ !== id);
        this.onFilter(id, fd);
        this.setState({ filteredKeys: keys });
    }

    onGlobalSearchChange(searchText) {
        if (!searchText) {
            this.setState({ data: this.state.backData });
            return;
        }
        if (this.props.serverSideFilter) {
            this.toolbarBtns.onGlobalSearchChange(searchText);
        } else {
            let searchResults = this.state.data.filter(_ => {
                let res = false;
                Object.values(_).forEach(item => {
                    if (item.toUpperCase().includes(searchText.toUpperCase())) {
                        res = true;
                    }
                });
                return res;
            });
            this.setState({ data: searchResults });
        }
    }

    onColumnChooserClick() {
        this.setState({ showSelect: !this.state.showSelect });
    }

    onColumnSelect(col) {
        const columns = this.state.columns;
        const column = columns.find(_ => _.id === col.id);
        column.show = !column.show;
        this.setState({ columns: columns });
    }

    onPaginationClick(pageNo) {
        if (pageNo > 0 || pageNo < this.state.totalPages) {
            this.props.pagination.onPagerClick(pageNo);
        }
    }

    onPageSizeChangeClick(selectedPageSize) {
        this.props.pagination.onSizeChange(selectedPageSize);
    }

    render() {
        const { toolbarBtns, sortFilterPanelIcon, tableRow,
            filterIcon, filterAppliedIcon, rowActionBtnHeader, pagination } = this.props,
            { editBtn, deleteBtn, viewBtn, customBtns } = tableRow,
            { showSelect, columns, data, filteredKeys, sortMap, filteredData, totalPages } = this.state,
            showRowActionBtns = editBtn && editBtn.show || deleteBtn && deleteBtn.show || viewBtn && viewBtn.show || customBtns,
            colSpan = showRowActionBtns ? columns.length + 1 : columns.length;
        toolbarBtns.columnChooser.onClick = this.onColumnChooserClick;
        toolbarBtns.columnChooser.onColumnSelect = this.onColumnSelect;
        columns.forEach(_ => {
            if (_.show === undefined) {
                _.show = true;
            }
        });
        return (
            <div>
                <div className="re-table-container">
                    <table className="re-table">
                        <thead className="re-thead">
                            <tr className="re-tbar">
                                <th colSpan={colSpan}>
                                    <FilteredBtns
                                        filteredKeys={filteredKeys}
                                        columns={columns}
                                        onFilterRemoveClick={this.onFilterRemoveClick} />
                                    <ToolbarBtns
                                        onSearch={this.onGlobalSearchChange}
                                        {...toolbarBtns}
                                        columns={columns}
                                        showSelect={showSelect}
                                        data={data} />
                                </th>
                            </tr>
                            <tr className="re-thr">
                                {columns.map(_ =>
                                    (<TableHeader {..._} key={uuid.v4()}
                                        {..._}
                                        data={data}
                                        filterIcon={filterIcon}
                                        filterAppliedIcon={filterAppliedIcon}
                                        onFilter={this.onFilter}
                                        sortInfo={sortMap.get(_.id) || { type: 'none', icon: this.props.noSortIcon }}
                                        filteredData={filteredData && filteredData.get(_.id) ? filteredData.get(_.id) : []}
                                        onSort={this.onSort}
                                        sortFilterPanelIconClassName={sortFilterPanelIcon} />))}
                                {showRowActionBtns && <th> {rowActionBtnHeader}</th>}
                            </tr>

                        </thead>
                        <tbody className="re-tobdy">
                            {data.map(_ =>
                                (<TableRow key={uuid.v4()}
                                    columns={columns}
                                    row={_}
                                    {...tableRow}
                                />))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    totalPages={totalPages}
                    totalRecords={pagination.totalRows || 0}
                    pageSize={pagination.size || 10}
                    pageLimit={pagination.limit || 10}
                    currentPage={pagination.currentPage || 1}
                    onPageSizeChangeClick={this.onPageSizeChangeClick}
                    onPaginationClick={this.onPaginationClick}
                />
            </div>

        );
    }

    sortData(id, dataType, sortType, dateFormat) {
        if (dataType === 'number') {
            if (sortType === 'asc') {
                return this.state.data.sort((a, b) => a[id] - b[id]);
            } else if (sortType === 'desc') {
                return this.state.data.sort((a, b) => b[id] - a[id]);
            }
        } else if (dataType === 'date' || dataType === 'datetime') {
            if (sortType === 'desc') {
                return this.state.data.sort((a, b) => {
                    let momentA = moment(a[id], dateFormat);
                    let momentB = moment(b[id], dateFormat);
                    if (momentA > momentB) {
                        return 1;
                    } else if (momentA < momentB) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else if (sortType === 'asc') {
                return this.state.data.sort((a, b) => {
                    let momentA = moment(a[id], dateFormat);
                    let momentB = moment(b[id], dateFormat);
                    if (momentA < momentB) {
                        return 1;
                    } else if (momentA > momentB) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
        } else {
            if (sortType === 'asc') {
                return this.state.data.sort((a, b) => {
                    const nameA = a[id].toUpperCase();
                    const nameB = b[id].toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

            } else if (sortType === 'desc') {
                return this.state.data.sort((a, b) => {
                    const nameA = a[id].toUpperCase();
                    const nameB = b[id].toUpperCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
        return this.props.data;

    }
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataType: PropTypes.string.isRequired,
        name: PropTypes.string,
        show: PropTypes.bool,
        canFilter: PropTypes.bool,
        canSort: PropTypes.bool,
        canGroup: PropTypes.bool,
        canExport: PropTypes.bool,
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool,
        isUnBoundColumn: PropTypes.bool,
        isPrimaryKey: PropTypes.bool,
        isRequireFiled: PropTypes.bool,
        className: PropTypes.string,
        dateFormat: PropTypes.string,
        style: PropTypes.object
    })).isRequired,
    data: PropTypes.array.isRequired,
    filteredData: PropTypes.any,//eslint-disable-line
    sortFilterPanelIcon: PropTypes.string,
    ascIcon: PropTypes.string,
    descIcon: PropTypes.string,
    noSortIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    rowActionBtnHeader: PropTypes.string,
    filterAppliedIcon: PropTypes.string,
    serverSideFilter: PropTypes.bool,
    serverSideSort: PropTypes.bool,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    pagination: PropTypes.shape({
        limit: PropTypes.number,
        totalRows: PropTypes.number,
        currentPage: PropTypes.number,
        size: PropTypes.arrayOf(PropTypes.number),
        onPagerClick: PropTypes.func,
        onSizeChange:PropTypes.func
    }),
    tableRow: PropTypes.shape({
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
    }),
    toolbarBtns: PropTypes.shape({
        onGlobalSearchChange: PropTypes.func,
        showGlobalSearch: PropTypes.bool,
        columnChooser: PropTypes.shape({
            show: PropTypes.bool,
            icon: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string
        }),
        uploadBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func,
            multiple: PropTypes.bool,
            accept: PropTypes.string
        }),
        exportBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string
        }),
        addNewBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func
        }),
        customBtns: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func
        }))
    })
};

Table.defaultProps = {
    data: [],
    serverSideFilter: false,
    serverSideSort: false,
    customToolbarActionBtns: [],
    rowActionBtnHeader: 'Actions',
    ascIcon: 'fa fa-sort-amount-asc',
    descIcon: 'fa fa-sort-amount-desc',
    noSortIcon: 'fa fa-sort',
    pagination: {
        totalRows: 0,
        limit: 10,
        currentPage: 1,
        size: [10, 20, 30, 40, 50, 100, 500, 1000]

    },
    tableRow: {
        editBtn: {
            show: true,
            icon: 'fa fa-edit',
            title: 'Edit Record'
        },
        viewBtn: {
            show: true,
            icon: 'fa fa-eye',
            title: 'View Record'
        },
        deleteBtn: {
            show: true,
            icon: 'fa fa-trash',
            title: 'Delete Record'
        }
    },
    toolbarBtns: {
        showGlobalSearch: true,
        columnChooser: {
            show: true,
            icon: 'fa fa-bars',
            title: 'Choose Columns'
        },
        uploadBtn: {
            show: true,
            icon: 'fa fa-upload',
            title: 'Upload Data',
            multiple: true,
            accept: '*'
        },
        exportBtn: {
            show: true,
            icon: 'fa fa-file-excel-o re-green',
            title: 'Export to CSV'
        },
        addNewBtn: {
            show: true,
            icon: 'fa fa-plus-circle',
            title: 'Add New'
        }
    }
};

export default Table;
