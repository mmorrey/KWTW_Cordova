
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
     
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", function (e) {
            reportOnlineStatus();
            //saveToServer();
        }, true);
        document.addEventListener("offline", function (e) {
            reportOnlineStatus();
        }, true);
    },
   
    onDeviceReady: function () {
        app.receivedEvent('online');
        checkData();
        reportOnlineStatus();
      
    },

  
    // Update DOM on a Received Event
    receivedEvent: function (id) {
      
        console.log('Received Event: ' + id);
    }
};

app.initialize();


function listSub() {
    alert("buy sub");
    window.iap.setUp(androidApplicationLicenseKey);

    //get all products' infos for all productIds
    window.iap.requestStoreListing(productIds, function (result) {
        /*
        [
            {
                "productId": "sword001",
                "title": "Sword of Truths",
                "price": "Formatted price of the item, including its currency sign.",
                "description": "Very pointy sword. Sword knows if you are lying, so don't lie."
            },
            {
                "productId": "shield001",
                "title": "Shield of Peanuts",
                "price": "Formatted price of the item, including its currency sign.",
                "description": "A shield made entirely of peanuts."
            }
        ]
        */
        alert(JSON.stringify(result));

        for (var i = 0 ; i < result.length; ++i) {
            var p = result[i];

            product_info[p["productId"]] = { title: p["title"], price: p["price"] };

            alert("productId: " + p["productId"]);
            alert("title: " + p["title"]);
            alert("price: " + p["price"]);
        }
    }, function (error) {
        alert("error: " + error);
    });
}

var androidApplicationLicenseKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtF/EqNFQN8imgbmFZQgMRAhKl0q6Q/Ubn5pKGKaSvCPFUzrjzCxaQYUCRCVw56pwwe7YLpxb4e2L+ay6gO94gOD4iIGoO54Rq1TzXoJv72nRFSQjLKDKNmtpO0lEb8SujDRcVhJ1NND20iTQbSqdT970U81biwK8jC1QxUJOhRIDu2cJsIKMNaxa7Eui8P7IBKhdgsivIPOw4O0k2AARaxm5jKk9a/p7ozoyWlkFKd6fNaHGopDe7rKPMeetzNLVP+oRB84ZXCT30n71KrmRQ1tO8ULaRb+kvlTvKISxkhBxTkySOex1zkpY6OPWeI9QZgFPVOZnsILQF8vbb1G5OwIDAQAB";
var productIds = "sub1year";
var existing_purchases = [];
var product_info = {};

function purchaseProduct() {
    var productId = "sub1year";
    //purchase product id, put purchase product id info into server.
    window.iap.purchaseProduct(productId, function (result) {
        alert("purchaseProduct");
        alert(JSON.stringify(result));
    },
    function (error) {
        alert("error: " + error);
    });
}

function consumeProduct(productId) {
    //consume product id, throw away purchase product id info from server.
    window.iap.consumeProduct(productId, function (result) {
        alert("purchaseProduct");
    },
    function (error) {
        alert("error: " + error);
    });
}

function restorePurchases() {
    //get user's purchased product ids which purchased before and not cunsumed.
    window.iap.restorePurchases(function (result) {
        for (var i = 0 ; i < result.length; ++i) {
            var p = result[i];

            if (self.existing_purchases.indexOf(p['productId']) === -1)
                self.existing_purchases.push(p['productId']);

            alert("productId: " + p['productId']);
        }
    },
    function (error) {
        alert("error: " + error);
    });
}



function isOnLine() {
    return navigator.onLine;
}

function reportOnlineStatus() {
    var status = $("#onlineStatus");

    if (isOnLine()) {
        status.text("Online");
        status.
            removeClass("offline").
            addClass("online");
    }
    else {
        status.text("Offline");
        status.
            removeClass("online").
            addClass("offline");
    }
}

$(function () {
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });

});





function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

//checkConnection();

