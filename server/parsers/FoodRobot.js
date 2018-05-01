export default class FoodRobot {
    constructor() {
        this.cheerio = require('cheerio');
    }
    parse() {
        let fruitPrice = [];

        let parser = (page, resolve) => {
            const result = HTTP.call('GET', 'https://foodrobot.ru/catalog/frukty?page=' + page, {}, (err, res) => {
                const $ = this.cheerio.load(res.content);


                let pageCount = $('.pagination li').length;
                $('.fr_catalog__item').each(function () {
                    let priceRegExp = /([0-9,.]+)/gm;

                    let $this = $(this);
                    let title = $this.find('.fr_row-card__name a').text();
                    let regExpResult = priceRegExp.exec($this.find('.fr_cost').text());

                    let price = regExpResult[0];

                    let url = 'https://foodrobot.ru' + $this.find('.fr_row-card__name a').attr('href');
                    fruitPrice.push({'title': title, 'price': price, 'url': url, 'service': 'FoodRobot'});
                });

                if (pageCount - 2 >= page + 1) {
                    parser(page + 1, resolve);
                } else {
                    resolve(fruitPrice)
                }
            });
        };

        return new Promise((resolve, reject) => {
            parser(1, resolve)
        });
    }
}
