let CartItem = function (item) {
    let {productImage, productTitle, productCount, productId} = item;
    this.$counter = new Counter(productCount);
    this.$counterTemplate = this.$counter.template;
    this.$counterDecr = this.$counter.decr;
    this.$counterIncr = this.$counter.incr;
    this.$removeButton = new Button('Del', 'uk-button-danger remove-item');
    this.$template = $('<li/>')
        .attr('data-product-id', productId)
        .addClass('uk-card uk-card-default')
        .append(
            $('<div/>')
                .addClass('uk-grid-small uk-flex-middle')
                .attr('uk-grid', '')
                .append(
                    $('<div/>')
                        .addClass('uk-width-auto')
                        .append(
                            new Image('uk-border-circle', productImage)
                                .attr({
                                    width: "40",
                                    height: "40"
                                })
                        ))
                .append($('<div/>')
                    .addClass('uk-width-expand')
                    .append(new Heading(5, productTitle, 'uk-card-title uk-margin-remove-bottom'))
                    .append(this.$counterTemplate)
                    .append(this.$removeButton)
                ));

    this.initEvents();
    return this.$template;
};

CartItem.prototype = {
    initEvents: function () {
        this.$removeButton.on('click', (e) => {
            e.preventDefault();
            let productId = $(e.target).closest('li').data('product-id');
            $.ajax({
                method: "POST",
                url: '/deleteProduct',
                dataType: 'json',
                data: {
                    productId: productId
                },
                success: () => {
                    $(e.target).closest('li').remove();
                    if($('#item-list').children()) {
                        window.cart.$itemList.append(new Paragraph('Ваша корзина пуста'));
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            })
        });

        this.$counterDecr.on('click', (e) => {
            let productId = $(e.target).closest('li').data('product-id');
            $.ajax({
                method: "POST",
                url: '/decreaseCountOfProduct',
                dataType: 'json',
                data: {
                    productId: productId
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });

        this.$counterIncr.on('click', (e) => {
            let productId = $(e.target).closest('li').data('product-id');
            $.ajax({
                method: "POST",
                url: '/increaseCountOfProduct',
                dataType: 'json',
                data: {
                    productId: productId
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    }
};
