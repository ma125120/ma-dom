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
	getViewportSize,
	gotoTop
} from './module/size.js';

import { iteratorObj } from './module/fn.js';

import { fullscreen } from './module/fullscreen.js'

import {
	ObjectToArray,
	isArray,
	isObject,
	isFunction,
	toFormData,
	setStoreData,
	setVueData,
	openFile,
	getRandom,
	getFileUrl,
	storeSelection,
	copy,
	xss,
	getPostfix,
	getType,
	getOSS,
	toArray,
	rgbToHex,
} from './module/fn.js'

import { 
	addEvent,
	on,
	removeEvent,
	off  
} from './module/event.js'
//Object.keys可枚举属性
//Object.getOwnPropertyNames包括不可枚举属性

export {
	$,

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
	getViewportSize,

	addEvent,
	removeEvent,
	on,
	off,

	ObjectToArray,
	isArray,
	isObject,
	isFunction,
	toFormData,
	setStoreData,
	setVueData,
	openFile,
	getRandom,
	getFileUrl,
	storeSelection,
	copy,
	xss,
	getPostfix,
	getType,
	getOSS,
	toArray,
	rgbToHex,

	gotoTop
}
