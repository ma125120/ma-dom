var iteratorObj = function(obj) {
	if(!obj[Symbol.iterator]) {
		obj[Symbol.iterator] = function() {
			var keys = Object.getOwnPropertyNames(obj),
					len = keys.length,
					index = 0;
			return {
				next() {
					if(index < len) {
						index = index+1;
						return {
							value: obj[keys[index-1]],
							done: false
						};
					} else {
						return { value: undefined, done: true };
					}
				}
			}
		}
	}
	return obj
}

export {
	iteratorObj
}