define(['js/IterDraw'], function(IterDraw) {

    window.REFRESH_RATE = 40;
    window.requestAFrame = (function(callback) {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) {
                window.setTimeout(callback, 1000/window.REFRESH_RATE);
            };
    })();

    return IterDraw.extendClass({
        init: function init() {
            this.world = this;
            this.context = this.canvas.getContext('2d');
            this.time = this.getTime();

            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.updateWorld();
        },

        getTime: function getTime() {
            return (new Date()).getTime();
        },

        animate: function animate() {
            // Get time change
            this.delta = this.getTime() - this.time;

            // Clear the screen
            this.context.clearRect(0, 0, this.width, this.height);
            // Draw the screen
            this.draw(this.delta);

            // Set the new time and do it again
            this.time = this.time + this.delta;
            if (this.keep_animating) {
                window.requestAFrame(this.animate.bind(this));
            }
        },

        playPause: function playPause() {
            this.keep_animating = !this.keep_animating;
            if (this.keep_animating) {
                this.animate();
            }
        },

        start: function start() {
            this.keep_animating = true;
            this.animate();
        },

        stop: function stop() {
            this.keep_animating = false;
        }
    });
});
