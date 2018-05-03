import React, { Component } from 'react';

import './TableFruitFoodRobot.less'
import FoodRobot from '../../../../api/FoodRobot.js'
import { withTracker } from 'meteor/react-meteor-data';

class TableFruitFoodRobot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPrice: null
        };
    }

    renderItems () {
        return this.props.itemsPrice.map((item, i) => (
            <tr key={i}>
                <td>{item.title}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.service}</td>
                <td><a href={item.url}>{item.url}</a></td>
            </tr>
        ));
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>Название Раздела</td>
                        <td>Наименование</td>
                        <td>Стоимость за КГ</td>
                        <td>Наименование Магазина</td>
                        <td>Ссылка</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}

export default withTracker(() => {
    return {
        itemsPrice: FoodRobot.getLastDump()
    };
})(TableFruitFoodRobot);