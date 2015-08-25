define(['js/Static', 'js/IterDraw', 'js/Circle'], function(Static, IterDraw, Circle) {
    return function CircleStripes() {
        return IterDraw({
            init: function init() {
                this.objects = [];
                var increment = this.radius / this.num_stripes;
                for (var i = 0; i < this.num_stripes; i++) {
                    this.objects.push(Circle({
                        thickness: this.thickness,
                        color: this.color,
                        center: this.center,
                        radius: (i * increment)
                    }));
                }
            },

            updateCircles: function updateCircles(delta) {
                var updateCircle = function updateCircle(circle) {
                    circle.center = this.center;
                    circle.radius += (this.speed * delta);

                    while (circle.radius > this.radius) {
                        circle.radius -= this.radius;
                    }
                };

                this.objects.forEach(updateCircle.bind(this));
            },

            preDraw: function preDraw(delta) {
                this.updateCircles(delta);
            }
        }, Static.compile(arguments));
    };
});
