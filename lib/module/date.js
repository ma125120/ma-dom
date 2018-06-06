var getWeekdays = function() {
	return ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
}
var getWeekdays0 = function() {
	return ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
}
var getMonths = function() {
	return ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
}
var getNowTime = function(d) {
	var timestamp = d || new Date(),
			year = timestamp.getFullYear(),
			month = timestamp.getMonth() + 1,
			date = timestamp.getDate(),
			day = timestamp.getDay();
	return {
		year,
		month,
		date,
		day,
		month_text: getMonths()[month-1],
		_month: month>=10?month:('0'+month),
		_date: date>=10?date:('0'+date),
		_day: getWeekdays()[day]
	}
}
var addDay = function(d,num) {
	var newDate = new Date(d.getTime() + num*24*60*60*1000);
	return getNowTime(newDate);
}
var getAweekday = function() {
	var nowDate = new Date(),
			now = getNowTime(nowDate),
			nowDay = now.day,
			arr = [];

	let index;
	for(let i = 0; i < (nowDay - 1);i++) {
		index = nowDay - i - 1;
		arr[index -1] = addDay(nowDate,(- i - 1));
	}
	for(let j = 0; j < ( 8 - nowDay);j++) {
		index = nowDay + j;
		arr[index -1] = addDay(nowDate, j);
	}
	return arr;
}