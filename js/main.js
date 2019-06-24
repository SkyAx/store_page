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

let Card = function (title, image, description, price) {
    this.title = new CardTitle(title, 'item-name uk-card-title');
    this.image = new CardImage('item-image', image);
    this.description = new Text(description, 'item-description');
    this.price = new Text(price, 'item-price uk-text-warning');
    this.cardButton = new CardButton('Заказать');
    this.cardCounter = new CardCounter();
    return $('<li/>')
        .addClass('uk-card uk-card-default catalog-item')
        .append($('<div/>')
            .addClass('uk-card-media-top')
            .append(this.image)
        )
        .append($('<div/>')
            .addClass('uk-card-body')
            .append(this.title)
            .append(this.description)
            .append(this.price)
            .append($('<div/>')
                .addClass('order-container')
                .append(this.cardButton)
                .append(this.cardCounter)))
};

let CardImage = function (classNames, src, alt) {
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

let CardButton = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || 'uk-button uk-button-default';
    return $('<button/>')
        .addClass(this.classNames)
        .text(this.text);
};

let CardTitle = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || 'uk-card-title';
    return $('<h3/>')
        .text(this.text)
        .addClass(this.classNames);
};

let Text = function (text, classNames) {
    this.text = text;
    this.classNames = classNames;
    return $('<p/>')
        .text(this.text)
        .addClass(this.classNames);
};

let CardCounterInput = function (val, placeholder, type, classNames) {
    this.className = classNames || 'uk-input uk-form-width-xsmall order-counter-input';
    this.type = type || 'text';
    this.val = val;
    this.placeholder = placeholder;
    return $('<input/>')
        .addClass(this.className)
        .attr({
            type: this.type,
            placeholder: this.placeholder
        })
        .val(this.val);
};

let CardCounter = function (counterStyles, inputStyles) {
    this.counterStyles = counterStyles || 'counter-container';
    this.inputStyles = inputStyles;
    this.counterInput = new CardCounterInput(1, 1);
    this.incr = new CardButton('+', 'uk-button uk-button-default order-counter-plus');
    this.decr = new CardButton('-', 'uk-button uk-button-default order-counter-minus');
    this.initEvents();
    return $('<div/>')
        .addClass(this.counterStyles)
        .append(this.counterInput)
        .append(this.incr)
        .append(this.decr);
};

CardCounter.prototype.isEmptyCounter = function () {
    return parseInt($(this.counterInput).val()) === 1;
};

CardCounter.prototype.getCountValue = function () {
    return parseInt($(this.counterInput).val());
};

CardCounter.prototype.setCountValue = function (val) {
    return $(this.counterInput).val(val);
};

CardCounter.prototype.initEvents = function () {
    $(this.incr).on('click', () => {
        this.setCountValue(this.getCountValue() + 1);
    });

    $(this.decr).on('click', () => {
        if (this.isEmptyCounter()) {
            this.setCountValue(1);
        } else {
            this.setCountValue(this.getCountValue() - 1);
        }
    });

    $(this.counterInput).on('change', () => {
        if (!$(this.counterInput).val()) {
            this.setCountValue(1);
        }
        this.setCountValue(this.getCountValue());
    });
};

window.onload = function () {
    products.forEach(function (product) {
        $('#product-list').append(new Card(product.title, product.image, product.description, product.price));
    })
};
