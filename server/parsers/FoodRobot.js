import { HTTP } from 'meteor/http'

export default class FoodRobot {
    constructor() {
        this.cheerio = require('cheerio');
    }
    parse() {
        let fruitPrice = [];

        let parser = (res, page, requester, resolve) => {
            const $ = this.cheerio.load(res.content);

            let pageCount = $('.pagination li').length;
            $('.fr_catalog__item').each(function () {
                let priceRegExp = /([0-9,.]+)/gm;

                let $this = $(this);
                let title = $this.find('.fr_row-card__name a').text();
                let regExpResult = priceRegExp.exec($this.find('.fr_cost').text());

                let price = regExpResult[0];

                let url = 'https://foodrobot.ru' + $this.find('.fr_row-card__name a').attr('href');
                fruitPrice.push({'title': title, 'price': price, 'url': url, 'service': 'FoodRobot', 'inaccurate': false});
            });

            if (pageCount - 2 >= page + 1) {
                requester(page + 1, resolve);
            } else {
                resolve(fruitPrice);
            }
        };

        let requesterFruit = (page, resolve) => {
            HTTP.call('GET', 'https://foodrobot.ru/catalog/frukty?page=' + page, {}, (err, res) => {
                parser(res, page, requesterFruit, resolve)
            });
        };

        let requesterBerry = (page, resolve) => {
            HTTP.call('GET', 'https://foodrobot.ru/catalog/yagody?page=' + page, {}, (err, res) => {
                parser(res, page, requesterBerry, resolve)
            });
        };

        let promiseFruit = new Promise((resolve, reject) => {
            requesterFruit(1, resolve);
        });

        let promiseBerry = new Promise((resolve, reject) => {
            console.log('dva');
            requesterBerry(1, resolve);
        });


        return Promise.all([promiseBerry,promiseFruit]).then((result) => {
            return fruitPrice;
        });

    }
}
