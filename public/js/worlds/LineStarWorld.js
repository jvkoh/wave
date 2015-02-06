define(['js/Wave'], function(Wave) {

    var STAR_RADIUS = 2000,
        STAR_THICKNESS = 6,
        STAR_SPEED = -0.06,
        STAR_POINTS = 22;

    return Wave.IterDraw({
        objects:[
            Wave.LineStar({
                center: [-100,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'red',
                points: STAR_POINTS
            }),
            Wave.LineStar({
                center: [-100,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'orange',
                points: STAR_POINTS
            }),
            Wave.LineStar({
                center: [-100,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'yellow',
                points: STAR_POINTS
            }),
            Wave.LineStar({
                center: [1700,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'orange',
                points: STAR_POINTS
            }),
            Wave.LineStar({
                center: [1700,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'red',
                points: STAR_POINTS
            }),
            Wave.LineStar({
                center: [1700,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'yellow',
                points: STAR_POINTS
            })
        ]
    });

});
