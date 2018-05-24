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
var getOSS = function() {
	
}
// var getOSS = async function({url,ctx,file,success}) {
// 	var t = ctx;
// 	t.$req({
// 		url,
// 		async success({ message: {accessid, host, policy, signature, dir} }) {
// 			var form = new FormData(),
//   				randomName = getRandomName(file),
//   				filename = `${dir}${randomName}${getPostfix(file.name)}`
//   		form.append('key',`${filename}`);
//   		form.append('policy',policy);
//   		form.append('OSSAccessKeyId',accessid);
//   		form.append('success_action_status' , '200');
//   		form.append('signature',signature);

// 			form.append('file',file);
// 			let { status } = await this.$http({
//   			url: `${host}`,
//   			data: form,
// 				method: 'POST',
// 				onUploadProgress({ total, loaded }) {
//   				var progress = parseInt(loaded*100/total);
//   				t.progress = progress;
//   				if(progress>=100) {
//   					t.progress = 0;
//   					t.$openMsg('文件上传成功','success');
//   				}
//   			}
// 			});
// 			if(status == 200) {
// 				success.call(ctx||null,filename,file)
//   		} else {
//   			t.$openMsg('文件上传失败');
//   		}
// 		}
// 	})
	
// }
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
	if(name=="pptx" || name == "ppt" || name == "docx" || name=="doc" || name == "pdf") {
		type = "pdf";
	} else if(name=="mp4" ) {
		type = "video"
	} else if(name=="jpg" || name =="png" || name=="svg") {
		type = "img";
	} else if(name=="mp3") {
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
	rgbToHex
}