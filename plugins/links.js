plugins.push(new Linkbox());

function Linkbox() {
	
	var manifest_url = location.href + 'manifest.webapp';
	
	function checkFirefox() {
		console.debug(typeof navigator !== 'undefined' && typeof navigator.mozApps !== 'undefined');
		return (typeof navigator !== 'undefined' && typeof navigator.mozApps !== 'undefined');
	}
	
	function install(ev) {
		ev.preventDefault();
		//Manifest URL Definieren
		// App Installieren
		var installLocFind = navigator.mozApps.install(manifest_url);
		installLocFind.onsuccess = function(data) {
			// Wenn die App Installiert ist
			alert('ExpenSync was successfully installed!');
		};
		installLocFind.onerror = function() {
			// App ist nicht Installiert
			// installapp.error.name
			alert(installLocFind.error.name);
		};
	};
	
	// Firefox install button
	function firefoxInstallButton() {
		
		if(checkFirefox()) {
	
			var button = document.getElementById('button-install-firefox');

			var installCheck = navigator.mozApps.checkInstalled(manifest_url);

			installCheck.onsuccess = function() {
				if(installCheck.result) {
					button.style.display = "none";
				} else {
					button.addEventListener('click', install, false);
				};
			};
		} else {
			button.style.display = "none";
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
			html +=	'<li id="button-install-firefox"><a class="item-icon-wrapper" href="javascript: return false;" target="_blank">'+
						'<span class="item-icon"><svg style="width:24px;height:24px" viewBox="0 0 24 24">'+
								'<path fill="#999999" d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z" />'+
						'</svg></span>'+
						'<div>Als Firefox-App installieren</div>'+
					'</a></li>'+
					'</ul></div>';
			}

/*					<!--TESTING ONLY-->
					<ul>
						<li><a class="item-icon-wrapper" id="vorlesungsplan-link" href="http://vorlesungsplan.dhbw-mannheim.de/" target="_blank">

						<span class="item-icon"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#a1887f" d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
						</svg></span>
							<div>
						Kaffeepause
								</div>
					</a></li>
						<li><span class="item-icon-wrapper">
						<span class="item-icon"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#ffd54f" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
						</svg></span>
						<div>Flagge hissen</div>
					</span></li>
					</ul>*/
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