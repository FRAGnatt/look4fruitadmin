import React, { Component } from 'react';

import './styles/TableFruitBaseOrder.less'

export default class TableFruitBaseOrder extends Component {
    constructor(props) {
        super(props);
        console.log("PPPPROP");
        this.state = {
            items: null
        };
    }

    renderItems () {
        return this.props.items.map((item, i) => (
            <tr key={i}>
                <td>{item.title}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.service}</td>
                <td>{item.url}</td>
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