var onSuccess = function (position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function geo() {
    $('#status_msgs').html(" geo connecting ...");
    navigator.geolocation.getCurrentPosition(
    function (position) {
        alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
    },
    function (error) {
        alert(error.message);
    }, {
        enableHighAccuracy: true
              , timeout: 5000
    }
);
}


var g1;
document.addEventListener("DOMContentLoaded", function (event) {
    g1 = new JustGage({
        id: "g1",
        min: 0,
        max: 5,
       // donut: true,
        gaugeWidthScale: 1.1,
        counter: true,
        hideInnerShadow: true,
        titlePosition: "above",
        valueFontColor: "#8bc7eb",
        titleFontColor: "#8bc7eb",
        titleFontSize: "30px",
        title: "KOMability Rating",
        startAnimationTime: 5000,
        startAnimationType: ">",
        refreshAnimationTime: 1000,
        refreshAnimationType: "bounce",
        levelColors: ["#ffca4a"],
        gaugeColor: "#333333",
    });
});

function checkLoc() {

    navigator.geolocation.getCurrentPosition(function (position) {
        loc = position.coords.latitude + "," + position.coords.longitude;
        console.log(loc);
        var latlngsaved = localStorage.getItem("latmap");
        if (latlngsaved == null) {
            localStorage.setItem("latmap", position.coords.latitude);
            localStorage.setItem("lngmap", position.coords.longitude);
        } 
        return 1;
    }, function () {
        console.log("no location");
        return 0;
    });



}


function saveFriend(firstname, lastname, frID, ID) {

    console.log(lastname + " " + frID);
}

function saveUser(firstname, lastname, stravaID, NumAct, NumSeg) {

    $.ajax({
        type: "POST",
        url: "/Home/SaveUser",
        data: "firstname=" + firstname + "&lastname=" + lastname + "&StravaID=" + stravaID + "&NumAct=" + NumAct + "&NumSeg=" + NumSeg,
        dataType: "html",
        success: function (data) {
           
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}


function communityToptemp(type) {
    $('#comStarcanvas').hide();
    if (type = 'h') {
        $('#comHead').html("<h1>Hottest Segments</h1>");
    } else {
        $('#comHead').html("<h1>Coldest Segments</h1>");
    }

}

function communityUsers() {
    $('#com_table').hide();
    $('#comHead').html("<h1>KOM With The Wind Users</h1>");
    $('#comspin').show();
    $('#comcanvas').show();
    var canvas = document.getElementById('top_canvas');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 360, 560);
    var posy = 20;
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";
    $.ajax({
        type: "GET",
        url: "/Home/AllUsers",
        timeout: 4000,
       // data: "dayosag=" + daysago,
        dataType: "json",
        success: function (data) {
            var parsed_json = eval(data);
            $('#comspin').hide();
            $.each(parsed_json.allusers, function (i, wd) {
                var name = wd.Name;
                var acts = wd.Act;
                var segs = wd.Seg;
                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                //  ctx2d.font = '12px Arial';
                ctx2d.fillText(name, 20, posy);
                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillText("Activities: " + acts, 20, posy + 22);
                ctx2d.fillText("Segments: " + segs, 20, posy + 38);
                //cond
                 posy = posy + 75;
            })
           
            
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);

        }
    });
    return false;

}

function getWindiest(daysago) {
    $('#comcanvas').hide();
    $('#comHead').html("<h1>Highest Star Rated Segments</h1>");
    $('#comspin').show();
   
   // $('#com_table').hide();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";
    var midhtml;
   
    
    var seg_loc_data = {
        points: []        
    };

    $.ajax({
        type: "GET",
        url: "/Home/TopW",
   //     data: "dayosag=" + daysago,
        dataType: "jsonp",
        timeout: 10000,
        success: function (parsed_json) {
           // var parsed_json = eval(data);
            $('#comspin').hide();
            
            $('#com_table').show();
            //  head = "<h3>" + parsed_json.topw[0].Timest + "</h3>";
            localStorage.setItem("topw_data", JSON.stringify(parsed_json));
            $.each(parsed_json.topw, function (i, seg) {
                //console.log(wd.Wspd);
                var stars = seg.Stars;
                var name = seg.UserID;
                var wspd = seg.Wspd;
                var timestamp = seg.TS_pretty;
                var loc = seg.Location;
                var segname = seg.Name;
                
                var latlng1 = JSON.stringify(seg.Latlng[0]);
                var latlng = latlng1.split(',');
                var lat = latlng[0];
                var lng = latlng[1];
                var PID = seg.SegID
                var starhtml = "";
                var starblankhtml = "";
                var i = stars;
                var j;
                j = (5 - i);
                for (var x = i; x > 0; x--) {
                    starhtml = starhtml + "<i class=\"fa fa-star\"></i>&nbsp;&nbsp;&nbsp;";
                }

                for (var x = j; x > 0; x--) {
                    starblankhtml = starblankhtml + "<i class=\"fa fa-star-o\"></i>&nbsp;&nbsp;&nbsp;";
                }

                var starsf = "<p style=\"color:#ffca4a\">" + starhtml + starblankhtml + "</p>";//<i class=\"fa fa-trophy\"></i></p>");

                midhtml = midhtml + "<li style=\"height:65px\"><i class=\"read\"></i><p id=\"trow_" + PID + "\" class=\"un_sel\">" + segname +
                "</p><p class=\"message\">At " + timestamp + "</p><p class=\"message_2\">" + loc + "</p><div class=\"actions\" id=\"stars_" + PID + "\">" + starsf + "</div>" +
                "<div class=\"actions_c\"></div>";
                $('#comspin').hide();
            })
            
            $('#com_table').html(top + midhtml + "</ul></div></div>");
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
            $('#comspin').hide();
            var midhtml = "<li style=\"height:65px\"><i class=\"read\"></i><p class=\"un_sel\">Data not available</li>";
            $('#com_table').html(top + midhtml + "</ul></div></div>");
           
        }
    });
    return false;
}

function getFavs() {
   
    $.ajax({
        type: "GET",
        url: "/Home/getFavs",
        //     data: "dayosag=" + daysago,
        dataType: "json",
        timeout: 2000,
        success: function (parsed_json) {
            // var parsed_json = eval(data);
            //  head = "<h3>" + parsed_json.topw[0].Timest + "</h3>";
            localStorage.setItem("favdata", JSON.stringify(parsed_json));
         
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
          }
    });
    return false;
}



function saveTW(segID, segName, wspd, loc, stars, epoch, timestamp) {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var UserID = user.deets[0]['stravaID'];

    $.ajax({
        type: "POST",
        url: "/Home/SaveTopWeather",
        data: "UserID=" + UserID + "&segID=" + segID + "&segName=" + segName + "&wspd=" + wspd + "&loc=" + loc + "&stars=" + stars + "&epoch=" + epoch + "&timestamp=" + timestamp,
        //tring segname, int segID, string array, string polyline, string latlng
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}
  
function saveSegment(name, ID, polyline, array, latlng, priv, locstr) {
    var privseg;
    if (priv == true) {
        privseg = 1;
    } else {
        privseg = 0;
    }
    $.ajax({
        type: "POST",
        url: "/Home/SaveSegment",
        data: "segname=" + name + "&segID=" + ID + "&array=" + array + "&polyline=" + polyline + "&latlng=" + latlng + "&priv=" + privseg + "&location=" + locstr,
        //tring segname, int segID, string array, string polyline, string latlng
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}

function updateUserKOMS(stravaID) {
    var userdata = localStorage.getItem('userdata');

    var myKOMS = localStorage.getItem('komdata_' + stravaID);
    if (myKOMS != null) {
        var myKOMSj = eval('(' + myKOMS + ')');
        var koms_ct = strava_segs.count();
    } else {
        var koms_ct = 0;
    }

    console.log(koms_ct);
    $.ajax({
        type: "POST",
        url: "/Home/SaveUser",
        data: "StravaID=" + stravaID + "&NumAct=" + koms_ct,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}

function updateUser(firstname, lastname, stravaID) {
    
    console.log(koms_ct);
    $.ajax({
        type: "POST",
        url: "/Home/SaveUser",
        data: "firstname=" + firstname + "&lastname=" + lastname + "&StravaID=" + stravaID + "&NumAct=" + koms_ct,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}

function saveFavToLocal(ID, array, poly) {
    var model = getFavModel(ID);
    model.Poly = poly;
    model.Array = array;
   // model.IsSaved = true;
    localStorage.setItem(ID,JSON.stringify(model));
    //alert("new score '" + Score + "' saved locally.");
}

function getFavModel(index) {
    var model = {
        Poly: "",
        Array: "",
        ID: ""
    };

    if (localStorage[index] != null) {
        model = JSON.parse(localStorage[index]);
    }
   // model.Key = index;
    return model;
}


function SignOut() {
     for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
         localStorage.removeItem(localStorage.key(i));
         console.log(localStorage.key(i));
     }
     for (var i = 0; i < localStorage.length; i++) {
         //  if (localStorage.key(i) == 'weatherdata') {
         localStorage.removeItem(localStorage.key(i));
         console.log("2: " + localStorage.key(i));
     }
     localStorage.clear();
     $('#pic_header').hide();
     $('#logo_header').hide();
     $('#UnAuthApp').show();
     $('#menu_buttons').hide();
     $('#deets_tile').hide();
     $('#status_area').hide();
     $('#act_table').hide();
     $('#my_activities').hide();
     $('#profile_tile').hide();
     $('#pills_row').hide();
     $('#seg_nearby').hide();
     $('#seg_weather').hide();
     $('#seg_leaderboard').hide();
     $('#deets_tile').hide();
     $('#menubtns').hide();
     $('#comty_tile').hide();
     $('#stConnimg').show();


}

function removeOldweather() {
    
    var wdata = localStorage.getItem("weatherdata");
    if (wdata == null) {

    } else {
        var wdatap = eval('(' + wdata + ')');
        var epoch = 0;
        var datestr;
        var timenow = Math.round(new Date().getTime() / 1000);
        var diff = 0;
        var weather_deets = {
            wdata: []
        };
      //  var timery = setInterval(function () { rewrite() }, 5000);
       // function rewrite() {
          //  clearInterval(timery);
           
      //  }
        $.each(wdatap.wdata, function (i, wd) {
            diff = timenow - wd.timestamp;
            console.log(diff + " " + wd.ID)
            if (diff > 300) {
                var str = wd.ID + "_weather_act";

                localStorage.removeItem(str);
                console.log("removed st" + str);
            } else {

            weather_deets.wdata.push({
                "ID": wd.ID,
                "lat": wd.lat,
                "lng": wd.lng,
                "timestamp": wd.timestamp,
                "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
                //ct--;
            });
            console.log("push " + wd.ID)
               
        }

           
        });
        var jsondeets = JSON.stringify(weather_deets);
        console.log(jsondeets);
        if (jsondeets.length > 50) {
            localStorage.setItem('weatherdata', jsondeets);
            
            countWdata();
        } else {
            localStorage.removeItem('weatherdata');
        }
    }
}

function checkData() {
    $('#info').hide();
    $('#status_area').hide();
    hideW();
    if (localStorage.getItem("userdata") == null) {
        $('#status_msgs').show();
        $('#status_msgs').append("Not connected");
        $('#UnAuthApp').show();
        $('#pic_header').hide();
        $('#logo_header').hide();
        $('#menu_buttons').hide();
        $('#deets_tile').hide();
       // $('#menubtns').html("Not connected to Strava");
        // initBtns();
        // alert("no data");
    } else {
        // alert("data");
        //clearCache();
        //$('#table_calc_back2').height(200);
       // removeOldweather();
        $('#menu_buttons').show();
        $('#status_msgs').hide();
        $('#status_area').hide();
       // $('#deets_tile').hide();
        $('#rem_info').show();
        $('#info').hide();
        $('#table_calc_area2').hide();
      //  $('#info').show();
        //$('#hr1a').button('active');
        countWdata();
       // parse("stars");
        var data = localStorage.getItem("userdata");
        var wdata = localStorage.getItem("weatherdata");
        var acts = localStorage.getItem("starsdata");
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var firstname = user.deets[0]['firstname'];
        var lastname = user.deets[0]['lastname'];
        var stravaID = user.deets[0]['stravaID'];

        //updateUser(firstname, lastname, stravaID);
        if (acts.length > 40) {
           drawTable("stars"); 
            $('#act_table').show();
            var timer = setInterval(function () { startDecode() }, 4000); 
            function startDecode() {
                clearInterval(timer);
                dispStarsChk();
            }
           // dispStarsChk();
        } else {
            noActsmsg("act");
        }
    }

    

    if (localStorage.getItem('oauthio_provider_strava') === null) {
        $('#footerMsgS').html("Not Authenticated with Strava. Tap 'Connect to Strava'");
        $('#UnAuthApp').show();

    } else {
        $('#AuthApp').show();
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var name = user.deets[0]['firstname'] + " " + user.deets[0]['lastname']
        console.log(user.deets[0].city + " " + user.deets[0].country);
        var loc = user.deets[0].city + ", " + user.deets[0].country; //data.city + ", " + data.country;
            
        var pic
        var pic_header
      //  console.log(user.deets[0]['profile'])
        if (user.deets[0]['profile'] == "avatar/athlete/large.png") {
            pic = "<img style=\"width:80px;height:auto\" src=\"/Content/blank_avatar.jpg\">";
            pic_header = "<img class=\"circular_pfl\" src=\"/Content/blank_avatar.jpg\">";
        } else {
            pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
            pic_header = "<img class=\"circular_pfl\" src=\"" + user.deets[0]['profile'] + "\">";
        }

        $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
        $('#userimg').html(pic);
        $('#pic_header').html(pic_header);
        $('#status_msgs').hide();
     //   $('#status_msgs').append(userdata);
        //  var name = 
      //  updateUser(user.deets[0]['firstname'], user.deets[0]['lastname'], user.deets[0]['stravaID']);
       
       // $('#get_activities').show();
    }

}

function getPolyx( param1, callbackFunction ) { 
var json = localStorage.getItem('all_seg_efforts');
  var jact = eval('(' + json + ')');
    //alert(json);
    $.each(jact.segs, function (i, seg) {
    //alert(seg.name);
   $('#location').append(seg.name + "</br>");

    });
     return "hi"

}

function dispStarsChk() {
    var hrs = localStorage.getItem("Hrs");
    hrs = 24;
    if (hrs == null) {
        $('#refreshStarsbtn').html("Show Stars");
    } else {
        displayStars(hrs);
    }
    var fh = hrs - 2;
    var lh = hrs;
    fh = fh.toString();
    lh = lh.toString();
    //alert(fh + lh);
    if (hrs == 24) {
        var hrstxt = "Best (24 hrs)";
    } else {
        var hrstxt = fh + " - " + lh + " Hrs";
    }
    var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                  hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                                "<li><a href=\"#\" onclick=\"displayStars(3)\">1 - 3 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(6)\">4 - 6 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(9)\">7 - 9 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(12)\">10 - 12 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(24)\">Best (24 Hrs)</a></li></ul></div>";

    $('#Hrsdd').html(ddtext);
}

//var resp = getPoly ('222');
//$('#location').append(resp + "</br>");
//alert(resp);

function getAct(type) {
    if (type == "act") {
        var segdata = localStorage.getItem("segdata")
        console.log(segdata.length);
    } else if (type == "kom") {
        var segdata = localStorage.getItem("komdata")
        console.log(segdata.length);
    } else if (type == "stars") {
        var segdata = localStorage.getItem("starsdata")
        console.log(segdata.length);
    }
    
    if (segdata.length < 30) {
        $('#seg_nearby').hide();
        $('#deets_tile').hide();
        $('#seg_leaderboard').hide();
        $('#pills_row').hide();
        $('#my_friends').hide();
        $('#friend_info').hide();

        $('#seg_weather').hide();
        //  $('#status_msgs').hide();
        $('#profile_tile').hide();
        $('#comty_tile').hide();
        noActsmsg();

        } else {
            $('#seg_nearby').hide();
            $('#deets_tile').hide();
            $('#seg_leaderboard').hide();
            $('#pills_row').hide();
            $('#my_friends').hide();
            $('#friend_info').hide();

            $('#seg_weather').hide();
            //  $('#status_msgs').hide();
            $('#profile_tile').hide();
            $('#comty_tile').hide();
            drawTable(type);
            var timer = setInterval(function () { startDecode() }, 1000);
            function startDecode() {
                clearInterval(timer);
                dispStarsChk(type);
            }
        }
    }


function sw2() {
  //  console.log("sw 2");

    //document.getElementById('topHeader').innerHTML
   // var groupname = document.getElementById("weeks").value;
  //  console.log(groupname);

}

//$('#seg_weather').hide();

function Settings() {
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#menubtns').hide();
    $('#comty_tile').hide();
    $('#my_friends').hide();
    $('#friend_info').hide();
}

function showCmty() {
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#profile_tile').hide();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#menubtns').hide();
    $('#comty_tile').show();
    $('#my_friends').hide();
    $('#friend_info').hide();
    getWindiest(0);
}

function getNearby(ID,lat,lng) {
    //   alert("map")
    console.log(ID);
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
   // alert(isOnLine());
    //rem seg weather table
    if (ID == null) {
       // checkLoc();
        $('#profile_tile').hide();
        $('#deets_tile').hide();
        $('#seg_leaderboard').hide();
        $('#pills_row').hide();
        $('#act_table_header').hide();
        $('#act_table').hide();
        $('#my_activities').hide();
        $('#seg_nearby').show();
        $('#seg_weather').hide();
        $('#comty_tile').hide();
        $('#my_friends').hide();
        $('#friend_info').hide();
        //$('#seg_data').hide();
        // getSegsbyBounds();
        console.log("get nearby");
    //    if (isOnLine()) {
          showmap();
    //    }
    //    else {
          //  $("#winfomap").html("Device is offline.");
    //    }
       
    } else {
        //from cmty table
        $('#map_activities').hide();
        $('#seg_nearby').show();
        showmap(ID,lat,lng);
    }
}

function showRem() {
    $('#table_calc_back2').height(90);
    $('#rem_section').show();
    $('#rem_msg').html("15hrs until next credit");
}

function noActsmsg(type) {
    $('#status_msgs').hide();
    $('#status_area').hide();
    $('#stConnimg').hide();
    $('#winfo').hide();
    $('#Hrsdd').hide();
    $('#menu_buttons').show();
    $('#status_msgs').hide();
    $('#refreshBtn').hide();
    $('#my_activities').show();
    $('#act_table2').show();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";
  //  if (type == "act") {
        var midhtml = "<li style=\"height:70px\"><i class=\"read\"></i><p class=\"un_sel\">You have no Starred Segments, please star Segments in Strava and refresh Strava data in Settings</p>";
//    } else {
  //      var midhtml = "<li class=\"polylink\"><i class=\"read\"></i><p class=\"un_sel\">You have no KOMs/QOMs or Course Records</p>";
  //  }
    $('#act_table2').html(top + midhtml + "</ul></div></div>");
}

function drawFriends() {
    $('#act_table_header').hide();
    $('#act_table2').hide();
    $('#my_activities').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#seg_efforts').hide();
    $('#seg_weather').hide();
    $('#menubtns').hide();
    $('#profile_tile').hide();
      $('#seg_nearby').hide();
    $('#Hrsdd').hide();
    $('#pills_row').hide();
    $('#refreshBtn').hide();
    $('#my_friends').show();
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var firstname = user.deets[0]['firstname'];
    var lastname = user.deets[0]['lastname'];
    var stravaID = user.deets[0]['stravaID'];
    var profile = user.deets[0]['profile'];
    if (profile == "avatar/athlete/large.png") {
        profile = "/Content/blank_avatar.jpg";
    }
    var myKOMS = localStorage.getItem('komdata_' + stravaID);
    var midhtml = "";
    console.log(myKOMS)
    if (myKOMS != null) {
        var myKOMSj = eval('(' + myKOMS + ')');
        var koms_ct = strava_segs.count();
        midhtml = "<table onclick=\"showFriend(" + stravaID + ",'" + firstname + " " + lastname + "'," + -2 + ")\"><tr><td><div class=\"circular_pfl\"><img style=\"width:35px;height:35px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">"  + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
    " KOMs</div></td></tr></table>";

    } else {
        var koms_ct = 0;
        midhtml = "<table><tr><td><div class=\"circular_pfl\"><img style=\"width:35px;height:35px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">" + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
   " KOMs</div></td></tr></table>";
    }
    var json = localStorage.getItem('frdata');
    var j2 = eval('(' + json + ')');

  
    var fr_ct = 1;
    
    var n;
    var name;
    $.each(j2.people, function (i, peeps) {
        var koms_ct = countKOMs(peeps.ID);
        midhtml = midhtml + "<table onclick=\"showFriend(" + peeps.ID + ",'" + peeps.firstname + " " + peeps.lastname + "'," + i + ")\"><tr><td><div class=\"circular_pfl\"><img style=\"width:35px;height:35px\" src=\"" + peeps.profile + "\"></div></td><td><div class=\"h3\">" + peeps.firstname + " " + peeps.lastname + "</div><div class=\"msg_sml\">" + koms_ct +
        " KOMs</div></td></tr></table>";
        //midhtml = midhtml + "<li style=\"list-style-type:none\" class=\"polylink\" onclick=\"showFriend(" + peeps.name + "," + i + ",true)\"><i class=\"read\" style=\"list-style-type none\"></i><p id=\"trow_" + peeps.ID + "\" class=\"un_sel\">" + peeps.name + "</p><p class=\"message\">" + koms_ct + " KOMs</p>" +
        //"<div class=\"circular_pfl\" id=\"stars_" + peeps.ID + "\"><img src=\"" + peeps.profile + "\"></div><div class=\"actions_b\" id=\"stars_best_" + peeps.ID + "\"></div></li><div id=\"segs_" + peeps.ID + "\"></div>";
        fr_ct++;       
    });
  
    // alert(firstID)
    var ht = parseInt((fr_ct) * 52) + 25; //56
    $('#frback').height(ht);
   
    if (fr_ct == 1) {
        ht = ht + 45;
        $('#frback').height(ht);
        midhtml = midhtml + "<p>Add friends in Strava, then refresh Friend data in Settings";
    }
    $('#friend_list').html(midhtml);

}




function drawTable(type) {
    $('#act_table_header').show();
    $('#act_table2').show();
    $('#my_activities').show();
    $('#deets_tile').hide();
    $('#menubtns').show();
    $('#Hrsdd').show();
    $('#refreshBtn').show();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" style=\"list-style-type:none\" id=\"ultop\">";
    if (type == "fav") {
        var json = localStorage.getItem('favdata');
    } else if (type == "kom") {
        var json = localStorage.getItem('komdata');
    } else if (type == "stars") {
        var json = localStorage.getItem('starsdata');
        var segct = 1;
    } else {
        var json = localStorage.getItem('segdata');
        var segct = countSegs();
    }
    
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    var firstID;
    var n;
    var name;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        var seg_ct = 0;
      //   $.each(j2.segs.segment_efforts, function (i, seg) {
      //          seg_ct++;
      //      });
        if (seg_ct > 0) { 
            LB = true
        }
        //if (act_ct == 0) {
        //    firstID = seg.ID;
        //    n = i;
        //    name = seg.name;
        //    midhtml = midhtml + "<li style=\"list-style-type:none\" class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type +"')\"><i class=\"read\" style=\"list-style-type none\"></i><p id=\"trow_" + seg.ID + "\" class=\"sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        //"<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

      //  } else {
            midhtml = midhtml + "<li style=\"list-style-type:none\" class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "')\"><i class=\"read\" style=\"list-style-type none\"></i><p id=\"trow_" + seg.ID + "\" class=\"un_sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

     //   }
        act_ct++;
        var wdata = localStorage.getItem(wdata);
        if (wdata == null) {
           // getW(seg.latlng,seg.ID); //only if no weather data
        }
           
           
    });
    
    
    var ht = parseInt(((act_ct + segct) * 48) + 30); //56
    $('#tableback').height(ht);
    // alert(firstID)
    
  //  poly2(ID, i, false, type);
   // poly2(firstID, n, false, type, null)
    var ref_btn = "<div class=\"minihead\"><button class=\"btn btn-primary\" onclick=\"stAct()\">Refresh My Activities</button></div>";
    $('#actMsgs').html(act_ct + " Activities loaded.");
    $('#act_table2').html(top + midhtml + "</ul></div></div>");
    
    
    var timer = setInterval(function () { startDecode() }, 1000);     
    function startDecode() {
    clearInterval(timer);
  //  getSegs();
    $('#menubtns').show();
          // displayStars();
    }
 
    
}

var getSegtimer;

function StartgetSegs() {
    //alert("timer");
    getSegtimer = setTimeout(getSegs, 5000);
    //getSegtimer = setTimeout(function(){ alert("Hello") }, 3000);
}


function showEff() {
    $('#seg_effort').show();

}

function getSegs() {
    clearTimeout(getSegtimer);
    var json = localStorage.getItem('all_seg_efforts');
    if (json != null) {

        var jact = eval('(' + json + ')');

        var parents = [];

        function check_array(parents, parentID) {
            return jQuery.inArray(parentID, parents);
        }
        var ct = 0;
        $.each(jact.segs, function (i, seg) {
            var pbrank = seg.pb_rank;
            var pb = "";
            if (pbrank == "1") {
                // pb= "<i class=\"fa fa-shield\"></i>&nbsp;&nbsp;&nbsp;"
            }
            var seghtml = "";
            
            seghtml = seghtml + "<li onclick=\"polySegs(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p id=\"trow_" + seg.ID + "\" class=\"seg_row\"><i class=\"fa fa-trophy\"></i>&nbsp;&nbsp;&nbsp;" + pb + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
            "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li>";
            if (check_array(parents, seg.ID) == -1) {
                $('#segs_' + seg.parentID).append(seghtml);
                ct++;
                }
            parents.push(seg.ID);
        });
        localStorage.setItem("segct", ct);
    }
  
}

function convertTime(secs) {
    
   var timestr = moment(secs).seconds(secs).format('H:mm:ss');

    return timestr;


}

function formatTime(time) {
    var timestr = moment(time).format("MMM Do YYYY, h:mm:ss a");
    return timestr;
}

function clearCanvas(datatype) {
    console.log(datatype)
    if (datatype == "lb") {
        $('#lbdata').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Refreshing Leaderboard ...</div>");
        var canvas = document.getElementById('leaderbd');
        canvas.width = 350;
        canvas.height = 1500;
        canvas.style.width = '350px';
        canvas.style.height = '1500px';
        var ctx2d = canvas.getContext('2d');
        ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
        ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx2d.fillRect(0, 0, 350, 2000);
        $('#g1').hide();
    }
}

function drawLeaderboard(ID, type) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    $('#komability').html("");
    $('#refreshBtnLB').show();
    $('#komimg').show();
    var refreshbtnlb = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"refreshData(" + ID + ",'" + type + "','lb')\">Refresh</button>";
    $('#refreshBtnLB').html(refreshbtnlb);
    var lbhistchk0 = localStorage.getItem(ID + '_0_hist');
    var lbhistchk1 = localStorage.getItem(ID + '_1_hist');

    if ((lbhistchk0 != null) && (lbhistchk1 == null))  {
        //have historical data, just show
        $('#g1').show();
        $('#lbBtn').show();
        $('#lbBtn').html("&nbsp;");
      //  $('#lbBtn').hide();
        g1.refresh(0);
        var btnhtml = ""; //"<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"refHistweather(" + ID + ",'" + type + "')\">" +
                       //"Refresh historical wind conditions</i></a></div>";
        var hdata = localStorage.getItem(ID + '_0_hist');
        var bearing_store = ID + "_array";
        var j3 = eval('(' + hdata + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);
       
    }

    if ((lbhistchk0 != null) && (lbhistchk1 != null)) {
        //have historical data, just show
        $('#g1').show()
        $('#lbBtn').html("&nbsp;");
        g1.refresh(0);
        var btnhtml = ""; //"<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"refHistweather(" + ID + ",'" + type + "')\">" +
        //"Refresh historical wind conditions</i></a></div>";
        var hdata = localStorage.getItem(ID + '_0_hist');
        var bearing_store = ID + "_array";
        var j3 = eval('(' + hdata + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);

    }
        if (lbhistchk1 == null) {
            var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',true,'all')\">" +
                           "Show all historical wind data</i></a></div>";
            $('#lbBtn').show();
            $('#lbBtn').html(btnhtml);
            $('#g1').hide();
        }
    



    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "Data as of " + timestr;
    var kompic = j2.segs[0].profile;
    var komname = j2.segs[0].name;
    var komtime = j2.segs[0].mov_time;
    var komimg = "<img style=\"width:35px;height:auto\" src=\"" + kompic + "\">";
    $('#lbdata').html(refstr);
    $('#komimg').html(komimg);
    $('#komdata').html("<div style=\"font-size:18px\">" + komname + "</div><div style=\"text-align:left\">" + komtime + " seconds</div>");

 
    var midhtml = "";
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var ct = 0;

    $.each(j2.segs, function (i, seg) {
        ct++;
        var mov_time = convertTime(seg.mov_time);
        var date = seg.time;
        var timef = formatTime(date);
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        // var ampm = zone.FCTTIME.ampm;

        //moving time
        ctx2d.font = '12px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 5, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(seg.name, 5, posyt + 16);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(mov_time, 5, posyt + 32);
        
       
        var wspd = 0;
        if (hist == true && lbhistchk1 != null) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
            var brg = brg2;
           
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(160, posy + 22, wspd2 + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 174, posyt + 26);
            ctx2d.fillText(Math.round(wspd2), 161, posyt + 26);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(145, posy + 34);
            ctx2d.rotate(90 * Math.PI / 180);
            //ctx2d.save();

            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";
            //ctx2d.moveTo(60, -15);
            ctx2d.fillRect(-5, -5, 10, 10);
            ctx2d.beginPath();


            ctx2d.lineTo(0, -5);
            ctx2d.lineTo(0, -10);
            ctx2d.lineTo(10, 0);
            ctx2d.lineTo(0, 10);
            ctx2d.lineTo(0, 5);
            ctx2d.lineTo(-10, 5);
            ctx2d.lineTo(-10, -5);

            ctx2d.closePath();
            ctx2d.fill();
            ctx2d.stroke();
            ctx2d.restore();

            var pval0f = getP_foll(brg);
            var pval1f = getP_foll(brg - 30);
            var pval2f = getP_foll(brg + 30);
            var pval0h = getP_head(brg);
            var pval1h = getP_head(brg - 30);
            var pval2h = getP_head(brg + 30);
            var pArray = bdata.split(',');
            var arval1f = parseInt(pArray[pval0f - 1]); //brg
            var arval2f = parseInt(pArray[pval1f - 1]);
            var arval3f = parseInt(pArray[pval2f - 1]);
            var arval1h = parseInt(pArray[pval0h - 1]);  //brg
            var arval2h = parseInt(pArray[pval1h - 1]);
            var arval3h = parseInt(pArray[pval2h - 1]);
            //alert(arval3h);
            var windspeed = wspd2;
            //windspeed = 20;
            arval1f = cleanPval(arval1f);
            arval2f = cleanPval(arval2f);
            arval3f = cleanPval(arval3f);
            arval1h = cleanPval(arval1h);
            arval2h = cleanPval(arval2h);
            arval3h = cleanPval(arval3h);

            var brgf0 = arval1f * windspeed;
            // alert(brgf0);
            var brgf1 = parseInt(arval2f * windspeed) * 0.75;
            var brgf2 = parseInt(arval3f * windspeed) * 0.75;
            var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
            var brgh1 = parseInt(arval2h * windspeed) * 0.75;
            var brgh2 = parseInt(arval3h * windspeed) * 0.75;

            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
            var numstars = 0;

            ctx2d.fillStyle = "#ffca4a";
             if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 10, 200);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 10, 200);
                }
                komf = Math.floor(6 - (numstars + 1));
          
            
            
        } else if (hist == true && lbhistchk1 == null) {
            if (i == 0) {
                console.log("1 weather")
                var hdata = localStorage.getItem(ID + '_' + i + '_hist');
                var j3 = eval('(' + hdata + ')');
                var brg2 = j3.hdata[0].wbrg;
                var wspd2 = j3.hdata[0].wspeed;
                var brg = brg2;

                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillRect(160, posy + 22, wspd2 + 25, 22);

                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                ctx2d.font = '12px Arial';
                ctx2d.fillText("mph", 174, posyt + 26);
                ctx2d.fillText(Math.round(wspd2), 161, posyt + 26);

                ctx2d.save();
                ctx2d.strokeStyle = "#2fb4c8";
                ctx2d.translate(145, posy + 34);
                ctx2d.rotate(90 * Math.PI / 180);
                //ctx2d.save();

                ctx2d.rotate(brg2 * Math.PI / 180);

                ctx2d.lineWidth = 1;
                ctx2d.fillStyle = "#2fb4c8";
                //ctx2d.moveTo(60, -15);
                ctx2d.fillRect(-5, -5, 10, 10);
                ctx2d.beginPath();


                ctx2d.lineTo(0, -5);
                ctx2d.lineTo(0, -10);
                ctx2d.lineTo(10, 0);
                ctx2d.lineTo(0, 10);
                ctx2d.lineTo(0, 5);
                ctx2d.lineTo(-10, 5);
                ctx2d.lineTo(-10, -5);

                ctx2d.closePath();
                ctx2d.fill();
                ctx2d.stroke();
                ctx2d.restore();

                var pval0f = getP_foll(brg);
                var pval1f = getP_foll(brg - 30);
                var pval2f = getP_foll(brg + 30);
                var pval0h = getP_head(brg);
                var pval1h = getP_head(brg - 30);
                var pval2h = getP_head(brg + 30);
                var pArray = bdata.split(',');
                var arval1f = parseInt(pArray[pval0f - 1]); //brg
                var arval2f = parseInt(pArray[pval1f - 1]);
                var arval3f = parseInt(pArray[pval2f - 1]);
                var arval1h = parseInt(pArray[pval0h - 1]);  //brg
                var arval2h = parseInt(pArray[pval1h - 1]);
                var arval3h = parseInt(pArray[pval2h - 1]);
                //alert(arval3h);
                var windspeed = wspd2;
                //windspeed = 20;
                arval1f = cleanPval(arval1f);
                arval2f = cleanPval(arval2f);
                arval3f = cleanPval(arval3f);
                arval1h = cleanPval(arval1h);
                arval2h = cleanPval(arval2h);
                arval3h = cleanPval(arval3h);

                var brgf0 = arval1f * windspeed;
                // alert(brgf0);
                var brgf1 = parseInt(arval2f * windspeed) * 0.75;
                var brgf2 = parseInt(arval3f * windspeed) * 0.75;
                var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
                var brgh1 = parseInt(arval2h * windspeed) * 0.75;
                var brgh2 = parseInt(arval3h * windspeed) * 0.75;

                var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
                var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
                var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
                var numstars = 0;

                ctx2d.fillStyle = "#ffca4a";
                if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 10, 200);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 10, 200);
                }
                komf = Math.floor(6 - (numstars + 1));

            }
        }
        posy = posy + 60
        posyt = posyt + 60
        i++;
    })

    if (ct == 1) {
        var ht = 340;
    } else {
        var ht = parseInt((ct * 100) + 30);
    }
    $('#leaderback').height(ht);

    timerG = setTimeout(function () { drawG() }, 1000);

    function drawG() {
        $('#g1').show();
        clearTimeout(timerG);
        g1.refresh(komf);

    }

}



