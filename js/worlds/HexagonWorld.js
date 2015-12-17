define(['js/Wave', 'js/HexagonTiles'], function(Wave, HexagonTiles) {
    var STRIPE_THICKNESS = 15,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 40,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return new Wave.IterDraw({
        objects: [
            new HexagonTiles({
                    thickness: 2,
                    color: 'white',
                    radius: 60,
                    width: 1600,
                    height: 900
            })
        ]
    });
});
