import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import uuid from 'uuid';
import Table from '..//table';
import Tab from '../tab';

class TabTable extends Component {
    constructor(props) {
        super(props);
        this.onPagerClick = this.onPagerClick.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.pagination = {
            limit: 100,
            size: [
                100,
                200,
                300,
                400,
                500
            ],
            currentPage: 1,
            totalRows: 0
        };
        const json = this.setUpTab(this.props.json);
        this.state = {
            tabs: json.tabs
        };
    }

    componentWillMount() {
        this.initTab(this.props.json.selectedTabIndex);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.json !== this.props.json) {
            const json = this.setUpTab(nextProps.json);
            this.initTab(nextProps.json.selectedTabIndex);
            this.setState({ tabs: json.tabs });
        }
    }

    onSizeChange(tab, selectedPageLimit) {
        const tabs = this.state.tabs,
            stab = tabs.find(_ => _.id === tab.Id);
        stab.limit = selectedPageLimit;
        this.setState({ tabs: tabs });
        this.fetchData(stab.id, stab.query);
    }

    onPagerClick(tab, pageNo) {
        let skip = 0;
        if (pageNo > 0) {
            skip = (pageNo - 1) * tab.pagination.limit;
        }
        this.fetchOrders(tab.id, tab.query, pageNo, skip, tab.pagination.limit);
    }

    onTabClick(i) {
        this.initTab(i);
    }

    render() {
        const { title } = this.props.json,
            { tabs } = this.state;
        return (
            <div className="app-page orders">
                <header>
                    <h2> {title} </h2>
                </header>
                <Tab tabs={tabs} selectedTabIndex={this.props.json.selectedTabIndex} onClick={this.onTabClick} >
                    {
                        tabs.map(_ => {
                            return (<Table key={uuid.v4()}
                                {..._}
                            />);
                        })
                    }
                </Tab>
            </div>
        );
    }

    setUpTab(json) {
        json.tabs.forEach(_ => {
            _.pagination = this.pagination;
            _.data = [];
            _.onPagerClick = (pageNo) => {
                this.onPagerClick(_, pageNo);
            };
            _.onSizeChange = (selectedPageLimit) => {
                this.onSizeChange(_, selectedPageLimit);
            };
            _.isLoading = false;
        });
        return json;
    }

    initTab(i) {
        const tab = this.state.tabs[i];
        this.fetchData(tab.id, tab.query);
        this.fetchCount(tab.id, tab.count);
    }

    fetchData(tabId, query, pageNo = 1, skip = 0, limit = 100) {
        const tabs = this.state.tabs,
            tab = tabs.find(_ => _.id === tabId);
        tab.pagination.currentPage = pageNo;
        tab.isLoading = true;
        this.setState({ tabs: tabs });
        Meteor.call(query, skip, limit, (err, data) => {
            tab.data = data;
            this.setState({ tabs: tabs });
        });
    }

    fetchCount(tabId, query) {
        Meteor.call(query, (err, count) => {
            const tabs = this.state.tabs,
                tab = tabs.find(_ => _.id === tabId);
            tab.pagination.totalRows = count;
            this.setState({ tabs: tabs });
        });
    }
}
TabTable.propTypes = {
    json: PropTypes.object
};
