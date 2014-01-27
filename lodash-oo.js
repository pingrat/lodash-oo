;(function () {

	// make [child] inherit the prototype of [parent]
	function inherits (child, parent) {
		if (!_.isFunction(parent)) {
			parent = ('constructor' in parent) ? parent.constructor : null;
		}
		child.prototype = _.create(parent.prototype, {
			'constructor': child,
			'super_': parent
		});
	}

	// copies all methods in [source] to [target], if the method
	// already exists in [target] it is updated to suppert accessing
	// the original method (in [source]) through this.super_
	function overload (target, source) {
		_.methods(source)
			.forEach(function (name) {
				if (_.isFunction(target[name])) {
					var original   = source[name],
					    overloaded = target[name];
					function wrapper () {
						var prevSuper = this.super_,
						    rv;
						this.super_ = original;
						rv = overloaded.apply(this, arguments);
						this.super_ = prevSuper;
						return rv;
					}
					target[name] = wrapper;
				}
				else if (_.isUndefined(target[name])) {
					Object.defineProperty(target, name,
						source.getOwnPropertyDescriptor(name));
				}
				// [target] is leading so we only modify the
				// value if it's a method or undefined
			});
	}

	// walks a [context] according to [path] and return
	// the (value of) destination node
	function walk (context, path) {
		var levels = path.split('.'),
		    storeName = levels.shift();
		while (levels.length > 0) {
			var next = levels.shift();
			if (_.isUndefined(context[next]))
				return null;
			context = context[next];
		}
		return context;
	}

	// builds an object structure in [context] according
	// to [path] and return the deepest node
	function build (context, path) {
		var levels = path.split('.');
		while (levels.length > 0) {
			var next = levels.shift();
			if (_.isUndefined(context[next]))
				context[next] = _.create(null);
			context = context[next];
		}
		return context;
	}

	//@public
	_.inherits = inherits;
	_.overload = overload;
	_.walk     = walk;
	_.build    = build;

}());
