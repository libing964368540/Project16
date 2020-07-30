(function(w) {
	var fui = function(opt) {
		var fuiAlert = document.createElement('div');
		this.init(opt);
		this.bg = '#d00000';
		this.color = '#ffffff';
	}
	fui.prototype.init = function(opt) {
		opt = opt ? opt : {};
 
		this.dom = document.createElement('div');
		this.dom.className = 'fui-alert';
		this.dom.style.background = opt.bg || this.bg;
		this.dom.style.color = opt.color || this.color;
		this.dom.style.fontSize = '14px';
		this.dom.style.position='fixed';
		this.dom.style.zIndex = 100000;
		this.dom.innerText = opt.text || '网络繁忙，稍后重试';
		this.show();
	}
	fui.prototype.show = function() {
		var that = this;
		document.body.appendChild(this.dom);
		setTimeout(function() {
			that.dom.style.top = 0;
			that.hide();
		}, 20)

	}
	fui.prototype.hide = function() {
		var that = this;
		setTimeout(function() {
			that.dom.style.top = -60 + 'px';
		}, 2000);
		setTimeout(function() {
			document.body.removeChild(that.dom);
		}, 2500);
	}
	w.fui = fui;
	w.apiurl = 'http://ezp.luopan.net';
})(window);
function req(opt){
	  	opt.url = window.apiurl + opt.url;
	   var parmas = opt.data;
	       if(plus.storage.getItem('faid')){
			    parmas.uid=plus.storage.getItem('faid');
		   }
	      
	   console.log('-----------------------------------------------')
	   parmas.st = new Date().getTime();
	   var strA = '?';
	    for(var i in parmas) {
		    strA += i + '=' + parmas[i] + '&';
	    }
	   console.log(opt.apiName + '-----请求url->'+opt.url+strA)
	  	mui.ajax({
                url: opt.url,
                type: "post",
                dataType: "json",
                data: parmas,
				timeout:200000,
                success: function (result) {
                	var data =  result.data;
                	if(!result.error) {
                		console.log(opt.apiName + '成功' + JSON.stringify(result));
				        console.log('------------------------------------------------------dd')
                		opt.success(data);
                       
                   }else{
                   	console.log(opt.apiName + '失败' + result.error.message);
				    console.log('------------------------------------------------------ss')
                   	  new fui({
					     text: result.error.message,
					       bg:'#FF3939'
				      })
                   	  
                   	  if(opt.error){
				          opt.error()
          			  }
                   }
                },
                error:function(xhr, type, errorThrown){
					console.log('xhr'+ JSON.stringify(xhr));
					console.log('type'+ type)
					console.log('errorThrown'+errorThrown)
                	console.log(opt.apiName + '失败' + type);
				    console.log('------------------------------------------------------aa');
                	new fui({
					   text: '连接异常，请稍后重试。',
				        bg:'#FF3939'
				    })
                	if(opt.error){
				        opt.error();
          			}
                }
            });
}


