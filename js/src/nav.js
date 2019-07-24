let Nav = function (items) {
    this.$items = items.map((el) => {
        return new NavItem(el);
    });
    this.$logo = $('<a/>')
        .append(new Image('logo', '/img/logo.png', 'Лого'));
    this.$cart = new Cart('Корзина', 'modal-example', $('<div>', {'class': 'cart-container'}));
    this.$template = $('<nav/>')
        .attr('uk-navbar', '')
        .addClass('uk-navbar-container uk-navbar-transparent uk-container')
        .append(new List('', 'uk-navbar-nav')
            .append(this.$logo)
            .append(this.$items))
        .append(this.$cart);
    this.findModalOpenBtn(this.$items);

    this.initEvents();
    return this.$template;
};

Nav.prototype = {
    initEvents : function () {
        this.$openCartBtn.on('click', (e) => {
            e.preventDefault();
            window.cart.$itemList.children().remove();
            $.ajax({
                method: 'GET',
                url: '/getProducts',
                success: (res) => {
                    if(res.length){
                        res.forEach((item) => {
                            window.cart.$itemList.append(new CartItem(item));
                        })
                    } else {
                        window.cart.$itemList.append(new Paragraph('Ваша корзина пуста'));
                    }
                }
            })
        });
    },
    findModalOpenBtn : function (arr) {
        arr.forEach((el) => {
            if ($(el).find('a').attr('href').indexOf('modal') !== -1) {
                this.$openCartBtn = $(el).find('a');
            }
        });
    },
};

let NavItem = function (el) {
    this.text = el.text;
    this.address = el.address;
    this.className = el.className || '';
    this.$wrapper = el.wrapper || null;
    this.specAttr = el.specAttr;
    this.$template = $('<a/>')
        .attr({
            'href': this.address,
            [this.specAttr]: ''
        })
        .text(this.text)
        .addClass(this.className);
    if (this.$wrapper) {
        return $(`<${this.$wrapper}/>`)
            .append(this.$template)
    } else {
        return this.$template;
    }
};