function drawLeaderboard_hist(ID,type) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();

    var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "','all')\">" +
               "Show historical wind conditions</i></a></div>";
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    $('#lbBtn').html(btnhtml);
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var hdata = localStorage.getItem(ID + '_0_hist');
    var bearing_store = ID + "_array";
    var j3 = eval('(' + hdata + ')');
    var wspd = j3.hdata[0].wspeed;
    var kombrg = j3.hdata[0].wbrg;

    var refstr = "<h3>Data retrieved " + timestr + "</h3>";
    var kompic = j2.segs[0].profile;
    var komname = j2.segs[0].name;
    var komtime = j2.segs[0].mov_time;
    var komimg = "<img style=\"width:80px;height:auto\" src=\"" + kompic + "\">";
    $('#lbdata').html(refstr);
    $('#komimg').html(komimg);
    $('#komdata').html("<div style=\"font-size:30px\">" + komname + "</div><div style=\"text-align:left\">" + komtime + " seconds</div>");

    var hist = true;

    //kom star calc
    var brg = kombrg;
    
    var bdata = localStorage.getItem(bearing_store);
    var pval0f = getP_foll(brg);
   var pval1f = getP_foll(brg - 30);
    var pval2f = getP_foll(brg + 30);
    var pval0h = getP_head(brg);
    var pval1h = getP_head(brg - 30);
    var pval2h = getP_head(brg + 30);
    var pArray = bdata.split(',');
    var arval1f = parseInt(pArray[pval0f - 1]); //brg
    var arval2f = parseInt(pArray[pval1f - 1]);
    var arval3f = parseInt(pArray[pval2f - 1]);
    var arval1h = parseInt(pArray[pval0h - 1]);  //brg
    var arval2h = parseInt(pArray[pval1h - 1]);
    var arval3h = parseInt(pArray[pval2h - 1]);
    //alert(arval3h);
    var windspeed = wspd;
    //windspeed = 20;
    arval1f = cleanPval(arval1f);
    arval2f = cleanPval(arval2f);
    arval3f = cleanPval(arval3f);
    arval1h = cleanPval(arval1h);
    arval2h = cleanPval(arval2h);
    arval3h = cleanPval(arval3h);

    var brgf0 = arval1f * windspeed;
   // alert(brgf0);
    var brgf1 = parseInt(arval2f * windspeed) * 0.75;
    var brgf2 = parseInt(arval3f * windspeed) * 0.75;
    var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
    var brgh1 = parseInt(arval2h * windspeed) * 0.75;
    var brgh2 = parseInt(arval3h * windspeed) * 0.75;

    var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
    var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
    var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
    var numstars = 0;
    var canvas = document.getElementById('komcanvas');
    canvas.width = 300;
    canvas.height = 25;
    canvas.style.width = '300px';
    canvas.style.height = '25px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "#ffca4a";


    if (starval <= 0) {
        drawStarsO(ctx2d, 5, 15, 170);
    } else {
        numstars = calcStars(starval);
        drawStarsF(ctx2d, numstars, 15, 170);
    }
    //numstars = 5
