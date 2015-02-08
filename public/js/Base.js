define(['js/Static'], function(Static) {
    return function Base() {
        var base = Static.extend.apply({
            callIf: function callIf(func) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (func) {
                    func.apply(this, args);
                }
            }
        }, arguments);

        base.callIf(base.init);

        if (base.defaults) {
            Static.extend.apply(base, base.defaults);
        }

        return base;
    };
});
