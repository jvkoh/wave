define(['js/Static', 'js/Base'], function(Static, Base) {
    return function Line() {
        return Base({
            draw: function draw() {
                var context = this.world.context;
                context.beginPath();
                context.lineWidth = this.thickness.toString();
                context.strokeStyle = this.color;
                context.moveTo(this.start[0], this.start[1]);
                context.lineTo(this.end[0], this.end[1]);
                context.stroke();
            }
        }, Static.compile(arguments));
    };
});
