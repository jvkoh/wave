define(['js/Static', 'js/Base'], function(Static, Base) {
    return function Square() {
        return Base({
            draw: function draw() {
                var context = this.world.context;
                context.fillStyle = this.color;
                context.fillRect(
                    this.start[0], this.start[1],
                    this.end[0], this.end[1]
                );
            }
        }, Static.compile(arguments));
    };
});
