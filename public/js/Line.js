define(['js/Static', 'js/DrawBase'], function(Static, DrawBase) {
    return function Line() {
        return DrawBase({
            init: function init() {
                this.fill = false;
            },

            drawShape: function drawShape() {
                var context = this.world.context;
                context.beginPath();
                context.moveTo(this.start[0], this.start[1]);
                context.lineTo(this.end[0], this.end[1]);
                context.stroke();
            }
        }, Static.compile(arguments));
    };
});
