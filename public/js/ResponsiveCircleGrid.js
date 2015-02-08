define(['js/Static', 'js/IterDraw', 'js/Circle'], function(Static, IterDraw, Circle) {
    return function ResponsiveCircleGrid() {
        return IterDraw({
            init: function init() {
                this.objects = [];

                var x_inc = (this.end[0] - this.start[0]) / (this.cols - 1),
                    y_inc = (this.end[1] - this.start[1]) / (this.rows - 1);

                for (var y = 0; y < this.rows; y++) {
                    for (var x = 0; x < this.cols; x++) {
                        this.objects.push(Circle({
                            fill: this.fill,
                            thickness: this.thickness,
                            color: this.color,
                            center: [
                                this.start[0] + (x * x_inc),
                                this.start[1] + (y * y_inc),
                            ]
                        }));
                    }
                }
            },

            updateCircles: function updateCircles(delta) {
                if (!this.data) {
                    return;
                }

                var size = Math.floor(this.data.length / this.objects.length);

                var updateCircle = function updateCircle(circle, index) {
                    var start = (index * size),
                        end = ((index + 1) * size),
                        sum = 0;

                    for (var i = start; i < end; i++) {
                        sum += this.data[i];
                    }

                    circle.radius = sum / size * this.scale;
                };

                this.objects.forEach(updateCircle.bind(this));
            },

            preDraw: function preDraw(delta) {
                this.updateCircles(delta);
            }
        }, Static.compile(arguments));
    };
});
