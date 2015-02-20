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
  var mensaurl = "https://api.import.io/store/data/151380a2-c1e8-44be-9bec-d18630de416c/_query?input/webpage/url=https%3A%2F%2Fwww.stw-ma.de%2FEssen%2520_%2520Trinken%2FMen%25C3%25BCpl%25C3%25A4ne%2FMensaria%2520Metropol-date-2015_02_16-pdfView-1.html&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey=g6G47ZUDSJ%2B5CoDlh41qJCcp0B9BqU348eUpHdUveTqTrEf4n6LVTrFBpATxUOjFB1AqRd2uK%2BBL4cPJlR75fg%3D%3D";

  $.get( url, function() {
  })
    .done(function(data) {


      $("#heute").append( parseTimetable( data,0 ) );
      $("#morgen").append( parseTimetable( data,1 ) );
      var kursname = $(data).find(".header-txt-c > h1 > span").text();
      $("#kursname").text(kursname);

  });

  $.get( mensaurl, function() {
  })
    .done(function(data) {

      $("#mensaplan").append(parseMensa(data,0));
  });
}
function parseTimetable(html,dayoffset){
  var time = new Date()
  var result
  result =  $(html).find("[data-role='listview']")[time.getDay()- 1 + dayoffset ];
  return result;
}

function parseMensa(data,dayoffset){
  var days = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
  var time = new Date();
  var menuplan = {};
  for(key in data.results){
      if(data.results[key].xs_text == days[time.getDay()-1+dayoffset] && data.results[key].hasOwnProperty("text_list_1")){
        menuplan.suppe = data.results[key].text_1.replace(/ *\[[^\]]*\] */g, "");
        menuplan.menu1 = data.results[key].text_list_1.join("<br>").replace(/ *\[[^\]]*\] */g, "").replace(menuplan.suppe+"<br>","");
        menuplan.menu2 = data.results[key].text_list_3.join("<br>").replace(/ *\[[^\]]*\] */g, "").replace(menuplan.suppe+"<br>","");
        menuplan.menu3 = data.results[key].text_list_4.join("<br>").replace(/ *\[[^\]]*\] */g, "").replace(menuplan.suppe+"<br>","");
        var html = "<ul><li>"+menuplan.suppe+"</li><li>"+menuplan.menu1+"</li><li>"+menuplan.menu2+"</li><li>"+menuplan.menu3+"</li></ul>"
        return html;
      }
  }
}

function settings(){
  $("#settingslayer").fadeIn();
}

function update(){
  $("#heute").text("");
  $("#morgen").text("");
  $("#mensaplan").text("");
  loadPlan();
}

function close(){
  $("#settingslayer").fadeOut();
  $("#mensalayer").fadeOut();
}

function changeKursID(){
  var id = $("#kursid").val();
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
