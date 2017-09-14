import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TabTable from '../../components/tabTable';
import OrdersJson from '../../../../resources/json/data/orders.json';

const OrdersPage = () => {
    return (
        <TabTable json={OrdersJson} />
    );
};

export default createContainer(() => {
    Meteor.subscribe('orders');
    return {};
}, OrdersPage);
