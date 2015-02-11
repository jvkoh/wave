define(['js/Static', 'js/IterDraw', 'js/Circle'], function(Static, IterDraw, Circle) {
    return function ResponsiveCircleGrid() {
        return IterDraw({
            init: function init() {
                this.objects = [];
                this.current_colorset = 0;

                // Set up color lock
                if (!this.color_timeout) {
                    this.color_timeout = 7000;
                }
                this.color_lock = this.color_timeout;

                // Set up colors
                if (this.color) {
                    this.colorsets = [[this.color]];
                } else if (this.colors) {
                    this.colorsets = [this.colors];
                }

                // Set up circles
                var x_inc = (this.end[0] - this.start[0]) / (this.cols - 1),
                    y_inc = (this.end[1] - this.start[1]) / (this.rows - 1);

                for (var y = (this.rows - 1); y >= 0; y--) {
                    for (var x = 0; x < this.cols; x++) {
                        this.objects.push(Circle({
                            fill: this.fill,
                            thickness: this.thickness,
                            center: [
                                this.start[0] + (x * x_inc),
                                this.start[1] + (y * y_inc),
                            ]
                        }));
                    }
                }

                // Force updating of circle colors
                this.updateColors();
            },

            shouldUpdateColors: function shouldUpdateColors(delta) {
                if (this.color || this.colors) {
                    return;
                }

                this.color_lock -= delta;

                var sum = 0,
                    num_freqs = this.world.freq_data.length/2;

                for (var i = 0; i < num_freqs; i++) {
                    sum += this.world.freq_data[i];
                }

                var avg_vol = sum/num_freqs,
                    diff = Math.abs(avg_vol - this.last_avg_vol);

                this.last_avg_vol = avg_vol;

                return (
                    this.color_lock < 0 &&
                    this.last_avg_vol &&
                    diff > this.threshold
                );
            },

            updateColors: function updateColors() {
                this.current_colorset++;
                if (this.current_colorset >= this.colorsets.length) {
                    this.current_colorset = 0;
                }

                var colorset = this.colorsets[this.current_colorset];

                this.objects.forEach(function(circle, i) {
                    circle.color = colorset[i % colorset.length];
                    console.log(circle.color);
                });
            },

            updateCircles: function updateCircles(delta) {
                var size = Math.floor(this.world.freq_data.length / this.objects.length);

                var updateCircle = function updateCircle(circle, index) {
                    var start = (index * size),
                        end = ((index + 1) * size),
                        sum = 0;

                    for (var i = start; i < end; i++) {
                        sum += this.world.freq_data[i];
                    }

                    circle.radius = sum / size * this.scale;
                };

                this.objects.forEach(updateCircle.bind(this));
            },

            preDraw: function preDraw(delta) {
                if (!this.world.freq_data) {
                    return;
                }

                console.log('updating');
                if (this.shouldUpdateColors(delta)) {
                    this.updateColors();
                    this.color_lock = this.color_timeout;
                }

                this.updateCircles(delta);
            }
        }, Static.compile(arguments));
    };
});
