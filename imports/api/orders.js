import { OrdersCollection } from './collections';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'orders.count'() {
        return OrdersCollection.find().count();
    },
    'orders.fetch'(skip, limit) {
        return OrdersCollection.find({}, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    }
});
