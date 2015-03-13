plugins.push(new Linkbox());

function Linkbox() {
	
	//Firefox manifest URL
	var manifest_url = 'http://topahl.github.io/DHBW-Dashboard/manifest.webapp';
	
	function checkFirefox() {
		return (typeof navigator !== 'undefined' && typeof navigator.mozApps !== 'undefined');
	}
	
	function install(ev) {
		ev.preventDefault();

		// install app
		var installLocFind = navigator.mozApps.install(manifest_url);
		installLocFind.onsuccess = function(data) {
			// app install successful
			alert('DHBW Dashboard wurde installiert!');
		};
		installLocFind.onerror = function() {
			// app install not successful
			// installapp.error.name
			alert('Fehler bei der Installation: \n' + installLocFind.error.name);
		};
	};
	
	// Firefox install button
	function firefoxInstallButton() {
		
		if(checkFirefox()) {
	
			var $button = $('#button-install-firefox');

			var installCheck = navigator.mozApps.checkInstalled(manifest_url);

			installCheck.onsuccess = function() {
				if(installCheck.result) {
					$button.hide();
				} else {
					$button.on('click', function(e) { install(e); });
				};
			};
		} else {
			$button.hide();
		}
	}
	
	function createHtml(object) {
		
		var html ='<div class="list-box"><ul>'+
					'<li><a class="item-icon-wrapper" id="vorlesungsplan-link" href="http://vorlesungsplan.dhbw-mannheim.de/index.php" target="_blank">'+
					'<span class="item-icon"><svg style="width:24px;height:24px" viewBox="0 0 24 24">'+
					'<path fill="#999999" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />'+
					'</svg></span>'+
					'<div>Vorlesungsplan aufrufen</div>'+
					'</a></li>';
		
		if(checkFirefox()) {
			html +=	'<li id="button-install-firefox" class="item-icon-wrapper link">'+
					'<span class="item-icon"><svg style="width:24px;height:24px" viewBox="0 0 24 24">'+
					'<path fill="#999999" d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z" />'+
					'</svg></span>'+
					'<div>Als Firefox-App installieren</div>'+
					'</li>';
		}
		
		html += '</ul></div>';
		
		$(object).html(html);
	}
	
	return {
		setup : function(object){
			console.log("addLinkSetup");
			createHtml(object);
    },
    option : function(){
      return null;
    },
    setHtmlAt : function(object){
			console.log("addLinkHTML");
      createHtml(object);
    },
    getPriority : function(){
      return 1;
    },
    createListener : function(){
			console.log("addLinkListeners");
      firefoxInstallButton();
    }
	}
}