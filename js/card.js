let Card = function (title, image, description, price) {
    this.title = new Heading(3 ,title, 'item-name uk-card-title');
    this.image = new Image('item-image', image);
    this.description = new Paragraph(description, 'item-description');
    this.price = new Paragraph(price, 'item-price uk-text-warning');
    this.cardButton = new Button('Заказать');
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

let CardCounter = function (counterStyles, inputStyles) {
    this.counterStyles = counterStyles || 'counter-container';
    this.inputStyles = inputStyles;
    this.counterInput = new Input(1, 1, 'uk-input uk-form-width-xsmall order-counter-input');
    this.incr = new Button('+', 'uk-button uk-button-default order-counter-plus');
    this.decr = new Button('-', 'uk-button uk-button-default order-counter-minus');
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

