import { Mongo } from 'meteor/mongo';

export const PerekrestokDB = new Mongo.Collection('perekrestok_price');

PerekrestokDB.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
