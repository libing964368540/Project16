/**
 * 登陆接口
 * @param {Object} username 用户名
 * @param {Object} pwd		密码	
 * @param {Object} success	回调
 */
function getResoure(opt) {
	req({
		url: '/assets/gets.do',
		data: opt.data,
		apiName: '获取资产',
		success: function(data) {
			opt.success(data);
		}
	})
}
/*
 *获取资产位置
 *
 *
 */
function getAddress(opt){
	req({
		url:'/group/gets.do',
		data:opt.data,
		apiName:'获取资产位置',
		success:function(data){
			opt.success(data);
		}
	})
}
/*
 *获取资产类别
 *
 *
 */
function getType(opt){
	req({
		url:'/assets/type/gets.do',
		data:opt.data,
		apiName:'获取资产类别',
		success:function(data){
			opt.success(data);
		}
	})
}
/*
 *修改状态
 *
 *
 */
function modifyState(opt){
		req({
		url:'/assets/updateState.do',
		data:opt.data,
		apiName:'修改状态',
		success:function(data){
			opt.success(data);
		}
	})
}
/*
 *编辑资产信息 
 * 
 * */
function editResoure(opt){
	req({
		url:'/assets/update.do',
		data:opt.data,
		apiName:'编辑资产信息',
		success:function(data){
			opt.success(data);
		}
	})
}
/*
 *
 *获取借用人
 *
 */
function getUser(opt){
	req({
		url:'/user/gets.do',
		data:opt.data,
		apiName:'获取借用人',
		success:function(data){
			opt.success(data);
		}
	})
}
/**
 * 
 *通过资产编号获取资产
 *
 */
function getNumber(opt){
	req({
		url:'/assets/getForCode.do',
		data:opt.data,
		apiName:'通过资产编号获取资产',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *盘点接口
 */
function Upchecks(opt){
	req({
		url:'/assets/checks.do',
		data:opt.data,
		apiName:'上传盘点rfid的集合',
		success:function(data){
			opt.success(data);
		},
		error:function(){
			opt.error();
		}
	})
}
/* 
 *标记资产
 * 
 */
function tag(opt){
	req({
		url:'/assets/tag.do',
		data:opt.data,
		apiName:'标记资产',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *获取盘点记录详情
 * 
 */
function getRecordDeatil(opt){
	req({
		url:'/assets/check/user/getCheckRecords.do',
		data:opt.data,
		apiName:'获取盘点记录详情',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *批量更新资产状态
 * 
 */
function MoreSubmit(opt){
	req({
		url:'/assets/updateStateList.do',
		data:opt.data,
		apiName:'批量更新资产状态',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *
 *新增资产 
 * 
 * 
 */
function createResoure(opt){
	req({
		url:'/assets/create.do',
		data:opt.data,
		apiName:'新增资产',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *通过资产id 获取资产
 * 
 * 
 */
function getForId(opt){
	req({
		url:'/assets/getForId.do',
		data:opt.data,
		apiName:'通过资产id获取资产',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *通过RFID获取资产
 * 
 * 
 */
function getForRFID(opt){
	req({
		url:'/assets/getForRfid.do',
		data:opt.data,
		apiName:'通过RFID获取资产',
		success:function(data){
			opt.success(data);
		}
	})
}
/* 
 *查看盘点详情
 * 
 * 
 * 
 */
function searchDeatils(opt){
	req({
		url:'/assets/check/getCheckRecords.do',
		data:opt.data,
		apiName:'查看盘点记录中的部门的盘点详情',
		success:function(data){
			opt.success(data);
		}
	})
}

function NoCheckDeatils(opt){
	req({
		url:'/assets/record/getLackCheck.do',
		data:opt.data,
		apiName:'获取未盘中资产详情',
		success:function(data){
			opt.success(data);
		}
	})
}

 
