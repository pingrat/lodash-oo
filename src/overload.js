// copies all methods in [source] to [target], if the method
// already exists in [target] it is updated to support accessing
// the original method (in [source]) through this.super_
function overload(target, source) {
	'use strict';
	_.methods(source)
		.forEach(function(name) {
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
			}
			else {
				Object.defineProperty(target, name, {
					enumerable: false,
					configurable: false,
					writeable: false,
					value: source[name]
				});
			}
		});
}

_.overload = overload;
