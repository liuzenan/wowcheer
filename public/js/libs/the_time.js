/* JS日期格式化函数
 * by qiqiboy imqiqiboy@gmail.com
 * Blog http://www.qiqiboy.com
 * 示例： 假定当前时间为 2013-03-14 12:12:12
 *		the_time() 							输出 2013-03-14 12:12:12 (当前日期的标准化格式)
 *		the_time('Y年m月d日') 				输出 2013年03月14日
 * 		the_time('Y年m月d日','2013-01-01')	输出 2013年01月01日
 *		the_time('Y年m月d日',1363242438610)	输出 2013年03月14日
 *		the_time('今天是本周中的第N天') 		输出 今天是本周中的第4天
 *		the_time('今天是本年中的第z天')		输出 今天是本年中的第73天
 *		the_time('今天是一年中第W周')			输出 今天是一年中第11周
 * 如果要实现复杂格式，比如一月二月，可以如下实现：
 	var old='2012-12-30',
		month_zh=['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		m=parseInt(the_time('n',old))-1;
	alert(month_zh[m]+'月');
	
 * @param String format 输出格式，默认为'Y-m-d H:i:s'，可用格式符参考下边说明
 *				如果需要输出更文字类型日期（一月二月或者星期三，上午，下午），请自行实现（已经很容易了）
 * @param String|Number timestamp 时间戳或者标准时间格式，例如1363242438610或2013-03-14 12:12:12
 *
 * Y 2013 四位年份
 * y 99 二位年份
 * m 01-12 有前导零的月份
 * n 1-12 无前导零的月份
 * d 01-31 有前导零的每月第几天
 * j 1-31 无前导零的每月第几天
 * W 0-53 一年中第几周
 * z 0-366 一年中第几天
 * w 0-6 一周中第几天，周日为0
 * N 1-7 一周中第几天，周日为7
 */
	function the_time(format, timestamp){
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