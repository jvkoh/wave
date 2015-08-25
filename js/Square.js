define(['js/Static', 'js/DrawBase'], function(Static, DrawBase) {
    return function Square() {
        return DrawBase({
            drawShape: function drawShape() {
                if (this.fill) {
                    this.world.context.fillRect(
                        this.start[0], this.start[1],
                        this.end[0], this.end[1]
                    );

                } else {
                    this.world.context.strokeRect(
                        this.start[0], this.start[1],
                        this.end[0], this.end[1]
                    );
                }
            }
        }, Static.compile(arguments));
    };
});
