import $ from './module/selector.js';
import {
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
} from './module/html.js';

import { animate } from './module/animate.js'

import { css } from './module/css.js';

import {
	getBox,
	getElementPos,
	getScroll,
	getViewportSize
} from './module/size.js';

import { iteratorObj } from './module/fn.js';

var fullscreen = function(el,status='open') {
	var prefixs = {
		open: ['requestFullscreen','webkitRequestFullscreen','mozRequestFullScreen','msRequestFullscreen'],
		close: ['exitFullscreen','webkitExitFullscreen','mozCancelFullScreen','msExitFullscreen']
	},
	flag = true;
	prefixs[status]&&(prefixs[status].map(function(prefix) {
		if(el[prefix] && flag) {
			el[prefix]();
			flag = false;
		}
	}));
}

//Object.keys可枚举属性
//Object.getOwnPropertyNames包括不可枚举属性

export {
	fullscreen,
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
	remove,
	css,
	animate,
	getBox,
	getElementPos,
	getScroll,
	getViewportSize
}
