define(['js/Wave'], function(Wave) {
    var STRIPE_THICKNESS = 15,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 40,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return new Wave.IterDraw({
        objects: [
            new Wave.ExpandingShapes({
                    center: [800, 450],
                    thickness: 2,
                    color: 'red',
                    num_shapes: 80,
                    width: 10000,
                    speed: 0.6,
                    shapeCreator: Wave.Triangle
                    //reverse: true,
                    //rotateSpeed: 0.0003
            })
        ]
    });
});
