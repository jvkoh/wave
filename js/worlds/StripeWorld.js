define(['js/Wave'], function(Wave) {

    var STRIPE_THICKNESS = 6,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 50,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return new Wave.IterDraw({
        objects:[
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: 9/4 * STRIPE_SPEED,
                color: 'purple',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: - 3/5 * STRIPE_SPEED,
                color: 'green',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            })
        ]
    });

});
