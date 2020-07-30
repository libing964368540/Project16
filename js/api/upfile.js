
function upFile(cb) {
	var uid = plus.storage.getItem('faid');
	var api = window.apiurl+'/file/upload.do?uid='+uid;
	var wt = plus.nativeUI.showWaiting();
	return plus.uploader.createUpload(api, {
			method: "POST"
		},
		function(t, status) { //上传完成
			if(status == 200) {
				console.log(t.responseText);
				cb(JSON.parse(t.responseText).data);
				wt.close(); //关闭等待提示按钮
			} else {
				console.log('上传失败' + status);
				wt.close(); //关闭等待提示按钮
			}
		}
	);
}
/* 
 *修改个人头像
 *  
 */
function saveHeader(opt){
	req({
		url:'/user/updateForId.do',
		data: opt.data,
		apiName: '保存个人信息',
		success: function(data) {
			opt.success(data);
		}
	})
}