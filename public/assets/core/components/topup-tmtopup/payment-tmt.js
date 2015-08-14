
if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} };

var LazyLoad = (function(doc){var env,head,pending={},pollCount=0,queue={css:[],js:[]},styleSheets=doc.styleSheets;function createNode(name,attrs){var node=doc.createElement(name),attr;for(attr in attrs){if(attrs.hasOwnProperty(attr)){node.setAttribute(attr,attrs[attr])}}return node}function finish(type){var p=pending[type],callback,urls;if(p){callback=p.callback;urls=p.urls;urls.shift();pollCount=0;if(!urls.length){callback&&callback.call(p.context,p.obj);pending[type]=null;queue[type].length&&load(type)}}}function getEnv(){var ua=navigator.userAgent;env={async:doc.createElement('script').async===true};(env.webkit=/AppleWebKit\//.test(ua))||(env.ie=/MSIE|Trident/.test(ua))||(env.opera=/Opera/.test(ua))||(env.gecko=/Gecko\//.test(ua))||(env.unknown=true)}function load(type,urls,callback,obj,context){var _finish=function(){finish(type)},isCSS=type==='css',nodes=[],i,len,node,p,pendingUrls,url;env||getEnv();if(urls){urls=typeof urls==='string'?[urls]:urls.concat();if(isCSS||env.async||env.gecko||env.opera){queue[type].push({urls:urls,callback:callback,obj:obj,context:context})}else{for(i=0,len=urls.length;i<len;++i){queue[type].push({urls:[urls[i]],callback:i===len-1?callback:null,obj:obj,context:context})}}}if(pending[type]||!(p=pending[type]=queue[type].shift())){return}head||(head=doc.head||doc.getElementsByTagName('head')[0]);pendingUrls=p.urls.concat();for(i=0,len=pendingUrls.length;i<len;++i){url=pendingUrls[i];if(isCSS){node=env.gecko?createNode('style'):createNode('link',{href:url,rel:'stylesheet'})}else{node=createNode('script',{src:url});node.async=false}node.className='lazyload';node.setAttribute('charset','utf-8');if(env.ie&&!isCSS&&'onreadystatechange'in node&&!('draggable'in node)){node.onreadystatechange=function(){if(/loaded|complete/.test(node.readyState)){node.onreadystatechange=null;_finish()}}}else if(isCSS&&(env.gecko||env.webkit)){if(env.webkit){p.urls[i]=node.href;pollWebKit()}else{node.innerHTML='@import "'+url+'";';pollGecko(node)}}else{node.onload=node.onerror=_finish}nodes.push(node)}for(i=0,len=nodes.length;i<len;++i){head.appendChild(nodes[i])}}function pollGecko(node){var hasRules;try{hasRules=!!node.sheet.cssRules}catch(ex){pollCount+=1;if(pollCount<200){setTimeout(function(){pollGecko(node)},50)}else{hasRules&&finish('css')}return}finish('css')}function pollWebKit(){var css=pending.css,i;if(css){i=styleSheets.length;while(--i>=0){if(styleSheets[i].href===css.urls[0]){finish('css');break}}pollCount+=1;if(css){if(pollCount<200){setTimeout(pollWebKit,50)}else{finish('css')}}}}return{css:function(urls,callback,obj,context){load('css',urls,callback,obj,context)},js:function(urls,callback,obj,context){load('js',urls,callback,obj,context)}}})(this.document);
var jquery_ui_state = 0;
var colorbox_ui_state = 0;
var tmtopup_payment_alert_timer,tmtopup_tmn_password,tmtopup_ref1,tmtopup_ref2,tmtopup_ref3;

function compareVersions(installed, required)
{
	var a = installed.split('.');
	var b = required.split('.');

	for (var i = 0; i < a.length; ++i) {
		a[i] = Number(a[i]);
	}
	for (var i = 0; i < b.length; ++i) {
		b[i] = Number(b[i]);
	}
	if (a.length == 2) {
		a[2] = 0;
	}

	if (a[0] > b[0]) return true;
	if (a[0] < b[0]) return false;

	if (a[1] > b[1]) return true;
	if (a[1] < b[1]) return false;

	if (a[2] > b[2]) return true;
	if (a[2] < b[2]) return false;

	return true;
}

function load_lazy()
{
	lazyReady();
}

function lazyReady()
{
	console.log("lazy loaded");
	var version;
	if (typeof jQuery !== "undefined")
	{
		version = jQuery.fn.jquery;
		console.log("jquery version:" + version);
	}
	if (typeof jQuery === "undefined" || compareVersions(version,"1.11.0") == false)
	{
		console.log("loading jquery 1.11.0");
		LazyLoad.js('https://static.tmpay.net/tmtopup/assets/js/jquery-1.11.0.min.js', function () {
			jqReady();
		});
	}
	else
	{
		jqReady();
	}
}

function jqReady()
{
	console.log("jquery loaded");
	var version;
	if (typeof jQuery.ui !== "undefined")
	{
		version = jQuery.ui.version;
		console.log("jquery-ui version:" + version);
	}
	if (typeof jQuery.ui === "undefined" || compareVersions(version,"1.10.4") == false)
	{
		console.log("loading jquery-ui");
		LazyLoad.css('https://static.tmpay.net/tmtopup/jquery-ui-1.10.4/themes/smoothness/jquery-ui.css', function () {
			jquiReady(1);
		});
		LazyLoad.js('https://static.tmpay.net/tmtopup/jquery-ui-1.10.4/jquery-ui.min.js', function () {
			jquiReady(3);
		});
	}
	else
	{
		jquiReady(4);
	}
}

function jquiReady(state)
{
	console.log("jquery-ui loaded (" + state + ")");
	jquery_ui_state = jquery_ui_state + state;
	if(jquery_ui_state == 4)
	{
		console.log("loading xdomain");
		LazyLoad.js('https://static.tmpay.net/tmtopup/assets/js/jquery.xdomainrequest.min.js', function () {
			xdomainReady();
		});
	}
}

function xdomainReady()
{
	console.log("xdomain loaded");
	if (typeof jQuery.colorbox === "undefined")
	{
		console.log("loading colorbox");
		LazyLoad.css('https://static.tmpay.net/tmtopup/colorbox/colorbox.css', function () {
			colorboxReady(1);
		});
		LazyLoad.js('https://static.tmpay.net/tmtopup/colorbox/jquery.colorbox-min.js', function () {
			colorboxReady(3);
		});
	}
	else
	{
		colorboxReady(4);
	}
}

function colorboxReady(state)
{
	console.log("colorboxx loaded (" + state + ")");
	colorbox_ui_state = colorbox_ui_state + state;
	if(colorbox_ui_state == 4)
	{
		if(typeof jQuery !== "undefined" && typeof jQuery.ui !== "undefined" & typeof jQuery.colorbox !== "undefined")
		{
			console.log("use tmtopup_new");
			tmtopup_new();
			jQuery(function() {
				jQuery("body").append('<div id="tmtopup_page_cover" style="width: 100%;height: 100%;top: 0px;left: 0px;position: fixed;display: block; z-index: 99; background-color:#ffffff;opacity:0.7;filter:alpha(opacity=70)"></div><div id="tmtopup_payment_confirm" title="ยืนยันการชำระเงิน" style="font-family:Tahoma;font-size:18px"><p style="margin:15px">ท่านแน่ใจหรือไม่ ที่จะชำระเงินให้ <span style="font-weight:bold;color:#b26200">JameMieKunG (UID:30854)</span> ?</p><p><div id="tmtopup_payment_alert" style="font-size:12px;color:#fff;background-color:#ff0000;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;padding:10px 10px;">บัตรเงินสดของท่านจะถูกใช้งานทันที และ ไม่สามารถแก้ไขหรือยกเลิกรายการได้</div></p></div><div id="error_box" title="Error" style="font-family:Tahoma;font-size:18px"></div><div style="display:none"><div id="processing_box" style="font-family:Tahoma;font-size:14px;text-align:center"><p style="margin-top:20px"><img id="loading_img" src="https://static.tmpay.net/tmtopup/assets/img/topup_loading.gif" /></p><p style="font-size:16px;font-weight:bold;margin:15px">สถานะรายการ <span id="result_status" style="text-shadow: 0.9px 0.9px #cbcbcb">กำลังตรวจสอบ</span></p><span id="remark_box" style="font-size:12px;color:#fff;background-color:#0c3c4d;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;padding:10px 10px;">กรุณาอย่าปิดหน้าต่างนี้ จนกว่าระบบจะดำเนินการสำเร็จ</span></div></div>');
				jQuery("#tmtopup_payment_confirm").dialog({
					resizable: false,
					width:"auto",
					modal: true,
					draggable: false,
					autoOpen: false,
					close: function() { jQuery("#tmtopup_page_cover").hide(); },
					buttons: {
						"ยืนยันรายการ": function() {
							jQuery("#tmtopup_page_cover").hide();
							submit_payment();
							jQuery(this).dialog("close");
						},
						"ยกเลิก": function() {
							jQuery("#tmtopup_page_cover").hide();
							jQuery(this).dialog("close");
						}
					}
				});
				jQuery("#tmn_password,#ref1,#ref2,#ref3").bind("input",function(){
					jQuery(this).removeClass("ui-state-error");
					jQuery(".error_box").hide(500);
				});
				jQuery("#tmn_password").prop('maxLength', 14);
				jQuery("#ref1,#ref2,#ref3").prop('maxLength', 50);
				jQuery("#tmtopup_page_cover").hide();
			});
		}
	}
}

function JAlert(title,msg,is_modal)
{
    $(tmtopup.$.confirmDialogTitle).html(title);
    $(tmtopup.$.confirmDialogContent).html(msg);
    tmtopup.$.confirmDialog.open();
    /*
	jQuery("#tmtopup_page_cover").html(jQuery("#tmtopup_page_cover").html());
	jQuery("#tmtopup_page_cover").show();
	jQuery( "#error_box" ).html(msg);
	jQuery( "#error_box" ).dialog({
		"title": title,
		modal: is_modal,
		resizable: false,
		width: "auto",
		close: function() { jQuery("#tmtopup_page_cover").hide(); },
		buttons: {
			"ปิด": function() {
				jQuery("#tmtopup_page_cover").hide();
				jQuery(this).dialog("close");
			}
		}
	});
    */
}

//PIN Encding
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
submit_tmnc = function()
{
	if(confirm('บัตรเงินสดของท่านจะถูกใช้งานและตัดยอดเงินทันทีที่ทำรายการ !\nท่านแน่ใจหรือไม่ที่จะชำระเงินให้ JameMieKunG (UID:30854) ด้วยบัตรเงินสดทรูมันนี่ ?\nหากยืนยันการทำรายการแล้ว จะไม่สามารถยกเลิกหรือคืนเงินได้') == false)
	{
		return false;
	}
	else if(undefined === document.getElementById("tmn_password").value)
	{
		alert("ไม่สามารถทำรายการได้ เนื่องจากข้อมูลบางส่วนไม่ครบถ้วน");
		return false;
	}
	else if(undefined === document.getElementById("ref1").value)
	{
		alert("ไม่สามารถทำรายการได้ เนื่องจากข้อมูลบางส่วนไม่ครบถ้วน");
		return false;
	}
	else if(undefined === document.getElementById("ref2").value)
	{
		alert("ไม่สามารถทำรายการได้ เนื่องจากข้อมูลบางส่วนไม่ครบถ้วน");
		return false;
	}
	/*else if(typeof document.getElementById("ref3") != "undefined" || undefined === document.getElementById("ref3").value)
	{
		var input_ref3 = document.createElement("ref3");
		input_ref3.setAttribute("id","ref3");
		document.getElementById("ref3").value = "-";
	}*/
	else if(document.getElementById("tmn_password").value.length != 14)
	{
		alert("กรุณาทำการระบุรหัสบัตรเงินสดใหม่อีกครั้ง (Please re-entry cash card password again.)");
		document.getElementById("tmn_password").focus();
		return false;
	}
	else if(document.getElementById("ref1").value.length < 1 || document.getElementById("ref1").value.length > 255)
	{
		alert("กรุณาทำการระบุรหัสรหัสอ้างอิง 1 ใหม่อีกครั้ง (Please re-entry ref1 again.)");
		document.getElementById("ref1").focus();
		return false;
	}
	else if(document.getElementById("ref2").value.length < 1 || document.getElementById("ref2").value.length > 255)
	{
		alert("กรุณาทำการระบุรหัสรหัสอ้างอิง 2 ใหม่อีกครั้ง (Please re-entry ref2 again.)");
		document.getElementById("ref2").focus();
		return false;
	}
	if(document.getElementById("ref3"))
	{
		if(document.getElementById("ref3").value.length < 1 || document.getElementById("ref3").value.length > 255)
		{
			alert("กรุณาทำการระบุรหัสรหัสอ้างอิง 3 ใหม่อีกครั้ง (Please re-entry ref3 again.)");
			document.getElementById("ref3").focus();
			return false;
		}
	}
	var tmtopupForm = document.createElement("form");
	tmtopupForm.action = "https://www.tmtopup.com/topup/?uid=30854";
	tmtopupForm.method = "post";
	tmtopupForm.target = "_parent";
	tmtopupForm.style.display = 'none';

	var input_return_url = document.createElement("input");
	input_return_url.type = "hidden";
	input_return_url.name = "return_url";
	input_return_url.value = "aHR0cDovL3d3dy50bXRvcHVwLmNvbS90b3B1cC90aGFua3lvdS5odG1s";
	tmtopupForm.appendChild(input_return_url);

	var input_success_url = document.createElement("input");
	input_success_url.type = "hidden";
	input_success_url.name = "success_url";
	input_success_url.value = "aHR0cDovL3d3dy50bXRvcHVwLmNvbS90b3B1cC9pbWFnZXMvZGVuZ2x1X2xvZy5naWY=";
	tmtopupForm.appendChild(input_success_url);

	var encoded = encode_tmnc(document.getElementById("tmn_password").value);
	var input_tmn_password = document.createElement("input");
	input_tmn_password.type = "hidden";
	input_tmn_password.name = "tmn_password";
	input_tmn_password.value = encoded;
	tmtopupForm.appendChild(input_tmn_password);

	var ref1 = document.getElementById("ref1").value;
	var input_ref1 = document.createElement("input");
	input_ref1.type = "hidden";
	input_ref1.name = "ref1";
	input_ref1.value = ref1;
	tmtopupForm.appendChild(input_ref1);

	var ref2 = document.getElementById("ref2").value;
	var input_ref2 = document.createElement("input");
	input_ref2.type = "hidden";
	input_ref2.name = "ref2";
	input_ref2.value = ref2;
	tmtopupForm.appendChild(input_ref2);

	if(document.getElementById("ref3"))
	{
		var ref3 = document.getElementById("ref3").value;
		var input_ref3 = document.createElement("input");
		input_ref3.type = "hidden";
		input_ref3.name = "ref3";
		input_ref3.value = ref3;
		tmtopupForm.appendChild(input_ref3);
	}

	var input_pid = document.createElement("input");
	input_pid.type = "hidden";
	input_pid.name = "pid";
	input_pid.value = getPid();
	tmtopupForm.appendChild(input_pid);

	var input_method = document.createElement("input");
	input_method.type = "hidden";
	input_method.name = "method";
	input_method.value = "3rdTopup";
	tmtopupForm.appendChild(input_method);

	var input_outdated_browser = document.createElement("input");
	input_outdated_browser.type = "hidden";
	input_outdated_browser.name = "outdated_browser";
	input_outdated_browser.value = "true";
	tmtopupForm.appendChild(input_outdated_browser);

	var _body = document.body;
	if(!_body)
	{
		_body = document.getElementsByTagName("body")[0];
	}
	_body.appendChild(tmtopupForm);
	tmtopupForm.submit();
}

function tmtopup_new()
{
	submit_tmnc = function()
	{
		if(colorbox_ui_state != 4)
		{
			alert("ขณะนี้ไม่สามารถทำรายการได้ เนื่องจากการดาวน์โหลดจาวาสคริปต์ยังไม่สมบูรณ์");
			return false;
		}
		else if(jQuery("#tmn_password").length <= 0)
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

		jQuery("#tmtopup_page_cover").html(jQuery("#tmtopup_page_cover").html());
		jQuery("#tmtopup_page_cover").show();
		clearInterval(tmtopup_payment_alert_timer);
		jQuery("#tmtopup_payment_confirm").dialog("open");
		tmtopup_payment_alert_timer = setInterval(function () {
			jQuery("#tmtopup_payment_alert").fadeTo("slow", 0.5).fadeTo("slow", 1.0);
		}, 800);

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
                console.log("success");
                console.log(data);
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
					//jQuery.colorbox({href:"#processing_box", inline:true, width:"50%", height:"250px", escKey: false, overlayClose: false, onLoad:function(){jQuery("#cboxClose").hide();}, onClosed:function(){location.reload(true);} });
					var seconds = 6000; // time in milliseconds
					var reload = function() {
						jQuery.ajax({
							url: protocol + "://www.tmtopup.com/topup/tmn_status_new.php?cid=" + cid + "&hash=" + hash + "&x=" + Math.random(),
							crossDomain: true,
							cache: false,
							success: function(data) {
								tmtopup.$.loadingDialog.close();

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
								jQuery("#result_status").html(status_text);

								$(tmtopup.$.confirmDialogContent).html(status_text);
								tmtopup.$.confirmDialog.open();
                                app.loadData();
                                app.loadTransactions();

                                /*
								if(stop_loading == "false")
								{
									setTimeout(function() {
										reload();
									}, seconds);
								}
								else
								{
									if(status == 1)
									{
										jQuery("#loading_img").attr("src", "https://static.tmpay.net/tmtopup/assets/img/check-icon.png");
										jQuery("#remark_box").text("ระบบจะดำเนินการเรียบร้อยแล้ว กรุณารอสักครู่ ระบบกำลังพาท่านกลับไปร้านค้า...");
										jQuery("#remark_box").css("background-color","#dddddd");
										jQuery("#remark_box").css("color","#000000");
										var target_url;
										if(success_url.substring(0,4) == "http")
										{
											target_url = success_url;
										}
										else
										{
											target_url = return_url;
										}
										target_url = target_url + "?TXID=" + txid;
										window.setTimeout(function() {
											window.location.replace(target_url);
										}, 5000);
									}
									else
									{
										jQuery("#loading_img").attr("src", "https://static.tmpay.net/tmtopup/assets/img/no-icon.png");
										jQuery("#remark_box").text("ระบบจะดำเนินการเรียบร้อยแล้ว สามารถปิดหน้าต่างนี้ได้อย่างปลอดภัย");
										jQuery("#remark_box").css("background-color","#dddddd");
										jQuery("#remark_box").css("color","#000000");
										jQuery("#cboxClose").show(500);
									}
								}
                                */

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