//    $('#hkomdata').html("<h3>" + wspd + " " + starval + "  " + numstars + "</h3>");
    var komf = Math.floor(1 / (numstars / 5));
    $('#komability').html("KOMabilty Factor: " + komf);

    var midhtml = "";
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var ct = 0;

    $.each(j2.segs, function (i, seg) {
        ct++;
        var hour = seg.mov_time;
        var date = seg.time;
      //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
       //moving time
        ctx2d.font = '20px Arial';
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(hour, 5, posyt + 10);
        //alert(hour);
        ctx2d.font = '10px Arial';
        ctx2d.fillText("seconds", 5, posyt + 18);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(seg.name, 75, posyt + 4);
       // var imgi = new Image();
       // imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif"; //seg.profile;
      //  imgi.addEventListener("load", function () {
      //      ctx2d.drawImage(imgi, 6, posyt + 10);
        // }, false);
        ctx2d.fillStyle = "#2fb4c8";
        ctx2d.fillRect(0, posy - 5, 350, 1);
      
        var wspd = 0;
        if (hist == true && i < 3) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
      
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(75, posy + 20, wspd2 + 25, 20);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 95, posyt + 20);
            ctx2d.fillText(wspd2, 75, posyt + 20);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(60, posy + 30);
            ctx2d.rotate(90 * Math.PI / 180);
            //ctx2d.save();
            
            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";
            //ctx2d.moveTo(60, -15);
            ctx2d.fillRect(-5, -5, 10, 10);
            ctx2d.beginPath();


            ctx2d.lineTo(0, -5);
            ctx2d.lineTo(0, -10);
            ctx2d.lineTo(10, 0);
            ctx2d.lineTo(0, 10);
            ctx2d.lineTo(0, 5);
            ctx2d.lineTo(-10, 5);
            ctx2d.lineTo(-10, -5);

            ctx2d.closePath();
            ctx2d.fill();
            ctx2d.stroke();
            ctx2d.restore();

        }
        
        posy =posy + 50
        posyt = posyt + 50
        i++;
    })
    
    
   var ht = parseInt((ct * 100) + 30);
   $('#leaderback').height(ht);

   
}

function drawSegEffort(ID, frID) {
    $('#seg_leaderboard').hide();
    $('#lb_table').hide();
    $('#eff_table').show();
     $('#seg_weather').hide();
     $('#seg_efforts').show();
    console.log("efforts " + ID + " " + frID);
    var type = 'segs';
    if (frID != null) {
        var lbhistchk0 = localStorage.getItem(ID + '_' + frID + '_0_hist_user');
        var lbhistchk1 = localStorage.getItem(ID + '_' + frID + '_1_hist_user');
        type = "kom";
    } else {
        var lbhistchk0 = localStorage.getItem(ID + '_0_hist_user');
        var lbhistchk1 = localStorage.getItem(ID + '_1_hist_user');
    }
    console.log(lbhistchk0 + " " + lbhistchk1)
    //type2 = hist
    if (lbhistchk1 != null) {
        //have historical data, just show

        $('#sgBtn').html("");
        var btnhtml2 = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"stEffort(" + ID + ")\">Refresh</button>";
        $('#refreshBtneffs').html(btnhtml2)
        //"Refresh historical wind conditions</i></a></div>";
       
        var bearing_store = ID + "_array";
        var j3 = eval('(' + lbhistchk1 + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);

        //var komf = Math.floor(1 / (numstars / 5));
        // $('#komability').html("KOMabilty Factor: " + komf);
    } else if (lbhistchk0 != null) {
        //have historical data, just show

        $('#sgBtn').html("");
        var btnhtml2 = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"stEffort(" + ID + ")\">Refresh</button>";
        $('#refreshBtneffs').html(btnhtml2)
        //"Refresh historical wind conditions</i></a></div>";
       
        var bearing_store = ID + "_array";
        var j3 = eval('(' + lbhistchk0 + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);
    }

   if ((lbhistchk0 != null && lbhistchk1 == null) || (lbhistchk0 == null && lbhistchk1 == null)) {
        var btnhtml = "<div style=\"padding-left:5px\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',false,'all'," + frID + ")\">" +
                       "Show all historical wind conditions</i></a></div>";
        $('#effortPadding').show();
        console.log(btnhtml)
    $('#sgBtn').show();
    $('#sgBtn').html(btnhtml);
    }
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    
    //  var json = localStorage.getItem('eff_data_' + ID);
    if (frID != null) {
        var json = localStorage.getItem('eff_data_' + ID + '_' + frID);
    } else {
        var json = localStorage.getItem('eff_data_' + ID);
    }
   
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "Data as of " + timestr;
    $('#sgdata').html(refstr);
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('segeff');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var ct = 0;

    $.each(j2.segs, function (i, seg) {
        ct++;
        var mov_time = convertTime(seg.mov_time);
        var date = seg.time;
        var timef = formatTime(date);
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        // var ampm = zone.FCTTIME.ampm;

        //moving time
        ctx2d.font = '14px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 10, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';
        //ctx2d.fillText(seg.name, 5, posyt + 16);
        ctx2d.fillText(mov_time, 10, posyt + 25);
        //alert(hour);

        ctx2d.font = '14px Arial';

        // var imgi = new Image();
        // imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif"; //seg.profile;
        //  imgi.addEventListener("load", function () {
        //      ctx2d.drawImage(imgi, 6, posyt + 10);
        // }, false);
        //    ctx2d.fillStyle = "#2fb4c8";
        //   ctx2d.fillRect(0, posy - 5, 350, 1);

        var wspd = 0;
        if (hist == true && lbhistchk1 != null) {
            if (frID != null) {
                var hdata = localStorage.getItem(ID + '_' + frID + '_' + i + '_hist_user');
               
            } else {
                var hdata = localStorage.getItem(ID + '_' + i + '_hist_user');

            }
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
            var brg = brg2;

            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(90, posy + 20, wspd2 + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 106, posyt + 24);
            ctx2d.fillText(Math.round(wspd2), 95, posyt + 24);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(75, posy + 30);
            ctx2d.rotate(90 * Math.PI / 180);
            //ctx2d.save();

            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";
            //ctx2d.moveTo(60, -15);
            ctx2d.fillRect(-5, -5, 10, 10);
            ctx2d.beginPath();


            ctx2d.lineTo(0, -5);
            ctx2d.lineTo(0, -10);
            ctx2d.lineTo(10, 0);
            ctx2d.lineTo(0, 10);
            ctx2d.lineTo(0, 5);
            ctx2d.lineTo(-10, 5);
            ctx2d.lineTo(-10, -5);

            ctx2d.closePath();
            ctx2d.fill();
            ctx2d.stroke();
            ctx2d.restore();

            var pval0f = getP_foll(brg);
            var pval1f = getP_foll(brg - 30);
            var pval2f = getP_foll(brg + 30);
            var pval0h = getP_head(brg);
            var pval1h = getP_head(brg - 30);
            var pval2h = getP_head(brg + 30);
            var pArray = bdata.split(',');
            var arval1f = parseInt(pArray[pval0f - 1]); //brg
            var arval2f = parseInt(pArray[pval1f - 1]);
            var arval3f = parseInt(pArray[pval2f - 1]);
            var arval1h = parseInt(pArray[pval0h - 1]);  //brg
            var arval2h = parseInt(pArray[pval1h - 1]);
            var arval3h = parseInt(pArray[pval2h - 1]);
            //alert(arval3h);
            var windspeed = wspd2;
            //windspeed = 20;
            arval1f = cleanPval(arval1f);
            arval2f = cleanPval(arval2f);
            arval3f = cleanPval(arval3f);
            arval1h = cleanPval(arval1h);
            arval2h = cleanPval(arval2h);
            arval3h = cleanPval(arval3h);

            var brgf0 = arval1f * windspeed;
            // alert(brgf0);
            var brgf1 = parseInt(arval2f * windspeed) * 0.75;
            var brgf2 = parseInt(arval3f * windspeed) * 0.75;
            var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
            var brgh1 = parseInt(arval2h * windspeed) * 0.75;
            var brgh2 = parseInt(arval3h * windspeed) * 0.75;

            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
            var numstars = 0;
           
            ctx2d.fillStyle = "#ffca4a";

            if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 28, 200);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 28, 200);
                }
                komf = Math.floor(6 - (numstars + 1));
                console.log(komf);
       //     }

        } else if (hist == true && lbhistchk1 == null) {
            if (i == 0) {
                console.log("1 weather")
                if (frID != null) {
                    var hdata = localStorage.getItem(ID + '_' + frID + '_0_hist_user');

                } else {
                    var hdata = localStorage.getItem(ID + '_0_hist_user');

                }
                var j3 = eval('(' + hdata + ')');
                var brg2 = j3.hdata[0].wbrg;
                var wspd2 = j3.hdata[0].wspeed;
                var brg = brg2;

                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillRect(90, posy + 20, wspd2 + 25, 22);

                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                ctx2d.font = '12px Arial';
                ctx2d.fillText("mph", 106, posyt + 24);
                ctx2d.fillText(Math.round(wspd2), 95, posyt + 24);

                ctx2d.save();
                ctx2d.strokeStyle = "#2fb4c8";
                ctx2d.translate(75, posy + 30);
                ctx2d.rotate(90 * Math.PI / 180);
                //ctx2d.save();

                ctx2d.rotate(brg2 * Math.PI / 180);

                ctx2d.lineWidth = 1;
                ctx2d.fillStyle = "#2fb4c8";
                //ctx2d.moveTo(60, -15);
                ctx2d.fillRect(-5, -5, 10, 10);
                ctx2d.beginPath();


                ctx2d.lineTo(0, -5);
                ctx2d.lineTo(0, -10);
                ctx2d.lineTo(10, 0);
                ctx2d.lineTo(0, 10);
                ctx2d.lineTo(0, 5);
                ctx2d.lineTo(-10, 5);
                ctx2d.lineTo(-10, -5);

                ctx2d.closePath();
                ctx2d.fill();
                ctx2d.stroke();
                ctx2d.restore();

                var pval0f = getP_foll(brg);
                var pval1f = getP_foll(brg - 30);
                var pval2f = getP_foll(brg + 30);
                var pval0h = getP_head(brg);
                var pval1h = getP_head(brg - 30);
                var pval2h = getP_head(brg + 30);
                var pArray = bdata.split(',');
                var arval1f = parseInt(pArray[pval0f - 1]); //brg
                var arval2f = parseInt(pArray[pval1f - 1]);
                var arval3f = parseInt(pArray[pval2f - 1]);
                var arval1h = parseInt(pArray[pval0h - 1]);  //brg
                var arval2h = parseInt(pArray[pval1h - 1]);
                var arval3h = parseInt(pArray[pval2h - 1]);
                //alert(arval3h);
                var windspeed = wspd2;
                //windspeed = 20;
                arval1f = cleanPval(arval1f);
                arval2f = cleanPval(arval2f);
                arval3f = cleanPval(arval3f);
                arval1h = cleanPval(arval1h);
                arval2h = cleanPval(arval2h);
                arval3h = cleanPval(arval3h);

                var brgf0 = arval1f * windspeed;
                // alert(brgf0);
                var brgf1 = parseInt(arval2f * windspeed) * 0.75;
                var brgf2 = parseInt(arval3f * windspeed) * 0.75;
                var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
                var brgh1 = parseInt(arval2h * windspeed) * 0.75;
                var brgh2 = parseInt(arval3h * windspeed) * 0.75;

                var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
                var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
                var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
                var numstars = 0;

                ctx2d.fillStyle = "#ffca4a";

                if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 28, 200);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 28, 200);
                }
                komf = Math.floor(6 - (numstars + 1));
                console.log(komf);
            }
        }

        posy = posy + 60
        posyt = posyt + 60
        i++;
    })


    var ht = parseInt((ct * 48) + 120);
    $('#effortback').height(ht);

    
}
var hc = -1;;

