/**
 * 登陆接口
 * @param {Object} username 用户名
 * @param {Object} pwd		密码	
 * @param {Object} success	回调
 */
function login(opt) {
	req({
		url: '/user/login.do',
		data: opt.data,
		apiName: '登陆',
		success: function(data) {
			opt.success(data);
		}
	})
}
/**
 * 退出登陆
 */
function loginOut(cb) {
	req({
		url:'/account/out.action',
		data:{},
		apiName: '退出登陆',
		success: function() {
			plus.storage.removeItem('token');
			plus.storage.removeItem('faid');
			plus.storage.removeItem('username');
			plus.storage.removeItem('RealName')
//			plus.runtime.quit();
			cb();
		}
	})
}

/**
 * 修改密码
 */
function editPwd(opt) {
	req({
		url: '/user/updatePasswordForId.do',
		data:opt.data,
		apiName: '修改密码',
		success: function(data) {
			opt.success(data);
		}
	})
}
//获取组织
function get_organization(opt) {
	req({
		url: '/organization/get.do',
		data:opt.data,
		apiName: '获取使用者的组织',
		success: function(data) {
			opt.success(data);
		}
	})
}

