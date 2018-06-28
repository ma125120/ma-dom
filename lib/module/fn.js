import {
	append,
	remove
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
	if(arr.length == 0) {
		state[first] = data;
	} else {
		state[first] = obj;
	}

	return state;
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


var openFile = (function openFile() {
	var id = "_" + getRandom(4);
	return function(cb) {
		if($("#"+id).length == 0) {
			append(document.body,`<input id="${id}" style="${getHiddenStyle()}" type="file" />`);
			addEvent($("#"+id)[0],"change",function(e) {
				getFileUrl(e,cb);
				setTimeout(()=>{
					remove(e.target);
				},50);
			});
		}
		$("#"+id)[0].click();
	}
})();
var getFileUrl = function getFileUrl(e,cb) {
	if(!e.target.files[0]) return;
	var file = e.target.files[0],
		files = e.target.files,
		file_type = file.type.split("/")[0];

	if(file_type != 'image') {
		cb(null,file,files,file_type)
	} else {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("load", function () {
	    cb(reader.result,file,files,file_type);
	  }, false);
	}
}
var getOSS = function() {
	
}

var getRandomName = function() {
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var rand = '',
			len = 2;
　　for (let i = 0; i < len; i++) {
	rand += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return `${Date.now()}${rand}`
}
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

var getPostfix = function(name,num = 0) {
	return name.slice(name.lastIndexOf("\.") + num);
}
var getType = function(name) {
	var type = "";
	if(name=="pptx" || name == "ppt" || name == "docx" || name=="doc" || name == "pdf" || name == "xls" || name=='xlsx') {
		type = "pdf";
	} else if(name=="mp4" || name=="ogv" || name=="avi") {
		type = "video"
	} else if(name=="jpg" || name =="png" || name=="svg") {
		type = "img";
	} else if(name=="mp3" || name == 'ogg' || name == 'wav' || name=='opus') {
		type="audio"
	}
	return type;
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

var toArray = function(obj) {
	return [].slice.call(obj);
}
var rgbToHex = function(rgb) {
	var str = rgb.replace(/rgb\((.+)\)/g,function(match,$1) { return $1; });
	var	arr = str.split(",").map(v=>parseInt(v).toString(16)).map(v=>v.length == 1 ? ('0'+v) : (v));
	
  return `${arr[0]}${arr[1]}${arr[2]}`;
}
var validateData = function(data,regs) {
	var obj = null,
			name,
			value,
			reg;
			
	if(Array.isArray(regs)) {
		for(let i = 0,len =regs.length;i<len;i++) {
			name = regs[i].name;
			value = data[name];
			reg = regs[i].reg;
			if(!value) {
				obj = {
					msg: `${regs[i].field||name}不能为空`,
					error: true
				}
				break;
			} else if(reg && !reg.test(value)) {
				obj = {
					msg: regs[i].msg || `${name}不符合格式`,
					error: true
				}
				break;
			}
		}
	}

	return obj;
}
// var data = {
// 	tel: '2'
// },regs = [{
// 	name: 'tel',
// 	reg: /\d+/g,
// 	msg:'错误信息'
// }];

// validateData(data,regs);

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
	xss,
	getPostfix,
	getType,
	getOSS,
	toArray,
	rgbToHex,
	validateData
}