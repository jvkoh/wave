require([
    'js/Wave',
    'js/worlds/LineStarWorld',
    'js/worlds/LineStarWorld2',
    'js/worlds/StripeWorld',
    'js/worlds/StarsAndStripes'
], function(
    Wave,
    LineStarWorld,
    LineStarWorld2,
    StripeWorld,
    StarsAndStripes
) {

    // All of the possible world states
    var world_states = [
        LineStarWorld,
        LineStarWorld2,
        StripeWorld,
        StarsAndStripes
    ];

    /**
     * Hooking up states to world
     */
    var state = Wave.State({
        objects: world_states
    });

    var world = Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        objects: [
            Wave.Square({
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }),
            state
        ]
    });

    window.addEventListener('keydown', function(e) {
        if (e.defaultPrevented) {
            return;
        }

        switch (e.keyCode) {
            case 78: // Space
                state.advance();
                e.preventDefault();
                break;
            case 32: // Space
                world.playPause();
                e.preventDefault();
                break;
            default:
                console.log(e.keyCode);
                break;
        }

    }, false);

    console.log(world);

    world.updateWorld();
    world.start();

});