function showHistweather(SegID,type,lb,num,frID) {
    //make an array of the first three
    //find out if seg is private or not
    $('#sgdata').html("Retrieving historical data ...");
    $('#effortPadding').hide();
    $('#sgBtn').hide();
    $('#lbdata').html("Retrieving historical data ...");
    $('#lbBtn').html("&nbsp;");
    var lbhistchk1 = "";
    var count = null;
    console.log("ht" + type);
    if (lb == true) {
        var json = localStorage.getItem('lb_data_' + SegID);
        var j2 = eval('(' + json + ')');
        count = (j2.count[0].num - 1);
        console.log(count + " " + j2.segs[0].time)
        lbhistchk1 = localStorage.getItem(SegID + '_1_hist');
    } else {
        if (frID != null) {
            var json = localStorage.getItem('eff_data_' + SegID + "_" + frID);
            var j2 = eval('(' + json + ')');
            lbhistchk1 = localStorage.getItem(SegID + "_" + frID + '_1_hist_user');
        } else {
            var json = localStorage.getItem('eff_data_' + SegID);
            var j2 = eval('(' + json + ')');
            lbhistchk1 = localStorage.getItem(SegID + '_1_hist_user');
        }
        
    
       
    }
    //alert(type);
    console.log("count" + num);
    //count = 4;
    
   //use this

    if (lbhistchk1 != null) {
        //have historical data, just show
        if (lb == true) {
            drawLeaderboard(SegID, type); //was hist yyy
        } else {
            drawSegEffort(SegID, frID, type);
        }
    
    } else {
        if (num == "all") {

            count = (j2.count[0].num - 1);
            $('#sgBtn').html("");
            var done = false;
            var latlng = getLatlng(SegID, type);
            console.log("latlng" + latlng);
            var time = 0;
            $.each(j2.segs, function (i, seg) {
                var date = j2.segs[i].time;
                setTimeout(function () {
                    //alert('paused');
                    CallHistWeather(latlng, date, SegID, i, type, lb,frID);
                    if (i == count) {
                        var timerAA = setTimeout(function () { showdata() }, 4000);
                        function showdata() {
                            clearTimeout(timerAA);
                            if (lb == true) {
                                console.log("finished" + count + " " + i);
                                drawLeaderboard(SegID, type); //was hist yyy
                            } else {
                                console.log("finished" + count + " " + i);
                                showEfforts(SegID, type, frID);
                            }
                        }
                    }
                }, time);
                time += 2000;
            });

        } else {
            var done = false;
            var latlng = getLatlng(SegID, type);
            var date = j2.segs[0].time;
            
            CallHistWeather(latlng, date, SegID, 0, type, lb,frID);
            var timerAB = setTimeout(function () { showdata() }, 4000);
            function showdata() {
                clearTimeout(timerAB);
                if (lb == true) {
                    console.log("finished" + count + " " + 0);
                    drawLeaderboard(SegID, type);  //was segs yyy
                } else {
                    console.log("finished" + count + " " + 0);
                    showEfforts(SegID, type, frID);
                }
            }
        }
    }
}

function CallHistWeather(latlng,date,SegID,i,type,lb,frID) {
    var hist_deets = {
        hdata: []
    };
    console.log("i=" + i);
    var j = i + 1;
    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + latlng + ".json",
        url: "https://api.forecast.io/forecast/1373a09f8179192ac902765c8b56bae5/" + latlng + "," + date,
        //56.052,-2.732
        //url: "json.txt",
        //dataType: "html",
        dataType: "jsonp",
        success: function (json) {
            //var jsontxt = eval('(' + json + ')');
           
            var jsontext = JSON.stringify(json);
            hist_deets.hdata.push({
                "wspeed": json.currently.windSpeed,
                "i": i,
                "wbrg": json.currently.windBearing,
                "timestamp": Math.round(new Date().getTime() / 1000),
                "timestamp_pretty": moment().format("MMM Do YYYY, h:mm:ss a")

            })
            console.log("Got hist data for " + SegID + " " + i + " " + hc);
            console.log(json.currently.windSpeed);
            if (lb == true) {
                $('#lbdata').html("Retrieving historical data ..." + j);
            } else {
                $('#sgdata').html("Retrieving historical data ..." + j);
            }
            var hist_deets_json = JSON.stringify(hist_deets);
            if (lb == true) {
               
                    localStorage.setItem(SegID + "_" + i + "_hist", hist_deets_json);
               
               
            } else {
                if (frID != null) {
                    localStorage.setItem(SegID + "_" + frID + "_" + i + "_hist_user", hist_deets_json);
                } else {
                    localStorage.setItem(SegID + "_" + i + "_hist_user", hist_deets_json);
                }

              
            }
            //currently.windSpeed
            //currently.windBearing
            $('#location').append(jsontext + "</br>");
         //   if (i == hc) {
              
            
           // var wspeed = 
           // var direction = 
            //alert(jsontext);
            //var location = json['location']['city'];
          


        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        },
        complete: function () {
            //load weather

        }

    });

}


function startWeather() {

weatherAct();

}


function refreshWeather(type,ct) {

    if (type == 'map') {
        $('#winfomap').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                        "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Retrieving weather ...</div>");
        weatherMap(ct);
        $('#refreshBtnmap').fadeOut();
       
     } else {


        var timenow = Math.round(new Date().getTime() / 1000);
        var wdata = localStorage.getItem("weatherdata");
        if (wdata != null) {
            var wdatap = eval('(' + wdata + ')');
            var epochw = wdatap.wdata[0].timestamp;
            var diff = timenow - epochw;
            //alert(diff);


            function revertText() {
                clearInterval(timer1);
                $('#winfo').fadeOut();
                dispStarsChk();
                $('#refreshBtn').fadeIn();
                // $('#winfo').fadeIn()

            }
            console.log(diff);
            if (diff < 10800) { //10800
                var timer1 = setInterval(function () { revertText() }, 5000);
                $('#refreshBtn').fadeOut();
                $('#winfo').fadeOut('slow', function () {
                    // will be called when the element finishes fading out
                    $('#winfo').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available");
                    // if selector matches multiple elements it will be called once for each
                    $('#winfo').fadeIn();
                });
                // $('#winfo').fadeOut('slow').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available").fadeIn('slow');
                //$('#winfo').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available");
                // $('#winfo').fadeIn();
            } else {
                $('#refreshBtn').fadeOut('slow');
                var timex = 20000;
                var actct = localStorage.getItem("actct");
                var segct = localStorage.getItem("segct");
                var total = parseInt(actct) + parseInt(segct);
                timex = (total * 2000)
                var timer2 = setInterval(function () { getSegWeather() }, timex); //timer = weatherct * 2s
                //timer = weatherct * 2s

                console.log(timex);
                $('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                             "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ...</div>");
                $('*[id*=stars_]:visible').each(function () {
                    $(this).html("wait");
                });
                deleteOldweather(type);
                weatherAct();
                function getSegWeather() {
                    clearInterval(timer2);
                    weatherSeg();

                    var timer3 = setInterval(function () { finishedW() }, 2000);
                    function finishedW() {
                        clearInterval(timer3);
                        dispStarsChk();
                        countWdata();
                        $('#refreshBtn').fadeIn('slow');
                    }
                    //  dispStarsChk();
                }


            }
        } else {
            $('#refreshBtn').fadeOut('slow');
            var timex = 20000;
            var actct = localStorage.getItem("actct");
            var segct = localStorage.getItem("segct");
            var total = parseInt(actct) + parseInt(segct);
            timex = (total * 2000)
            var timer2 = setInterval(function () { getSegWeather() }, timex); //timer = weatherct * 2s
            //timer = weatherct * 2s

            console.log(timex);
            $('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                         "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ...</div>");
            $('*[id*=stars_]:visible').each(function () {
                $(this).html("wait");
            });
            deleteOldweather(type);
            weatherAct();
            function getSegWeather() {
                clearInterval(timer2);
                weatherSeg();

                var timer3 = setInterval(function () { finishedW() }, 2000);
                function finishedW() {
                    clearInterval(timer3);
                    dispStarsChk();
                    countWdata();
                    $('#refreshBtn').fadeIn('slow');
                }
                //  dispStarsChk();
            }
        }
    }
}

function hideW() {
    $('#wbtns').hide();
}

function checkSegisAct(ID) {          //  create a loop function
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var priv = false;
    $.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        if (seg.ID == ID) {
            priv = true;
        }
            
    });                       //  ..  setTimeout()

    return priv;
}

function weatherAct() {          //  create a loop function
var json = localStorage.getItem('starsdata');  //apr4 was segdata
var j2 = eval('(' + json + ')');
$('#status_msgs').append("Retrieving weather data for Starred Segments</br>");
    //$('#location').show();
var wct = 1;
var time = 0;
var ct = localStorage.getItem('weatherdata_ct');
var timerw = ct * 4000;
    //var ct = localStorage.getItem('weatherdata_ct');
    //var timerw = ct * 4000;
var actct = localStorage.getItem("starsct");
timex = (actct * 4000)
console.log(timex + " estimated time for weather in wAct");
var timerst = setInterval(function () { closeStatus() }, timex);
function closeStatus() {
    clearInterval(timerst);
    $('#status_msgs').append("</br>Done .... stand by");

    console.log(timex + " seconds up")
   // weatherSeg();
    drawTable("stars");


    var timerst2 = setInterval(function () { dispstarst() }, 2000);
    function dispstarst() {
        clearInterval(timerst2);
        $('#status_msgs').hide();
        $('#status_area').hide();
        $('#UnAuthApp').hide();
        $('#menu_buttons').show();
    
        displayStars(3);
   
    }


}
$.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.latlng,seg.ID,"act");
$('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
"<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ... " + wct + "</div>");
$('#status_msgs').html("Retrieving weather data for Activities and Segments ... " + wct + "</br>");
wct++;
    }, time);
    time += 4000;
    });                       //  ..  setTimeout()


}

function weatherMap(ct) {          //  create a loop function
var json = localStorage.getItem('seg_loc_data');
var j2 = eval('(' + json + ')');
console.log(ct);
var wct = 1;
//$('#winfomap').html("Retrieving weather data ...");
//$('#location').show();
var time = 0;

    $.each(j2.points, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.endlatlong,seg.PID,"map");
ct--;
console.log(ct);

$('#winfomap').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
            "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ... " + wct + "</div>");
wct++;
 if (ct == 0) {
     var timer1x = setTimeout(function () { startDecode() }, 2000);
     function startDecode() {
         console.log("timeout");
         clearTimeout(timer1x);
         displayStarsmap(24);
        // $('#refreshBtnmap').fadeIn('slow');
     }
            
        }
    }, time);

        time += 4500;
       
    });                       //  ..  setTimeout()


}

