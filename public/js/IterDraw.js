define(['js/Static', 'js/Group'], function(Static, Group) {
    return function IterDraw() {
        return Group({
            draw: function draw(delta) {
                this.callIf(this.preDraw, delta);

                if (this.objects) {
                    var drawObject = function drawObject(delta, obj) {
                        obj.draw(delta);
                    };
                    this.objects.forEach(drawObject.bind(null, delta));
                }

                this.callIf(this.postDraw, delta);
            }
        }, Static.compile(arguments));
    };
});
