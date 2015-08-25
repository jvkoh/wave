define(['js/Static', 'js/DrawBase'], function(Static, DrawBase) {
    return function Circle() {
        return DrawBase({
            drawShape: function drawShape() {
                var context = this.world.context;

                if (this.fill) {
                    context.beginPath();
                    context.arc(
                        this.center[0],
                        this.center[1],
                        this.radius,
                        0, (Math.PI * 2)
                    );
                    context.fill();

                } else {
                    context.beginPath();
                    context.arc(
                        this.center[0],
                        this.center[1],
                        this.radius,
                        0, (Math.PI * 2)
                    );
                    context.stroke();
                }
            }
        }, Static.compile(arguments));
    };
});
