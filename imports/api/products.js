import { ProductsCollection } from './collections';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'products.count'() {
        return ProductsCollection.find().count();
    },
    'products.fetch'(skip, limit) {
        return ProductsCollection.find({}, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'products.pending'(skip, limit) {
        return ProductsCollection.find({ orderStatus: 'Pending' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'products.pending.count'() {
        return ProductsCollection.find({ orderStatus: 'Pending' }).count();
    },
    'products.approved'(skip, limit) {
        return ProductsCollection.find({ orderStatus: 'Approved' }, { sort: { createdDate: -1 }, skip: skip, limit: limit }).fetch();
    },
    'products.approved.count'() {
        return ProductsCollection.find({ orderStatus: 'Approved' }).count();
    }
});
