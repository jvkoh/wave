define(['js/Extendable'], function(Extendable) {
    return Extendable.extendClass({
        updateWorld: function updateWorld() {
            if (this.objects && this.world) {
                var setWorld = function setWorld(obj) {
                    obj.world = this.world;
                    obj.callIf(obj.updateWorld);
                };

                this.objects.forEach(setWorld.bind(this));
            }

            this.callIf(this.onUpdateWorld);
        },

        addObjects: function addObjects(objects) {
            if (!this.objects) {
                this.objects = [];
            }

            this.objects.concat(objects);
            this.updateWorld();
        }
    });
});
