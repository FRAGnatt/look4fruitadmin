import { Meteor } from 'meteor/meteor';
import FoodRobot from './parsers/FoodRobot.js'


Meteor.startup(() => {
    Meteor.methods({
        'parser.foodrobot'() {
            let foodRobot = new FoodRobot();
            return foodRobot.parse().then((result) => {
                return result;
            })
        }
    });
});

