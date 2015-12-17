define([
    'js/World',
    'js/Line',
    'js/LineStar',
    'js/Stripes',
    'js/IterDraw',
    'js/Square',
    'js/Circle',
    'js/CircleStripes',
    'js/Triangle',
    'js/Hexagon',
    'js/ExpandingShapes',
    'js/State',
    'js/KeyHandler',
    'js/SoundData'
], function(
    World,
    Line,
    LineStar,
    Stripes,
    IterDraw,
    Square,
    Circle,
    CircleStripes,
    Triangle,
    Hexagon,
    ExpandingShapes,
    Sequence,
    KeyHandler,
    SoundData
) {
    return {
        World: World,
        IterDraw: IterDraw,
        Line: Line,
        Square: Square,
        LineStar: LineStar,
        Stripes: Stripes,
        Circle: Circle,
        CircleStripes: CircleStripes,
        Triangle: Triangle,
        Hexagon: Hexagon,
        ExpandingShapes: ExpandingShapes,
        Sequence: Sequence,
        KeyHandler: KeyHandler,
        SoundData: SoundData
    };
});
