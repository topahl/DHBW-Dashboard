function settings(){
  $("#settingslayer").fadeIn();
  $("#plugin-area").fadeOut();
}

function close(){
  $("#plugin-area").fadeIn();
  $("#settingslayer").fadeOut();
}

function ui(){
	if((typeof chrome !== 'undefined') && (typeof chrome.storage !== 'undefined')) {
	} else {
		// disable resize button outside chrome
		$('#fullscreen').hide();
	}
	
	// masonry grid setup
	msnry = new Masonry( '#plugin-area', {
		itemSelector: '.layout-container',
		percentagePosition: true,
		isInitLayout: false
	});
	updateUI();
	
	// TODO quickfix: update UI interval. replace with update after "plugin ready feedback"
	setInterval(function(){console.debug("update masonry timer");updateUI();}, 15000);
}

function updateUI(){
	console.debug("update masonry");
	msnry.layout();
}