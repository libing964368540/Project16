/**
 * 盘点记录
 * @param {Object}userid 盘点者
 * @param {Object} time  每天00点	
 * @param {Object} success	回调
 */
function getPersonCheckRecord(opt) {
	req({
		url:'/assets/check/user/getCheckRecordGroups.do',
		data: opt.data,
		apiName: '获取个人的盘点记录',
		success: function(data) {
			opt.success(data);
		}
	})
}

/* 获取我的调拨和报废记录
    page	是	int	
    size	是	int	
    state0	否	int	修改前状态
    state1	否	int	修改后状态
    userId	否	int	用户
    userGroupId	否	int	部门
    assetsId	否	int	资产
    time	否	int	时间 
*/
 
function getRecord(opt){
   req({
   	url:'/assets/record/gets.do',
   	data: opt.data,
   	apiName: '获取我的调拨或报废记录或资产被操作记录',
   	success: function(data) {
   		opt.success(data);
   	}
   })
	
}
/* 
 *获取我所有的标记资产
 * 
 * 
 * 
 * 
 */
function getTags(opt){
   req({
   	url:'/assets/gets.do',
   	data: opt.data,
   	apiName: '获取我所有的标记资产',
   	success: function(data) {
   		opt.success(data);
   	}
   })
}
/* 
 *获取使用帮助
 * 
 * 
 * 
 */
   function getHelp(opt){
	  req({
	  	url:'/info/getHelp.do',
	  	data: opt.data,
	  	apiName: '获取使用帮助',
	  	success: function(data) {
	  		opt.success(data);
	  	}
	  }) 
   }
/* 
 *获取关于我们
 * 
 * 
 */
 function getInfo(opt){
	 req({
	 	url:'/info/getInfo.do',
	 	data: opt.data,
	 	apiName: '获取关于我们',
	 	success: function(data) {
	 		opt.success(data);
	 	}
	 })  
   }