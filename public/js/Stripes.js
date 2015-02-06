define(['js/Static', 'js/IterDraw', 'js/Line'], function(Static, IterDraw, Line) {
    return function Stripes() {
        return IterDraw({
            init: function init() {
                this.objects = [];
                if (!this.angle) {
                    this.angle = 0;
                }
                var increment = this.width / this.num_stripes;

                for (var i = 0; i < this.num_stripes; i++) {
                    distance = (i * increment) - (this.width/2);

                    this.objects.push(Line({
                        thickness: this.thickness,
                        color: this.color,
                        distance: distance
                    }));
                }
            },

            updateStripes: function updateStripe(delta) {
                this.angle += (2 * Math.PI) * this.speed * delta / 1000; // speed is in full rotations per second
                var updateStripe = function updateStripe(angle, stripe) {
                    var perp_angle = this.angle + (Math.PI/2),
                        half_length = this.length/2,
                        stripe_center = [
                            this.center[0] + (stripe.distance * Math.cos(this.angle)),
                            this.center[1] + (stripe.distance * Math.sin(this.angle))
                        ];

                    stripe.start = [
                        stripe_center[0] + (half_length * Math.cos(perp_angle)),
                        stripe_center[1] + (half_length * Math.sin(perp_angle))
                    ];

                    stripe.end = [
                        stripe_center[0] - (half_length * Math.cos(perp_angle)),
                        stripe_center[1] - (half_length * Math.sin(perp_angle))
                    ];
                };

                this.objects.forEach(updateStripe.bind(this, this.angle));
            },

            preDraw: function preDraw(delta) {
                this.updateStripes(delta);
            }
        }, Static.compile(arguments));
    };
});
