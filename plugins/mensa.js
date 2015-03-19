plugins.push(new Mensa());

function Mensa(){
  var now = new Date();
  var MENSA_API = "ec5a49ed-dcdf-4f60-951b-6935759bc071";
  var mensaurl = "https://www.stw-ma.de/Essen+_+Trinken/Men%C3%BCpl%C3%A4ne/Mensaria+Metropol-date-"+now.toJSON().replace(/T.*/,"").replace(/-/g,"_")+"-pdfView-1.html";
  var mensaapi_url = "https://api.import.io/store/data/"+MENSA_API+"/_query?input/webpage/url="+encodeURIComponent(mensaurl)+"&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey="+API_KEY;
  var mensaData;

  function loadData(object){
    $.get(mensaapi_url,function(data){
      mensaData = data;
      parseMensa(object);
    });

  }

  function parseMensa(object){
    var day = (now.getDay()-1)*2;
    var data = mensaData;
    var html = '<div id="mensaplan" class="list-box">';
    html += '<ul>';
    html += '<li data-role="list-divider">Mensaria Metropol</li>';
    html += '<li><div class="flex-box"><div>'+data.results[day].menu_1+'</div><strong class="price">'+data.results[day+1].menu_1.replace(',','.')+'</strong></div></li>';
    html += '<li><div class="flex-box"><div>'+data.results[day].menu_2+'</div><strong class="price">'+data.results[day+1].menu_2.replace(',','.')+'</strong></div></li>';
    html += '<li><div class="flex-box"><div>'+data.results[day].vegetarisch+'</div><strong class="price">'+data.results[day+1].vegetarisch.replace(',','.')+'</strong></div></li>';
    html += '</ul>';
    html += '</div>';
    html = html.replace(/ *\[[^\]]*\] */g, "");
    html = html.replace(/\,/g, "<br>");
    $(object).html(html);
  }

  function calcPrio(){
    var time = new Date();
    var st=""+time.getHours()+time.getMinutes();
    if(st>1130&&st<1230){
      return 10;
    }
    return 1;

  }

  return {
    setup : function(object){
      loadData(object);
    },
    option : function(){
      return null;
    },
    setHtmlAt : function(object){
      parseMensa(object);
    },
    getPriority : function(){

      return calcPrio();
    },
    createListener : function(){
      //no listeners
    },
    preloadOptions : function(){
      //no options
    }
  }
}
