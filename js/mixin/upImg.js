var UPIMG = {
	data:{
		imgSrc:'',
		fn:''
	},
	methods:{
		upFileImg: function() {
		var that = this;
		var task = upFile(function(data) {
			console.log(window.apiurl + data);
			that.imgSrc = data;
			console.log(typeof that.fn)
			if(typeof that.fn=="function"){	
				that.fn();
			}
		});
		// 上传图片的name属性 是这个的key
		task.addFile(this.imgSrc, {
			key: "uploadFile"
		});
		task.start();
	},
	appendByCamera: function() {
		var that = this;
		plus.camera.getCamera().captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				var path = entry.toLocalURL();
				that.imgSrc = path;
				that.upFileImg(that.fn);
			}, function(e) {
				mui.toast("读取拍照文件错误：" + e.message);
			});
	
		});
	},
	appendByGallery: function() {
		var that = this;
		plus.gallery.pick(function(path) {
			that.imgSrc = path;
			that.upFileImg(that.fn);
		});
	},
	upImg: function(fn) {
		var that = this;
		that.fn = fn||null;
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: [{
					title: "拍照"
				},
				{
					title: "从相册中选择"
				}
			]
		}, function(e) { //1 是拍照  2 从相册中选择 
			switch(e.index) {
				case 1:
					that.appendByCamera(that.fn);
					break;
				case 2:
					that.appendByGallery(that.fn);
					break;
			}
		});
	},
		
	}
	
}