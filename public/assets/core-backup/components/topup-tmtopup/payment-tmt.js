var LazyLoad = (function(doc){var env,head,pending={},pollCount=0,queue={css:[],js:[]},styleSheets=doc.styleSheets;function createNode(name,attrs){var node=doc.createElement(name),attr;for(attr in attrs){if(attrs.hasOwnProperty(attr)){node.setAttribute(attr,attrs[attr])}}return node}function finish(type){var p=pending[type],callback,urls;if(p){callback=p.callback;urls=p.urls;urls.shift();pollCount=0;if(!urls.length){callback&&callback.call(p.context,p.obj);pending[type]=null;queue[type].length&&load(type)}}}function getEnv(){var ua=navigator.userAgent;env={async:doc.createElement('script').async===true};(env.webkit=/AppleWebKit\//.test(ua))||(env.ie=/MSIE|Trident/.test(ua))||(env.opera=/Opera/.test(ua))||(env.gecko=/Gecko\//.test(ua))||(env.unknown=true)}function load(type,urls,callback,obj,context){var _finish=function(){finish(type)},isCSS=type==='css',nodes=[],i,len,node,p,pendingUrls,url;env||getEnv();if(urls){urls=typeof urls==='string'?[urls]:urls.concat();if(isCSS||env.async||env.gecko||env.opera){queue[type].push({urls:urls,callback:callback,obj:obj,context:context})}else{for(i=0,len=urls.length;i<len;++i){queue[type].push({urls:[urls[i]],callback:i===len-1?callback:null,obj:obj,context:context})}}}if(pending[type]||!(p=pending[type]=queue[type].shift())){return}head||(head=doc.head||doc.getElementsByTagName('head')[0]);pendingUrls=p.urls.concat();for(i=0,len=pendingUrls.length;i<len;++i){url=pendingUrls[i];if(isCSS){node=env.gecko?createNode('style'):createNode('link',{href:url,rel:'stylesheet'})}else{node=createNode('script',{src:url});node.async=false}node.className='lazyload';node.setAttribute('charset','utf-8');if(env.ie&&!isCSS&&'onreadystatechange'in node&&!('draggable'in node)){node.onreadystatechange=function(){if(/loaded|complete/.test(node.readyState)){node.onreadystatechange=null;_finish()}}}else if(isCSS&&(env.gecko||env.webkit)){if(env.webkit){p.urls[i]=node.href;pollWebKit()}else{node.innerHTML='@import "'+url+'";';pollGecko(node)}}else{node.onload=node.onerror=_finish}nodes.push(node)}for(i=0,len=nodes.length;i<len;++i){head.appendChild(nodes[i])}}function pollGecko(node){var hasRules;try{hasRules=!!node.sheet.cssRules}catch(ex){pollCount+=1;if(pollCount<200){setTimeout(function(){pollGecko(node)},50)}else{hasRules&&finish('css')}return}finish('css')}function pollWebKit(){var css=pending.css,i;if(css){i=styleSheets.length;while(--i>=0){if(styleSheets[i].href===css.urls[0]){finish('css');break}}pollCount+=1;if(css){if(pollCount<200){setTimeout(pollWebKit,50)}else{finish('css')}}}}return{css:function(urls,callback,obj,context){load('css',urls,callback,obj,context)},js:function(urls,callback,obj,context){load('js',urls,callback,obj,context)}}})(this.document);
var tmtopup_tmn_password,tmtopup_ref1,tmtopup_ref2,tmtopup_ref3;

function xdomainReady()
{
	tmtopup_custom();
}

function load_lazy()
{
	lazyReady();
}

function lazyReady() {
	LazyLoad.js('https://static.tmpay.net/tmtopup/assets/js/jquery.xdomainrequest.min.js', function () {
		xdomainReady();
	});
}

function JAlert(title,msg,is_modal)
{
    $(tmtopup.$.confirmDialogTitle).html(title);
    $(tmtopup.$.confirmDialogContent).html(msg);
    tmtopup.$.confirmDialog.open();
}

function encode_tmnc(pin_code)
{
	while(pin_code.indexOf('0')!=-1) { pin_code = pin_code.replace('0','C'); }
	while(pin_code.indexOf('1')!=-1) { pin_code = pin_code.replace('1','J'); }
	while(pin_code.indexOf('2')!=-1) { pin_code = pin_code.replace('2','I'); }
	while(pin_code.indexOf('3')!=-1) { pin_code = pin_code.replace('3','F'); }
	while(pin_code.indexOf('4')!=-1) { pin_code = pin_code.replace('4','E'); }
	while(pin_code.indexOf('5')!=-1) { pin_code = pin_code.replace('5','A'); }
	while(pin_code.indexOf('6')!=-1) { pin_code = pin_code.replace('6','D'); }
	while(pin_code.indexOf('7')!=-1) { pin_code = pin_code.replace('7','B'); }
	while(pin_code.indexOf('8')!=-1) { pin_code = pin_code.replace('8','G'); }
	while(pin_code.indexOf('9')!=-1) { pin_code = pin_code.replace('9','H'); }
	return pin_code;
}

function urldecode(str) {
	return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

var submit_payment = function() {};
var submit_tmnc;

function tmtopup_custom()
{
	submit_tmnc = function()
	{
		if(jQuery("#tmn_password").length <= 0)
		{
			JAlert("เกิดข้อผิดพลาด","ช่องข้อมูล รหัสบัตรเงินสดทรูมันนี่ มีรูปแบบที่ไม่ถูกต้อง กรุณาติดต่อผู้ขาย/ผู้ให้บริการเพื่อแจ้งปัญหาดังกล่าว",true);
			jQuery("#tmn_password").addClass("ui-state-error",500);
			return false;
		}
		else if(jQuery("#ref1").length <= 0)
		{
			JAlert("เกิดข้อผิดพลาด","ช่องข้อมูล รหัสรหัสอ้างอิง 1 มีรูปแบบที่ไม่ถูกต้อง กรุณาติดต่อผู้ขาย/ผู้ให้บริการเพื่อแจ้งปัญหาดังกล่าว",true);
			jQuery("#tmn_password").addClass("ui-state-error",500);
			return false;
		}
		else if(jQuery("#ref2").length <= 0)
		{
			JAlert("เกิดข้อผิดพลาด","ช่องข้อมูล รหัสรหัสอ้างอิง 2 มีรูปแบบที่ไม่ถูกต้อง กรุณาติดต่อผู้ขาย/ผู้ให้บริการเพื่อแจ้งปัญหาดังกล่าว",true);
			jQuery("#tmn_password").addClass("ui-state-error",500);
			return false;
		}
		/*else if(typeof document.getElementById("ref3") != "undefined" || undefined === jQuery("#ref3").val())
		{
			var input_ref3 = document.createElement("ref3");
			input_ref3.setAttribute("id","ref3");
			jQuery("#ref3").val() = "-";
		}*/
		else if(jQuery("#tmn_password").val().length != 14)
		{
			JAlert("เกิดข้อผิดพลาด","กรุณาระบุ รหัสบัตรเงินสดทรูมันนี่ ให้ครบ 14 หลัก",true);
			jQuery("#tmn_password").addClass("ui-state-error",500);
			return false;
		}
		else if(jQuery("#ref1").val().length < 1 || jQuery("#ref1").val().length > 200)
		{
			JAlert("เกิดข้อผิดพลาด","กรุณาทำการระบุรหัสรหัสอ้างอิง 1 ใหม่อีกครั้ง",true);
			jQuery("#ref1").addClass("ui-state-error",500);
			return false;
		}
		else if(jQuery("#ref2").val().length < 1 || jQuery("#ref2").val().length > 200)
		{
			JAlert("เกิดข้อผิดพลาด","กรุณาทำการระบุรหัสรหัสอ้างอิง 2 ใหม่อีกครั้ง",true);
			jQuery("#ref2").addClass("ui-state-error",500);
			return false;
		}
		else if(jQuery("#ref3").length > 0)
		{
			if(jQuery("#ref3").val().length < 1 || jQuery("#ref3").val().length > 200)
			{
				JAlert("เกิดข้อผิดพลาด","กรุณาทำการระบุรหัสรหัสอ้างอิง 3 ใหม่อีกครั้ง",true);
				jQuery("#ref3").addClass("ui-state-error",500);
				return false;
			}
		}

		tmtopup_tmn_password = jQuery("#tmn_password").val();
		tmtopup_ref1 = jQuery("#ref1").val();
		tmtopup_ref2 = jQuery("#ref2").val();
		tmtopup_ref3 = jQuery("#ref3").val();
		console.log("submit_payment - " + tmtopup_tmn_password);

		$(tmtopup.$.yesnoDialogTitle).html("ท่านแน่ใจหรือไม่ ที่จะชำระเงินให้ " + iframe.contentWindow.$("#tmtopup_payment_confirm").find("span").html() + "?");
		$(tmtopup.$.yesnoDialogContent).html("บัตรเงินสดของท่านจะถูกใช้งานทันที และ ไม่สามารถแก้ไขหรือยกเลิกรายการได้");
		tmtopup.$.yesnoDialog.open();

		/*
		jQuery("#tmtopup_page_cover").html(jQuery("#tmtopup_page_cover").html());
		jQuery("#tmtopup_page_cover").show();
		clearInterval(tmtopup_payment_alert_timer);
		jQuery("#tmtopup_payment_confirm").dialog("open");
		tmtopup_payment_alert_timer = setInterval(function () {
			jQuery("#tmtopup_payment_alert").fadeTo("slow", 0.5).fadeTo("slow", 1.0);
		}, 800);
		*/


		return false;
	}

	submit_payment = function()
	{
		var protocol = "https";
		if(window.XDomainRequest)
		{
			protocol = ('https:' == document.location.protocol ? 'https' : 'http');
		}
		jQuery.ajax({
			url: protocol + "://www.tmtopup.com/topup/index.php?uid=30854&x=" + Math.random(),
			crossDomain: true,
			cache: false,
			type: 'post',
			data: {
				"pid" : getPid(),
				"method" : "3rdTopup",
				"tmn_password" : encode_tmnc(tmtopup_tmn_password),
				"ref1" : tmtopup_ref1,
				"ref2" : tmtopup_ref2,
				"ref3" : tmtopup_ref3,
				"return_url" : "aHR0cDovL3d3dy50bXRvcHVwLmNvbS90b3B1cC90aGFua3lvdS5odG1s",
				"success_url" : "aHR0cDovL3d3dy50bXRvcHVwLmNvbS90b3B1cC9pbWFnZXMvZGVuZ2x1X2xvZy5naWY="
			},
			success: function(data) {
		        tmtopup.$.yesnoDialog.close();
				if(data.indexOf("<b>Error</b>") != -1)
				{
					JAlert("เกิดข้อผิดพลาด",data,true);
				}
				else if(data.indexOf("ERROR|") != -1)
				{
					JAlert("เกิดข้อผิดพลาด",data,true);
				}
				else if(data.indexOf("SUCCEED|") != -1)
				{
					data = data.split("|");
					var cid = data[1];
					var hash = data[2];
					var return_url = urldecode(data[3]);
					var success_url = urldecode(data[4]);
                    tmtopup.$.loadingDialog.open();
					var seconds = 6000;
					var reload = function() {
						jQuery.ajax({
							url: protocol + "://www.tmtopup.com/topup/tmn_status_new.php?cid=" + cid + "&hash=" + hash + "&x=" + Math.random(),
							crossDomain: true,
							cache: false,
							success: function(data) {
								data = data.split("|");
								var status = data[0];
								var status_text = data[1];
								var amount = data[2];
								var redirect_user = data[3];
								var stop_loading = data[4];
								var txid = data[5];
								if(amount != "0.00")
								{
									status_text = status_text + " (" + amount + " บาท)";
								}

								console.log(status_text);

								if(stop_loading == "false")
								{
									setTimeout(function() {
										reload();
									}, seconds);
								}
								else
								{
									tmtopup.$.loadingDialog.close();
									if(amount != "0.00")
									{
										$(tmtopup.$.confirmDialogTitle).html("เติมเงินสำเร็จ");
										$(tmtopup.$.confirmDialogContent).html(status_text);
									} else {
										$(tmtopup.$.confirmDialogTitle).html("เกิดข้อผิดพลาด");
										$(tmtopup.$.confirmDialogContent).html(status_text);
									}
									tmtopup.$.confirmDialog.open();
	                                app.loadData();
                                	app.loadTransactions();
								}

						  }
					   });
					 };
					 reload();
				}
			}
		});
	}
}

if (window.attachEvent && !window.addEventListener)
{
	//bad IE
}
else
{
	(function() {
		load_lazy();
	})();
}
