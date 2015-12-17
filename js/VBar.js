define(['js/IterDraw', 'js/Square'], function(IterDraw, Square) {
    return IterDraw.extendClass({
        init: function init() {
            this.objects = [];
            this.bar_width = (this.width / this.bars);
            for (var i = 0; i < this.bars; i++) {
                this.objects.push(Square({
                    color: this.color,
                    index: i,
                    end: [
                        (this.bar_width * i) + this.start[0],
                        this.start[1]
                    ]
                }));
            }
        },

        updateBars: function updateBars() {
            var updateBar = function updateBar(bar) {
                bar.start = [
                    bar.end[0] + this.bar_width,
                    bar.end[1] - (this.data[bar.index]/128.0 * this.height)
                ];
            };

            this.objects.forEach(updateBar.bind(this));
        },

        preDraw: function preDraw() {
            this.updateBars();
        }
    });
});
