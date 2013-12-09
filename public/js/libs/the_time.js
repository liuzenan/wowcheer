/* JS???????
 * by qiqiboy imqiqiboy@gmail.com
 * Blog http://www.qiqiboy.com
 * ??: ??????? 2013-03-14 12:12:12
 *		the_time() 							?? 2013-03-14 12:12:12 (??????????)
 *		the_time('Y?m?d?') 				?? 2013?03?14?
 * 		the_time('Y?m?d?','2013-01-01')	?? 2013?01?01?
 *		the_time('Y?m?d?',1363242438610)	?? 2013?03?14?
 *		the_time('????????N?') 		?? ????????4?
 *		the_time('????????z?')		?? ????????73?
 *		the_time('???????W?')			?? ???????11?
 * ?????????,??????,??????:
 	var old='2012-12-30',
		month_zh=['?','?','?','?','?','?','?','?','?','?','??','??'],
		m=parseInt(the_time('n',old))-1;
	alert(month_zh[m]+'?');
	
 * @param String format ????,???'Y-m-d H:i:s',???????????
 *				?????????????(?????????,??,??),?????(??????)
 * @param String|Number timestamp ???????????,??1363242438610?2013-03-14 12:12:12
 *
 * Y 2013 ????
 * y 99 ????
 * m 01-12 ???????
 * n 1-12 ???????
 * d 01-31 ??????????
 * j 1-31 ??????????
 * W 0-53 ??????
 * z 0-366 ??????
 * w 0-6 ??????,???0
 * N 1-7 ??????,???7
 */
function timeFormatter(format, timestamp){
		var d=new Date();
		if(timestamp){
			if(!/^\d+$/.test(timestamp)){
				timestamp=Date.parse(timestamp);
			}
			d.setTime(timestamp);
		}
		format=format||'Y-m-d H:i:s';
		var year=d.getFullYear(),
			month=d.getMonth()+1,
			day=d.getDate(),
			hour=d.getHours(),
			minute=d.getMinutes(),
			second=d.getSeconds(),
			since=new Date();
		since.setTime(Date.parse(year+'-01-01 00:00:00'));
		return format.replace(new RegExp('Y|y|m|n|d|j|H|h|G|g|i|s|a|A|W|w|z|N','g'),function(flag){
			switch(flag){
				case 'Y':
					return year;
				case 'y':
					return year.toString().slice(-2);
				case 'm':
					return ('0'+month).slice(-2);
				case 'n':
					return month;
				case 'd':
					return ('0'+day).slice(-2);
				case 'j':
					return day;
				case 'h':
					return ('0'+(hour%12||12)).slice(-2);
				case 'H':
					return ('0'+hour).slice(-2);
				case 'G':
					return hour;
				case 'g':
					return hour%12||12;
				case 'i':
					return ('0'+minute).slice(-2);
				case 's':
					return ('0'+second).slice(-2);
				case 'a':
					return hour<12?'am':'pm';
				case 'A':
					return hour<12?'AM':'PM';
				case 'W':
					return Math.ceil((((since.getDay()||7)-1)*(24*60*60*1000)+d.getTime()-since.getTime())/(7*24*60*60*1000));
				case 'w':
					return d.getDay();
				case 'N':
					return d.getDay()||7;
				case 'z':
					return Math.ceil((d.getTime()-since.getTime())/(24*60*60*1000));
				default:
					return flag;
			}
		});
	}
function get_time_difference(d1,d2) {
       var laterDate, earlierDate;
       if (d1 < d2) {
        laterDate = d2;
        earlierDate = d1;
       } else {
        laterDate = d1;
        earlierDate = d2;
       }
       var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
       var oDiff = new Object();
 
       oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
       nTotalDiff -= oDiff.days*1000*60*60*24;
 
       oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
       nTotalDiff -= oDiff.hours*1000*60*60;
 
       oDiff.minutes = Math.floor(nTotalDiff/1000/60);
       nTotalDiff -= oDiff.minutes*1000*60;
 
       oDiff.seconds = Math.floor(nTotalDiff/1000);
 
       return oDiff;
 
}