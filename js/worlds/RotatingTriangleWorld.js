define(['js/Wave', 'js/Triangle', 'js/Circle', 'js/Square'], function(Wave, Triangle, Circle, Square) {
    var STRIPE_THICKNESS = 15,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 40,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return Wave.IterDraw({
        objects: [
            Wave.ExpandingShapes({
                    center: [800, 450],
                    thickness: 2,
                    num_shapes: 80,
                    width: 10000,
                    speed: 0.6,
                    shapeCreator: Triangle,
                    rotateSpeed: 0.0003,
                    doTrippyRotation: true
            })
        ]
    });
});
