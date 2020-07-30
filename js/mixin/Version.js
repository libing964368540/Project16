var Version = {
	data:{
	   	
	},
	methods:{
		appUpdate:function(){
			 var btn = ["确定升级", "取消"]; 
			 plus.runtime.getProperty(plus.runtime.appid, function (inf) {
			            ver = inf.version;
			            console.log('ver:' + ver);
			            // var url = config.GetAppVersion;
			            var client;
			            var ua = navigator.userAgent.toLowerCase();
			            if (/iphone|ipad|ipod/.test(ua)) {    //苹果手机  	
			        //         mui.ajax({
			        //             type: "get",
			        //             dataType: 'json',
			        //             url: "https://itunes.apple.com/lookup",//获取当前上架APPStore版本信息
			        //             // data: {
			        //             //     id: 'H5559EE13' //APP唯一标识ID
			        //             // },
			        //             contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			        //             success: function (data) {
			        //                 console.log('data:' + JSON.stringify(data));
			        //                 var resultCount = data.resultCount;
			        //                  for (var i = 0; i < resultCount; i++) {
			        //                     var normItem = data.results[i].version;
			        //                        console.log('normItem:' + normItem)
			        //                      if (normItem > ver) {
			        //                         var _msg = "发现新版本:V" + normItem;
			        //                         //plus.nativeUI.alert("发现新版本:V" + normItem);
			        //                         mui.confirm(_msg, '升级确认', btn, function (e) {
			        //                             if (e.index == 0) { //执行升级操作
			        //                                 document.location.href = 'https://itunes.apple.com/cn/app/san-gu-hui/id131812xxxx?mt=8'; //上新APPStore下载地址
			        //                             }
			        //                         });
			        //                         return;
			        //                      } 
			        //                   }
			        //                 // if (ismanual) {
			        //                 //     mui.toast('当前版本号已是最新');
			        //                 // }
									  
			        //                 return;
			        //             }
			        //         });
			            } else if (/android/.test(ua)) {
			                mui.ajax(window.apiurl+'/appinfo/get.do', {
			                    data: {
			                        // apkVersion: ver,
			                    },
			                    dataType: 'json',
			                    type: 'post',
			                    timeout: 10000,
			                    success: function (data) {
			                        console.log('data:'+JSON.stringify(data))
									console.log(ver);
			                        if (data.state = 200 && data.data.tag>ver) {
			                            //mui.toast("发现新版本:V" + data.Data);//获取远程数据库中上新andriod版本号 
			                            var _msg="发现新版本:V" + data.data.tag;
			                            mui.alert(_msg, '升级确认', function (e) {
			                                if (e.index == 0) { //执行升级操作
			                                    plus.nativeUI.toast("正在准备环境，请稍后！");
			                                    // var dtask = plus.downloader.createDownload(config.apkUrl, {}, function (d, status) {
												var dtask = plus.downloader.createDownload(window.apiurl+data.data.path, {}, function (d, status) {
													console.log(JSON.stringify(d))
													console.log(status);
			                                        if (status == 200) {
			                                            var path = d.filename;//下载apk
			                                             plus.runtime.install(path); // 自动安装apk文件
			                                        } else {
			                                            plus.nativeUI.alert('版本更新失败:' + status);
			                                        }
			                                    });
			                                    dtask.start();
			                                }
			                            });
			                        } else {
			                            // console.log('当前版本号已是最新');
			                            // if (ismanual) {
			                                 // mui.toast('当前版本号已是最新');
			                            // }
			                             return;
			                        }
			                    },
			                    error: function (xhr, type, errerThrown) {
			                        // if (ismanual) {
			                            mui.toast('网络异常,请稍候再试');
			                        // }
			                    }
			                });
			            }
			        });

		}
	}
}