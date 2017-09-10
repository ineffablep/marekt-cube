import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortFilterPanel from './SortFilterPanel';
import moment from 'moment';
class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSortFilterPanel: false,
            fpWidth: 200,
            filterData: this.props.filteredData,
            selectAllChecked: true
        };
        this.onSortFilterPanelClick = this.onSortFilterPanelClick.bind(this);
        this.onFilterCancel = this.onFilterCancel.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onSelectAllItems = this.onSelectAllItems.bind(this);
        this.onFilterOk = this.onFilterOk.bind(this);
        this.onFilterSearch = this.onFilterSearch.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onHeaderSort = this.onHeaderSort.bind(this);
        this.th = null;
    }

    componentWillMount() {
        const colData = this.props.data.map(_ => _[this.props.id]),
            uniqData = this.props.data ? [...new Set(colData)] : [];
        let fdata = this.props.filteredData && this.props.filteredData.length > 0 ? this.props.filteredData : uniqData.map(_ => {
            return { checked: true, value: _ };
        });
        if (this.th) {
            this.setState({ fpWidth: (this.th.offsetWidth - 18) });
        }
        if (this.props.dataType === 'date' || this.props.dataType === 'datetime') {
            fdata.forEach(_ => _.value = moment(_.value).format(this.props.dateFormat));
        }
        this.setState({
            filterData: fdata,
            fbData: fdata,
            selectAllChecked: fdata.every(_ => _.checked)
        });
    }

    onFilterSearch(e) {
        let fd = e.target.value ? this.state.filterData.filter(_ => _.value.toLowerCase().includes(e.target.value.toLowerCase())) : this.state.fbData;
        this.setState({ filterData: fd });
    }

    onSortFilterPanelClick(e) {
        e.preventDefault();
        this.setState({ showSortFilterPanel: !this.state.showSortFilterPanel });
    }

    onFilterOk() {
        this.props.onFilter(this.props.id, this.state.filterData);
    }

    onFilterCancel() {
        this.setState({ showSortFilterPanel: false });
    }

    onSelectAllItems(e) {
        let fd = this.state.filterData;
        fd.forEach(_ => _.checked = e.target.checked);
        this.setState({ filterData: fd, fbData: fd, selectAllChecked: e.target.checked });
    }

    onItemSelect(e, item) {
        let fd = this.state.filterData,
            fi = fd.find(_ => _.value === item.value);
        if (fi) {
            fi.checked = e.target.checked;
            this.setState({ filterData: fd, fbData: fd });
        }
    }

    onSort(id, type) {
        this.props.onSort(id, type);
    }

    onHeaderSort() {
        let type = 'none';
        if (this.props.sortInfo.type === 'none') {
            type = 'asc';
        } else if (this.props.sortInfo.type === 'asc') {
            type = 'desc';
        } else if (this.props.sortInfo.type === 'desc') {
            type = 'none';
        }
        this.onSort(this.props.id, type);
    }

    render() {
        const { id, show, dataType, name, canFilter, canSort, style, className, sortInfo, sortFilterPanelIconClassName, headerTextClassName } = this.props;
        return (
            show ? <th style={style} className={'re-th ' + className} data-th-id={id} ref={th => this.th = th}>
                <span className="re-sort-ionc"> <i className={sortInfo.icon} /> </span>
                <button className={'re-th-name ' + headerTextClassName}
                    onClick={this.onHeaderSort}> {name} </button>
                {
                    (canFilter || canSort) && <button className="re-th-name re-th-icon"
                        tabIndex={0}
                        onClick={this.onSortFilterPanelClick}>
                        <i className={sortFilterPanelIconClassName} /> </button>
                }
                {this.state.showSortFilterPanel && <SortFilterPanel
                    id={id}
                    width={this.state.fpWidth}
                    dataType={dataType}
                    data={this.state.filterData}
                    onSort={this.onSort}
                    onOk={this.onFilterOk}
                    onCancel={this.onFilterCancel}
                    onItemSelect={this.onItemSelect}
                    onFilterSearch={this.onFilterSearch}
                    selectAllChecked={this.state.selectAllChecked}
                    onSelectAllItems={this.onSelectAllItems}
                />
                }
            </th > : null
        );
    }
}

TableHeader.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    show: PropTypes.bool,
    filteredData: PropTypes.array.isRequired,
    dataType: PropTypes.string,
    name: PropTypes.string,
    canFilter: PropTypes.bool,
    dateFormat: PropTypes.string,
    canSort: PropTypes.bool,
    canGroup: PropTypes.bool,
    sortFilterPanelIconClassName: PropTypes.string,
    className: PropTypes.string,
    headerTextClassName: PropTypes.string,
    style: PropTypes.object,
    sortFilterPanelIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    filterAppliedIcon: PropTypes.string,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    sortInfo: PropTypes.object
};

TableHeader.defaultProps = {
    sortFilterPanelIconClassName: 'fa fa-sort-desc',
    canFilter: true,
    canSort: true,
    canGroup: true,
    style: {},
    className: '',
    show: true,
    dataType: 'text',
    dateFormat: 'DD/MM/YYYY',
    headerTextClassName: '',
    showSortFilterPanel: false
};

export default TableHeader;
