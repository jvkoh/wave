define(['js/Extendable'], function(Extendable) {
    return Extendable.extendClass({
        draw: function draw(delta) {
            // Use this to update params that change over time
            this.callIf(this.animateSelf, delta);
            // Use this to update the color, thickness, etc.
            this.callIf(this.updateStyle, delta);
            // Use this to actually draw the shape
            this.callIf(this.drawShape, delta);
        },

        updateStyle: function updateStyle() {
            if (this.color) {
                if (this.fill) {
                    this.world.context.fillStyle = this.color;
                } else {
                    this.world.context.strokeStyle = this.color;
                }
            }

            if (this.thickness) {
                this.world.context.lineWidth = this.thickness.toString();
            }
        }
    });
});
