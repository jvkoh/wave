define(function() {
    return {
        extend: function extend() {
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                for (var property in obj) {
                    if (property) {
                        this[property] = obj[property];
                    }
                }
            }

            return this;
        },

        compile: function compile(objects) {
            var compiled = {};

            for (var i = 0; i < objects.length; i++) {
                var obj = objects[i];
                for (var property in obj) {
                    if (property) {
                        compiled[property] = obj[property];
                    }
                }
            }

            return compiled;
        }
    };
});
