define(['js/IterDraw', 'js/Line'], function(IterDraw, Line) {
    return IterDraw.extendClass({
        init: function init() {
            this.objects = [];
            var angle_increment = (2 * Math.PI / this.points);
            for (var i = 0; i < this.points; i++) {
                this.objects.push(new Line({
                    thickness: this.thickness,
                    color: this.color,
                    start: this.center,
                    index: i,
                    angle: angle_increment * i
                }));
            }
        },

        updateLines: function updateLines(delta) {
            var updateLine = function updateLine(delta, line) {
                var r = this.data[line.index] / 128.0 * this.radius;
                line.end = [
                    this.center[0] + (r * Math.cos(line.angle)),
                    this.center[1] + (r * Math.sin(line.angle))
                ];
            };

            this.objects.forEach(updateLine.bind(this, delta));
        },

        preDraw: function preDraw(delta) {
            this.updateLines(delta);
        }
    });
});
