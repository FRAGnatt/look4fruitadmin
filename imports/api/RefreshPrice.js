import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import FoodRobot from './FoodRobot';

export default class RefreshPrice {
    static SERVICES = {
        "foodrobot": FoodRobot.refreshPrice
    };
    
    static refresh(service) {
        return service();
    }
}
