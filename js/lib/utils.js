	function chageTime(time) {
		if(time){
			var date = new Date(parseInt(time));
		}else{
			var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		}
		
		Y = date.getFullYear() + '/';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes() + '';
		s = date.getSeconds();
		return Y + M + D + h + m;
	}
// 时间戳  转化成  年月日
	function getYmd(time) {
		var date = new Date(parseInt(time));
		return date.getFullYear() + '年' + (date.getMonth() + 1)+'月'+date.getDate()+'日' 
	}
	function buqi(str) {
		return str < 10 ? '0' + str : str;
	}
// 时间戳 转化成 2019-10-11
	function changeYmd(time){
		var date = new Date(parseInt(time));
		return date.getFullYear() + '-' + buqi(date.getMonth() + 1)+'-'+buqi(date.getDate()) 
	}
	
	Array.prototype.remove = function(val) { 
	var index = this.indexOf(val); 
	if (index > -1) { 
	this.splice(index, 1); 
	} 
	};
	 