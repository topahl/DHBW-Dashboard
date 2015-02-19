$( document ).ready( setup );



function setup(){
  $("#update").on("click",update);
  $("#settings").on("click",settings);
  $("#close").on("click",close);
  chrome.storage.sync.get("kurs", function (obj) {
    $("#kursid").val(obj.kurs);
    loadPlan();
  });
  $("#kursid").on("keyup",changeKursID);

}

function loadPlan(){
  var uid = $("#kursid").val();
  var url = "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&uid="+uid;
  console.log(url);
  $.get( "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&uid="+uid, function() {
  })
    .done(function(data) {


      $("#heute").append( parse( data,0 ) );
      $("#morgen").append( parse( data,1 ) );
      var kursname = $(data).find(".header-txt-c > h1 > span").text();
      $("#kursname").text(kursname);

  });

}
function parse(html,dayoffset){
  var time = new Date()
  var result
  result =  $(html).find("[data-role='listview']")[time.getDay()- 1 + dayoffset ];
  return result;
}

function settings(){
  $("#settingslayer").css("display","block");
}

function update(){
  $("#heute").text("");
  $("#morgen").text("");
  loadPlan();
}

function close(){
  $("#settingslayer").css("display","none");
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
