import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import uuid from 'uuid';
import OrdersJson from '../../../../resources/json/data/orders.json';
import { OrdersCollection } from '../../../api/collections';
import Table from '../../components/table';
import Tab from '../../components/tab';

class OrdersPage extends Component {
    render() {
        const { title, tabs, selectedTabIndex } = OrdersJson;
        return (
            <div className="app-page orders">
                <header>
                    <h2> {title} </h2>
                </header>
                <Tab tabs={tabs} selectedTabIndex={selectedTabIndex}>
                    {
                        tabs.map(_ => {
                            return (<Table key={uuid.v4()} {..._} data={this.props.orders} />)
                        })
                    }
                </Tab>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
        orders: OrdersCollection.find({}).fetch(),
    };
}, OrdersPage);