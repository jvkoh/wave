define(['js/Static', 'js/IterDraw', 'js/Line'], function(Static, IterDraw, Line) {
    return function Hexagon() {
        return IterDraw({
            init: function init() {
                this.points = [];

                for (var i = 0; i < 6; i++) {
                    this.points.push([]);
                }
            },

            updateLines: function updateLines(delta) {
                var x, y;
                var height = Math.sqrt(
                  Math.pow(this.radius, 2) - Math.pow(this.radius / 2, 2),
                  2);

                var setPoint = (function setPoint(pointIndex, x, y) {
                  this.points[pointIndex] = [x, y];
                }).bind(this);

                // Note: to avoid strange gaps where the lines meet up, we must
                // add a few pixels in certain places.
                // Start from ~1:00 and go clockwise.
                x = this.center[0] + (this.radius / 2);
                y = this.center[1] - height;
                setPoint(0, x, y);

                x = this.center[0] + this.radius;
                y = this.center[1];
                setPoint(1, x, y);

                x = this.center[0] + this.radius / 2;
                y = this.center[1] + height;
                setPoint(2, x, y);

                x = this.center[0] - this.radius / 2;
                y = this.center[1] + height;
                setPoint(3, x, y);

                x = this.center[0] - this.radius;
                y = this.center[1];
                setPoint(4, x, y);

                x = this.center[0] - this.radius / 2;
                y = this.center[1] - height;
                setPoint(5, x, y);

                // TODO: Factor this out somewhere. It just draws a filled polygon.
                var context = this.world.context;
                context.beginPath();
                context.moveTo(this.points[0][0], this.points[0][1]);
                context.strokeStyle = this.color;
                context.lineWidth = this.thickness.toString();
                for (var i = 1; i < this.points.length; i++) {
                    context.lineTo(this.points[i][0], this.points[i][1]);
                }
                context.stroke();
                context.fillStyle = this.color;
                context.fill();
            },

            preDraw: function preDraw(delta) {
                this.updateLines(delta);
            }
        }, Static.compile(arguments));
    };
});
