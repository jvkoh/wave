define(['js/Wave'], function(Wave) {

    var STAR_RADIUS = 2000,
        STAR_THICKNESS = 6,
        STAR_SPEED = -0.04,
        STAR_POINTS = 22;

    return new Wave.IterDraw({
        objects:[
            new Wave.Square({
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }),
            // Top Left
            new Wave.LineStar({
                center: [-100,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#97D09E',
                points: STAR_POINTS
            }),
            // Bottom Left
            new Wave.LineStar({
                center: [-100,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#52AFBF',
                points: STAR_POINTS
            }),
            // Mid Left
            new Wave.LineStar({
                center: [-100,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#58C4A7',
                points: STAR_POINTS
            }),
            // Top Right
            new Wave.LineStar({
                center: [1700,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#97D09E',
                points: STAR_POINTS
            }),
            // Bottom Right
            new Wave.LineStar({
                center: [1700,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#52AFBF',
                points: STAR_POINTS
            }),
            // Mid Right
            new Wave.LineStar({
                center: [1700,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#58C4A7',
                points: STAR_POINTS
            }),
            // Top Mid-Left
            new Wave.LineStar({
                center: [400,-100],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Top Mid-Right
            new Wave.LineStar({
                center: [1200,-100],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Bottom Mid-Left
            new Wave.LineStar({
                center: [400,1000],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Bottom Mid-Right
            new Wave.LineStar({
                center: [1200,1000],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            })
        ]
    });

});
