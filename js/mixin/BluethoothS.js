var Bluetooth = {
	data: {
		bds: [], // 可连接设备列表
		deviceId: null,
		bconnect: false,
		bss: [], // 连接设备服务列表
		serviceId: null,
		bscs: [], // 连接设备服务对应的特征值列表
		characteristicId: null,
		bscws: [], // 可写特征值列表
		wcharacteristicId: null,
		biaoqianList: [],
		progress: '',
		progressFlag: false,
		rfid:'',//RFID编号
		list: [],//盘点物品列表
		houseTotal:0,
		NowTotalS:'',
		endBtnState:false,
		EPCValueArr:[],
		timer:null,//轮询函数的时间变量
		globalRFIDStr:'', //全局RFID字符串变量
		SelectionArr:[]  //盘点部门盘中资产
	},
	methods: {
		//匹配蓝牙设备和资产的信息
		judgeMessage:function(rfid){
			var that = this;
			for(var i=0;i<this.list.length;i++){
				var list = this.list[i];
				if(rfid===list.rfid){
					this.list[i].rfidState=true;
					that.InventoryArr[0].List.remove(list);
					that.InventoryArr[1].List.push(list);
					that.SelectionArr.push(rfid);
					that.InventoryArr[2].List.forEach(function(item){
						if(rfid===item.rfid){
							that.InventoryArr[2].List.remove(item);
						}
					})
					return;
				}
				
			}
			
		},
		start: function() {
			var that=this;
			if(this.endBtnState){
				mui.toast('正在接收数据，请稍后')	
				return
			}
			//获取缓存的设备id;
			// var deviceId=plus.storage.getItem('deviceId');
			// var serviceId=plus.storage.getItem('serviceId');
			 //    this.deviceId=deviceId;
				// this.serviceId=serviceId;
			  //   console.log(deviceId);
				 // console.log(this.bconnect);
				 // console.log(serviceId);
				 
			if (this.deviceId && this.bconnect) { //已经获取了蓝牙并连接				
				if(this.serviceId){
					if(this.wcharacteristicId){
						this.writeValue();
					}else{
						this.progressFlag = true;
						setTimeout(function(){
							that.selectService();
						},500)
						
					}
				}else{
					this.progressFlag = true;
					this.getServices();
				}
				
			} else {
				this.progressFlag = true;
				this.openBluetooth();
			}
		},
		//初始化蓝牙设备
		BlueInit: function() {
			var that = this;
			this.disconnectDevice();
			// 监听蓝牙适配器状态变化
			plus.bluetooth.onBluetoothAdapterStateChange(function(e) {
				console.log('onBluetoothAdapterStateChange: ' + JSON.stringify(e));
			});
			//  监听搜索到新设备 
			plus.bluetooth.onBluetoothDeviceFound(function(e) {
				var devices = e.devices;
				console.log('onBluetoothDeviceFound: ' + devices.length);
				for (var i in devices) {
					console.log(JSON.stringify(devices[i]));
					var device = devices[i];
					if (device.deviceId /*&&device.name&&device.name.length>0&&device.name!='null'*/ ) {
						that.bds.push(device);
					}
					console.log(device.name == "CC41-A");
					if (device.name == "CC41-A") {
						console.log(device.name)
						that.deviceId = device.deviceId;
						 plus.storage.setItem('deviceId',device.deviceId)
						that.stopDiscovery() //停止蓝牙搜索  
					}
				}
			});
			//  监听低功耗蓝牙设备连接状态变化 
			plus.bluetooth.onBLEConnectionStateChange(function(e) {
				console.log('onBLEConnectionStateChange: ' + JSON.stringify(e));
				 //    var deviceId=plus.storage.getItem('deviceId');
					// that.deviceId=deviceId;
				if (that.deviceId == e.deviceId) { // 更新连接状态
					that.bconnect = e.connected;
					that.serviceId=""
					that.wcharacteristicId=""	
				}
			});
			// 监听低功耗蓝牙设备的特征值变化 
			plus.bluetooth.onBLECharacteristicValueChange(function(e) {
				var value = that.buffer2hex(e.value);  
				// var EPCValue = value.split(' ');  
				// if(EPCValue.indexOf('a0')==0&&EPCValue.indexOf('13')==1&&EPCValue.indexOf('89')==3&&EPCValue.length==21&&that.JudgeRFIDData(EPCValue)){
					
				//      var StartIndex = 7
				//      var arr = EPCValue.slice(StartIndex, 15);
				//     if (that.biaoqianList.indexOf(arr.join("")) == -1 && arr.length == 8) {
				// 		that.EPCValueArr.push(EPCValue.join(" "));
				// 		that.InventoryArr[0].List.push({
				// 			"appropriation":0,
				// 			"borrowUGroupId":'',
				// 			"borrowUGroupName":"",
				// 			"images":"",
				// 			"code":arr.join(""),
				// 			"fixedUserRealName":"",
				// 			"state":4,
				// 			"tag":0,
				// 			"rfidState":false,
				// 			"title":"非本部门资产",
				// 			"id":null,
				// 			"rfid":arr.join("")
				// 			})	
				// 	     that.judgeMessage(arr.join(""));
				// 	     that.rfid= arr.join("");
				// 	     that.biaoqianList.push(arr.join(""));
				// 		let newArr=new Set(that.biaoqianList) 
				// 		that.biaoqianList = Array.from(set);
				//      }
				// }
				// if(EPCValue.indexOf('a0')==0&&EPCValue.indexOf('a')==1&&EPCValue.indexOf('89')==3){
				// 	  console.log('结束')
				// 	  that.EPCValueArr.push(EPCValue);
					 
				//   }
				   console.log('onBLECharacteristicValueChange: ' + JSON.stringify(e));
				   console.log('value(hex) = ' + value); 
				  //判断是否结束
				      that.addRFIDstr(value);
				var lengths=that.SelectionArr.length;
				    that.NowTotalS='('+lengths+'/'+ that.houseTotal+')'
				
				if (that.characteristicId == e.characteristicId) {
					// 更新到页面显示
					// document.getElementById('readvalue').value = value;
				} else if (that.wcharacteristicId == e.characteristicId) {
					plus.nativeUI.toast(value);
				}
			});

		},

		buffer2hex: function(value) {
			var t = '';
			if (value) {
				var v = new Uint8Array(value);
				for (var i in v) {
					// t += '0x'+v[i].toString(16)+' ';
					if (v[i].toString(16) < 10) {
						t += '0' + v[i].toString(16) + ' ';
					} else {
						t += v[i].toString(16) + ' ';
					}

				}
			} else {
				t = '无效值';
			}
			return t;
		},
		// 获取蓝牙状态
          getBluetoothState:function(){
			  var that= this;
	        plus.bluetooth.getBluetoothAdapterState({
		        success:function(e){
			          console.log('state success: '+JSON.stringify(e));
					  console.log('state:'+e.available )
					  // that.bconnect=e.available;
					  that.start();
		         },
		         fail:function(e){
			         console.log('state failed: '+JSON.stringify(e));
					 that.progressFlag = true;
					 that.openBluetooth();
		            }
	         });
         },
		//打开蓝牙
		openBluetooth: function() {
			var that = this;
			console.log('打开蓝牙适配器：');
			that.progress = '打开蓝牙适配器';
			plus.bluetooth.openBluetoothAdapter({
				success: function(e) {
					that.progress = '打开成功!';
					console.log('打开成功!');
					that.startDiscovery();
				},
				fail: function(e) {
					that.progress = '打开异常!请检查是否打开手机蓝牙';
					console.log('打开异常! ' + JSON.stringify(e));
				}
			});
		},
		//开始搜索蓝牙设备
		startDiscovery: function() {
			var that = this;
			that.progress = '开始搜索蓝牙设备';
			console.log('开始搜索蓝牙设备：');
			// resetDevices();
			plus.bluetooth.startBluetoothDevicesDiscovery({
				success: function(e) {
					that.progress = '开始搜索成功';
					console.log('开始搜索成功!');
				},
				fail: function(e) {
					that.progress = '请关闭设备重启后再次连接!';
					console.log('开始搜索失败! ' + JSON.stringify(e));
					that.disconnectDevice();
					mui.toast('请关闭设备重启后再次连接')
				}
			});
		},
		//停止搜索蓝牙设备
		stopDiscovery: function() {
			var that = this;
			console.log('停止搜索蓝牙设备：');
			that.progress = '停止搜索蓝牙设备';
			plus.bluetooth.stopBluetoothDevicesDiscovery({
				success: function(e) {
					that.progress = '停止搜索成功!';
					console.log('停止搜索成功!');
					that.selectDevice()
				},
				fail: function(e) {
					that.progress = '停止搜索异常!';
					console.log('停止搜索失败! ' + JSON.stringify(e));
				}
			});
		},
		//选择蓝牙设备
		selectDevice: function() {
			var that = this;
			console.log('连接设备：' + that.deviceId)
			that.progress = '连接设备!';
			if (!that.deviceId) {
				plus.nativeUI.toast('未选择设备!');
				return;
			}

			plus.bluetooth.createBLEConnection({
				deviceId: that.deviceId,
				success: function(e) {
					console.log('连接成功!');
					that.progress = '连接成功!';
					setTimeout(function(){
						that.getServices();
					},500)
					
				},
				fail: function(e) {
					console.log('连接失败! ' + JSON.stringify(e));
					that.progress = '连接异常!';
				}
			});
		},
		//获取设备服务
		getServices: function() {
			var that = this;
			if (!that.deviceId) {
				plus.nativeUI.toast('未选择设备!');
				return;
			}
			if (!that.bconnect) {
				plus.nativeUI.toast('未连接蓝牙设备!');
				return;
			}
			// resetDevices(true);
			console.log('获取蓝牙设备服务:');
			that.progress = '获取蓝牙设备服务';
			plus.bluetooth.getBLEDeviceServices({
				deviceId: that.deviceId,
				success: function(e) {
					var services = e.services;
					console.log('获取服务成功! ' + services.length);
					that.progress = '获取服务成功';
					
					if (services.length > 0) {
						that.bss=services;
						// for (var i in services) {
						// 	that.bss.push(services[i]);
						// 	console.log(JSON.stringify(services[i]));
						// } 
						// mui.alert(JSON.stringify(services));
						if (that.bss.length > 0) { // 默认选择最后一个服务
						   
							that.serviceId = that.bss[that.bss.length - 1].uuid;
							// plus.storage.setItem('serviceId',that.serviceId);
							console.log(that.serviceId);
							setTimeout(function(){
								 that.selectService();
							},500)
							
						}
					} else {
						
						console.log('获取服务列表为空?');
					}
				},
				fail: function(e) {
					console.log('获取服务异常! ' + JSON.stringify(e));
					that.progress = '获取服务异常';
				}
			});
		},
		//选择服务特征值
		selectService: function() {
			var that = this;
			if (!that.deviceId) {
				plus.nativeUI.toast('未选择设备!');
				return;
			}
			if (!that.bconnect) {
				plus.nativeUI.toast('未连接蓝牙设备!');
				return;
			}
			if (!that.serviceId) {
				plus.nativeUI.toast('未选择服务!');
				return;
			}
			// resetDevices(true, true);
			console.log('获取蓝牙设备指定服务的特征值:');
			that.progress = '获取蓝牙设备指定服务的特征值';
			plus.bluetooth.getBLEDeviceCharacteristics({
				deviceId: that.deviceId,
				serviceId: that.serviceId,
				success: function(e) {
					var characteristics = e.characteristics;
					console.log('获取特征值成功! ' + characteristics.length);
					that.progress = '获取特征值成功';
					if (characteristics.length > 0) {
						for (var i in characteristics) {
							var characteristic = characteristics[i];
							console.log(JSON.stringify(characteristic));
							if (characteristic.properties) {
								if (characteristic.properties.read) {
									that.bscs.push(characteristics[i]);
								}
								if (characteristic.properties.write) {
									that.bscws.push(characteristics[i]);
									if (characteristic.properties.notify || characteristic.properties.indicate) {
										plus.bluetooth.notifyBLECharacteristicValueChange({ 
											state:true,//监听数据变化
											deviceId: that.deviceId,
											serviceId: that.serviceId,
											characteristicId: characteristic.uuid,
											success: function(e) {
												console.log('notifyBLECharacteristicValueChange ' + characteristic.uuid + ' success.');
											},
											fail: function(e) {
												console.log('notifyBLECharacteristicValueChange ' + characteristic.uuid + ' failed! ' + JSON.stringify(
													e));
											}
										});
									}
								}
							}
						}
						if (that.bscs.length > 0) { // 默认选择最后
							that.characteristicId = that.bscs[that.bscs.length - 1].uuid;
						}
						if (that.bscws.length > 0) { // 默认选择最后一个可写特征值
							that.wcharacteristicId = that.bscws[that.bscws.length - 1].uuid;
							setTimeout(function(){
								 that.writeValue();
							},500)
							 
							
						}
					} else {
						console.log('获取特征值列表为空?');
					}
				},
				fail: function(e) {
					console.log('获取特征值异常! ' + JSON.stringify(e));
					that.progress = '获取特征值异常';
				}
			});
		},
		getCharacteristics: function() {

		},
		writeValue: function() {
			var that = this;
			     if (!that.deviceId) {
			     	plus.nativeUI.toast('未选择设备!');
			     	return;
			     }
			     if (!that.bconnect) {
			     	plus.nativeUI.toast('未连接蓝牙设备!');
			     	return;
			     }
			     if (!that.serviceId) {
			     	plus.nativeUI.toast('未选择服务!');
			     	return;
			     }
				  if (!that.wcharacteristicId) {
				 	plus.nativeUI.toast('未获取特征值!');
				 	return;
				 }
			console.log('写入蓝牙设备的特征值数据: '+that.deviceId+' '+that.serviceId+' '+ that.wcharacteristicId);
			that.progress = '写入蓝牙指令';
			// 转换为ArrayBuffer写入蓝牙
			// that.str2ArrayBuffer('0xA0 0x03 0xFF 0x89 0xD5', function(buffer){
			let bufferS = new ArrayBuffer(6)
			let dataView = new DataView(bufferS)
			dataView.setUint8(0, 0xA0) //开锁指令  
			dataView.setUint8(1, 0x04) //字节  
			dataView.setUint8(2, 0xFF) //指令  
			dataView.setUint8(3, 0x89) //指令 
			// dataView.setUint8(4, 0xD5) //指令
		    dataView.setUint8(4, 0x01) //指令
			dataView.setUint8(5, 0xD3) //指令
			plus.bluetooth.writeBLECharacteristicValue({
				deviceId: that.deviceId,
				serviceId: that.serviceId,
				characteristicId: that.wcharacteristicId,
				value: bufferS,
				success: function(e) {
					console.log('写入数据成功!');
					that.progress = '开始上传数据';
					that.progressFlag = false;
					mui.toast('开始接收数据');
					 that.endBtnState=true
					  that.lunxun();
				},
				fail: function(e) {
					console.log('写入数据异常! ' + JSON.stringify(e));
					that.progress = '写入数据异常';
				}
			})
			// })

		},
		str2ArrayBuffer:function(s,f) {
		    var b = new Blob([s],{type:'text/plain'});
		    var r = new FileReader();
		    r.readAsArrayBuffer(b);
		    r.onload = function(){if(f)f.call(null,r.result)}
		},
		endWriteValue: function() {
			var that = this;
			console.log('重置蓝牙设备的特征值数据: ');
			let bufferS = new ArrayBuffer(6)
			let dataView = new DataView(bufferS)
			dataView.setUint8(0, 0xA0) //开锁指令  
			dataView.setUint8(1, 0x04) //字节  
			dataView.setUint8(2, 0xFF) //指令  
			dataView.setUint8(3, 0x89) //指令 
			// dataView.setUint8(4, 0xD5) //指令
			dataView.setUint8(4, 0x01) //指令
			dataView.setUint8(5, 0xD3) //指令
		
			console.log('写入蓝牙设备的特征值数据: '+that.deviceId+' '+that.serviceId+' '+ that.wcharacteristicId);
			plus.bluetooth.writeBLECharacteristicValue({
				deviceId: that.deviceId,
				serviceId: that.serviceId,
				characteristicId: that.wcharacteristicId,
				value: bufferS,
				success: function(e) {
					// console.log('写入数据成功!');
					// that.biaoqianList = [];
					console.log('写入数据成功!');
					that.progress = '开始上传数据';					
					that.progressFlag = false;
					
				},
				fail: function(e) {
					console.log('写入数据异常! ' + JSON.stringify(e));
					that.progress = '写入数据异常';
				}
			})
		},
	     closeBluetoothAdapter:function (){
		  
	       plus.bluetooth.closeBluetoothAdapter({
		            success:function(e){
			                console.log('close success: '+JSON.stringify(e));
		              },
		           fail:function(e){
			              console.log('close failed: '+JSON.stringify(e));
		                }
	            });
          },
		  disconnectDevice:function (){
			var deviceId=plus.storage.getItem('deviceId');
			console.log(deviceId)
		  	if(!deviceId){
		  		// plus.nativeUI.toast('未选择设备!');
		  		return;
		  	}
		  	
		  	console.log('断开蓝牙设备连接：');
		  	plus.bluetooth.closeBLEConnection({
		  		deviceId: deviceId,
		  		success: function(e){
		  			console.log('断开连接成功!');
		  		},
		  		fail: function(e){
		  			console.log('断开连接失败! '+JSON.stringify(e));
		  		}
		  	});
		  },
		  JudgeRFIDData:function(arr){
			   for(var i=1;i<arr.length;i++){
				   if(arr[i]=='a0'){
					   return false
				   }
			   }
			   return true
		  },
		  //轮询
		  lunxun:function(){
			   var that = this;
			   this.timer = setInterval(function(){
		  	        that.endWriteValue();
		      },800)
		  },
		  //清除轮询
		  clearTimer:function(){
			 var that = this;
		     window.clearInterval(that.timer);
			 that.endBtnState=false;
		  },
		  //处理蓝牙返回的字符串
		  addRFIDstr:function(value){
			  this.globalRFIDStr+= value;
			  var str=this.globalRFIDStr
			  var EPCValue = str.split(' ');
			  var index = EPCValue.indexOf('a0');
			  var lengths = EPCValue.length;
			  if(index==-1){
				  this.globalRFIDStr=""; 
			  }else if(EPCValue[index+1]){
				 var RFIDLengths = parseInt(EPCValue[index+1],16);
				 var total = index+3+RFIDLengths
				    if(lengths>=total){
						   var arr=EPCValue.slice(index,total-1)
				 	       this.globalRFIDStr=EPCValue.slice(total-2).join(" ");
					      if(arr.length==21){
						   console.log(arr);
						   this.ECPforRFIDSlice(arr); 
				 	     }
				  }   
			  }
				 
		  },
		  //截取ECP的的字符串 
		  ECPforRFIDSlice:function(arr){
			  var that= this
			  var StartIndex = 7
			  var ECPArr = arr.slice(StartIndex, 15);
			  var ECPstr = ECPArr.join("")
			 
			  if(that.biaoqianList.indexOf(ECPstr)==-1){
				 that.InventoryArr[2].List.push({
			  	"appropriation":0,
			  	"borrowUGroupId":'',
			  	"borrowUGroupName":"",
			  	"images":"",
			  	"code":ECPstr,
			  	"fixedUserRealName":"",
			  	"state":4,
			  	"tag":0,
			  	"rfidState":false,
			  	"title":"非本部门资产", 
			  	"id":null,
			  	"rfid":ECPstr
			  	})	
			   that.judgeMessage(ECPstr);
			   that.rfid= ECPstr;
			   that.EPCValueArr.push(arr.join(" "));
			   that.biaoqianList.push(ECPstr);
			  let newArr=new Set(that.biaoqianList) 
			  that.biaoqianList = Array.from(set);
			  }
			 
		  },
		  //截取单词盘点的字符串
		  EndforRDIDSlice:function(arr){
			  
		  }
         
	}

} 


  
 
	