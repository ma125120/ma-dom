var getBox = function(el) {
	return el.getBoundingClientRect();
}
var getElementPos = function(el) {
	var x= 0, y =0;
	for(var e = el;e != null; e= e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	for(var e = el.parentNode;e != null && e.nodeType == 1;e = e.parentNode) {
		x -= e.scrollLeft;
		y -= e.scrollTop;
	}
	return {
		x,
		y
	}
}

var getScroll = function() {
	var w = window;
	if(w.pageXOffset != null) {
		return {
			x: w.pageXOffset,
			y: w.pageYOffset
		}
	}

	var d = w.document;
	if(document.compatMode == "CSS1Compat") {
		return {
			x: d.documentElement.scrollLeft,
			y: d.documentElement.scrollTop
		}
	}

	return {
		x: d.body.scrollLeft,
		y: d.body.scrollTop
	}
}
var getViewportSize = function() {
	var w = window;
	if(w.innerWidth != null) {
		return {
			w: w.innerWidth,
			h: w.innerHeight
		}
	}

	var d = w.document;
	if(document.compatMode == "CSS1Compat") {
		return {
			x: d.documentElement.clientWidth,
			y: d.documentElement.clientHeight
		}
	}

	return {
		x: d.body.clientWidth,
		y: d.body.clientHeight
	}
}

var gotoTop = function () {
	var h= getScrollTop(),
	  	i=0,
	  	time = 300,
	  	to=0;
	var tid = setInterval(()=>{

	 		let height = h-(h/(time/20))*i;
	  	if(height > to) {
	  		window.scrollTo(0,height);
	  	} else {
	  		window.scrollTo(0,0);
	  		clearInterval(tid);
	  	}
	  	i++;
	 },20);
}
var getScrollTop = function(){
		　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		　　if(document.body){
		　　　　bodyScrollTop = document.body.scrollTop;
		　　}
		　　if(document.documentElement){
		　　　　documentScrollTop = document.documentElement.scrollTop;
		　　}
		　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		　　return scrollTop;
};
export {
	getBox,
	getElementPos,
	getScroll,
	getViewportSize,
	gotoTop
}