var css = function(el,attr,value) {
	if(value) {
		el.style[attr] = value;
	} else {
		return window.getComputedStyle(el,null)[attr];
	}
}

export {
	css
}