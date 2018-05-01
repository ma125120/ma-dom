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
var isArray = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Array";
};
var isObject = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Object";
};
var isFunction = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Function";
};

var ObjectToArray = function(obj) {
	let result;
	if(isObject(obj)) {
		let keys = Object.keys(obj);
		result = keys.reduce((arr,key)=>arr.concat([[key,obj[key]]]),[]);
	}

	return result;
}

var toFormData = function(obj, prefix = false) {
	let result;
	if(isObject(obj)) {
		let arr = ObjectToArray(obj);
		result = arr.map(item=>{
			return item.join("=")
		}).join("&");
		prefix && (result = "?" + result);
	}

	return result;
}
var setStoreData = function setStoreData(state,keys,data) {
	if(!isArray(keys)) {
		throw new Error("keys必须为数组");
	}
	var [first, ...arr] = keys;
	var obj = state[first];
	if(isArray(obj)) {
		obj = [...obj];
	} else if(isObject) {
		obj = Object.assign({},obj);
	}

	arr.reduce((obj,name,i)=>{
		obj[name] = obj[name] || {};
		if(i == arr.length-1) {
			obj[name] = data;
		}
		return obj[name];
	},obj);

	state[first] = obj;
}
var setVueData = function(ctx,obj) {
	var keys = Object.keys(obj);
	keys.map(key=>{
		ctx[key] = obj[key];
	});
}
// var ctx = {
// 	test:"asd"
// }
// setVueData(ctx,{test:123})
// var state = {
// 	lists : [{
// 		id:1,
// 		str:"213",
// 		child:{
// 			"test":"test child"
// 		}
// 	},{
// 		id:2,
// 		str:"asd"
// 	}]
// };
// setStoreData(state,["lists",0,"child"],{});
// console.log(state.lists[0])
// toFormData({a:123,b:23})
export {
	iteratorObj,
	ObjectToArray,
	toFormData,
	isArray,
	isObject,
	isFunction,
	setStoreData,
	setVueData
}