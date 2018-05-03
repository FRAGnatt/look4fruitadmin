//todo Как писать тесты с помощью Mocha ?
export default class Perekrestok {
    constructor() {
        this.cheerio = require('cheerio');
    }
    parse() {
        let fruitPrice = [];

        let parser = (res, page, requester, resolve) => {
            const $ = this.cheerio.load(res.content);

            let pageCount = $('.js-list-total .js-plural').data('count') > 24 ? $('.xf-paginator__items a').length : 1;
            $('.catalog__items-wrap .xf-catalog__item').each(function () {
                let $this = $(this);
                let title = $this.find('.xf-product-title a').text().trim();
                let price = $this.find('.xf-product-cost__current').attr('data-cost');
                if (!price) {
                    price = 0.00;
                }

                let url = 'https://www.perekrestok.ru' + $this.find('.xf-product-title a').attr('href');

                let accurateRegExp = /\/кг/gm;

                let inaccurate = !accurateRegExp.test($this.find('.xf-price__penny').text());
                fruitPrice.push({'title': title, 'price': price, 'url': url, 'service': 'Perekrestok', 'inaccurate': inaccurate});
            });


            if (pageCount - 2 >= page + 1) {
                console.log('pageCount', pageCount)
                console.log('page', page)
                console.log("pageCount - 2 >= page + 1", pageCount - 2 >= page + 1);
                requester(page + 1, resolve);
            } else {
                resolve(fruitPrice)
            }
        };

        let requesterFruit = (page, resolve) => {
            HTTP.call('GET', 'https://www.perekrestok.ru/catalog/ovoschi-frukty-griby/frukty?page=' + page, {}, (err, res) => {
                parser(res, page, requesterFruit, resolve)
            });
        };

        let promiseFruit = new Promise((resolve, reject) => {
            requesterFruit(1, resolve);
        });

        let requesterBerry = (page, resolve) => {
            HTTP.call('GET', 'https://www.perekrestok.ru/catalog/ovoschi-frukty-griby/yagody?page=' + page, {}, (err, res) => {
                parser(res, page, requesterBerry, resolve)
            });
        };

        let promiseBerry = new Promise((resolve, reject) => {
            requesterBerry(1, resolve);
        });

        return Promise.all([promiseBerry,promiseFruit]).then((result) => {
            return fruitPrice;
        });
    }
}
