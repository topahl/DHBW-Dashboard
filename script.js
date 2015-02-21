$( document ).ready( setup );



function setup(){
  $("#update").on("click",update);
  $("#settings").on("click",settings);
  $("#closesettings").on("click",close);
  $("#closemensa").on("click",close);
  $("#mensa").on("click",mensa);
  chrome.storage.sync.get("kurs", function (obj) {
    $("#kursid").val(obj.kurs);
    update();
  });
  $("#kursid").on("keyup",changeKursID);

}

function loadPlan(){
  var uid = $("#kursid").val();
  var url = "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&uid="+uid;
  var mensaurl = "https://api.import.io/store/data/ec5a49ed-dcdf-4f60-951b-6935759bc071/_query?input/webpage/url=https%3A%2F%2Fwww.stw-ma.de%2FEssen%2520_%2520Trinken%2FMen%25C3%25BCpl%25C3%25A4ne%2FMensaria%2520Metropol-date-2015_02_16-pdfView-1.html&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey=g6G47ZUDSJ%2B5CoDlh41qJCcp0B9BqU348eUpHdUveTqTrEf4n6LVTrFBpATxUOjFB1AqRd2uK%2BBL4cPJlR75fg%3D%3D";

  $.get( url, function() {
  })
    .done(function(data) {

      $("#heute").html( parseTimetable( data,0 ) );
      $("#morgen").html( parseTimetable( data,1 ) );
      var kursname = $(data).find(".header-txt-c > h1 > span").text();
      $(".kursname").text( (kursname.length > 0) ? kursname : "Kein Kurs eingetragen");

  });

  $.get( mensaurl, function() {
  })
    .done(function(data) {

      $("#mensaplan").html(parseMensa(data,0));
  });
}
function parseTimetable(html,dayoffset){
  var time = new Date()
  var result
  result =  $(html).find("[data-role='listview']")[time.getDay()- 1 + dayoffset ];
  return result;
}

function parseMensa(data,dayoffset){
  var time = new Date();
  //var day = (time.getDay()-1)*2;
  var day = 0;
  var html = "";
  html = html + "<ul>";
  html = html + "<li>"+data.results[day].menu_1+"<br><b>"+data.results[day+1].menu_1.replace(",",".")+"</b></li>";
  html = html + "<li>"+data.results[day].menu_2+"<br><b>"+data.results[day+1].menu_2.replace(",",".")+"</b></li>";
  html = html + "<li>"+data.results[day].vegetarisch+"<br><b>"+data.results[day+1].vegetarisch.replace(",",".")+"</b></li>";
  html = html + "</ul>";
  html = html.replace(/ *\[[^\]]*\] */g, "");
  html = html.replace(/\,/g, "<br>");


  return html;

}

function settings(){
  $("#settingslayer").fadeIn();
}

function update(){
  $("#heute").html("");
  $("#morgen").html("");
  $("#mensaplan").html("");
  loadPlan();
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
  update();
}

function loadKursID(data){
  console.log(data);
  return data;
}

function mensa(){
  $("#mensalayer").fadeIn();
}
