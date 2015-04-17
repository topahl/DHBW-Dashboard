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
	var msnry = new Masonry( '#plugin-area', {
		itemSelector: '.layout-container'
	});
}