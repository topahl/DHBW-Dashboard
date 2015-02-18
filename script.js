$( document ).ready( loadPlan );

function loadPlan(){
  var jqxhr = $.get( "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&gid=3067001&uid=4430001", function() {
  })
    .done(function(data) {


      $("#plan").append( parse( data ) );

    });
}
function parse(html){
  return $(html).find("[data-role='listview']")[1];
}
