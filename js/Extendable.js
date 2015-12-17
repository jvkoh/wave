define([], function() {

    /**
     * Basic object extension function
     */
    function extendObject() {
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];

            if (typeof obj !== 'object' &&
                typeof obj !== 'function') {
                continue;
            }

            if (Array.isArray(obj)) {
                extendObject.apply(this, obj);
            } else {
                for (var property in obj) {
                    if (property) {
                        this[property] = obj[property];
                    }
                }
            }
        }
    }

    /**
     * Bottom level extendable class
     */
    var Extendable = function Extendable(options) {
        this.extend(options);
        this.callIf(this.init);
    };

    /**
     * Base extendable functions
     */
    Extendable.prototype.callIf = function (func) {
        if (func) {
            var args = Array.prototype.slice.call(arguments, 1);
            func.apply(this, args);
        }
    };
    Extendable.prototype.extend = extendObject;

    /**
     * The logic for extending a class
     */
    Extendable.extendClass = function extendClass() {
        var extended = function (options) {
            this.extend(options);
            this.callIf(this.init);
        };

        extendObject.call(extended, this);
        extendObject.call(extended.prototype, this.prototype);

        for (var i = 0; i < arguments.length; i++) {
            extendObject.call(extended.prototype, arguments[i]);
        }

        return extended;
    };

    return Extendable;

});
