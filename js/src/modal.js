let Modal = function (heading, id, wrapper) {
    this.heading = heading;
    this.id = id;
    this.wrapper = wrapper;
    this.$itemList = $('<ul/>', {id: 'item-list'});
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
    window.modal = this;
    if(this.wrapper) {
        return $(this.wrapper)
            .append(this.template);
    } else {
        return this.template;
    }
};
