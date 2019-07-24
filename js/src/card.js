let Card = function (product) {
    let {title, image, description, price, id} = product;
    this.$title = new Heading(3, title, 'item-name uk-card-title');
    this.$image = new Image('item-image', image);
    this.$description = new Paragraph(description, 'item-description');
    this.$price = new Paragraph(price, 'item-price uk-text-warning');
    this.$cardButton = new Button('Заказать');
    this.$cardCounter = new Counter().template;
    this.$template = $('<li/>')
        .attr('data-product-id', id)
        .addClass('uk-card uk-card-default catalog-item')
        .append($('<div/>')
            .addClass('uk-card-media-top')
            .append(this.$image)
        )
        .append($('<div/>')
            .addClass('uk-card-body')
            .append(this.$title)
            .append(this.$description)
            .append(this.$price)
            .append($('<div/>')
                .addClass('order-container')
                .append(this.$cardButton)
                .append(this.$cardCounter)));

    this.initEvents();
    return this.$template;
};

Card.prototype = {
    initEvents: function () {
        $(this.$cardButton).on('click', () => {
            $.ajax({
                method: 'POST',
                url: '/addProduct',
                dataType: 'json',
                data: {
                    productTitle: this.$title.text(),
                    productCount: this.$cardCounter.find('input').val(),
                    productPrice: this.$price.text(),
                    productImage: this.$image.attr('src'),
                    productId: this.$template.data('product-id')
                },
                success: (res) => {
                    this.showResponseText(res);
                },
                error: (res) => {
                    this.showResponseText(res);
                }
            })
        });
    },
    showResponseText: function (res) {
        if(res.responseJSON){
            this.$template.append(
                `<div class="uk-alert-danger" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>${res.responseJSON.error}</p>
                </div>`)
        } else {
            this.$template.append(
                `<div class="uk-alert-success" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>Ваш товар добавлен в корзину</p>
            </div>`)
        }
    }
};
