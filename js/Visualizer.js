require([
    'js/Wave',
    'js/ResponsiveCircleGrid'
], function(
    Wave,
    ResponsiveCircleGrid
) {

    var canvas = document.getElementById('canvas');
    var sound_data = new Wave.SoundData({
        sample_size: 1024
    });

    var STRIPE_THICKNESS = 24,
        STRIPE_SPEED = .02,
        STRIPE_COUNT = 60,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    var world = new Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        freq_data: sound_data.freq_data,
        objects: [
            new ResponsiveCircleGrid({
                flip_y: true,
                start: [100,100],
                end: [1500,800],
                thickness: 10,
                scale: 0.5,
                fill: true,
                colorsets: [
                    ['red', 'blue', 'green'],
                    ['red', 'orange', 'yellow'],
                    ['purple', 'magenta', 'pink'],
                    ['black', 'blue', 'purple']
                ],
                threshold: 30,
                rows: 9,
                cols: 16
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: - 3/5 * STRIPE_SPEED,
                color: 'white',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: 4/13 * STRIPE_SPEED,
                color: 'white',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            })
        ]
    });

    var key_handler = new Wave.KeyHandler({
        keys: {
            // F
            70: function() {
                sound_data.triggerFileLoad();
            },
            // P
            80: function() {
                sound_data.playSound();
            },
            // Space
            32: function() {
                world.playPause();
            }
        }
    });

    world.start();

});
