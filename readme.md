lodash-oo
=========

A small addon to [lo-dash](http://lodash.com/) providing idio<strike>ma</strike>tic implementations of popular concepts within object oriented JavaScript programming.

## Installing

Simple, just `wget` the latest version like a boss:

```bash
$ wget http://raw.github.com/pingrat/lodash-oo/master/dist/lodash-oo.js
```

## Usage

Browser:

```html
<script src="path/to/lodash.js/"></script>
<script src="path/to/lodash-oo.js/"></script>
```

Note that the browser support is untested and probably laughable at best.

In node, just put `lodash-oo.js` in your sources for now, npm package is coming, bla bla.

```javascript
require('./path/to/lodash-oo.js');
// or, if you're one of those who think global variables give you herpes:
var _ = require('lodash');
_.mixin(require('path/to/lodash-oo.js'));
```

## Documentation

This module adds a number of methods to lo-dash.

They have not yet been documented. :-)

Here's an example from the test suit:

```javascript
var Shape = function Shape () {
	this.x = 0;
	this.y = 0;
};
Shape.prototype.getPos = function getPos () {
	return this.x + 'x' + this.y;
};

var Square = function Square () {
	this.super_();
	this.x = 1;
	this.y = 9;
};
_.inherits(Square, Shape);

var Rectangle = function Rectangle () {
	this.super_();
};
Rectangle.prototype.getPos = function getPos () {
	return '[' + this.super_() + ']';
};
_.inherits(Rectangle, Square);

var square = new Square();
var rect = new Rectangle();

assert(square instanceof Square);
assert(square instanceof Shape);
assert(square.getPos() === '1x9');
assert(rect.getPos() === '[1x9]');
```

## License

[The MIT License (MIT)](http://no.mit-license.org/)

## Bonus: Multi-purpose source

1. The source code of this application can also be printed and, when correctly placed on a flat surface with the printout facing down, used just like a regular sheet of paper.
2. By creating several complicated and exact diagonal folds in the printout, a variety of objects vaugly representing some type of flying machine can be constructed.
3. By reorganising the individual characters of the source code, excerpts from over 50,000 works of litterature can be created.
