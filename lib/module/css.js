import { ObjectToArray, isObject } from './fn.js'

var _css = function(el,attr,value) {
	if(arguments.length>2) {
		el.style[attr] = value;
	} else {
		return window.getComputedStyle(el,null)[attr];
	}
}

var css = function(el,attr,value) {
	if(isObject(arguments[1])) {
		let attrs = ObjectToArray(arguments[1]);
		attrs.map(v=>_css(el,v[0],v[1]));
	} else if(arguments.length>2) {
		el.style[attr] = value;
	} else {
		return window.getComputedStyle(el,null)[attr];
	}
}

export {
	css
}