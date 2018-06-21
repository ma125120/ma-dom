# ma-dom
封装常用的DOM函数

## Features

- $
- fullscreen
- text,html,val,attr,data
- append,prepend,after,before,empty,remove
- css
- animate(不推荐，还不完善，建议使用CSS3动画)
- getBox,getElementPos,getScroll,getViewportSize
- addEvent,removeEvent,on,off
- isArray,isObject,isFunction,ObjectToArray,toFormData,setStoreData,openFile,getRandom,getFileUrl,storeSelection,copy
	
完整的引入方式为：
```javascript
import {
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
	getRandom,
	openFile,
	getFileUrl,
	storeSelection,
	copy,
	xss,
	getPostfix,
	getType,
	toArray,
	validateData,
	rgbToHex,
} from 'ma-dom'

```

### 类似jQuery的$

上文中的$只是一个简单的包装过的选择器，提供了扩展的方法，还需要自己进行扩展。
也可以使用包含上述功能的$方法，使用方法大致类似于jQuery

```javascript
import $ from 'mma-dom/lib/jq/'
```

## Installing

Using npm:
	
```bash
$ npm install ma-dom
```
## Example

### 选择器$

1.  传入一个类似CSS3选择器的参数，返回一个类数组的选择器对象，可以通过数组索引转化为原生DOM对象。
2.  可以通过$.fn.extend(name,fn)扩展选择器对象的方法，第一个参数为函数名，第二个参数为函数体，默认会将原生DOM作为函数的第一个参数。(这个不太好描述，有时间再说吧)。

### fullscreen全屏模式

```javascript
fullscreen(el,status);
第一个参数为需要全屏的元素，第二个参数为开启或关闭，对应的参数为open/close
```

### DOM内容获取与设置

1. text(el,text);第二个参数存在时设置el的文本内容，第二个参数不存在时获取el的文本内容。
2. html(el,html);第二个参数存在时设置el的html内容，第二个参数不存在时获取el的html内容。
3. val(el,val);第二个参数存在时设置表单el的值，第二个参数不存在时获取el的值。
4. data(el,name,value);value存在时设置el的data-[name]的值，value不存在时获取el的data-[name]的值。
5. attr(el,name,value);value存在时设置el的名为name的属性的值，value不存在时获取el的名为name的属性的值。
6. <b>data和attr方法也可以使用对象参数进行设置，比如attr(body,"width","300px")和atrr(body,{width:"300px"})都是可以的</b>
### DOM添加与删除

1.  append(el,html)在el内部的最后面添加html。
2.  prepend(el,html)在el内部的最前面添加html
3.  after(el,html)在el的后方添加html，与el同级。
4.  before(el,html)在el的前方添加html，与el同级。
5.  empty(el)清空el的内部元素和文本。
6.  remove(el)从父元素中移除el元素。

### CSS属性的获取与设置

css(el,name,value)当value存在时设置el的css name属性的值;value不存在时获取el的css name属性的值。
css(el,"width","300px")和css(el,{width:"300px"})都可以使用。

### 获取元素的位置信息

1.  getBox(el)获取元素的DOMRect信息，调用了getBoundingClientRect方法
2.  getElementPos(el)获取元素相对于文档窗口的横纵坐标，返回值为{x,y}
3. 	getScroll()获取滚动条的横纵距离,返回值为{x,y}
4.	getViewportSize()获取视口宽度

### 事件

1.  addEvent(el,type,listener);在el上绑定类型为type的事件，监听事件为listener
2. 	removeEvent(el,type);在el上移除类型为type的事件
3.	on(parent,type,target,listener);使用<b>事件委托</b>的方式在父元素parent上监听真正的触发元素target的type事件。
4. 	off(parent,type,target);移除parent上关于target元素的type事件的事件委托。

### 常用函数

1.  isArray(data)判断传入的参数是否为数组
2.  isObject(data)判断传入的参数是否为对象
3.  isFunction(data)判断传入的参数是否为函数
4.  ObjectToArray(obj)将传入的对象转化为一个包含键值对的二维数组;如{a:123,b:456}将被转化为[["a",123],["b",456]];
5.  toFormData(obj,prefix)将传入的对象转化为符合表单请求的字符串，第二个参数决定是否在字符串的最前方添加？,默认为false。toFormData({a:"test",b:"test1"},true)将返回  "?a=test&b=test1"。
6.  setStoreData(state,keys,data);可用于vuex或者vue,
```javascript
例如vuex,
var state = {
	lists : [{
		id:1,
		str:"213",
		child:{
			"test":"test child"
		}
	},{
		id:2,
		str:"asd"
	}]
};
setStoreData(state,["lists",0,"child"],{"new-child":"new-child"});
console.log(state.lists[0]);

使用该函数即可轻松改变嵌套多层的对象。state为最顶层的对象，keys为每一层的键名，data为需要替换的数据。
在vue中使用时第一参数写成this即可
```

7.  getRandom(length);获取长度为length的随机数;
8.  getFileUrl(e,cb);第一个参数为事件对象，第二个参数为回调函数，回调函数的第一个参数是文件的dataURL;常用于```html <input type="file">```的change事件
9.  openFile(cb);需要传入回调函数。触发该函数后，会自动打开选择文件的弹窗，选择完毕后dataURL会作为回调函数的第一个参数,file为第二个参数，files为第三个参数
10.  copy(el);将需要复制内容的DOM元素作为参数传入，即可将该DOM元素的内容复制至剪贴板。如果需要隐藏元素，请使用```css opacity:0;position:fixed;top:-10000px;left:-10000px;z-index: -100;```;<b>使用display: none或者visibility: hidden会造成无法复制现象。</b>
11.  storeSelection(el,start);存储某个节点的选区信息，选中该节点的全部区域。传入第二个参数时，只保留光标的最终状态，不会选中其他部分。<b>注意：调用该方法后，会导致其他输入区域无法使用，还需要调用window.getSelection().removeAllRanges()方法移除之前的选取</b>
12.  getPostfix(name);获取文件名的后缀
13.  toArray(data);将类数组转换为数组；
14.  rgbToHex(rgb);将rgb的颜色代码转为16进制；如rgb(255,0,0)将被转换为"#FF0000";
15.  validateData(data,regs);对输入的数据进行验证;	返回为null表示数据完全合法;不合法时将返回{msg:String,error:Boolean}

```javascript
var data = {
	username: 123546
},regs = [{
	name: 'tel',
	reg: /\w{6,20}/g,
	msg:'错误信息'
}];

validateData(data,regs);
```