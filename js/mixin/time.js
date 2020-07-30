var TemplateForTime =` <div class="flex flex-y-center just-center" id="pandianTime" @tap="init">
		        	       <span class="inputTitle" style="color:#cccccc" v-show="!time">开始时间</span>
		        	       <p  style="color: #444444;padding: 0;font-size:18px;" v-text="time" v-show="time"></p>
						   <span>至</span>
		              </div>`

Vue.component('choose-time', {
	 template:TemplateForTime,
	data(){
		return {
			time:''
		}
	},
	methods:{
		//初始化时间
		init:function(){
			var that = this;
			var dDate = new Date();
			dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
			var minDate = new Date();
				minDate.setFullYear(2010, 0, 1);
			var maxDate = new Date();
			    maxDate.setFullYear(2099, 11, 31);
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
					that.time = d.getFullYear() + "-" + that.buqi(d.getMonth() + 1) + "-" + that.buqi(d.getDate());
					var getTime=new Date(that.time.replace(/-/g, '/')+' '+'00:00:00').getTime()
					    console.log(getTime)
					var params={
						time:getTime
					}
					that.$emit('get',params);
			}, function(e) {
			
			}, {
				title: "请选择日期",
				date: dDate,
				minDate: minDate,
				maxDate: maxDate
			});
		},
		buqi:function(str){
			return str < 10 ? '0' + str : str;
		}
		//当时间改变之后触发父组件的获取记录
	}
})	

var TemplateForTime2 =` <div class="flex flex-y-center just-center" id="pandianTime2" @tap="init">
		        	       <span class="inputTitle" v-show="!time" style="color:#cccccc">结束时间</span>
		        	       <p  style="color: #444444;padding:0;font-size:18px;" v-show="time" v-text="time"></p>
		              </div>`

Vue.component('choose-end', {
	 template:TemplateForTime2,
	data(){
		return {
			time:''
		}
	},
	methods:{
		//初始化时间
		init:function(){
			var that = this;
			var dDate = new Date();
			dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
			var minDate = new Date();
				minDate.setFullYear(2010, 0, 1);
			var maxDate = new Date();
			    maxDate.setFullYear(2099, 11, 31);
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
					that.time = d.getFullYear() + "-" + that.buqi(d.getMonth() + 1) + "-" + that.buqi(d.getDate());
					var getTime=new Date(that.time.replace(/-/g, '/')+' '+'23:59:59').getTime()
					    console.log(getTime)
					var params={
						time:getTime
					}
					that.$emit('get',params);
			}, function(e) {
			
			}, {
				title: "请选择日期",
				date: dDate,
				minDate: minDate,
				maxDate: maxDate
			});
		},
		buqi:function(str){
			return str < 10 ? '0' + str : str;
		}
		//当时间改变之后触发父组件的获取记录
	}
})
				  