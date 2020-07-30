var SELECT = {
	data:{
		addressPicker: {
			name: '资产位置',
			id: null
		}, 
		addressPickerS: {
			name: '资产位置',
			id: null
		}, 
		//资产位置初始化
		typePicker: {
			name: '资产类别',
			id: null
		}, //资产类别初始化
		typePickerS: {
			name: '资产类别',
			id: null
		}, //资产类别初始化
		statePicker: {
			name: '资产状态',
			id: null
		},
		statePickerS: {
			name: '资产状态',
			id: null
		},
		UserPicker:{
			name: '选择调拨人',
			id: null
		}
	},
	methods:{
		groupDataInit:function(){
			
		},
		groupDataHave:function(){
			var that = this;
			// this.selectAddressPicker = new mui.PopPicker();
			getAddress({
				data: {size:400,page:0},
				success: function(data) {
					if(plus.storage.getItem('groupData')!=data.list.toString()){
						plus.storage.setItem('groupData',JSON.stringify(data.list))
						console.log(plus.storage.getItem('groupData'))
						var arr = [{text:"全部",value:""}];
						data.list.forEach(function(item) {
						    arr.push({
							   text: item.name,
							   value: item.id
						    })
					    })
						that.selectAddressPicker.setData(arr);
					}
					
				}
			})
		
			//mui 下拉框必须要写个value text 醉了 生成value text数组
		},
		//初始化资产位置
		selectAddressInit: function() {
			var that = this;
			this.selectAddressPicker = new mui.PopPicker();
			if(plus.storage.getItem('groupData')){
				var arr = [{text:"全部",value:""}];
				var list = JSON.parse(plus.storage.getItem('groupData'));
				 list.forEach(function(item) {
					    arr.push({
						   text: item.name,
						   value: item.id
					    })
				})
				console.log(arr.length);
				that.selectAddressPicker.setData(arr);
			}
		     this.groupDataHave();
		},
		//初始化资产类别
		selectTypeInit: function() {
			var that = this;
			this.selectTypePicker = new mui.PopPicker();
			var arr = [{text:"全部",value:""}];
			getType({
				data: {},
				success: function(data) {
					data.forEach(function(item) {
						arr.push({
							text: item.name,
							value: item.id
						})
					})
					that.selectTypePicker.setData(arr);
				}
			})
			//mui 下拉框必须要写个value text 醉了 生成value text数组
		
		},
		//初始化资产状态
		selectStateInit: function() {
			this.selectStatePicker = new mui.PopPicker();
			var arr = [{text:"全部",value:""},{
				value: '1',
				text: '使用中'
			}, {
				value: '2',
				text: '维修'
			}, {
				value: '3',
				text: '报废'
			}, {
				value: '0',
				text: '闲置'
			}];
			//mui 下拉框必须要写个value text 醉了 生成value text数组		
			this.selectStatePicker.setData(arr);
		},
		//初始化调拨人
		selectUserInit:function(){
			var that = this;
			this.selectUserPicker = new mui.PopPicker();
			var arr = [];
			var params={
				  page:0,
				  size:300,
			   }
			getUser({
				data:params,
				success:function(data){
					    var data=data.list;
						data.forEach(function(item){
								arr.push({
			    			        text:item.realName||item.userName,
			    			        value:item.id
			    		          })	
			    		})
						that.selectUserPicker.setData(arr);
				    }
			  })
		},
	}
}