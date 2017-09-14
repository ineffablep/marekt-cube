import { Mongo } from 'meteor/mongo';
export const OrdersCollection = new Mongo.Collection('orders');
export const ProductsCollection = new Mongo.Collection('products');

