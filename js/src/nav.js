let Nav = function (items) {
    this.items = items.map((el) => {
        return new NavItem(el)
    });
    return $('<nav/>')
        .attr('uk-navbar', '')
        .addClass('uk-navbar-container uk-navbar-transparent')
        .append($('<ul/>')
            .addClass('uk-navbar-nav')
            .append(this.items))
        .append(new Modal('Корзина', 'modal-example', $('<div>', { 'class': 'cart-container' })))
};

let NavItem = function (el) {
    this.text = el.text;
    this.address = el.address;
    this.wrapper = el.wrapper || null;
    this.className = el.className || '';
    this.specAttr = el.specAttr;
    this.itemTemplate = $('<a/>')
        .attr({
            'href': this.address,
            [this.specAttr] : ''
        })
        .text(this.text)
        .addClass(this.className);
    if (this.wrapper) {
        return $(`<${this.wrapper}/>`)
            .append(this.itemTemplate)
    } else {
        return this.itemTemplate
    }
};
