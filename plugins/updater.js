plugins.push(new Updater());

function Updater() {
  var UPDATE_API = "2bab40b7-484b-4861-885e-bdac87638778";
  var githuburl = "https://github.com/topahl/DHBW-Dashboard/releases";
  var githubapi_url = "https://api.import.io/store/data/"+UPDATE_API+"/_query?input/webpage/url="+encodeURIComponent(githuburl)+"&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey="+API_KEY;

  var versions;

  function loadData(object){
    $.get(githubapi_url,function(data){
      versions = data;
      checkVersion(object);
      console.log(data);
    });
  }

  function checkVersion(object){
    if(typeof chrome == 'undefined' || chrome.runtime.getManifest =='undefined'){
      return;
    }
    var local_version = chrome.runtime.getManifest().version;
    if(local_version != versions.results[0].version){

      var html ='<div class="list-box" id="updater"><ul>'+
            '<li><a class="item-icon-wrapper" id="vorlesungsplan-link" href="'+versions.results[0].download+'" target="_blank">'+
            '<span class="item-icon">'+
            '<svg style="width:24px;height:24px" viewBox="0 0 24 24">'+
            '<path fill="#999999" d="M17,13L12,18L7,13H10V9H14V13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />'+
            '</svg>'+
            '</span>'+
            '<div>Download Version '+versions.results[0].version+'</div>'+
            '</a></li>';
      $(object).html(html);
    }
  }

  return {
    setup : function(object){
      loadData(object);
    },
    option : function(){

    },
    setHtmlAt : function(object){

    },
    getPriority : function(){

    },
    createListener : function(){

    },
    preloadOptions : function(){

    }
  }
}
