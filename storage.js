function StorageChrome(callback){
  chrome.storage.sync.get(dataLoaded);
  var chrome_data;
  function dataLoaded(data){
    chrome_data = data;
    callback();
  }
  return{
    get : function(object_name){
      return chrome_data[object_name];
    },
    set : function(object){
      for(key in object){
        chrome_data[key]=object[key];
      }
      chrome.storage.sync.set(object);
    }
  };
}

function StorageLocal(){
  return{
    get : function(object_name){
      return localStorage.getItem(object_name);
    },
    set : function(object){
      for(key in object){
        localStorage.setItem(key,object[key]);
      }
    }
  };
}
