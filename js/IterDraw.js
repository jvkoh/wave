define(['js/Group'], function(Group) {
    return Group.extendClass({
        draw: function draw(delta) {
            this.callIf(this.preDraw, delta);

            if (this.objects) {
                var drawObject = function drawObject(delta, obj) {
                    obj.callIf(obj.draw, delta);
                };
                this.objects.forEach(drawObject.bind(null, delta));
            }

            this.callIf(this.postDraw, delta);
        }
    });
});
