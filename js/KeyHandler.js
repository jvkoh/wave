define(['js/Extendable'], function(Extendable) {

    return Extendable.extendClass({
        onKey: function onKey(e) {
            if (e.defaultPrevented || !this.keys) {
                return;
            }

            if (this.keys[e.keyCode]) {
                this.keys[e.keyCode].call(this, e);
            } else {
                console.log(e.keyCode);
            }
        },

        init: function init() {
            window.addEventListener(
                'keydown', this.onKey.bind(this), false);
        }

    });

});
