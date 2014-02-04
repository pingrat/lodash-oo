// make [child] inherit the prototype of [parent]
function inherits(child, parent) {
	'use strict';
	child.prototype.__proto__ = _.create(parent.prototype, {
		'constructor': child,
		'super_': parent
	});
	_.overload(child.prototype, parent.prototype);
	// and that's that!
}

_.inherits = inherits;
