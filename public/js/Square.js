define(['js/Static', 'js/DrawBase'], function(Static, DrawBase) {
    return function Square() {
        return DrawBase({
            drawShape: function drawShape() {
                //Optionally draw a square based on a center and  radius (half of the length of one side).
                if (this.center) {
                  this.start = [this.center[0] - this.radius,
                    this.center[1] - this.radius];
                  // TODO: This is the width?
                  this.end = [this.radius * 2, this.radius * 2];
                }
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
