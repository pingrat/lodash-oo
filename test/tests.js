// QUnit test suite for lodash-oo

test("integrity", function() {
	ok(_, "lodash exists");
	['inherits', 'overload']
		.forEach(function (method) {
			ok((method in _) && _.isFunction(_[method]), 'method _.' + method + '()');
		});
});

test('inheritance', function () {
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
	ok(square instanceof Square, '[instance] instanceof [constructor]');
	ok(square instanceof Shape, '[instance] instanceof [inheritedConstructor]');
	ok('getPos' in square, 'implicit inheritance');
	ok('getPos' in rect, 'explicit inheritance');
	ok(rect.getPos() === '[1x9]', 'traverse prototype chain');
});
