import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { FoodRobotDB } from './collections/FoodRobotDB.js';

export default class RefreshPrice {
    static SERVICES = {
        "foodrobot": RefreshPrice.foodrobotParse
    };
    
    static refresh(service) {
        console.log('test2');
        return service();
    }
    
    static foodrobotParse() {

        let res = Meteor.call('parser.foodrobot', {}, (err, res) => {
            if (res) {
                // FoodRobotDB.remove({});
                res.forEach(doc => {
                    FoodRobotDB.insert(doc);
                });
            }
        });
    }
}
