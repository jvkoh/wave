define(['js/Wave'], function(Wave) {

    var STRIPE_THICKNESS = 15,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 40,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return new Wave.IterDraw({
        objects:[
            new Wave.ExpandingShapes({
                center: [800,450],
                width: 1000,
                thickness: STRIPE_THICKNESS,
                speed: STRIPE_SPEED,
                color: 'white',
                num_shapes: 20,
                shapeCreator: Wave.Circle
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: - 3/5 * STRIPE_SPEED,
                color: 'black',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: 4/13 * STRIPE_SPEED,
                color: 'black',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            })
        ]
    });

});
