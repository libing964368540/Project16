/**
 * 获取资产统计
 */
function statistics(opt) {
	req({
		url:'/assets/statistics/gets.do',
		data: opt.data,
		apiName: '获取资产统计',
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