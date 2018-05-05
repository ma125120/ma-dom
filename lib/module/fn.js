import {
	append
} from './html.js';
import $ from './selector.js'
import { addEvent } from './event.js'

var iteratorObj = function(obj) {
	if(!obj[Symbol.iterator]) {
		obj[Symbol.iterator] = function() {
			var keys = Object.getOwnPropertyNames(obj),
					len = keys.length,
					index = 0;
			return {
				next() {
					if(index < len) {
						index = index+1;
						return {
							value: obj[keys[index-1]],
							done: false
						};
					} else {
						return { value: undefined, done: true };
					}
				}
			}
		}
	}
	return obj
}
var isArray = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Array";
};
var isObject = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Object";
};
var isFunction = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Function";
};

var ObjectToArray = function(obj) {
	let result;
	if(isObject(obj)) {
		let keys = Object.keys(obj);
		result = keys.reduce((arr,key)=>arr.concat([[key,obj[key]]]),[]);
	}

	return result;
}

var toFormData = function(obj, prefix = false) {
	let result;
	if(isObject(obj)) {
		let arr = ObjectToArray(obj);
		result = arr.map(item=>{
			return item.join("=")
		}).join("&");
		prefix && (result = "?" + result);
	}

	return result;
}
var setStoreData = function setStoreData(state,keys,data) {
	if(!isArray(keys)) {
		throw new Error("keys必须为数组");
	}
	var [first, ...arr] = keys;
	var obj = state[first];
	if(isArray(obj)) {
		obj = [...obj];
	} else if(isObject) {
		obj = Object.assign({},obj);
	}

	arr.reduce((obj,name,i)=>{
		obj[name] = obj[name] || {};
		if(i == arr.length-1) {
			obj[name] = data;
		}
		return obj[name];
	},obj);

	state[first] = obj;
}
var setVueData = function(ctx,obj) {
	var keys = Object.keys(obj);
	keys.map(key=>{
		ctx[key] = obj[key];
	});
}

var getRandom = function(length) {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	var maxPos = chars.length;
	var rand = '';
	for (let i = 0; i < length; i++) {
	  rand += chars.charAt(Math.floor(Math.random() * maxPos));
	}
  return rand;
}

var getFileUrl = function getFileUrl(e,cb) {
	var file = e.target.files[0],
			files = e.target.files;
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.addEventListener("load", function () {
    cb(reader.result,file,files);
  }, false);
}
var openFile = (function openFile() {
	var id = "_" + getRandom(4);
	return function(cb) {
		if($("#"+id).length ==0) {
			append(document.body,`<input id="${id}" style="${getHiddenStyle()}" type="file" />`);
			addEvent($("#"+id)[0],"change",function(e) {
				getFileUrl(e,cb);
			})
		}
		$("#"+id)[0].click();
	}
})();
var getHiddenStyle = function() {
	return `position:fixed;top:-10000px;left:-100px;z-index:-100;opacity:0;`;
}

var storeSelection = function(el,start) {
	var range = document.createRange();
	var end = el.childNodes.length;
	range.setStart(el,start?end:0);
	range.setEnd(el,end);

	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

var copy = function copy(el) {
	var range = document.createRange();
	var end = el.childNodes.length;
	range.setStart(el,0);
	range.setEnd(el,end);

	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand("copy",false,null);
	selection.removeRange(range);
}
function xss(html,regArr) {
	var arr = [[/&/g,"&amp;"],[/</g,"&lt;"],[/>/g,"&gt;"],[/\'/g,"&#39;"],[/\"/g,"&quot;"]],
			regArr = regArr;
	if(isArray(regArr) && isArray(regArr[0])) {
		regArr = [...regArr,...arr];
	} else {
		console.error("传入的参数不符合,已替换为默认参数");
		regArr = arr;
	}
	return regArr.reduce((html,arr)=>html.replace(arr[0],arr[1]),html);
}


// var ctx = {
// 	test:"asd"
// }
// setVueData(ctx,{test:123})
// var state = {
// 	lists : [{
// 		id:1,
// 		str:"213",
// 		child:{
// 			"test":"test child"
// 		}
// 	},{
// 		id:2,
// 		str:"asd"
// 	}]
// };
// setStoreData(state,["lists",0,"child"],{});
// console.log(state.lists[0])
// toFormData({a:123,b:23})
export {
	iteratorObj,
	ObjectToArray,
	toFormData,
	isArray,
	isObject,
	isFunction,
	setStoreData,
	setVueData,
	openFile,
	getRandom,
	getFileUrl,
	storeSelection,
	copy,
	xss
}