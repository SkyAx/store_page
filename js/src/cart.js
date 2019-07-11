let Cart = function (heading, id, wrapper) {
    this.heading = heading;
    this.id = id;
    this.items = [];
    this.$wrapper = wrapper;
    this.$itemList = new List('item-list');
    this.getItemList = () => this.$itemList;
    this.template =  $('<div/>')
        .attr({
            'id': this.id,
            'uk-modal' : ''
        })
        .append($('<div/>')
            .addClass('uk-modal-dialog uk-modal-body')
            .append(new Heading(2, this.heading, 'uk-modal-title'))
            .append(this.$itemList)
            .append(new Paragraph(new Button('Cancel', 'uk-button uk-button-default uk-modal-close'))));
    window.cart = this;

    console.log(this.items );
    if(this.$wrapper) {

        return $(this.$wrapper)
            .append(this.template);
    } else {
        return this.template;
    }
};

Cart.prototype.addItem = function(item) {
    this.items.push(item);
};

Cart.prototype.getIndexByKey = function(key) {
    let res = null;
    for (let i = 0; i < this.items.length; i++) {
        if(this.items[i].title === key) res = i;
    }
    return res;
};

Cart.prototype.removeItemByKey = function(key) {
    this.items.splice(key, 1);
};

Cart.prototype.updateCart = function () {
    this.$itemList.children().remove();
    this.items.forEach((el) => {
        this.$itemList.append(new CartItem(el.image, el.title, el.count));
    });
};
