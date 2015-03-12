plugins.push(new TimeTable(0));

function TimeTable(offset){
  var now = new Date();
  var PLAN_API = "87d7b852-1980-4ea8-94ae-3d5d0999f987";
  var planData;

  function loadData(object){
    var planurl = "http://vorlesungsplan.dhbw-mannheim.de/index.php?action=view&uid="+persistent.get("kurs");
    var planapi_url = "https://api.import.io/store/data/"+PLAN_API+"/_query?input/webpage/url="+encodeURIComponent(planurl)+"&_user=e2eb28a4-f0c6-4b15-946c-4b933cd2d167&_apikey="+API_KEY;
    $.get(planapi_url,function(data){
      planData = data;
      parsePlan(object);
    });

  }

  function getOptions(){
    var result = '';
    result += '<div class="content-box">';
    result += '<div class="form-box swap-order">';
    result += '  <input id="kursid" placeholder="Kurs ID / Vorlesungsplan URL" />';
    result += '  <label for="kursid">Kurs ID</label>';
    result += '</div>';
    result += '<div class="form-box">';
    result += '  <span class="label">Kursname</span>';
    result += '  <span class="kursname input"></span>';
    result += '</div>';
    result += '</div>';
    result += '</div>';
    return result;
  }

  function germanDateString(day){
    var weekday = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
    var date = new Date(day);
    return weekday[date.getDay()-1] + " - " + date.getDate() + "." + (date.getMonth()+1) + ".";
  }

  function prepareTimeString(time,day){
    var now = new Date();
    var result = "";
    if(typeof time === "string"){
      result = time;
      var times =  time.split(/[:-]/);
      times=[times[0]*60+times[1]*1,times[2]*60+times[3]*1];
      if(day-now < 0){
        now = (now.getHours()*60)+now.getMinutes();
        if(times[0]<=now){
          if(times[1]>=now){
            var diff = times[1]-now;
            var minutes = (diff%60);
            minutes = (minutes < 10) ?("0"+minutes):minutes;
            result += '</strong><span class="color-green"> noch '+(Math.floor(diff/60))+':'+minutes+'</span><strong>';
          }
        }
      }
    }
    return result;
  }

  function parsePlan(object){
    var data = planData;
    var kursname = data.results[0].kurs;
    $(".kursname").text( (kursname.length > 0) ? kursname : "Kein Kurs eingetragen");
    var html = data.results[now.getDay()-1+offset];
    if(typeof html == "object"){
      var result = '<div class="list-box">';
      result += '<ul>';
      result += '<li data-role="list-divider">'+germanDateString(html.day)+'</li>';
      if(typeof html.time === 'object')
      for (var key in html.kurs_name){
        result += '<li><strong>'+prepareTimeString(html.time[key],html.day)+'</strong><br>'+html.kurs_name[key]+'<br>'+html.raum[key]+'</li>';
      }
      else{
        result += '<li><strong>'+prepareTimeString(html.time,html.day)+'</strong><br>'+html.kurs_name+'<br>'+html.raum+'</li>';
      }
      result += '</ul>';
      result += '</div>';
      $(object).html(result);
    }
  }
  function listeners(){
    $("#kursid").on("keyup",changeKursID);
  }

  function changeKursID(){
    console.log("changeKursID");
    var id = $("#kursid").val();

    if(id.substring(0,4) == "http") {
      id = id.split("uid=")[1];
      $("#kursid").val(id);
    }

    persistent.set({"kurs": id});
    setupPlugins();
  }

  return {
    setup : function(object){
      loadData(object);
    },
    option : function(){
      return getOptions();
    },
    setHtmlAt : function(object){
      parsePlan(object);
    },
    getPriority : function(){
      return 1;
    },
    createListener : function(){
      listeners();
    }
  }
}