function weatherSeg() {
var all_seg_data =localStorage.getItem('all_seg_efforts');
var j2 = eval('(' + all_seg_data + ')');
//alert(all_seg_data);
if (all_seg_data.length > 80) {
var index = 0;
 $.each(j2.segs, function (i, seg) {
     var name = i;
   //  $('#status_msgs').append("Retrieving weather data </br>");
      var timer1 = setInterval(function () { startDecode(seg.ID,seg.parentID) }, 1000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
     function startDecode(toID,fromID) {
    clearInterval(timer1);
    copyWeather(fromID, toID);

        
     }
     console.log("copying seg weather")
    });
    
    }

}

function displayStarsmap(hrs,ct) { //get seg weather
    //1-3 = 3
    //4-6 = 6
    //tryMapWeatherStars(ID);
     $('#refreshBtnmap').html("");
            $('#refreshBtnmap').hide();
    var wdata = localStorage.getItem("weatherdata");
    var wdataj = eval('(' + wdata + ')');
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    var segct = j2s.count[0].num;
    console.log("l=" + jsonact.length);
    if (jsonact.length > 20) {
        var ID = j2s.points[0].PID;      //"469475975";
        var jsondata = localStorage.getItem(ID + "_weather_map");
        $('#refreshStarsmapbtn').html("Refresh Stars Ratings");
        //  var Hrs = localStorage.getItem("Hrs");
        localStorage.setItem("Hrs_map", hrs);

        var parsed_json = eval('(' + jsondata + ')');

        var fh = hrs - 2;
        var lh = hrs;
        fh = fh.toString();
        lh = lh.toString();
        //alert(fh + lh);
        var hrstxt = fh + " - " + lh + " Hrs";
        var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                  hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(3)\">1 - 3 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(6)\">4 - 6 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(9)\">7 - 9 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(12)\">10 - 12 Hrs</a></li></ul></div>";

       // 
        if (parsed_json != null) {
            var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
            var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
            $('#location').append("Calculating activity ratings for selected wind conditions");
            var timediff = getTimediff(ID);
            var timeago = getTimeW(ID); //moment(getTimeW(ID)).fromNow;
            if (hrs == 24) {
                $('#winfomap').html("Showing the best star ratings for the next 24 hours of retrieved weather</br>Weather data retrieved: " + timeago);
            } else {
                $('#winfomap').html("Showing star ratings from " + firsthour + " to " + lasthour);
            }
          
                
           
          
        }
        var noW = 0;
        $.each(j2s.points, function (i, seg) {
            var wdata = localStorage.getItem(seg.PID + "_weather_map");
            if (wdata == null) {
            noW++
                }
           // $('#stars_' + seg.PID).html("<p>Not yet retrieved</p>");
            calcStarsInline(seg.PID, hrs, 'map');
        });
        console.log(noW + " " + segct)
        if (noW == segct) {
            //$('#mapWind').hide();
        }

    }
    //save hrs val and also info that stars are showing
}

function changeGender(g) {
    localStorage.setItem("gender", g);
}

function drawWindcanvas(ID, from, to, ct) {
    var zoom = localStorage.getItem("zoommap");
  //  function findMapWeatherStars() {
    ct = 0;
    var wdata = localStorage.getItem("seg_loc_data");
    if (wdata.length < 20) {
       
    } else {
        var j2 = eval('(' + wdata + ')');
        $.each(j2.points, function (i, wd) {
            ct++;
            console.log("PID" + wd.PID);
            var wchk = localStorage.getItem(wd.PID + "_weather_map");
            if (wchk != null) { //or parentID
                console.log("found w for" + wd.PID);
               ID = wd.PID;
            }
        });
    }
//}
    //if (ID == null) {
        //var ID2 = findMapWeatherStars();
   // }
    console.log(ID + "z:" + zoom)
    var jsondata = localStorage.getItem(ID + "_weather_map");
    //console.log(jsondata);
    if (ID == null) {
        if (zoom >= 12) {
            $('#refreshBtnmap').html("<a class=\"btn btn-primary btn-sm\" href=\"#tableback\" onclick=\"refreshWeather('map'," + ct + ")\" id=\"refreshStarsbtn\">Get weather for Segments in this view</a>");
            $('#refreshBtnmap').show();
            $('#mapWind').hide();
            $('#btnLeft').hide();
            $('#btnRight').hide();
        } else {
            $('#mapWind').hide();
            $('#btnLeft').hide();
            $('#btnRight').hide();
            $('#refreshBtnmap').html("");
            $('#refreshBtnmap').hide();
        }
        } else {
        //$('#mapWind').hide();
           $('#refreshBtnmap').html("");
           $('#refreshBtnmap').hide();

    var canvas = document.getElementById('map_wind_canvas');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 240, 70);
    $('#mapWind').show();
    var ht = parseInt((ct * 48) + 150);
    $('#tableback_map').height(ht);
    if (zoom < 12) {
        $('#btnLeft').hide();
        $('#btnRight').hide();
        $('#mapWind').hide();
       // ctx2d.fillStyle = '#FFF';
       /// ctx2d.font = '14px Arial';
       // ctx2d.fillText("Zoom in for wind information for this view", 10, 10);
    } else {

        $('#btnLeft').show();
        $('#btnRight').show();
       
       
        var fromPrev = from - 6;
        var toPrev = to - 6;
        var fromNext = from + 6;
        var toNext = to + 6;
        if (from != 0) {
            $('#btnLeft').html("<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"drawWindcanvas(" + ID + "," + fromPrev + "," + toPrev + ")\"><</button>");
        } else {
            $('#btnLeft').html("");
        }
        if (to <= 24) {
            $('#btnRight').html("<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"drawWindcanvas(" + ID + "," + fromNext + "," + toNext + ")\">></button>");
        } else {
            $('#btnRight').html("");
        }
        var start = from;
        var end = to;
       
     

            var parsed_json = eval('(' + jsondata + ')');
            var posx = 0; //54;
            var canvas = document.getElementById('map_wind_canvas');
            var ctx2d = canvas.getContext('2d');
            ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
            ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
            ctx2d.fillRect(0, 0, 240, 70);
            var first_hour = -1;
            hour_bg_bk = "000";
            ctx2d.fillStyle = '#FFF';
            ctx2d.font = '14px Arial';
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.save();



            while (from <= to) {
                //ctx2d.restore();

                var winddeg = parsed_json.hourly_forecast[from].wdir.degrees;

                var hour = parsed_json.hourly_forecast[from].FCTTIME.hour;
                if (hour > 12) {
                    hour = hour - 12
                }

                var hour_bg_bk = "9F9F9F";
                var border = "2fb4c8";
                var wind_bg = "51D251";
                var temp_bg = "FFB336";
                var wind_txt = "2f3e46";
                var temp_txt = "FFF";
                var ampm = parsed_json.hourly_forecast[from].FCTTIME.ampm;
                if (first_hour == -1) {
                    first_hour = parsed_json.hourly_forecast[from].FCTTIME.hour;
                }


                var day = parsed_json.hourly_forecast[from].FCTTIME.weekday_name;
                var mon = parsed_json.hourly_forecast[from].FCTTIME.month_name;
                var mday = parsed_json.hourly_forecast[from].FCTTIME.mday;
                var userhtml = " ";
                var longtime = parsed_json.hourly_forecast[from].FCTTIME.pretty;
                ctx2d.font = '12px Arial';
                ctx2d.fillStyle = '#FFF';
                if (hour < 10) {
                    ctx2d.fillText(hour, posx, 25);
                } else {
                    ctx2d.fillText(hour, posx, 25);
                }
                //alert(hour);
                ctx2d.font = '10px Arial';
                if (hour < 10) {
                    ctx2d.fillText(ampm, posx + 9, 25);
                } else {
                    ctx2d.fillText(ampm, posx + 14, 25);
                }

                if (from == start) {
                    ctx2d.fillText(day + " " + mday + " " + mon, posx, 12);

                }

                ctx2d.save();
                ctx2d.strokeStyle = "#2fb4c8";
                ctx2d.translate(posx + 12, 38);
                ctx2d.rotate(90 * Math.PI / 180);
                //ctx2d.save();
                ctx2d.rotate(winddeg * Math.PI / 180);

                ctx2d.lineWidth = 1;
                ctx2d.fillStyle = "#2fb4c8";
                //ctx2d.moveTo(60, -15);
                ctx2d.fillRect(-5, -5, 10, 10);
                ctx2d.beginPath();


                ctx2d.lineTo(0, -5);
                ctx2d.lineTo(0, -10);
                ctx2d.lineTo(10, 0);
                ctx2d.lineTo(0, 10);
                ctx2d.lineTo(0, 5);
                ctx2d.lineTo(-10, 5);
                ctx2d.lineTo(-10, -5);

                ctx2d.closePath();
                ctx2d.fill();
                ctx2d.stroke();
                ctx2d.restore();

                //wind

                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                //  ctx2d.font = '12px Arial';

                if (parsed_json.hourly_forecast[from].wspd.metric < 10) {
                    ctx2d.fillText(parsed_json.hourly_forecast[from].wspd.metric, posx, 60);
                    ctx2d.font = '10px Arial';
                    ctx2d.fillText("kph", posx + 10, 60);
                } else {
                    ctx2d.fillText(parsed_json.hourly_forecast[from].wspd.metric, posx, 60);
                    ctx2d.font = '10px Arial';
                    ctx2d.fillText("kph", posx + 17, 60);
                }
                ctx2d.fillStyle = "#2fb4c8";

                posx = posx + 40
                from = from + 1
            }

        }

    }

}



function tryMapWeatherStars(SegID) {
    console.log("try " + SegID);
    var wdata = localStorage.getItem(SegID + "_weather_map");
    var hrs = localStorage.getItem("Hrs_map");
    if (wdata == null) {
       // calcStarsInline(seg.PID, hrs);
    } else {
        console.log("found weather for " + SegID);
        calcStarsInline(SegID, hrs, 'map');
    }
}

function displayStars(hrs,type) { //get seg weather
    //1-3 = 3
    //4-6 = 6
    var wdata = localStorage.getItem("weatherdata");
  //  if (wdata == null) {
        //  weatherAct();
        console.log("no weather");
  //  } else {
     //   var wdataj = eval('(' + wdata + ')');
     //   var ID = wdataj.wdata[0].ID;      //"469475975";
        var jsonact = localStorage.getItem('starsdata');
       // var jsonseg = localStorage.getItem('all_seg_efforts');
     //   var jsondata = localStorage.getItem(ID + "_weather_act");
       // //if (jsondata == null) {
          //  console.log(ID + " weather null");
       // } else {
            //   $('#refreshStarsbtn').html("Refresh Stars Ratings");
            //  var Hrs = localStorage.getItem("Hrs");
            localStorage.setItem("Hrs", hrs);

       //     var parsed_json = eval('(' + jsondata + ')');
        hrs = 24
            //var j2s = eval('(' + jsonseg + ')');
            var j2a = eval('(' + jsonact + ')');
            var fh = hrs - 2;
            var lh = hrs;
            fh = fh.toString();
            lh = lh.toString();
            //alert(fh + lh);
            if (hrs == 24) {
                var hrstxt = "Best (24 hrs)";
            } else {
                var hrstxt = fh + " - " + lh + " Hrs";
            }

            var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                      hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                                    "<li><a href=\"#\" onclick=\"displayStars(3)\">1 - 3 Hrs</a></li>" +
                                    "<li><a href=\"#\" onclick=\"displayStars(6)\">4 - 6 Hrs</a></li>" +
                                    "<li><a href=\"#\" onclick=\"displayStars(9)\">7 - 9 Hrs</a></li>" +
                                    "<li><a href=\"#\" onclick=\"displayStars(12)\">10 - 12 Hrs</a></li>" +
                                    "<li><a href=\"#\" onclick=\"displayStars(24)\">Best (24 Hrs)</a></li></ul></div>";

         //   $('#Hrsdd').html(ddtext);


           // var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
          //  var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
            $('#location').append("Calculating activity ratings for selected wind conditions");
         //   var timediff = getTimediff(ID);
         //   var timeago = prettify(timediff);
            if (hrs == 24) {
                $('#winfo').html("Showing the best star ratings for the next 24 hours of retrieved weather");
            } else {

            }
        
            $.each(j2a.segs, function (i, seg) {
               // $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
               
                calcStarsInline(seg.ID, hrs, 'stars');
            });
       // }
   // }
    //save hrs val and also info that stars are showing
}

function stConn2() {
    var strava_deets = {
        deets: []
    };
    var ID;
    //alert("connect");
    $('#status_msgs').show();
    $('#status_area').show();
    $('#status_msgs').html("Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
       // alert(result);
       // console.log(result)
     
        localStorage.removeItem('userdata');
        // result.me().done(function (data) {
        result.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            // do something with `data`, e.g. print data.name
            $('#stConnimg').hide();
            $('#bigLogoimg').hide();
            strava_deets.deets.push({
                "firstname": data.firstname,
                "profile": data.profile,
                "lastname": data.lastname,
                "stravaID": data.id,
                "city": data.city,
                "state": data.state,
                "country": data.country
            });
            
            var jsondeets = JSON.stringify(strava_deets);
            localStorage.setItem('userdata', jsondeets);
            localStorage.setItem('fulluserdata', JSON.stringify(result));
            localStorage.setItem('Hrs', "3");
            saveUser(data.firstname, data.lastname, data.id, 0, 0);
            ID = data.id;
            if (data.profile == "avatar/athlete/large.png") {
            pic = "<img style=\"width:80px;height:auto\" src=\"/Content/blank_avatar.jpg\">";
            pic_header = "<img class=\"circular_pfl\" src=\"/Content/blank_avatar.jpg\">";
        } else {
            pic = "<img style=\"width:80px;height:auto\" src=\"" + data.profile + "\">";
            pic_header = "<img class=\"circular_pfl\" src=\"" + data.profile + "\">";
        }
            
            var name = data.firstname + ", " + data.lastname;
           
            var loc = data.city + ", " + data.country;
            
                
            $('#pic_header').show();
            $('#logo_header').show();
            $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
            $('#userimg').html(pic);
            $('#pic_header').html(pic_header);
           
            var timex = 30000;
            //var ct = localStorage.getItem('weatherdata_ct');
            //var timerw = ct * 4000;
            //var actct = localStorage.getItem("actct");
           // var segct = localStorage.getItem("segct");
            //var total = parseInt(actct);// + parseInt(segct);
            //timex = (total * 2000)
            //console.log(timex);
            var timerst = setInterval(function () { closeStatus() }, timex); //rem bkk2
            function closeStatus() {
                clearInterval(timerst);
                $('#status_msgs').append("</br>Done .... stand by");
             
                console.log(timex + " seconds up")
               // weatherSeg();
                drawTable("stars");
                $('#UnAuthApp').hide();
               
                
                var timerst2 = setInterval(function () { dispstarst() }, 2000);
                function dispstarst() {
                    clearInterval(timerst2);
                    $('#status_msgs').hide();
                    $('#status_area').hide();
                   
                    $('#menu_buttons').show();
                    
                    displayStars(3);
                  
                }

              
            }
            $('#status_msgs').append("</br >Retrieving Starred Segments for </br>" + data.firstname + " " + data.lastname + "</br >");
            
          //  getFavs();
          //  stAct();
            stKOMs(ID);
            stStars(ID);
           // seg_efforts(ID);
            // do some stuff with result
        });

    });
}

function stTest2() {
    $('#status_msgs').show();
    $('#status_msgs').append("</br > testing ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {
            $('#status_msgs').append("</br > " + result);
            var jsontext = JSON.stringify(data);
            $('#status_msgs').append("</br > " + jsontext);
        })
        // do some stuff with result
    });


}

var timer1
var timer2

