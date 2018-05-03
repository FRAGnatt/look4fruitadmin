import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { PerekrestokDB } from './../../lib/collections/PerekrestokDB.js';
import moment from 'moment';

//todo Спросить у Коли как решить вопрос с копипасты FoodRobot
export default class Perekrestok {
    static refreshPrice() {
        // let result = PerekrestokDB.find({}).fetch();
        // result.forEach(res => {
        //     PerekrestokDB.remove(res._id);
        // });
        let date = new Date();
        Meteor.call('parser.perekrestok', {}, (err, res) => {
            if (res) {
                console.log('res', res);
                //todo разбраться с сортировкой
                let lastRecord = PerekrestokDB.findOne({}, {'sort':{date: -1}});
                res.forEach(doc => {
                    if (!lastRecord || !lastRecord.date || moment(date).format('DD-MM-YYYY') != moment(lastRecord.date).format('DD-MM-YYYY')) {
                        doc.date = date;
                        PerekrestokDB.insert(doc);
                    }
                });
            }
        });
    }

    static getLastDump() {
        let lastRecord = PerekrestokDB.find({}, {'sort':{date: -1}});
        if (lastRecord) {
            return PerekrestokDB.find({date: {
                $gte: moment(lastRecord.date).startOf('day').toDate(),
                $lt: moment(lastRecord.date).endOf('day').toDate()}
            }, {sort: {'title': 1}}).fetch();
        }

        return PerekrestokDB.find({}).fetch();
    }
}
