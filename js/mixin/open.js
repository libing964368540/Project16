var open={
	 data:{
		  _openw:null,
		  as:'pop-in'// 默认窗口动画
	 },
	 methods:{
		 clicked:function(id, t,colors,d){
			 var that=this; 
			 if(that._openw){return;}  // 防止快速点击
			 var ws={
			 	scrollIndicator: 'none',
			 	scalable: false,
			 	popGesture: 'close',
			 	backButtonAutoControl: 'close',
			 	titleNView: {
			 		autoBackButton: true,
			 		backgroundColor: colors||'#3941b6',
			 		titleColor: '#FFFFFF'
			 	}
			 };
			 t&&(ws.titleNView.titleText=t,d||(d=t.toLowerCase()));
			 // d&&(ws.titleNView.buttons=[{
			 // 	fontSrc: '_www/helloh5.ttf',
			 // 	text: '\ue301',
			 // 	fontSize: '22px',
			 // 	onclick: 'javascript:openDoc("/doc/'+d+'.html")'
			 // }]);
			 that._openw=plus.webview.create(id, id, ws);
			 that._openw.addEventListener('loaded', function(){//页面加载完成后才显示
			 	that._openw&&that._openw.show(that.as, null, function(){
			 		that._openw=null;//避免快速点击打开多个页面
			 	});
			 }, false);
			 that._openw.addEventListener('hide', function(){
			 	that._openw=null;
			 }, false);
			 that._openw.addEventListener('close', function(){//页面关闭后可再次打开
			 	that._openw=null;
			 }, false);
		  }
	 }
	
}
