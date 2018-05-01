import $ from './selector.js'

var addEvent = function(el,type,listener,child) {
	var prefix = "__" + type + child;
	el[prefix] = el[prefix] || [];
	el[prefix].push(listener.bind(el));
	el.addEventListener(type,el[prefix].slice(-1)[0],false)
}
var removeEvent = function(el,type,child) {
	var prefix = "__" + type + child;
	el[prefix] = el[prefix] || [];
	el[prefix].map(fn=>el.removeEventListener(type,fn,false));
	el[prefix] = [];
}

var on = function(parent,type,target,listener) {
	addEvent(parent,type,function(e) {
		var els = $(target),
				targetElement = e.target;
		els.each(el=>{
			if(el == targetElement) {
				listener.call(el,e);
			}
		})
	},target)
}
var off = function(parent,type,target) {
	removeEvent(parent,type,target);
}
export {
	addEvent,
	on,
	removeEvent,
	off
}
