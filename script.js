$( document ).ready( setup );
setInterval(updateData,60000);
var datastore = {};
var API_KEY = "g6G47ZUDSJ%2B5CoDlh41qJCcp0B9BqU348eUpHdUveTqTrEf4n6LVTrFBpATxUOjFB1AqRd2uK%2BBL4cPJlR75fg%3D%3D";
var MENSA_API = "ec5a49ed-dcdf-4f60-951b-6935759bc071";
var PLAN_API = "87d7b852-1980-4ea8-94ae-3d5d0999f987";



function setup(){
  $("#update").on("click",updateData);
  $("#settings").on("click",settings);
  $("#closesettings").on("click",close);
  $("#closemensa").on("click",close);
  $("#mensa").on("click",mensa);
  chrome.storage.sync.get("kurs", function (obj) {
    $("#kursid").val(obj.kurs);
    updateData();
  });
  $("#kursid").on("keyup",changeKursID);

}

function updateData(){
  datastore.now = new Date();
  datastore.kurs_uid = $("#kursid").val();
  var planurl = "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&uid="+datastore.kurs_uid;
  var mensaurl = "https://www.stw-ma.de/Essen+_+Trinken/Men%C3%BCpl%C3%A4ne/Mensaria+Metropol-date-"+datastore.now.toJSON().replace(/T.*/,"").replace(/-/g,"_")+"-pdfView-1.html";
    //API url's (JSON)
  var mensaapi_url = "https://api.import.io/store/data/"+MENSA_API+"/_query?input/webpage/url="+encodeURIComponent(mensaurl)+"&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey="+API_KEY;
  var planapi_url = "https://api.import.io/store/data/"+PLAN_API+"/_query?input/webpage/url="+encodeURIComponent(planurl)+"&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey="+API_KEY;
  $.get( planapi_url, function() {
  })
    .done(function(data){
      datastore.plan = data;
      parsePlan("#heute",0);
      parsePlan("#morgen",1);
    }
  );
  $.get( mensaapi_url, function() {
  })
    .done(function(data){
      datastore.mensa = data;
      parseMensa("#mensaplan");
    }
  );
}

function parsePlan(object,offset){
  var day = datastore.now.getDay();
  //var day = 1
  var kursname = datastore.plan.results[0].kurs;
  $(".kursname").text( (kursname.length > 0) ? kursname : "Kein Kurs eingetragen");
  var html = datastore.plan.results[datastore.now.getDay()-1+offset];
  var result = '';
  result = result + '<ul>';
  result = result + '<li data-role="list-divider">'+germanDateString(html.day)+'</li>';
  for (var key in html.kurs_name){
    result = result + '<li><b>'+prepareTimeString(html.time[key],html.day)+'</b><br>'+html.kurs_name[key]+'<br>'+html.raum[key]+'</li>';
  }
  result = result + '</ul>';
  $(object).html( result );
}

function parseMensa(object){
  //var day = (time.getDay()-1)*2;
  var day = datastore.now.getDay()-1;
  var data = datastore.mensa;
  var html = '';
  html = html + '<ul>';
  html = html + '<li data-role="list-divider">Mensa</li>';
  html = html + '<li>'+data.results[day].menu_1+'<br><b>'+data.results[day+1].menu_1.replace(',','.')+'</b></li>';
  html = html + '<li>'+data.results[day].menu_2+'<br><b>'+data.results[day+1].menu_2.replace(',','.')+'</b></li>';
  html = html + '<li>'+data.results[day].vegetarisch+'<br><b>'+data.results[day+1].vegetarisch.replace(',','.')+'</b></li>';
  html = html + '</ul>';
  html = html.replace(/ *\[[^\]]*\] */g, "");
  html = html.replace(/\,/g, "<br>");
  $(object).html(html);

}

function settings(){
  $("#settingslayer").fadeIn();
}

function close(){
  $("#settingslayer").fadeOut();
  $("#mensalayer").fadeOut();
}

function changeKursID(){
  var id = $("#kursid").val();

	if(id.substring(0,4) == "http") {
		id = id.split("uid=")[1];
		$("#kursid").val(id);
	}

  chrome.storage.sync.set({"kurs": id})
  loadData();
}

function germanDateString(day){
  var weekday = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
  var date = new Date(day);
  return weekday[date.getDay()-1] + " - " + date.getDate() + "." + (date.getMonth()+1);

}

function mensa(){
  $("#mensalayer").fadeIn();
}

function prepareTimeString(time,day){
  var now = new Date();
  var result = time;
  var times =  time.split(/[:-]/);
  times=[times[0]*60+times[1]*1,times[2]*60+times[3]*1];
  if(day-now < 0){
    now = (now.getHours()*60)+now.getMinutes();
    if(times[0]<=now){
      if(times[1]>=now){
        var diff = times[1]-now;
        var minutes = (diff%60);
        minutes = (minutes < 10) ?("0"+minutes):minutes;
        result = result + '</b><span class="timeleft"> noch '+(Math.floor(diff/60))+':'+minutes+'</span><b>';
      }
    }
  }
  return result;
}
