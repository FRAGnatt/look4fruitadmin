import React, { Component } from 'react';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom'

import TableFruitFoodRobot from './components/tables/TableFruitFoodRobot.js';
import TableFruitPerekrestok from './components/tables/TableFruitPerekrestok.js';
import TableFruitMerged from './components/tables/TableFruitMerged.js';
import RefreshPrice from '../../api/RefreshPrice.js';






export default class PriceDiffPage extends Component {
    constructor(props) {
        super(props);
        //todo Как заинициализировать https://materializecss.com/tabs.html
        // В App.js я не подключил .js, потому что он требует подключить овердофига зависимостей.
    }

    updatePrice() {
        RefreshPrice.refresh(RefreshPrice.SERVICES.foodrobot);
        RefreshPrice.refresh(RefreshPrice.SERVICES.perekrestok);
    }

    //todo Попросить помощи Коли о правильной организации роутера
    //todo Попросить помощи Коли о способах disable кнопки после onClick
    render() {
        return (
            <div>
                <div className="row">
                    <div className="s12">
                        <ul className="tabs">
                            <li className="tab col s3">
                                <NavLink to="/client/table/foodrobot" activeClassName="active">Цены FoodRobot</NavLink>
                            </li>
                            <li className="tab col s3">
                                <NavLink to="/client/table/perekrestok" activeClassName="active">Цены Перекресток</NavLink>
                            </li>
                            <li className="tab col s3">
                                <NavLink to="/client/table/merged" activeClassName="active">Цены Перекресток</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <a className="waves-effect waves-light btn" onClick={this.updatePrice}>Обновить цены</a>
                <Route path="/client/table/foodrobot" component={TableFruitFoodRobot} />
                <Route path="/client/table/perekrestok" component={TableFruitPerekrestok} />
                <Route path="/client/table/merged" component={TableFruitMerged} />
            </div>
        )
    }
}