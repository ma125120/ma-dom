'use strict';
function _$(selector) {
    var t=this;
    if(typeof selector=="string") {
    	var eles=Array.prototype.slice.call(document.querySelectorAll(selector),0);
	    eles.map(function(_v,_i) {
	        t[_i]=_v;
	    });
	    t.length=eles.length;
    } else if(typeof selector=="object"){
    	t[0] = selector;
    	t.length = 1;
    }
    
    return t;
}
function $(selector) {
  return new _$(selector);
}
$.fn = {};
$.fn.extend = function(name,fn) {
    _$.prototype[name] = fn;
}
$.fn.extend("test",function() {
    console.log("test")
})
export default $;


