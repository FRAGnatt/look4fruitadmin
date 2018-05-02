import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import TableFruitBaseOrder from '../TableFruitBaseOrder.js';
import RefreshPrice from '../../api/RefreshPrice.js';
import FoodRobot from '../../api/FoodRobot.js'

import { FoodRobotDB } from '../../../lib/collections/FoodRobotDB.js';




class PriceDiffPage extends Component {
    updatePrice() {
        console.log('popal');
        RefreshPrice.refresh(RefreshPrice.SERVICES.foodrobot)
    }



    render() {
        var test = [{'title': 'title', 'price': 'price', 'url': 'url', 'service': 'FoodRobot'},{'title': 'title', 'price': 'price', 'url': 'url', 'service': 'FoodRobot'}]
        return (
            <div>
                <div className="row">
                    <div className="s12">
                        <ul className="tabs">
                            <li className="tab col s3"><a className="active" href="#test1">Цены FoodRobot</a></li>
                            <li className="tab col s3"><a href="#test1">Цены Перекресток</a></li>
                            <li className="tab col s3 disabled"><a href="#test4">Объедененные цены</a></li>
                        </ul>
                    </div>
                </div>
                <a className="waves-effect waves-light btn" onClick={this.updatePrice}>Обновить цены</a>

                <TableFruitBaseOrder items={this.props.foodRobotPrice} />
            </div>
        )
    }

}

export default withTracker(() => {
    return {
        foodRobotPrice: FoodRobot.getLastDump()
    };
})(PriceDiffPage);