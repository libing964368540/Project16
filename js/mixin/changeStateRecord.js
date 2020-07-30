var RecordTemplate=`<div class="record">
           	     	  	 <p v-show="record.length==0">暂无</p>
           	     	  	 <div class="flex just-center list" v-for="(item,index) in record">
           	     	  	   	  <span v-text="getYmd(item.time)"></span><span v-text="operationList[item.state1]"></span>
           	     	  	   	  <span v-text="getJson(item.json)" style="width: 1rem;overflow: hidden;"></span><span v-text="NowStateList[item.state1]"></span>
           	     	  	 </div>
           	     	 </div>`;

Vue.component('state-record',{
	template:RecordTemplate,
	data(){
		return {
			operationList:['归还','调整','维修','报废','',''],
			NowStateList:['已归还','使用中','维修中','已报废','',''],
		}
	},
	props:{
		"record": {
		   type:Array,
		default:function () {
			   return []
		     }
		   }
	},
	methods:{
		getYmd(time) {
			if(time){
				var date = new Date(parseInt(time));
			    return date.getFullYear() + '年' + this.buqi(date.getMonth() + 1)+'月'+this.buqi(date.getDate())+'日' 
			}else{
				return ''
			}	
		},
		//获取资产状态变更记录中的数据
		getJson:function(data){
				var Json = JSON.parse(data);
				return Json.borrowUGroupName;
		},
		buqi:function(str){
			return str < 10 ? '0' + str : str;
		}
	}
})