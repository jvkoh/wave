define(['js/IterDraw', 'js/Line'], function(IterDraw, Line) {
    return IterDraw.extendClass({
        init: function init() {
            this.objects = [];
            this.angle = 0;  // In radians.

            for (var i = 0; i < 3; i++) {
                var line = new Line({
                    thickness: this.thickness,
                    color: this.color,

                    // These are changed in updateLines
                    start: [-1, -1],
                    end: [-1, -1]
                });
                this.objects.push(line);
            }
        },

        updateLines: function updateLines(delta) {
            var startX, startY, endX, endY;
            var height = Math.sqrt(
              Math.pow(this.radius, 2) - Math.pow(this.radius / 2, 2),
              2);

            // Note: to avoid strange gaps where the lines meet up, we must
            // add a few pixels in certain places.
            // Bottom Line
            startX = this.center[0] - (this.radius / 2);
            endX = this.center[0] + (this.radius / 2);
            startY = this.center[1] + (height / 2);
            endY = startY;
            this.objects[0].start = [startX, startY];
            this.objects[0].end = [endX, endY];

            // Left Line
            startX = this.center[0] - (this.radius / 2);
            endX = this.center[0] + 1;
            startY = this.center[1] + (height / 2) + 1;
            endY = this.center[1] - (height / 2);
            this.objects[1].start = [startX, startY];
            this.objects[1].end = [endX, endY];

            // Right Line
            startX = this.center[0];
            endX = this.center[0] + (this.radius / 2);
            startY = this.center[1] - (height / 2);
            endY = this.center[1] + (height / 2) + 1;
            this.objects[2].start = [startX, startY];
            this.objects[2].end = [endX, endY];

            // Rotate lines.
            if (this.rotateSpeed) {
                this.angle = (this.angle + delta * this.rotateSpeed) % (2 * Math.PI);
                var angle = this.angle;
                var centerX = this.center[0];
                var centerY = this.center[1];
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 2; j++) {
                        var startOrEnd = j == 0 ? 'start' : 'end';
                        var x = this.objects[i][startOrEnd][0];
                        var y = this.objects[i][startOrEnd][1];
                        this.objects[i][startOrEnd][0] =
                          Math.cos(this.angle) * (x-centerX) - Math.sin(angle) * (y-centerY) + centerX;

                        // This was a typo that resulted in a super trippy 3D image rotation
                        if (this.doTrippyRotation) {
                            this.objects[i][startOrEnd][1] =
                              Math.sin(this.angle) * (x-centerX) - Math.cos(angle) * (y-centerY) + centerY;
                        } else {
                            this.objects[i][startOrEnd][1] =
                              Math.sin(this.angle) * (x-centerX) + Math.cos(angle) * (y-centerY) + centerY;
                        }
                    }
                }
            }
        },

        preDraw: function preDraw(delta) {
            this.updateLines(delta);
        }
    });
});
