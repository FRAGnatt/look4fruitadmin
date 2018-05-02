import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { FoodRobotDB } from './../../lib/collections/FoodRobotDB.js';
import moment from 'moment';

export default class FoodRobot {
    static refreshPrice() {
        // let result = FoodRobotDB.find({}).fetch();
        // result.forEach(res => {
        //     FoodRobotDB.remove(res._id);
        // });
        let date = new Date();
        Meteor.call('parser.foodrobot', {}, (err, res) => {
            if (res) {
                //todo разбраться с сортировкой
                let lastRecord = FoodRobotDB.findOne({}, {'sort':{date:1}});
                console.log(res);
                res.forEach(doc => {
                    if (!lastRecord || !lastRecord.date || moment(date).format('DD-MM-YYYY') != moment(lastRecord.date).format('DD-MM-YYYY')) {
                        doc.date = date;
                        // FoodRobotDB.insert(doc);
                    }
                });
            }
        });
    }

    static getLastDump() {
        let lastRecord = FoodRobotDB.find({}, {'sort':{date:1}});
        if (lastRecord) {
            return FoodRobotDB.find({date: {
                $gte: moment(lastRecord.date).startOf('day').toDate(),
                $lt: moment(lastRecord.date).endOf('day').toDate()}
            }).fetch();
        }

        return FoodRobotDB.find({}).fetch();
    }
}