function analyseSegs() {
//start timer, then analyse
//getSegtimer = setTimeout(analyseSegs2, 5000);
    var all_seg_data = localStorage.getItem('all_seg_efforts');
    if (all_seg_data != null) {
        var j2 = eval('(' + all_seg_data + ')');
        //alert(all_seg_data);
        if (all_seg_data.length > 80) {
            var index = 0;
            $.each(j2.segs, function (i, seg) {
                //alert("hi");
                var name = i;
                var poly = localStorage.getItem(seg.ID + "_poly");
                //  alert(poly);
                var ID = seg.ID
                var parentID = seg.parentID
                var timer1 = setInterval(function () { startDecode(poly, ID, parentID, i, index) }, 5000);
                index++;
                //alert(poly);
                //startDecode(poly,ID,i);      
                function startDecode(poly, ID, parentID, i, index) {
                    clearInterval(timer1);
                    decodepoly(poly, ID, parentID,"notkml");

                }
            });

            var timer2 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer2);
                //  drawTable();
                saveSegmentsDB("act");
                weatherAct();
               
            }


        } else {

            var timer3 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer3);
               // $('#AuthApp').show();
           //     $('#status_msgs').hide();
                //drawTable();
                weatherAct();
            }

        }
    } else {
        $('#AuthApp').show();
    }
}


function saveSegmentsDB(type) {
    if (type == "map") {
        var all_seg_data = localStorage.getItem('seg_loc_data');
        if (all_seg_data != null) {
            var j2 = eval('(' + all_seg_data + ')');
            //alert(all_seg_data);
            if (all_seg_data.length > 80) {
                var index = 0;
                $.each(j2.points, function (i, seg) {

                    var name = seg.name;
                    var latlng = seg.endlatlong;
                    var poly = seg.points;
                    var array = localStorage.getItem(seg.PID + "_array");
                    //  alert(poly);
                    var ID = seg.PID
                    var priv = false

                    saveSegment(name, ID, poly, array, latlng, priv, null);
                    console.log("save " + array + " " + poly);
                });

            }
        }
    } else if (type == "stars") {
        var all_seg_data = localStorage.getItem('starsdata');
        if (all_seg_data != null) {
            var j2 = eval('(' + all_seg_data + ')');
            //alert(all_seg_data);
            if (all_seg_data.length > 80) {
                var index = 0;
                $.each(j2.segs, function (i, seg) {
               
                    var name = seg.name;
                    var latlng = seg.latlng;
                    var poly = localStorage.getItem(seg.ID + "_poly");
                    var array = localStorage.getItem(seg.ID + "_array");
                    //  alert(poly);
                    var ID = seg.ID
                    
               
                    saveSegment(name, ID, poly, array, latlng, false, null);
                    console.log("save " + array + " " + poly);
                });

            }
        }
    
    } else {
        var all_seg_data = localStorage.getItem('all_seg_efforts');
        if (all_seg_data != null) {
            var j2 = eval('(' + all_seg_data + ')');
            //alert(all_seg_data);
            if (all_seg_data.length > 80) {
                var index = 0;
                $.each(j2.segs, function (i, seg) {
                    //alert("hi");
                    var name = seg.name;
                    var latlng = seg.latlng;
                    var poly = localStorage.getItem(seg.ID + "_poly");
                    var array = localStorage.getItem(seg.ID + "_array");
                    //  alert(poly);
                    var ID = seg.ID
                    var priv = seg.private
                    var parentID = seg.parentID
                    saveSegment(name, ID, poly, array, latlng, priv, null);
                });

            }
        }
    }
}


function parse(type,ID) {
//alert(type);
var parentID = "111";
if (type == "act") {

    var seg_data =localStorage.getItem('segdata');
    var j2 = eval('(' + seg_data + ')');
    var dist = j2.segs[0].dist;
    $.each(j2.segs, function (i, seg) {
        var poly = seg.poly;
        var ID = seg.ID;
        var timer2 = setInterval(function () { startDecode(poly,ID,parentID) }, 2000);
   
        //alert(poly);
        //startDecode(poly,ID,i);      
    
        function startDecode(poly, ID, parentID) {
            clearInterval(timer2);
            decodepoly(poly, ID, parentID,"notkml");
            //copyWeather(fromID, toID)


        }
    });
   
} else if (type == "kom") {

        var seg_data =localStorage.getItem('komdata_' + ID);
        var j2 = eval('(' + seg_data + ')');
        var dist = j2.segs[0].dist;
        $.each(j2.segs, function (i, seg) {          
            var ID2 = seg.ID;
            var poly = localStorage.getItem(ID2 + '_poly');
            var timer2 = setInterval(function () { startDecode(poly,ID2,parentID) }, 2000);
   
            //alert(poly);
            //startDecode(poly,ID,i);      
    
            function startDecode(poly, ID2, parentID) {
                clearInterval(timer2);
             //  console.log(ID2 + " " + poly)
              decodepoly(poly, ID2, parentID,"nokkml");
                //copyWeather(fromID, toID)


            }
        });

       // getAct("kom");

} else if (type == "stars") {

    var seg_data =localStorage.getItem('starsdata');
    var j2 = eval('(' + seg_data + ')');
    var dist = j2.segs[0].dist;
    $.each(j2.segs, function (i, seg) {
       
        var ID = seg.ID;
      
        var pstr = ID + "_poly";
      //  console.log(pstr);
        var poly = localStorage.getItem(pstr);
       // var poly = segjson.segs.poly;
        var timer2 = setInterval(function () { startDecode(poly,ID,parentID) }, 2000);
   
        //alert(poly);
        //startDecode(poly,ID,i);      
    
        function startDecode(poly, ID, parentID) {
            clearInterval(timer2);
            console.log("decode " + poly)
            decodepoly(poly, ID, parentID,"notkml");
            //copyWeather(fromID, toID)


        }
    });

  
    
    
    } else if (type == "seg") {

var seg_data = localStorage.getItem('segdata');  //not here
//alert(seg_data);
var j2 = eval('(' + seg_data + ')');

var index = 0;
    $.each(j2.segs, function (i, seg) {
    var seg_eff = localStorage.getItem(seg.ID+'_seg_efforts'); //has ID +parent ID
    var j2eff = eval('(' + seg_eff + ')');
    //alert("eff" + seg_eff + seg.ID);  //vf is top onlist
    var name = i;
    var segjson = localStorage.getItem(ID+"_poly");
    var poly = segjson.segs.poly;
    var ID = segjson.segs.ID;
 //   alert("start decode" + poly + " " + ID);
      var timers = setInterval(function () { startDecode(poly,ID,i,index) }, 5000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
    clearInterval(timers);
    //index++;
   // alert(i + " start ... " + ID + " idx=" + index);
   $('#location').append("decode poly for segment: " + ID); //was actmsgs
    decodepoly(poly,ID,parentID,"notkml");
         
        }
      
    });
    
    getAct("act");

    
    
    
    } else if (type == "map") {
    
    var seg_data =localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + seg_data + ')');
//console.log("parse " + seg_data);
    var index = 0;
    $.each(j2.points, function (i, seg) {
       
      var name = i;
      //
      var poly = seg.points; //seg[i]['map']['summary_polyline'];
      var ID = seg.PID;
      var chk = localStorage.getItem(ID + '_array');
        //  alert("start " + poly + ID);
        if (chk == null) { 
      var timer = setInterval(function () { startDecode(poly,ID,i,index) }, 1000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
          clearInterval(timer);
          //index++;
          //  alert(poly + " start ... " + ID + " idx=" + index);
 
          decodepoly(poly, ID, parentID,"notkml");
          

      }
        } else {
            console.log("not prarsing " + ID);
        }
      
    });
    //getAct();
    
    }


}

//getSegpolysTimer();
function ActsSegsRefresh() {
    //stAct();
    stConn2();
}



function stAct() {
   
    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {

            var jsontext = JSON.stringify(data);
           // $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
            var poly = data[i]['map']['summary_polyline'];
            var ID = data[i]['id'];
            //   $.each(parsed_json.hourly_forecast, function (i, zone) {
 
 //           $.each(data.segment_efforts, function (i, seg_eff) {
               //  alert(seg_eff.name);
   //         });
            
                
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain'],
                    "latlng": data[i]['end_latlng'],
                    //"seg_efforts" : data[i]['segment_efforts']
                    
                });
                
                //alert(seg.map);
               
                ct++;
                seg_efforts(seg.id);
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('segdata', jsonsegs);
            localStorage.setItem('actct', ct);
            $('#status_msgs').append('Found ' + ct + ' activities </br>');
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
            var firstname = user.deets[0]['firstname'];
            var lastname = +user.deets[0]['lastname'];
            var stravaID = user.deets[0]['ID'];
            //updateUser(firstname, lastname, stravaID, ct, 0);
           // alert(jsontext);
            //alert("Retrieved " + ct + " Activities.");
            //drawTable();
            if (ct > 0) {
                parse("act");
                var timer = setInterval(function () { startDecode() }, 5000);
                console.log("analyse segs in 5 seconds")
                function startDecode() {

                    clearInterval(timer);
                    analyseSegs();
                }
            } else {
                $('#UnAuthApp').hide();
                noActsmsg("act");
            }
             //myFunction();
        });

    });
}

function stFriends() {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var ID = user.deets[0]['stravaID'];
    var friends = {
        people: []
    };
  
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/friends').done(function (data) {

            var jsontext = JSON.stringify(data);
            // $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, peep) {
                var frID = peep.id;
                friends.people.push({
                    "firstname": peep.firstname,
                    "lastname": peep.lastname,
                    "ID": peep.id,
                    "profile": peep.profile_medium
                });

                ct++;
                stKOMs(frID);
                saveFriend(peep.firstname, peep.lastname, frID, ID);
            });
            var jsonfr = JSON.stringify(friends);
            localStorage.setItem('frdata', jsonfr);
           
            $('#status_msgs').append('Found ' + ct + ' friends </br>');
           
        });

        var timer = setInterval(function () { startDecode() }, 8000);
     
        function startDecode() {
            clearInterval(timer);
            drawFriends();
        }
      

    });
}

function stKOMs(ID) {

    var strava_segs = {
        segs: [],
        count: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/koms').done(function (data) {

            var jsontext = JSON.stringify(data);
            // $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
              
                strava_segs.segs.push({
                    "name": seg.name,
                    "latlng": seg.segment.end_latlng,
                    "dist": seg.segment.distance,
                    "ID": seg.segment.id,
                    "parentID": seg.activity.id,
                    "pb_rank": seg.pr_rank,
                    "kom_rank": seg.kom_rank,
                    "elev_h": seg.segment.elevation_high,
                    "elev_l": seg.segment.elevation_low,
                    "private": seg.segment.private,
                    "kom_rank": seg.kom_rank,
                    "pr_rank": seg.pr_rank,
                    "time": seg.start_date
                });//has it more than once

                seg_details(seg.segment.id);
                ct++;
            });
            strava_segs.count.push({
                "num": ct
            });
            if (ct > 0) {
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('komdata_' + ID, jsonsegs);
           // localStorage.setItem('komct', ct);
            $('#status_msgs').append('Found ' + ct + ' KOMs and CRs </br>');
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
           
            var stravaID = user.deets[0]['stravaID'];
         
            var timer = setInterval(function () { startDecode() }, 5000);
            console.log("parse friends KOMs in 5 seconds")
            function startDecode() {
                clearInterval(timer);
                if (stravaID == ID) {
                    updateUserKOMs(ID, ct);
                } else {
                
                }
                parse("kom",ID);              
            }
                             
            } 
        });

    });
}

function stStars(ID) {

    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/segments/starred').done(function (data) {

            var jsontext = JSON.stringify(data);
            // $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
                var segID = data[i]['id'];
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],                  
                    "dist": data[i]['distance'],
                    "pr_effort": data[i]['athlete_pr_effort'],
                    "latlng": data[i]['end_latlng'],
                    "elev_h": seg.elevation_high,
                   "elev_l": seg.elevation_low,
                    //"seg_efforts" : data[i]['segment_efforts']

                });

                //alert(seg.map);

                ct++;
                //seg_efforts(seg.id);
                seg_details(segID);
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('starsdata', jsonsegs);
            localStorage.setItem('starsct', ct);
            $('#status_msgs').append('Found ' + ct + ' Starred Segments </br>');
         
            //drawTable();
            if (ct > 0) {
                
                var timer = setInterval(function () { startDecode() }, 5000);
                console.log("parse stars")
                function startDecode() {
                    //  drawTable("stars");
                    $('#status_msgs').append('Processing Starred Segments </br>')
                    parse("stars");
                    clearInterval(timer);
                    var timer2 = setInterval(function () { finish() }, 10000);
                    console.log("draw table for stars in 5 seconds")
                    function finish() {
                        saveSegmentsDB("stars");
                        //drawTable("stars");
                        //weatherAct();
                        clearInterval(timer2);
                        //analyseSegs();
                    }
                }
            } else {
                $('#UnAuthApp').hide();
                noActsmsg("act");
            }
            //myFunction();
        });

    });
}

