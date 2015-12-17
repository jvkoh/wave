define(['js/DrawBase'], function(DrawBase) {
    return DrawBase.extendClass({
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
    });
});
