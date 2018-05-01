import $ from '../module/selector.js';
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
} from '../module/html.js';

import { animate } from '../module/animate.js'

import { css } from '../module/css.js';

import {
	getBox,
	getElementPos,
	getScroll,
	getViewportSize
} from '../module/size.js';

import { addEvent, removeEvent, on, off } from '../module/event.js'

import { fullscreen } from '../module/fullscreen.js'

import {
	ObjectToArray,
	isArray,
	isObject,
	isFunction,
	toFormData,
	setStoreData,
	setVueData
} from '../module/fn.js'


$.fn.extend("css",css);

$.fn.extend("text",text);
$.fn.extend("html",html);
$.fn.extend("val",val);
$.fn.extend("attr",attr);
$.fn.extend("data",data);

$.fn.extend("append",append);
$.fn.extend("prepend",prepend);
$.fn.extend("after",after);
$.fn.extend("before",before);
$.fn.extend("empty",empty);
$.fn.extend("remove",remove);

$.fn.extend("getBox",getBox);
$.fn.extend("getElementPos",getElementPos);

$.getScroll = getScroll;
$.getViewportSize = getViewportSize;

$.fn.extend("addEvent",addEvent);
$.fn.extend("removeEvent",removeEvent);
$.fn.extend("on",on);
$.fn.extend("off",off);

$.ObjectToArray = ObjectToArray;
$.isArray = isArray;
$.isObject = isObject;
$.isFunction = isFunction;
$.toFormData = toFormData;
$.fullscreen = fullscreen;
$.setStoreData = setStoreData;
$.setVueData = setVueData;

export default $;