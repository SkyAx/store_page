let products = [
    {
        title: 'Техас',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/12/12/pepperoni_i_tomaty_small.png',
        description: 'Лук, Томатный соус Domino\'s, Кукуруза, Ветчина, Сыр моцарелла, Шампиньоны',
        price: '9.9р'
    },
    {
        title: 'Гавайская',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/09/12/gavayskaya.png',
        description: 'Сыр моцарелла, Курица, Томатный соус Domino\'s, Ананас',
        price: '9.9р'
    },
    {
        title: 'Пепперони и томаты',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/12/12/pepperoni_i_tomaty_small.png',
        description: 'Соус барбекю, Пепперони, Сыр моцарелла, Томаты',
        price: '9.9р'
    },
    {
        title: 'Овощная',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/09/12/ovoshchnaya.png',
        description: 'Сладкий перец, Сыр моцарелла, Лук, Томаты, Оливки, Шампиньоны, Томатный соус Domino\'s',
        price: '9.9р'
    },
];

let drinks = [
    {
        title: 'Coca-Cola, 0.5 л',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/11/19/%D0%BA%D0%BE%D0%BB%D0%B0_05%D0%BB_640%D1%85441_%D0%BF%D1%80%D0%BE%D0%B7%D1%80_19.11.18.png',
        description: '0.5 Л',
        price: '2.1р'
    },
    {
        title: 'Coca-Cola, 1 л',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/11/19/%D0%BA%D0%BE%D0%BB%D0%B0_1%D0%BB_640%D1%85441_%D0%BF%D1%80%D0%BE%D0%B7%D1%80_19.11.18.png',
        description: '1 Л',
        price: '2.8р'
    },
    {
        title: 'Sprite',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/03/31/%D1%81%D0%BF%D1%80%D0%B0%D0%B9%D1%82_1%D0%BB_640%D1%85441_%D0%BF%D1%80%D0%BE%D0%B7%D1%80.png',
        description: '1 Л',
        price: '2.8р'
    },
    {
        title: 'Fanta',
        image: 'https://images.dominos.by/media/dominos/osg/api/2017/03/15/F_Orange_1L.png',
        description: '1 Л',
        price: '2.8р'
    },
    {
        title: 'RICH Апельсиновый',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/03/31/%D1%81%D0%BE%D0%BA_%D0%A0%D1%87%D0%B8_%D0%90%D0%BF%D0%B5%D0%BB%D1%8C%D1%81%D0%B8%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9_1%D0%BB.png',
        description: 'Натуральный апельсиновый сок. 1 Л',
        price: '3.7р'
    },
    {
        title: 'RICH Яблочный',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/03/31/%D0%A1%D0%BE%D0%BA_%D1%80%D0%B8%D1%87_%D1%8F%D0%B1%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9_1%D0%BB.png',
        description: 'Натуральный яблочный сок. 1 Л',
        price: '3.5р'
    },
    {
        title: 'Bonaqua',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/11/19/%D0%B1%D0%BE%D0%BD%D0%B0%D0%BA%D0%B2%D0%B0_%D0%BD-%D0%B3%D0%B0%D0%B7_05%D0%BB_640%D1%85441_%D0%BF%D1%80%D0%BE%D0%B7%D1%80_19.11.18.png',
        description: '0.5 Л',
        price: '1.4р'
    }
];

let Image = function (classNames, src, alt) {
    this.classNames = classNames;
    this.src = src;
    this.alt = alt || 'Broken image';
    return $('<img/>')
        .addClass(this.classNames)
        .attr({
            'src': this.src,
            'alt': this.alt
        });
};

let Button = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || 'uk-button uk-button-default';
    return $('<button/>')
        .addClass(this.classNames)
        .text(this.text);
};

let Heading = function (level, text, classNames) {
    this.text = text;
    this.level = level;
    this.classNames = classNames || 'uk-card-title';
    return $(`<h${this.level}/>`)
        .text(this.text)
        .addClass(this.classNames);
};

let Paragraph = function (text, classNames) {
    this.text = text;
    this.classNames = classNames;
    return $('<p/>')
        .html(this.text)
        .addClass(this.classNames);
};

let Input = function (val, placeholder, classNames,  type) {
    this.val = val;
    this.placeholder = placeholder;
    this.className = classNames || 'uk-input';
    this.type = type || 'text';
    return $('<input/>')
        .addClass(this.className)
        .attr({
            type: this.type,
            placeholder: this.placeholder
        })
        .val(this.val);
};

window.onload = function () {
    products.forEach(function (product) {
        $('.pizza-list').append(new Card(product.title, product.image, product.description, product.price));
    });

    drinks.forEach(function (drink) {
        $('.drinks-list').append(new Card(drink.title, drink.image, drink.description, drink.price));
    });

    $('#nav-container').append(new Nav([
        {
            text: 'Главная',
            address: '/',
            className: '',
            wrapper: 'li',
        },
        {
            text: 'О нас',
            address: '/about',
            className: '',
            wrapper: 'li',
        },
        {
            text: 'Корзина',
            address: '#modal-example',
            className: 'uk-text-danger',
            wrapper: 'li',
            specAttr: 'uk-toggle'
        }
    ]));
};
