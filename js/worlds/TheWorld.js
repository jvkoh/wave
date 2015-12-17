require([
    'js/Wave',
    'js/worlds/LineStarWorld',
    'js/worlds/LineStarWorld2',
    'js/worlds/StripeWorld',
    'js/worlds/StarsAndStripes',
    'js/worlds/CircleStripeWorld',
    'js/worlds/TriangleWorld',
    'js/worlds/HexagonWorld',
    'js/worlds/RotatingTriangleWorld'
], function(
    Wave,
    LineStarWorld,
    LineStarWorld2,
    StripeWorld,
    StarsAndStripes,
    CircleStripeWorld,
    TriangleWorld,
    HexagonWorld,
    RotatingTriangleWorld
) {

    // Get the canvas
    var canvas = document.getElementById('canvas');

    // All of the possible world states
    var sub_worlds = [
        CircleStripeWorld,
        LineStarWorld,
        LineStarWorld2,
        StripeWorld,
        StarsAndStripes,
        HexagonWorld,
        TriangleWorld,
        RotatingTriangleWorld
    ];

    /**
     * Hooking up states to world
     */
    var sequence = new Wave.Sequence({
        objects: sub_worlds
    });

    var world = new Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        objects: [
            new Wave.Square({
                color: 'black',
                start: [0,0],
                end: [1600,900],
                fill: true
            }),
            sequence
        ]
    });

    var key_handler = new Wave.KeyHandler({
        keys: {
            // N
            78: function() {
                sequence.advance();
            },
            // Space
            32: function() {
                world.playPause();
            }
        }
    });

    world.start();

});
