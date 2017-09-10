import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import uuid from 'uuid';
import OrdersJson from '../../../../resources/json/data/orders.json';
import Table from '../../components/table';
import Tab from '../../components/tab';
import { Meteor } from 'meteor/meteor';

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.onPagerClick = this.onPagerClick.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);

        const pagination = {
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

        OrdersJson.tabs.forEach(_ => {
            _.pagination = pagination;
            _.data = [];
            _.onPagerClick = (pageNo) => {
                this.onPagerClick(_, pageNo);
            };
            _.onSizeChange = (selectedPageLimit) => {
                this.onSizeChange(_, selectedPageLimit);
            };
            _.isLoading = false;
        });

        this.state = {
            tabs: OrdersJson.tabs,
            selectedTabIndex: OrdersJson.selectedTabIndex
        };
    }

    componentWillMount() {
        const tab = this.state.tabs[this.state.selectedTabIndex];
        this.fetchData(tab.id, tab.query);
        this.fetchCount(tab.id, tab.count);
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

    render() {
        const { title } = OrdersJson,
            { tabs, selectedTabIndex } = this.state;
        return (
            <div className="app-page orders">
                <header>
                    <h2> {title} </h2>
                </header>
                <Tab tabs={tabs} selectedTabIndex={selectedTabIndex}>
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

OrdersPage.propTypes = {
    orders: PropTypes.array
};

export default createContainer(() => {
    Meteor.subscribe('orders');
    return {};
}, OrdersPage);
