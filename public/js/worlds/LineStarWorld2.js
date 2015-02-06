define(['js/Wave'], function(Wave) {

    var STAR_RADIUS = 2000,
        STAR_THICKNESS = 6,
        STAR_SPEED = -0.04,
        STAR_POINTS = 22;

    return Wave.IterDraw({
        objects:[
            Wave.Square({
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }),
            // Top Left
            Wave.LineStar({
                center: [-100,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#97D09E',
                points: STAR_POINTS
            }),
            // Bottom Left
            Wave.LineStar({
                center: [-100,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#52AFBF',
                points: STAR_POINTS
            }),
            // Mid Left
            Wave.LineStar({
                center: [-100,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#58C4A7',
                points: STAR_POINTS
            }),
            // Top Right
            Wave.LineStar({
                center: [1700,0],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#97D09E',
                points: STAR_POINTS
            }),
            // Bottom Right
            Wave.LineStar({
                center: [1700,900],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#52AFBF',
                points: STAR_POINTS
            }),
            // Mid Right
            Wave.LineStar({
                center: [1700,450],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#58C4A7',
                points: STAR_POINTS
            }),
            // Top Mid-Left
            Wave.LineStar({
                center: [400,-100],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Top Mid-Right
            Wave.LineStar({
                center: [1200,-100],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Bottom Mid-Left
            Wave.LineStar({
                center: [400,1000],
                radius: STAR_RADIUS,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: '#E2F89C',
                points: STAR_POINTS
            }),
            // Bottom Mid-Right
            Wave.LineStar({
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
