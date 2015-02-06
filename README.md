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
    var world = Wave.World({
        canvas: canvas,
        width: 1600,
        height: 900,
        objects: [
            Wave.Square({
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

1. We're requiring Wave.  Wave is basically just a wrapper class for all of the other objects in this library that I've written so far.
2. We get the canvas element and store a reference to it.
3. We make a world object.  This is done by calling the Wave.World() function, which returns a world object.  Any properties from any objects that get passed to Wave.World get written onto the returned object, so all of the stuff on the object that we pass in ends up on the returned world object.  Let's look at what we passed in.
    * canvas: a reference to the canvas element that this world is drawn on
    * width/height: the width and height of our desired world
    * objects: an array of objects that we want to draw on our world.  These objects all need to have `draw()` methods.  In this case I've passed a simple square object into the world, which you can read more about later in the readme.
4. We call `world.start()`, which starts the event loop for the world.  Now let's look at how this stuff works.

# How it all works

## Object Inheritance
I've written my own little strange version of object inheritance, but it's pretty lightweight and hopefully easy to understand.  It consists of two classes: Wave.Base and Wave.Static.

### Wave.Static
This object has two very simple functions, `extend()` and `compile`.

`Static.extend(obj1, obj2, obj3, ...)` this function is intended to be called from the context of an object that you wish to extend.  It takes all of the properties from all of the objects passed into it, and adds them to the context object.

`Static.compile([obj1, obj2, ...])` this function takes an array of objects, and returns one object that has all of the properties of all of the objects in the array.

### Wave.Base
This is a function that takes in as many objects as you like, and returns an object.  The object returned has all the properties of all the objects passed into the function, and if the object has an `init()` function defined on it, that function will be called from the namespace of the returned object.

The returned object also has a function called `callIf(fn)`, which takes a reference to a potential function, and if it exists, calls that function from the context of this object.

**NOTE: From here on when I refer to any object of the form Wave.Object, I'm actually referring to the object returned by the `Wave.Object()` function.  The only exception to this is Wave.Static, which still refers to the actual object `Wave.Static`.**

### Inheritance Pattern
The pattern that I have been using is essentially this:
- All "classes" are actually just functions that return the desired object.
- All class functions accept any number of objects are arguments, and compile the properties of those input objects onto the returned object.

Here's a super simple example of this:
```javascript
define(['js/Static', 'js/Base'], function(Static, Base) {

    // ultimately you want to return a function that builds your class objects
    return function NewObject() {

        /**
         * If you want to inherit an object, just call that object's class function
         * and add to it!  In this case I'm just inheriting Base
         */
        return Base({

            /**
             * Here's where all of the properties that this object should have go
             */

        // Make sure you take all of the arguments into your function and compile them onto your object
        }, Static.compile(arguments));
    };
});
```

## Groups, IterDraw, and the World
Now I want to get to how Wave.World functions, but before that I'll describe the functionality of Wave.IterDraw and Wave.Group, from which Wave.World is extended.

### Wave.Group
A Wave.Group object is simply an object that has the property `objects`, that stores an array of sub-objects or child objects.  It also has an `updateWorld()` function and an `addObjects()` function.

`updateWorld()` updates the world of each of its child objects, and calls any `updateWorld()` functions that those child objects might have.
`addObjects([obj1, obj2, ...])` takes an array of objects and adds them to this Groups `objects` array.  One the child objects have been added, it calls `updateWorld()` on the Group.

### Wave.IterDraw
Wave.IterDraw is an extension of Wave.Group that has a `draw()` function.

`draw(delta)` looks for and calls any `draw()` functions that exist on any of the child objects on this IterDraw.  It will also call any `preDraw()` function it has before it draws its child objects, and any `postDraw()` functions it has after it draws its child objects.

`draw(delta)`, `preDraw(delta)`, and `postDraw(delta)` take an argument that is a Number representing the amount of time that has passed since the last draw frame.

### Wave.World
Wave.World is an extension of Wave.IterDraw that handles all of the annoying animation event loop logic.

Required Properties:
    - canvas: a reference to a canvas element on the page
    - width: the width that you want this world to be
    - height: the height that you want this world to be

Other Useful Properties:
    - context: the context for the canvas element that was passed into the world
    - start(): starts this world's animation
    - playPause(): toggles this world between playing and pausing
    - addObjects(): adds objects to the world (after initialization), the same as the addObjects that all Wave.Group objects have

# Writing Actual Draw Objects

## The Basics

Essentially, Draw Objects are just objects with a `draw(delta)` method on them.  When writing a Draw Object, there are some safe assumptions that you can make.  Draw Objects that are in a world will always have a reference to world stored as `this.world`, so you can use the context from that world to actually implement a draw method.  You can also assume that your `draw(delta)` method takes one argument, which is a Number representing the amount of time that has passed since the last draw frame.

## Here's an Example

```javascript
define(['js/Static', 'js/Base'], function(Static, Base) {
    return function Line() {

        // Extending the base class
        return Base({

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
        }, Static.compile(arguments));
    };
});
```
