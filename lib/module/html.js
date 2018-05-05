import { ObjectToArray, isObject } from './fn.js'

var text = function(el,text) {
	if(arguments.length>1) {
		el.textContent = text;
	} else {
		return el.textContent.trim();
	}
}

var html = function(el,html) {
	if(arguments.length>1) {
		el.innerHTML = html;
	} else {
		return el.innerHTML.trim();
	}
}

var val = function(el,val) {
	if(arguments.length>1) {
		el.value = val;
	} else {
		return el.value.trim();
	}
}

var attr = function(el,attr,value) {
	if(isObject(arguments[1])) {
		let attrs = ObjectToArray(arguments[1]);
		attrs.map(v=>_attr(el,v[0],v[1]));
	} else if(arguments.length>2) {
		el.setAttribute(attr,value);
	} else {
		return el.getAttribute(attr)
	}
}
var _attr = function(el,attr,value) {
	if(arguments.length>2) {
		el.setAttribute(attr,value);
	} else {
		return el.getAttribute(attr)
	}
}

var data = function(el,name,value) {
	if(arguments.length>2) {
		el.dataset[name] = value;
	} else {
		return el.dataset[name]
	}
}

var append = function(el,content) {
	content&&el.insertAdjacentHTML('beforeend', content);
}
var prepend = function(el,content) {
	content&&el.insertAdjacentHTML('afterbegin', content);
}
var after = function(el,content) {
	content&&el.insertAdjacentHTML('afterend', content);
}
var before = function(el,content) {
	content&&el.insertAdjacentHTML('beforebegin', content);
}


var empty = function(el) {
	el.innerHTML = "";
}
var remove = function(el) {
	el.parentNode.removeChild(el);
}
export {
	text,
	html,
	val,
	attr,
	data,
	append,
	prepend,
	after,
	before,
	empty,
	remove
}