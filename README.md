# Wave.js

Wave.js is a framework I've been working on for writing simple animations (and potentially visualizers) with the canvas HTML5 tag.

Currently this repo also includes a node/express website (that you can use to run your animations locally), and relies heavily on require.js.

# Basic Example

Here's a super basic example of a javascript file for a super simple canvas page.  This javascript file assumes that the HTML is linked to has a canvas element on the page somewhere, with an id of "canvas".

```javascript
require([
    'js/Wave'
], function(
    Wave
) {

    var canvas = document.getElementById('canvas');
    var world = new Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        objects: [
            new Wave.Square({
                color: 'black',
                start: [0,0],
                end: [1600,900]
            })
        ]
    });

    world.start();

});
```

Let's break this down piece by piece.

1. We're requiring Wave.  Wave is basically just a wrapper class for all of the base objects in this library.
2. We get the canvas element and store a reference to it.
3. We make a world object.  This is done by calling `new Wave.World()`, which returns a world object.  Properties from any objects that we pass to the constructor get written onto the returned object.  Let's look at what we passed in.
    - **canvas**: a reference to the canvas element that this world is drawn on
    - **width/height**: the width and height of our desired world
    - **objects**: an array of objects that we want to draw on our world.  These objects all need to have `draw()` methods.  In this case I've passed a simple square object into the world.
4. We call `world.start()`, which starts the event loop for the world.  Now let's look at how this stuff works.

# How it all works

## Object Inheritance
The object inheritance here is pretty lightweight and hopefully easy to understand.  All of the logic for it lives in Wave.Extendable.

### Wave.Extendable
This object has an `extendClass()` function.  `extendClass()` returns a clone of the current object with the properties of any input objects on its prototype.  This makes extending a class as simple as one function call.

Here's a barebones example of this:
```javascript
define(['js/Extendable'], function(Extendable) {

    /**
     * If you want to inherit an class, just call extendClass
     */
    return Extendable.extendClass({

        /**
         * Here's where all of the properties that this object should have go
         */

    });

});
```

The extendable object also gives you a couple prototype functions for free.
- `callIf(func)` Calls the input function if it exists.
- `extend()` Adds all the properties of all the input objects to the context object.

## Groups, IterDraw, and the World
Before I explain how to use Wave.World, I'll describe the functionality of Wave.IterDraw and Wave.Group, from which Wave.World is extended.

### Wave.Group
A Wave.Group object is simply an object that expects to have the property `objects`, which stores an array of sub-objects or child objects.  It also has an `updateWorld()` function and an `addObjects()` function.
- `updateWorld()` updates the world of each of its child objects, and calls any `updateWorld()` functions that those child objects might have.
- `addObjects([obj1, obj2, ...])` takes an array of objects and adds them to this groups `objects` array.  Once the child objects have been added, it calls `updateWorld()`.

### Wave.IterDraw
Wave.IterDraw is an extension of Wave.Group that has a `draw()` function.
- `draw(delta)` looks for and calls any `draw()` functions that exist on any of the child objects on this IterDraw.  It will also call any `preDraw()` function it has before it draws its child objects, and any `postDraw()` functions it has after it draws its child objects.
- `draw(delta)`, `preDraw(delta)`, and `postDraw(delta)` take an argument that is a Number representing the amount of time that has passed since the last draw frame.

### Wave.World
Wave.World is an extension of Wave.IterDraw that handles all of the annoying animation event loop logic.

Required Properties:
- **canvas**: a reference to a canvas element on the page
- **width**: the width that you want this world to be
- **height**: the height that you want this world to be

Other Useful Properties:
- **context**: the context for the canvas element that was passed into the world
- **start()**: starts this world's animation
- **playPause()**: toggles this world between playing and pausing
- **addObjects()**: adds objects to the world (after initialization), the same as the addObjects that all Wave.Group objects have

# Writing Actual Draw Objects

## The Basics

Essentially, Draw Objects are just objects with a `draw(delta)` method on them.  When writing a Draw Object, there are some safe assumptions that you can make.  Draw Objects that are in a world will always have a reference to world stored as `this.world`, so you can use the context from that world to actually implement a draw method.  You can also assume that your `draw(delta)` method takes one argument, which is a Number representing the amount of time that has passed since the last draw frame.

## Here's an Example

```javascript
define(['js/Extendable'], function(Extendable) {
    // Extending the base class
    return Extendable.extendClass({

        // This thing doesn't change over time, so I didn't include the delta argument
        draw: function draw() {

            // Get the context of this world
            var context = this.world.context;

            // Use some properties that we expect to exist to draw a line!
            context.beginPath();
            context.lineWidth = this.thickness.toString();
            context.strokeStyle = this.color;
            context.moveTo(this.start[0], this.start[1]);
            context.lineTo(this.end[0], this.end[1]);
            context.stroke();
        }
    });
});
```
