let Modal = function (heading, id, wrapper) {
    this.heading = heading;
    this.id = id;
    this.wrapper = wrapper;
    this.template =  $('<div/>')
        .attr({
            'id': this.id,
            'uk-modal' : ''
        })
        .append($('<div/>')
            .addClass('uk-modal-dialog uk-modal-body')
            .append(new Heading(2, this.heading, 'uk-modal-title'))
            .append(new Paragraph(new Button('Cancel', 'uk-button uk-button-default uk-modal-close'))));
    if(this.wrapper) {
        return $(this.wrapper)
            .append(this.template);
    } else {
        return this.template;
    }
};