function stLeader(ID,type) {
    //alert(ID);
    $('#lbBtn').hide();
    console.log("his" + type)
    var strava_segs = {
        segs: [],
        timestamp: [],
        count: []
    };
    var timenow = Math.round(new Date().getTime() / 1000);
    var gender = localStorage.getItem("gender");
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
     if (gender == "B") {
         OAuth.popup('strava', { cache: true }).done(function (result) {

             result.get('https://www.strava.com/api/v3/segments/' + ID + '/leaderboard').done(function (data) {
                 var jsontext = JSON.stringify(data);
                 //$('#status_msgs').append(jsontext);
                 //alert(jsontext);
                 var ct = 0;
                 var entries = data['entry_count'];
                 $.each(data.entries, function (i, seg) {


                     strava_segs.segs.push({
                         "name": seg.athlete_name,
                         "time": seg.start_date_local,
                         "profile": seg.athlete_profile,
                         "mov_time": seg.moving_time
                         //alert(poly + "hij" + ID);
                     });

                     ct++;
                 });
                 strava_segs.timestamp.push({
                     "epoch": timenow,
                     "now": moment().format("MMM Do YYYY, h:mm:ss a")
                 });
                 strava_segs.count.push({
                     "num": ct
                 });
                 var jsonsegs = JSON.stringify(strava_segs);
                 localStorage.setItem('lb_data_' + ID, jsonsegs);
                 //localStorage.setItem('actct',ct);

                 // alert("Retrieved " + entries + jsonsegs);
                 //drawTable();

                 var timer = setInterval(function () { startDecode() }, 5000);

                 function startDecode() {
                     clearInterval(timer);
                     showHistweather(ID, type, true, 'one', null)
                     // drawLeaderboard(ID, type);
                 }


             });

         });
     } else {


         OAuth.popup('strava', { cache: true }).done(function (result) {

             result.get('https://www.strava.com/api/v3/segments/' + ID + '/leaderboard', { data: { gender: gender } }).done(function (data) {
                 var jsontext = JSON.stringify(data);
                 //$('#status_msgs').append(jsontext);
                 //alert(jsontext);
                 var ct = 0;
                 var entries = data['entry_count'];
                 $.each(data.entries, function (i, seg) {


                     strava_segs.segs.push({
                         "name": seg.athlete_name,
                         "time": seg.start_date_local,
                         "profile": seg.athlete_profile,
                         "mov_time": seg.moving_time
                         //alert(poly + "hij" + ID);
                     });

                     ct++;
                 });
                 strava_segs.timestamp.push({
                     "epoch": timenow,
                     "now": moment().format("MMM Do YYYY, h:mm:ss a")
                 });
                 strava_segs.count.push({
                     "num": ct
                 });
                 var jsonsegs = JSON.stringify(strava_segs);
                 localStorage.setItem('lb_data_' + ID, jsonsegs);
                 //localStorage.setItem('actct',ct);

                 // alert("Retrieved " + entries + jsonsegs);
                 //drawTable();

                 var timer = setInterval(function () { startDecode() }, 5000);

                 function startDecode() {
                     clearInterval(timer);
                     showHistweather(ID, type, true, 'one', null)
                     // drawLeaderboard(ID, type);
                 }


             });

         });
     }
}

var strava_all_segs = {
        segs: []
    };
    
//https://www.strava.com/api/v3/segments/:id

function seg_efforts(ID) { //efforts for an activity ID
    var strava_segs = {
        segs: [],
        count: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //result.get('https://www.strava.com/api/v3/segments/starred/').done(function (data) {
        result.get('https://www.strava.com/api/v3/activities/' +ID).done(function (data) {
        //https://www.strava.com/api/v3/activities/:id
        
            var jsontext = JSON.stringify(data);
            console.log(data);
            //$('#status_msgs').append(jsontext);
            var ct = 0;
            //var entries = data['entry_count'];
           $.each(data.segment_efforts, function (i, seg) {
            //get poly here

               strava_segs.segs.push({
                   "name": seg.name,
                   "dist": seg.segment.distance,
                   "latlng": seg.segment.start_latlng,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id,
                   "private" : seg.segment.private
                });
                
                strava_all_segs.segs.push({
                   "name": seg.name,
                   "latlng": seg.segment.end_latlng,
                   "dist": seg.segment.distance,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id,
                   "pb_rank" : seg.pr_rank,
                   "kom_rank": seg.kom_rank,
                   "elev_h": seg.segment.elevation_high,
                   "elev_l": seg.segment.elevation_low,
                   "private": seg.segment.private
                });//has it more than once
        
            seg_details(seg.segment.id);
                    ct++;
               
            });
            if (ct > 0) {
            strava_segs.count.push(ct);
           var jsonsegs = JSON.stringify(strava_segs);
            var jsonsegsall = JSON.stringify(strava_all_segs);
            $('#status_msgs').append('Found ' + ct + ' segment efforts for activity ' + ID + '</br>');
           // alert(ID+"saving" + jsonsegsall);
            localStorage.setItem(ID+'_seg_efforts', jsonsegs);
            localStorage.setItem('all_seg_efforts', jsonsegsall);
            //var segct = localStorage.getItem('segct');
           // var actct = localStorage.getItem('actct');
           // var cts = parseInt(ct+segct);
           //  localStorage.setItem('segct',cts);
           // alert("h2");
           // localStorage.setItem('actct',7);
           // var ct2 = parseInt(cts+actct);
           
            //get segment details by ID then call decodepoly with poly + ID
            //var poly= "}vculjey0cF{jAjK'A";
            //parse(ct,"seg");  
           // analyseSegs();
            
            } 
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            
          //  drawLeaderboard(ID);
            
        });

    });
   // alert("here");
   // 
}
function seg_details(ID) {
    //alert(ID);
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    var poly = "";
    //var json = localStorage.getItem('all_seg_efforts');
    OAuth.popup('strava', { cache: true }).done(function (result) {
         result.get('https://www.strava.com/api/v3/segments/' +ID).done(function (data) {
            poly = data.map.polyline;
            localStorage.setItem(ID+'_poly',poly);
            console.log("got poly " + ID + "</br>");
        });

    });
}

function stEffort(ID,frID,type) {
    //alert(ID);
    if (frID != null) {
        var athID = frID;
    } else {
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var athID = user.deets[0]['stravaID'];
    }
    var timenow = Math.round(new Date().getTime() / 1000);
    var strava_segs = {
        segs: [],
        timestamp: [],
        count: []
    };
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/'+ID+'/all_efforts',{ data: { athlete_id: athID} }).done(function (data) {
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
          //  alert(jsontext);
            var ct = 0;
           // var entries = data['entry_count'];
            $.each(data, function (i, seg) {
                strava_segs.segs.push({
                    "pr_rank": seg.pr_rank,
                     "time": seg.start_date_local,
                     "kom_rank": seg.kom_rank,
                     "mov_time": seg.moving_time,
                     "latlng": seg.segment.end_latlng
                    //alert(poly + "hij" + ID);
                });

                strava_segs.timestamp.push({
                    "epoch": timenow,
                    "now": moment().format("MMM Do YYYY, h:mm:ss a")
                });
                
               ct++;
            });
            if (ct > 0) {
                strava_segs.count.push({
                    "num": ct
                });
                var jsonsegs = JSON.stringify(strava_segs);
                if (frID != null) {
                    localStorage.setItem('eff_data_' + ID + '_' + frID, jsonsegs);
                } else {
                    localStorage.setItem('eff_data_' + ID, jsonsegs);
                }

                showHistweather(ID,type, false, 'one',frID)
                var timer = setInterval(function () { startDecode() }, 5000);
               
                function startDecode() {
                    clearInterval(timer);
                    drawSegEffort(ID, frID);
                }
            } else {
                $('#sgdata').html("You have no recorded efforts for this segment");
                $('#refreshBtneffs').html("");
                $('#segBtn').html("")
            }

        });

    });
}

function refreshData(ID,datatype,type) {
    var str;
    //var ID = "735100";
    var time = 500;
    var timer1 = setTimeout(function () { startDecode() }, 5000);
    var i = 0;
    console.log(type)
    if (type == 'lb') { //user later yyy
        clearCanvas(type);
        str = "lb_data_" + ID;
        while (i < 10) {
            console.log("Removing " + ID + "_" + i + "_hist");
                        // }
            localStorage.removeItem(ID + "_" + i + "_hist");
            i++;
        }
        localStorage.removeItem(str);
        function startDecode() {
            clearTimeout(timer1);
            stLeader(ID, datatype)

        }
        
    }

}

function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    //  OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    //OAuth.clearCache();
    var str = "weather";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
      // }
         localStorage.removeItem(localStorage.key(i));
      }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    //localStorage.removeItem('weatherdata');
    localStorage.removeItem('weatherdata_ct');
    showLocal();
}

function deleteOldweather(type) {
    var str = "weather_act";
    $('#status_msgs').show();
    localStorage.removeItem("weatherdata");
    localStorage.removeItem("weatherdata_ct");
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        if (localStorage.key(i).indexOf(str) > -1) {
            $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
            // }
            localStorage.removeItem(localStorage.key(i));
        }
        // do something with localStorage.getItem(localStorage.key(i));
    }

}

function showLocal() {
    $('#status_msgs').show();
    $('#testBtns').show();
    $('#table_calc_area2').show();
    $('#info').show();

    var str = "efforts";
    var str2= "weather";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i) + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
      }
      
      if (localStorage.key(i).indexOf(str2) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i))// + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
      }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    // var straval = localStorage.getItem('oauthio_provider_strava');
    // var stravl2 = straval.replace('1448', '1555');

    $('#status_msgs').append("</br > st: " + localStorage.getItem('oauthio_provider_strava'));
    //$('#status_msgs').html("</br > seg: " + localStorage.getItem('segdata'));

    //    $('#status_msgs').append("</br > st2: " + stravl2);
    //    localStorage.removeItem('oauthio_provider_strava');
    //    localStorage.setItem('oauthio_provider_strava', stravl2);
    //    $('#status_msgs').append("</br > st3: " + localStorage.getItem('oauthio_provider_strava'));
}

function twitterConn() {
    $('#result').html("");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.redirect('twitter','/home/index').done(function (r) {
        // the access_token is available via r.access_token
        // but the http functions automagically wrap the jquery calls
        r.get('/1.1/account/verify_credentials.json')
            .done(function (data) {
                $('#location').html("twitter: Hello, " + data.name + " !");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $('#location').html("req error: " + textStatus);
            });
    })
                    .fail(function (e) {
                        $('#result').html('error: ' + e.message);
                    });
}

function initBtns() {

    $('#weeks').on('onchange', function (e) {
        var name = getElementById(e.target).value;
        console.log(name);
    });


    $('.polylinkx').on('click', function (e) {
        // get clicked item
        $(e.target).find('p').removeClass('un_sel');
        $(e.target).find('p').addClass('sel');
        // remove all active classes
   //     alert(clickedItem);
  //      $('.mail p').removeClass('sel')
  //      $('.mail p').removeClass('un_sel')
       
        // find the ul inside the clicked item
       
    });
    var strava_segs = {
        segs: []
    };


    var strava_deets = {
        deets: []
    };

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {  //used for get activities
        // alert('Athlet');
        if (res == false) {
           // $('#status_msgs').append("</br > Not connected to Strava");
            $('#strava_login').show();
            $('#status_area').show();
            $('#main_menu').hide();
        } else {
            $('#main_menu').show();
            $('#status_msgs').append("</br > Connected to Strava");
            $('#get_activities').show();

            localStorage.removeItem('segdata');
            res = OAuth.create('strava');
            $('#status_msgs').show();
            $('#status_msgs').append(localStorage.getItem('segdata') + " Retrieving Activities ...");


            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            res.get('https://www.strava.com/api/v3/activities').done(function (data) {
                //https: //www.strava.com/api/v3/activities
                //todo with data
                //alert('Athlete ' + data.lastname);
                var jsontext = JSON.stringify(data);
                var midhtml = "";
                var ct = 0;
                $.each(data, function (i, seg) {
                    strava_segs.segs.push({
                        "name": data[i]['name'],
                        "poly": data[i]['map']['summary_polyline'],
                        "dist": data[i]['distance'],
                        "egain": data[i]['total_elevation_gain']
                    });
                    ct++;
                    //     var name = data[i]['name'];
                    // alert(name);
                    //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
                });
                var jsonsegs = JSON.stringify(strava_segs);
                localStorage.setItem('segdata', jsonsegs);
                $('#status_msgs').append("Retrieved " + ct + " Activities");
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));

            }).fail(function (err) {
                //todo with err
                alert("fail");
            });
            //    r.get('').done(function (data2) {
        }
    });

    $('#nearby').on('click', function () { //not used
        var token = localStorage.getItem('st_token');
        res = OAuth.create('strava');
        if (res == false) {
            $('#status_msgs').append("Not connected");
        } else {
     //       alert(token);
            $('#status_msgs').append("Connecting with: " + token);
            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //alert("nb click" + res);
            res.get('https://www.strava.com/api/v3/segments/explore', { data: { access_token: token, bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
                var jsondeets = JSON.stringify(data);
                //  localStorage.setItem('segdata', jsondeets);
                //alert(jsondeets);
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));
                $('#main_menu').hide();
                $('#seg_nearby').show();
                // getSegsbyBounds();
                showmap();
            }).fail(function (err) {
                //todo with err
                // alert("fail");

            });
        }
    });


    
    $('#st-connect').on('click', function () {
        $('#result').html("status_msgs ...");
        //OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        OAuth.popup('strava', { cache: true }).done(function (r) {
            // the access_token is available via r.access_token
            // but the http functions automagically wrap the jquery calls
            r.get('/oauth/authorize')
                .done(function (data) {
                    $('#result').html("strava: Hello");
                    $('#get_activities').show();
                    $('#main_menu').show();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#status_msgs').html("req error: " + textStatus + r.access_token);
                    localStorage.setItem('st_token', r.access_token);
                    $('#get_activities').show();
                    $('#main_menu').show();

                });
        })
        .fail(function (e) {
            $('#result').html('error: ' + e.message);
        });
    });


}
