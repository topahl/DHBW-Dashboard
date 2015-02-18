$( document ).ready( setup );



function setup(){
  loadPlan();
  $("#update").on("click",update);
  $("#settings").on("click",settings);
  $("#close").on("click",close);
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
