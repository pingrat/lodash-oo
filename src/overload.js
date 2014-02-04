// copies all methods in [source] to [target], if the method
// already exists in [target] it is updated to support accessing
// the original method (in [source]) through this.super_
function overload(target, source) {
	'use strict';

	_.methods(source)
		.forEach(function(name) {
			// [target] is leading so we only modify the
			// value if it's a method or undefined
			if (_.isFunction(target[name])) {
				var original = source[name],
				    overloaded = target[name],
				    wrapper;
				target[name] = function() {
					var prev_ = this.super_,
						rv;
					this.super_ = original;
					rv = overloaded.apply(this, arguments);
					this.super_ = prev_;
					return rv;
				};
			} else if (_.isUndefined(target[name])) {
				Object.defineProperty(target, name,
					source.getOwnPropertyDescriptor(name));
			}
		});
}

_.overload = overload;
