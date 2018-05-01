import { ObjectToArray, isObject } from './fn.js'

function _$(selector) {
    var t=this;
    if(typeof selector=="string") {
    	var eles=Array.prototype.slice.call(document.querySelectorAll(selector),0);
	    eles.map(function(_v,_i) {
	        t[_i]=_v;
	    });
	    t.length=eles.length;
    } else if(typeof selector == "object"){
    	t[0] = selector;
    	t.length = 1;
    }
    
    return t;
}
_$.prototype.each = function(fn,...args) {
    var len = this.length,
        t =this;
    for(let i = 0;i<len;i++) {
        fn.call(t[i],t[i],...args);
    }
}
_$.prototype.map = function(fn) {
    var len = this.length,
        t =this;
    for(let i = 0;i<len;i++) {
        fn.call(t[i],t[i],i);
    }
}
function $(selector) {
  return new _$(selector);
}
$.fn = {};
$.fn.extend = function(name,fn) {
    _$.prototype[name] = function(...args) {
        if(args.length == 0) {
            return fn(this[0]);
        }else if((name == "attr" || name == "css" || name == "data") && args.length==1 && !isObject(args[0])) {
            return fn(this[0],args[0]);
        } else {
            this.each(fn,...args);
            return this;
        }
    }
}
// $.fn.extend("test",function() {
//     console.log("test")
// })
export default $;


