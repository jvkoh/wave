define(['js/Wave'], function(Wave) {

    var STRIPE_THICKNESS = 6,
        STRIPE_SPEED = .05,
        STRIPE_COUNT = 20,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    return new Wave.IterDraw({
        objects:[
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: STRIPE_SPEED,
                color: 'purple',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            }),
            new Wave.Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: -STRIPE_SPEED,
                color: 'purple',
                num_stripes: STRIPE_COUNT,
                width: STRIPE_WIDTH
            }),
            new Wave.LineStar({
                center: [800,-100],
                radius: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: -STRIPE_SPEED,
                color: 'orange',
                points: 20,
            }),
            new Wave.LineStar({
                center: [800,1000],
                radius: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: STRIPE_SPEED,
                color: 'orange',
                points: 20,
            }),
            new Wave.LineStar({
                center: [-100,450],
                radius: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: STRIPE_SPEED,
                color: 'yellow',
                points: 20,
            }),
            new Wave.LineStar({
                center: [1700,450],
                radius: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: -STRIPE_SPEED,
                color: 'yellow',
                points: 20,
            })
        ]
    });

});
