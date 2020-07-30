var templateS=`<div> 
                  <div v-for="(itemS,indexS) in titles">
				      <div  style="padding:0.2rem 0.2rem;background:#ffffff;color:#3941b6;margin-bottom:0.02rem;" class="flex just-center flex-y-center" @tap="IsOpenBtn(itemS)"><span v-text="itemS.Title"></span>
					        <div>
							      <span v-text="itemS.List.length"></span>
							      <i class="material-icons" v-text="itemS.IsOpen?'keyboard_arrow_down':'keyboard_arrow_right'" style="vertical-align: middle"></i>
							</div>
							
						</div>
                      <ul class="deatils" v-show="itemS.IsOpen">
					    <li  v-for="(item,index) in itemS.List">
					        <dl class="flex flex-y-center">
					          <dt>
							  <img :src="item.images!=''&&item.images!='暂无'?window.apiurl+item.images:imgs"></dt>
					     		<dd class="flex flex-cloumn just-center" @tap="jump('../component/output.html',item,indexS,index)">
					     		    <span v-text="item.title" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:1.5rem;"></span>
					     				 <p v-text="item.code"></p>
					     				 <p v-text="item.borrowUGroupName+borrowUReadlname(item)"></p>
					     		</dd>
								<em :type="item.state" v-text="stateArr[item.state]" v-if="item.id"></em>
								<em :type="6" style="right:0.15rem" v-show="!item.tag&&item.id" @tap="tag(item,1)">标记</em>
								<em :type="7" style="right:0.15rem"v-show="item.tag" @tap="tag(item,0)" >标记</em>
					     		<i class="material-icons" v-show="item.rfidState">check_circle</i>
								<i v-if="!item.id" @tap="getRFID(item.rfid,index)" style="font-style: normal">查看</i>
					       </dl>
					   </li>
                     </ul>
				  </div>
                  
			  </div>` 

Vue.component('item-li', {
	props: {
         "titles": {
            type: Array,
         default: function () {
			return []
             }
		  },
		"endBtnState":{
			type:Boolean,
			default: function () {
				return false
			    }
		}	  
      },
     template:templateS,
	 data:function(){
		 return {
			stateArr: ['闲置', '使用中', '维修', '报废','未知',''],
			imgs:'../../img/errorS.png'
		 }
	 },
    watch: {  
        'titles':function(newValue, oldValue) {  
           console.log(newValue)  
          } ,
		 deep: true  
      } ,
	 methods:{
		 //标记资产
		 tag:function(item,tags){
		 	var params={
		 		title:item.title,
		 		assetsId:item.id,
		 		tag:tags
		 	}
		 	tag({
		 		data:params,
		 		success:function(data){
		 			var tagsContent=tags?'标记成功':'取消标记成功'
		 			mui.toast(tagsContent)
		 			item.tag=!item.tag;	
		 		}
		 	})
		 },
		 jump: function(path,item,indexS,index) {
			   if(!item.id){
				   mui.toast('请点击查看后获取资产信息')
				   return;
			   }
			   if(this.endBtnState){
			    	mui.toast('正在接收数据，请稍后')	
			   	return
			   }
		 	var resoureDeatils=item;
			    console.log(JSON.stringify(resoureDeatils));
			plus.storage.setItem('ztreeType',indexS+'');	
			plus.storage.setItem('ztreeIndex',index+'');	
		 	plus.storage.setItem('resoureDeatils',JSON.stringify(resoureDeatils)); //传递要编辑的数据
		 	 var editS = plus.webview.getWebviewById(path);
		 		if(editS) {
		 			mui.fire(editS, 'outputEventS');
		 		}
		 	// mui.openWindow({
		 	// 	url: path,
		 	// 	id: path,
		 	// 	createNew: true
		 	// })
			 this.$emit('jumps',{})
			
			// this.clicked(path,'资产详情')
		 },
		 IsOpenBtn:function(item){
			 item.IsOpen=!item.IsOpen;
		 },
		 getRFID(RFID,index){ //子组件， 
			 
			 this.$emit('get',{rfid:RFID,index:index});
		 },
		 borrowUReadlname:function(item){
			 var a=item.borrowUReadlname?item.borrowUReadlname:'';
			 return a;
		 }
		
	 }
})

var RFIDTemplate= `<div>
                        <div  style="padding:0.2rem 0.2rem;background:#ffffff;color:#3941b6;margin-bottom:0.02rem;" class="flex just-center" @tap="IsOpenBtn()"><span>RFID记录</span><i class="material-icons" v-text="IsOpen?'keyboard_arrow_down':'keyboard_arrow_right'"></i></div>
                        <ul class="deatils" v-for="(item,index) in titles" style="padding-left:0.2rem;padding-right:0.2rem;" v-show="IsOpen">
					         <li v-text="item" ></li>
						</ul>
				  </div>`
Vue.component('rfid-li', {
	props: {
	     "titles": {
	        type: Array,
	     default: function () {
			return []
	         }
		  }	
	  },
	  data:function(){
		return {
			IsOpen:false
		}  
	  },
	 template:RFIDTemplate,
	 methods:{
		 IsOpenBtn:function(){
		 	 this.IsOpen=!this.IsOpen;
		 }
	 }
	  
})
			