import { OrdersCollection } from './collections';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'orders.count'() {
        return OrdersCollection.find().count();
    },
    'orders.fetch'(skip, limit) {
        return OrdersCollection.find({}, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.closed'(skip, limit) {
        return OrdersCollection.find({}, { orderStatus: 'Closed', sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.shipped'(skip, limit) {
        return OrdersCollection.find({}, { orderStatus: 'Shipped', sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.rejected'(skip, limit) {
        return OrdersCollection.find({}, { orderStatus: 'Rejected', sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
});
