define([
    'js/Base',
    'js/World',
    'js/Static',
    'js/Line',
    'js/LineStar',
    'js/Stripes',
    'js/IterDraw',
    'js/Square',
    'js/State'
], function(
    Base,
    World,
    Static,
    Line,
    LineStar,
    Stripes,
    IterDraw,
    Square,
    State
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
        State: State
    };
});
