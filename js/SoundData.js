define(['js/Static', 'js/Base'], function(Static, Base) {

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

    return function SoundData() {
        return Base({
            init: function init() {
                this.acontext = new AudioContext();

                this.analyser = this.acontext.createAnalyser();
                this.analyser.minDecibels = -96;
                this.analyser.maxDecibels = 0;
                this.analyser.fftSize = this.sample_size;

                this.js_node = this.acontext.createScriptProcessor(this.sample_size, 2, 2);
                this.js_node.onaudioprocess = this.processAudio.bind(this);

                this.freq_data = new Uint8Array(this.analyser.frequencyBinCount);
                this.file_input_el = document.querySelector('#sound-file');

                if (this.mic) {
                    navigator.getUserMedia(
                        { audio: true },
                        this.setInputStream.bind(this),
                        this.logError);

                    this.connectMicStream();

                } else {
                    this.file_input_el.addEventListener('change', this.initSoundFile.bind(this));
                }
            },

            triggerFileLoad: function triggerFileLoad() {
                this.file_input_el.dispatchEvent(
                    new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    }));
            },

            processAudio: function processAudio(ape) {
                var input, output;
                this.analyser.getByteFrequencyData(this.freq_data);

                // Don't pass audio through if this is a mic input
                if (this.mic) {
                    return;
                }

                for (var channel = 0; channel < ape.outputBuffer.numberOfChannels; channel++) {
                    input = ape.inputBuffer.getChannelData(channel);
                    output = ape.outputBuffer.getChannelData(channel);

                    for (var sample = 0; sample < ape.inputBuffer.length; sample++) {
                        output[sample] = input[sample];
                    }
                }
            },

            setAudioBuffer: function setAudioBuffer(buffer) {
                this.audio_buffer = buffer;
            },

            setInputStream: function setInputStream(stream) {
                this.input_stream = this.acontext.createMediaStreamSource(stream);
            },

            initSoundFile: function initSoundFile(e) {
                if (this.mic) {
                    return;
                }

                var reader = new FileReader();
                reader.onload = this.initSound.bind(this);
                reader.readAsArrayBuffer(e.target.files[0]);
            },

            initSound: function initSound(e) {
                this.acontext.decodeAudioData(
                    e.target.result,
                    this.setAudioBuffer.bind(this),
                    this.logError);

                this.connectSound();
            },

            connectSound: function connectSound() {
                if (!this.audio_buffer) {
                    setTimeout(this.connectSound.bind(this), 10);
                    return;
                }

                this.source = this.acontext.createBufferSource();
                this.source.buffer = this.audio_buffer;
                this.source.loop = false;
                this.file_played = false;

                this.source.connect(this.analyser);
                this.analyser.connect(this.js_node);
                this.js_node.connect(this.acontext.destination);
            },

            connectMicStream: function connectMicStream() {
                if (!this.input_stream) {
                    setTimeout(this.connectMicStream.bind(this), 10);
                    return;
                }

                this.input_stream.connect(this.analyser);
                this.analyser.connect(this.js_node);
                this.js_node.connect(this.acontext.destination);
            },

            playSound: function playSound() {
                if (!this.source) {
                    setTimeout(this.playSound.bind(this), 10);
                    return;
                }

                this.source.start();
            },

            logError: function logError(e, msg) {
                console.log(msg, e);
            }

        }, Static.compile(arguments));
    };

});
