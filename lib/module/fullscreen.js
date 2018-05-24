var fullscreen = function(el,status='open') {
	var prefixs = {
		open: ['requestFullscreen','webkitRequestFullscreen','mozRequestFullScreen','msRequestFullscreen'],
		close: ['exitFullscreen','webkitExitFullscreen','mozCancelFullScreen','msExitFullscreen']
	},
	flag = true;
	prefixs[status]&&(prefixs[status].map(function(prefix) {
		if(status == 'open' && el[prefix] && flag) {
			el[prefix]();
			flag = false;
		}
		if(status != 'open' && document[prefix] && flag) {
			document[prefix]();
		}
	}));
}

export {
	fullscreen
}