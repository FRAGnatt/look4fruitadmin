import { Mongo } from 'meteor/mongo';

export const FoodRobotDB = new Mongo.Collection('foodrobot_price');

FoodRobotDB.allow({
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
