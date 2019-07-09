let CardItem = function(image, title, count) {
    this.removeButton = new Button('Del');
    this.template = $('<div/>')
        .addClass('uk-card uk-card-default')
        .append(
            $('<div/>')
                .addClass('uk-grid-small uk-flex-middle')
                .attr('uk-grid', '')
                .append(
                    $('<div/>')
                        .addClass('uk-width-auto')
                        .append(
                            new Image('uk-border-circle', image)
                                .attr({
                                    width : "40",
                                    height: "40"
                                })
                        ))
                .append($('<div/>')
                    .addClass('uk-width-expand')
                    .append(new Heading(3, title, 'uk-card-title uk-margin-remove-bottom'))
                    .append(new Paragraph(count))

                    .append(this.removeButton)
                ));
    this.initEvents();
    return this.template;
};

CardItem.prototype = {
    initEvents: function () {
        this.removeButton.on('click', (e) => {
            e.preventDefault();
            this.removeButton.closest('.uk-card.uk-card-default').remove();
        })
    }
};
