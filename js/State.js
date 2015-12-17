define(['js/Group'], function(Group) {
    return Group.extendClass({
        init: function init() {
            this.current_object = 0;
        },

        checkState: function checkState(log_error) {
            if (this.current_object >= this.objects.length) {
                this.current_object = 0;

                if (log_error) {
                    console.log('[Wave.State] Error: attempted to draw invalid object, setting current object to 0');
                }
            }
        },

        draw: function draw(delta) {
            this.checkState(true);
            this.objects[this.current_object].draw(delta);
        },

        advance: function advance() {
            this.current_object++;
            this.checkState();
        },

        setCurrentObject: function setCurrentObject(obj_id) {
            this.current_object = obj_id;
        }

    });
});
