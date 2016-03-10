var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-74892065-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})(); // Googoe Analytics

// desktop notification
function ESP_Notify() {
	document.addEventListener('DOMContentLoaded', function () {
	  if (Notification.permission !== "granted")
	    Notification.requestPermission();
	});

  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
  	loadXMLDoc('https://github.com/wujr5/eden-slider-plus/raw/master/updates.xml');
  }
}

function loadXMLDoc(url) {
	xmlhttp = null;
	if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
  	xmlhttp = new XMLHttpRequest();
  }
	else if (window.ActiveXObject) {// code for IE6, IE5
  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
	if (xmlhttp != null) {
	  xmlhttp.onreadystatechange = state_Change;
	  xmlhttp.open("GET", url, true);
	  xmlhttp.send(null);
  } else {
  	alert("Your browser does not support XMLHTTP.");
  }
}

function state_Change() {
	if (xmlhttp.readyState == 4) { // 4 = "loaded"
  	if (xmlhttp.status == 200) { // 200 = "OK"
	    var text = xmlhttp.responseText;
	  	var xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
	  	var new_version = xmlDoc.getElementsByTagName('updatecheck')[0].attributes[1].nodeValue
	  	
	  	var manifest = chrome.runtime.getManifest();
  		var old_version = manifest.version;
  	
  		if (new_version == old_version) { // 已经是最新版本
  			var body = "恭喜啦！你插件已经是最新版本了：" + new_version;

  			var notification = new Notification('更新通知', {
		    	title: 'Eden Slider Plus',
		      icon: 'http://s2.buzzhand.net/uploads/cb/0/693372/14316130077668.jpg',
		      body: body,
		    });

		    notification.onclick = function () {
		      window.open("https://github.com/wujr5/eden-slider-plus");
		    };
  		} else { // 非最新版
  			var body = "插件更新啦！你的版本是：" + old_version + "，最新版本是：" + new_version +
  				"。升级请转到：https://github.com/wujr5/eden-slider-plus";

  			var notification = new Notification('更新通知', {
		    	title: 'Eden Slider Plus',
		      icon: 'http://s2.buzzhand.net/uploads/cb/0/693372/14316130077668.jpg',
		      body: body,
		    });

		    notification.onclick = function () {
		      window.open("https://github.com/wujr5/eden-slider-plus");
		    };

		    notification.onclose = function () {
		      window.open("https://github.com/wujr5/eden-slider-plus");
		    };
  		}
    } else {
    	alert("Problem retrieving XML data:" + xmlhttp.statusText);
    }
  }
}

ESP_Notify();
