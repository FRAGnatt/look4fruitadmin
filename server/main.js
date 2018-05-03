import { Meteor } from 'meteor/meteor';
import FoodRobot from './parsers/FoodRobot.js'
import Perekrestok from './parsers/Perekrestok.js'


Meteor.startup(() => {
    //todo Как правильно писать тесты на парсилки и тестировать + дебажить server-side
    Meteor.methods({
        'parser.foodrobot'() {
            let parser = new FoodRobot();
            return parser.parse().then((result) => {
                return result;
            })
        },
        'parser.perekrestok'() {
            let parser = new Perekrestok();
            return parser.parse().then((result) => {
                return result;
            })
        }
    });
});

