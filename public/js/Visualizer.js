require([
    'js/World',
    'js/LineStar',
    'js/Square',
    'js/ResponsiveLineStar',
    'js/Stripes'
], function(
    World,
    LineStar,
    Square,
    ResponsiveLineStar,
    Stripes
) {

    var errorCallback = function errorCallback(e) {
        alert(e);
    };

    window.REFRESH_RATE = 40;
    window.requestAFrame = (function(callback) {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) {
                window.setTimeout(callback, 1000/window.REFRESH_RATE);
            };
    })();

    // Fix up for prefixing
    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    window.AudioContext = (
        window.AudioContext ||
        window.webkitAudioContext
    );

    var sample_size = 1024,
        audio_context = new AudioContext(),
        analyser = audio_context.createAnalyser();
        javascript_node = audio_context.createScriptProcessor(sample_size, 1, 1);

    analyser.minDecibels = -96;
    analyser.maxDecibels = 0;
    analyser.fftSize = sample_size;

    var data = new Uint8Array(analyser.frequencyBinCount);

    navigator.getUserMedia({ audio: true }, function(stream) {
        var input = audio_context.createMediaStreamSource(stream);

        input.connect(analyser);
        analyser.connect(javascript_node);
        javascript_node.connect(audio_context.destination);

        javascript_node.onaudioprocess = function () {
            analyser.getByteFrequencyData(data);
        }

    }, errorCallback);

    var canvas = document.getElementById('canvas');

    var STRIPE_THICKNESS = 2,
        STRIPE_SPEED = .07,
        STRIPE_COUNT = 100,
        STRIPE_WIDTH = 2000,
        STRIPE_LENGTH = 2000;

    var world = World({
        canvas: canvas,
        width: 1600,
        height: 900,
        objects: [
            Square({
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }),
            Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: 9/4 * STRIPE_SPEED,
                color: 'blue',
                num_stripes: STRIPE_COUNT,
                width: 2000
            }),
            Stripes({
                center: [800,450],
                length: STRIPE_LENGTH,
                thickness: STRIPE_THICKNESS,
                speed: - 3/5 * STRIPE_SPEED,
                color: 'green',
                num_stripes: STRIPE_COUNT,
                width: 2000
            }),
            ResponsiveLineStar({
                center: [800,450],
                thickness: 2,
                radius: 900,
                points: 300,
                color: 'purple',
                data: data
            })
        ]
    });

    world.updateWorld();
    world.start();

});
