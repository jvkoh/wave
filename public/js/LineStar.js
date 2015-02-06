define(['js/Static', 'js/IterDraw', 'js/Line'], function(Static, IterDraw, Line) {
    return function LineStar() {
        return IterDraw({
            init: function init() {
                this.objects = [];
                var angle_increment = (2 * Math.PI / this.points);
                for (var i = 0; i < this.points; i++) {
                    this.objects.push(Line({
                        thickness: this.thickness,
                        color: this.color,
                        start: this.center,
                        angle: angle_increment * i
                    }));
                }
            },

            updateLines: function updateLines(delta) {
                var updateLine = function updateLine(delta, line) {
                    line.angle += (2 * Math.PI) * this.speed * delta / 1000; // speed is in full rotations per second
                    line.end = [
                        this.center[0] + (this.radius * Math.cos(line.angle)),
                        this.center[1] + (this.radius * Math.sin(line.angle))
                    ];
                };

                this.objects.forEach(updateLine.bind(this, delta));
            },

            preDraw: function preDraw(delta) {
                this.updateLines(delta);
            }
        }, Static.compile(arguments));
    };
});
