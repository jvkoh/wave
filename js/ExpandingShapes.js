define(['js/IterDraw'], function(IterDraw) {
    return IterDraw.extendClass({
        init: function init() {
            this.objects = [];
            var increment = this.width / this.num_shapes;
            var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
            if (this.color) {
                colors = [this.color];
            }

            for (var i = 0; i < this.num_shapes; i++) {
                this.objects.push(new this.shapeCreator({
                    thickness: this.thickness,
                    color: colors[i % colors.length],
                    center: this.center,
                    radius: (i * increment),
                    rotateSpeed: this.rotateSpeed,
                    doTrippyRotation: this.doTrippyRotation
                }));
            }
        },

        updateShapes: function updateShapes(delta) {
            function updateShape(shape) {
                if (this.reverse) {
                    shape.radius -= (this.speed * delta);

                    while (shape.radius < 0) {
                        shape.radius += this.width;
                    }
                } else {
                    shape.radius += (this.speed * delta);

                    while (shape.radius > this.width) {
                        shape.radius -= this.width;
                    }
                }
            };

            this.objects.forEach(updateShape.bind(this));
        },

        preDraw: function preDraw(delta) {
            this.updateShapes(delta);
        }
    });
});
