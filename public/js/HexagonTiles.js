define(['js/Wave', 'js/Static', 'js/IterDraw', 'js/Hexagon', 'js/Utilities'], function(Wave, Static, IterDraw, Hexagon, Utilities) {

    var sound_data = Wave.SoundData({
        sample_size: 1024,
        mic: true
    });

    return function ExpandingShapes() {
        return IterDraw({
            tileColorIndices: [],
            luminanceStartNum: 3,  // Decrease this to get more light colors
            luminanceEndNum: 10,  // Increase this to get more dark colors
            deltaSum: 0,  // Used to change one tile every second

            init: function init() {
                this.objects = [];
                var hexagonHeight = 2 * Math.sqrt(
                  Math.pow(this.radius, 2) - Math.pow(this.radius / 2, 2),
                  2);
                var xDistanceBetweenHexagons = this.radius * 1.5;

                // Add a small buffer to make sure we cover the screen.
                var xNumTiles = (this.width + xDistanceBetweenHexagons / 2) / xDistanceBetweenHexagons;
                var yNumTiles = (this.height + hexagonHeight / 2) / hexagonHeight;

                //var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
                //var colors = ['red', 'blue'];
                //var colors = ['red'];
                this.colors = [];
                for (var i = this.luminanceStartNum; i < this.luminanceEndNum; i++) {
                    this.colors.push(Utilities.colorLuminance('B26B00', 1 / i));  // Blue
                    //this.colors.push(Utilities.colorLuminance('006B6B', 1 / i));  // Orange
                }


                for (var i = 0; i < xNumTiles; i++) {
                    var xPos = i * xDistanceBetweenHexagons;

                    for (var j = 0; j < yNumTiles; j++) {
                        var yPos = j * hexagonHeight;

                        // Offset every other column.
                        if (i % 2 == 1) {
                            yPos += hexagonHeight / 2;
                        }
    
                        var tileColorIndex = Math.floor(Math.random()*this.colors.length);
                        var tileColor = this.colors[tileColorIndex];
                        this.tileColorIndices.push(tileColorIndex);
                        this.objects.push(Hexagon({
                            center: [xPos, yPos],
                            thickness: this.thickness,
                            color: tileColor,
                            radius: this.radius
                        }));
                    }
              }
          },
        
          preDraw: function preDraw(delta) {
              // Change one tile color every second
              this.deltaSum += delta;
              if (this.deltaSum > 300) {
                  this.deltaSum = 0;
                  var tileIndexToChange = Math.floor(Math.random() * this.objects.length);
                  var tileColorIndex = Math.floor(Math.random()*this.colors.length);
                  var tileColor = this.colors[tileColorIndex];
                  this.tileColorIndices[tileIndexToChange] = tileColorIndex;
                  this.objects[tileColorIndex].color = tileColor;
                  tileIndexToChange += 1;
              }

              // Make the circles brighter if their freq region is louder
              // Darker circles are lower frequencies.
              var freq_data = sound_data.freq_data;
              var numOfTileColors = this.luminanceEndNum - this.luminanceStartNum - 1;
              var size = Math.floor(freq_data.length / numOfTileColors);
              var scale = 0.8;

              this.tileColorIndices.forEach((function(tileColorIndex, index) {
                  // Because the color array goes from light to dark, we got through it backwards.
                  var start = (numOfTileColors - tileColorIndex) * size;
                      end = (numOfTileColors - tileColorIndex + 1) * size;
                      sum = 0;

                  for (var i = start; i < end; i++) {
                      sum += freq_data[i];
                  }

                  var tileColor = this.colors[tileColorIndex];
                  if (sum > 10) {
                      var weightedSum = ((sum / size) / 100) * scale;

                      this.objects[index].color = Utilities.colorLuminance(tileColor, weightedSum);
                  } else {  // Otherwise, reset to default.
                      this.objects[index].color = tileColor;
                  } 
              }).bind(this));
          }
        }, Static.compile(arguments));
    };
});
