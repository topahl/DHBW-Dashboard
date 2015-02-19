$( document ).ready( setup );



function setup(){
  loadPlan();
  $("#update").on("click",update);
  $("#settings").on("click",settings);
  $("#close").on("click",close);
  $("#mensa").on("click",mensa);
}

function loadPlan(){
  var jqxhr = $.get( "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&gid=3067001&uid=4430001", function() {
  })
    .done(function(data) {


      $("#heute").append( parse( data,0 ) );
      $("#morgen").append( parse( data,1 ) );

    });
}
function parse(html,dayoffset){
  var time = new Date()
  var result
  result =  $(html).find("[data-role='listview']")[time.getDay()- 1 + dayoffset ];
  return result;
}

function settings(){
  $("#settingslayer").fadeIn();
}

function update(){
  $("#heute").text("");
  $("#morgen").text("");
  loadPlan();
}

function close(){
  $("#settingslayer").fadeOut();
}

function mensa(){
    console.log("https://www.stw-ma.de/Essen%20_%20Trinken/Men%C3%BCpl%C3%A4ne/Mensaria%20Metropol-date-2015_02_16-pdfView-1.html");
}