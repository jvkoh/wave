require([
    'js/Wave',
    'js/ResponsiveCircleGrid'
], function(
    Wave,
    ResponsiveCircleGrid
) {

    var canvas = document.getElementById('canvas');
    var sound_data = Wave.SoundData({
        sample_size: 1024,
        mic: true
    });

    var STRIPE_THICKNESS = 25,
        STRIPE_SPEED = .02,
        STRIPE_COUNT = 60,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    var world = Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        freq_data: sound_data.freq_data,
        objects: [
            Wave.Square({
                fill: true,
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }),
            ResponsiveCircleGrid({
                start: [100,100],
                end: [1500,800],
                thickness: 10,
                scale: 0.5,
                color: 'white',
                rows: 9,
                cols: 16
            })
        ]
    });

    var key_handler = Wave.KeyHandler({
        keys: {
            // Space
            32: function() {
                world.playPause();
            }
        }
    });

    world.start();

});
