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
        return OrdersCollection.find({ orderStatus: 'Closed' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.closed.count'() {
        return OrdersCollection.find({ orderStatus: 'Closed' }).count();
    },
    'orders.pending'(skip, limit) {
        return OrdersCollection.find({ orderStatus: 'Pending' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.pending.count'() {
        return OrdersCollection.find({ orderStatus: 'Pending' }).count();
    },
    'orders.shipped'(skip, limit) {
        return OrdersCollection.find({ orderStatus: 'Shipped' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.shipped.count'() {
        return OrdersCollection.find({ orderStatus: 'Shipped' }).count();
    },
    'orders.rejected'(skip, limit) {
        return OrdersCollection.find({ orderStatus: 'Rejected' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'orders.rejected.count'() {
        return OrdersCollection.find({ orderStatus: 'Rejected' }).count();
    }

});
