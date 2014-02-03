// make [child] inherit the prototype of [parent]
function inherits(child, parent) {
	'use strict';
	if (!_.isFunction(parent)) {
		parent = ('constructor' in parent) ? parent.constructor : null;
	}
	child.prototype.__proto__ = _.create(parent.prototype, {
		'constructor': child,
		'super_': parent
	});
}

_.inherits = inherits;
