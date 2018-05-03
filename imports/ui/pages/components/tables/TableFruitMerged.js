import React, { Component } from 'react';

import './TableFruitFoodRobot.less'
import Perekrestok from '../../../../api/Perekrestok.js'
import FoodRobot from '../../../../api/FoodRobot.js'

import { withTracker } from 'meteor/react-meteor-data';

class TableFruitMerged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPrice: null,
            sortedPrice: null
        };
    }


    renderItems () {
        let sortedPrice = [];

        this.props.itemsPrice.map((itemBlock, i) => {
            itemBlock.map((item, i) => {
                //регулярка вырезает строку так, что остается первое слово
                let firstWord = item.title.replace(/[\ \-,].*/,'');
                if (!sortedPrice[firstWord]) {
                    sortedPrice[firstWord] = [];
                }

                sortedPrice[firstWord].push(item);
            })

        });


        let resultStr = [];


        for (let firstWord in sortedPrice) {
            let rowStr = [];
            sortedPrice[firstWord].map((item, i) => {
                rowStr.push((<tr key={firstWord + i} className={item.inaccurate ? 'red lighten-4' : ''}>
                    {
                        i == 0 && <td rowSpan={sortedPrice[firstWord].length}>{firstWord}</td>
                    }
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.service}</td>
                        <td><a href={item.url}>{item.url}</a></td>
                    </tr>));
            });

            resultStr.push((<tbody key={firstWord} className="group-elements">{rowStr}</tbody>))
        }

        return resultStr;
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
                {this.renderItems()}
            </table>
        );
    }
}

export default withTracker(() => {
    return {
        itemsPrice: [FoodRobot.getLastDump(), Perekrestok.getLastDump()]
    };
})(TableFruitMerged);