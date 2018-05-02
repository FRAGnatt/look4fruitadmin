import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import FoodRobot from './FoodRobot';
import Perekrestok from './Perekrestok';

export default class RefreshPrice {
    static SERVICES = {
        "foodrobot": FoodRobot.refreshPrice,
        "perekrestok": Perekrestok.refreshPrice
    };
    
    static refresh(service) {
        return service();
    }
}
