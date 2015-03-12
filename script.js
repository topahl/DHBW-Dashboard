String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


$( document ).ready( setup );
setInterval(updatePlugins,60000);
var persistent;     //datastore for application data
var plugins = [];
var API_KEY = "g6G47ZUDSJ%2B5CoDlh41qJCcp0B9BqU348eUpHdUveTqTrEf4n6LVTrFBpATxUOjFB1AqRd2uK%2BBL4cPJlR75fg%3D%3D";







/**
 * setup - description
 * register event handlers
 *
 */
function setup(){
  setupPersistent();

}

function setupPersistent(){
  if((typeof chrome !== 'undefined') && (typeof chrome.storage !== 'undefined')){
    console.debug('Chrome Store');
    persistent = new StorageChrome(loadOptions);
  }
  else{
    console.debug('Local Store');
    persistent = new StorageLocal();
    loadOptions();
  }
}

function loadOptions(){
  for(key in plugins){
    var option = plugins[key].option();
    if(option != null){
      $('#settings-area').append('<div id="option'+key+'">'+option+'</div>');
    }
  }
  loadPersistentData();
}

/**
 * loadChromeData - description
 * loads the data stored in chrome storrage
 * This function is asynchronous
 *
 */
function loadPersistentData(){
  console.log("loadPersistentData");
  $("#kursid").val(persistent.get("kurs"));
  $("#haltestelle").val(persistent.get("stop"));
  $(".haltestellenid").text(persistent.get("stop_id"));
  createListener();
}

function createListener(){
  console.log("createListener");
  $("#update").on("click",setupPlugins);
  $('#fullscreen').on('click',dockWindow);
  $("#settings").on("click",settings);
  $("#closesettings").on("click",close);
  for(key in plugins){
    plugins[key].createListener();
  }
  setupPlugins();
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
  console.log('updatePlugins');
  //set current Date and Time
  for(key in plugins){
    plugins[key].setHtmlAt("#div-"+key);
  }
}

function dockWindow(){
  console.log('dockWindow');
  window.resizeTo(450,10000);
  window.moveTo(10000,0);
}

function decodeHtml(html) {
//		return html;//TODO
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
