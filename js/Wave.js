define([
    'js/Base',
    'js/World',
    'js/Static',
    'js/Line',
    'js/LineStar',
    'js/Stripes',
    'js/IterDraw',
    'js/Square',
    'js/Circle',
    'js/CircleStripes',
    'js/State',
    'js/KeyHandler',
    'js/SoundData'
], function(
    Base,
    World,
    Static,
    Line,
    LineStar,
    Stripes,
    IterDraw,
    Square,
    Circle,
    CircleStripes,
    Sequence,
    KeyHandler,
    SoundData
) {
    return {
        Static: Static,
        Base: Base,
        World: World,
        IterDraw: IterDraw,
        Line: Line,
        Square: Square,
        LineStar: LineStar,
        Stripes: Stripes,
        Circle: Circle,
        CircleStripes: CircleStripes,
        Sequence: Sequence,
        KeyHandler: KeyHandler,
        SoundData: SoundData
    };
});
