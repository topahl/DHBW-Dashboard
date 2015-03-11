String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


$( document ).ready( setup );
setInterval(updatePlugins,60000);
var datastore = {};
var plugins = [];
var API_KEY = "g6G47ZUDSJ%2B5CoDlh41qJCcp0B9BqU348eUpHdUveTqTrEf4n6LVTrFBpATxUOjFB1AqRd2uK%2BBL4cPJlR75fg%3D%3D";







/**
 * setup - description
 * register event handlers
 *
 */
function setup(){
  loadOptions();
  console.log("setup");
  $("#update").on("click",setupPlugins);
  $('#fullscreen').on('click',dockWindow);
  $("#settings").on("click",settings);
  $("#closesettings").on("click",close);
  $("#kursid").on("keyup",changeKursID);
  $("#haltestelle").on("keyup",changeStation);
  $(".autofill li").on("click",autofill);
  loadChromeData();
}


function loadOptions(){
  for(key in plugins){
    var option = plugins[key].option();
    if(option != null){
      $('#settings-area').append('<div id="option'+key+'">'+option+'</div>');
    }
  }

}

/**
 * loadChromeData - description
 * loads the data stored in chrome storrage
 * This function is asynchronous
 *
 */
function loadChromeData(){
  console.log("loadChromeData");
    chrome.storage.sync.get(function (obj) {
      $("#kursid").val(obj.kurs);
      $("#haltestelle").val(obj.stop);
      datastore.kurs_uid = obj.kurs;
      changeStation();
      setupPlugins();
    });
}

function setupPlugins(){
  console.log("setupPlugins");
  $('#plugin-area').html('');
  for(key in plugins){
    $('#plugin-area').append('<div id="plugin'+key+'" class="layout-container"></div>');
    plugins[key].setup("#plugin"+key);
  }
}

function updatePlugins(){
  console.log("updatePlugins");
  //set current Date and Time
  datastore.now = new Date();
  for(key in plugins){
    plugins[key].setHtmlAt("#div-"+key);
  }
}

function autofill(){
  $("#haltestelle").val($( this ).html());
  changeStation();
}

function changeStation(){
  console.log("changeStation");
    var value = $("#haltestelle").val();
    var result = search(vrn,value);
    if(value === "" || (decodeHtml(result[0].hs) == value)){
      $("#autofill_stop").slideUp();
      if(result.length == 1){
        $(".haltestellenid").text(result[0].value);
        chrome.storage.sync.set({"stop": decodeHtml(result[0].hs)});
        datastore.hs=result[0].value;
        setupPlugins();
      }
    }
    else{
      if(result.length > 0){
          $("#autofill_stop").slideDown();
          $("#autofill_stop_1").slideDown();
          $("#autofill_stop_1").html(result[0].hs);
      }
      else{
        $("#autofill_stop").slideUp();
      }
      if(result.length > 1){
        $("#autofill_stop_2").slideDown();
        $("#autofill_stop_2").html(result[1].hs);
      }
      else{
        $("#autofill_stop_2").slideUp();
      }
      if(result.length > 2){
        $("#autofill_stop_3").slideDown();
        $("#autofill_stop_3").html(result[2].hs);
      }
      else{
        $("#autofill_stop_3").slideUp();
      }
    }
}




function changeKursID(){
  console.log("changeKursID");
  var id = $("#kursid").val();

	if(id.substring(0,4) == "http") {
		id = id.split("uid=")[1];
		$("#kursid").val(id);
	}

  chrome.storage.sync.set({"kurs": id})
  datastore.kurs_uid = id;
  loadStaticData();
}




function search(array,term){

  var result = [];
  for(var  i = 0 ; i < array.length ; i++){
    if (decodeHtml(array[i].hs).toLowerCase().indexOf(term.toLowerCase())>-1) {
      result.push(array[i]);
    }
  }
  return result;

}


function dockWindow(){
  window.resizeTo(450,10000);
  window.moveTo(10000,0);
}

function decodeHtml(html) {
//		return html;//TODO
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
