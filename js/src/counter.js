let Counter = function (count, counterStyles) {
    this.count = count || 1;
    this.counterStyles = counterStyles || 'counter-container';
    this.$counterInput = new Input(this.count, 1, 'uk-input uk-form-width-xsmall order-counter-input');
    this.$incr = new Button('+', 'uk-button uk-button-default order-counter-plus');
    this.$decr = new Button('-', 'uk-button uk-button-default order-counter-minus');
    this.$template = $('<div/>')
        .addClass(this.counterStyles)
        .append(this.$counterInput)
        .append(this.$incr)
        .append(this.$decr);

    this.initEvents();
    return {
        template: this.$template,
        incr: this.$incr,
        decr: this.$decr
    };
};


Counter.prototype = {
    isEmptyCounter : function () {
        return parseInt(this.$counterInput.val()) === 1;
    },
    getCountValue : function () {
        return parseInt(this.$counterInput.val());
    },
    setCountValue : function (val) {
        return this.$counterInput.val(val);
    },
    initEvents : function () {
        this.$incr.on('click', () => {
            this.setCountValue(this.getCountValue() + 1);
        });

        this.$decr.on('click', () => {
            if (this.isEmptyCounter()) {
                this.setCountValue(1);
            } else {
                this.setCountValue(this.getCountValue() - 1);
            }
        });

        this.$counterInput.on('change', () => {
            if (!this.$counterInput.val()) {
                this.setCountValue(1);
            }
            this.setCountValue(this.getCountValue());
        });
    }
};
