
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional informationave
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

    initialize: function () {
        this.bindEvents();

    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", function (e) {
            reportOnlineStatus();

        }, true);
        document.addEventListener("offline", function (e) {
           reportOnlineStatus();

        }, true);
    },

    onDeviceReady: function () {

  appPurchChk();
 // checkData("1");


    },



    receivedEvent: function (id) {


    }
};

app.initialize();


function listSub() {

    window.iap.setUp(androidApplicationLicenseKey);

    window.iap.requestStoreListing(productIds, function (result) {


        for (var i = 0 ; i < result.length; ++i) {
            var p = result[i];

            product_info[p["productId"]] = { title: p["title"], price: p["price"] };

        }
    }, function (error) {
        $('#pmsg').html("Error. Please try again");
    });
}

var androidApplicationLicenseKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtF/EqNFQN8imgbmFZQgMRAhKl0q6Q/Ubn5pKGKaSvCPFUzrjzCxaQYUCRCVw56pwwe7YLpxb4e2L+ay6gO94gOD4iIGoO54Rq1TzXoJv72nRFSQjLKDKNmtpO0lEb8SujDRcVhJ1NND20iTQbSqdT970U81biwK8jC1QxUJOhRIDu2cJsIKMNaxa7Eui8P7IBKhdgsivIPOw4O0k2AARaxm5jKk9a/p7ozoyWlkFKd6fNaHGopDe7rKPMeetzNLVP+oRB84ZXCT30n71KrmRQ1tO8ULaRb+kvlTvKISxkhBxTkySOex1zkpY6OPWeI9QZgFPVOZnsILQF8vbb1G5OwIDAQAB";
var productIds = "sub1yearl7,sub1monthlev2";
var existing_purchases = [];
var product_info = {};

function purchaseProduct(productId) {
    var chk = $("input[name='TCsBox']:checked").val();
    if (chk != "yes") {
        alert("Please accept the Terms and Conditions");
    } else {
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var stravaID = user.deets[0]['stravaID'];

        window.iap.purchaseProduct(productId, function (result) {
            savePmt(stravaID, JSON.stringify(result));
            localStorage.setItem("OneYrSub", "1");
            localStorage.setItem("credits", "4000000");
            $('#pmsg').html("Thank you for your subscription. Reloading ...");
            var timerp1 = setInterval(function () { restartApp() }, 2000);
            function restartApp() {
                clearInterval(timerp1);
                appPurchChk();
            }

        },
        function (error) {
            $('#pmsg').html("User canceled. To purchase Subsciption, please try again.");
        });
    }
}

function viewTCs() {
    $('#purch_tile').height(4700) //220
    $('#TCsBtnV').hide();
    $('#TCsBtnH').show();
    $('#TCs').show();
}

function showMoreinfo() {
    var w = window.innerWidth;
    var w2 = w - 10;
    $('#moreInfo').width(w2);
    $('#moreInfo').show();
    //$('#splashDiv').show();
}

function closeMoreinfo() {
    $('#moreInfo').hide();
    //$('#splashDiv').hide();
}

function openSettings() {
    $('#moreInfo').hide();
    $('#splashDiv').hide();
    listSub();
    calcStorage();
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
    $('#profile_settings').show();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_efforts').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#locIcon').hide();
    $('#my_friends').hide();
    $('#friend_info').hide();
    $('html, body').animate({
        scrollTop: $("#pmsg").offset().top
    }, 2000);
}

function hideTCs() {
    $('#purch_tile').height(280) //220
    $('#TCsBtnV').show();
    $('#TCsBtnH').hide();
    $('#TCs').hide();
}

function consumeProduct(productId) {

    window.iap.consumeProduct(productId, function (result) {
        alert("purchaseProduct");
    },
    function (error) {
        alert("error: " + error);
    });
}

function restorePurchases() {

    window.iap.restorePurchases(function (result) {
        for (var i = 0 ; i < result.length; ++i) {
            var p = result[i];
           // $('#pmsg').append(self.existing_purchases + "result: " + JSON.stringify(result)) //save to db??
            if (self.existing_purchases.indexOf(p['productId']) === -1) {
                self.existing_purchases.push(p['productId']);
                localStorage.setItem("OneYrSub", "1");

                $('#pmsg').html("Subscription purchased.<br />");
            } else {

            }
        }
    },
    function (error) {

        $('#pmsg').append("Subscription not purchased.<br />");
        localStorage.setItem("OneYrSub", "0");

    });
}


function isOnLine() {
    return navigator.onLine;
}

var devOnline = true;

function reportOnlineStatus() {
    var userdata = localStorage.getItem('userdata');
    $('#onlineStatus').show();
    if (userdata != null) {
        var user = eval('(' + userdata + ')');
        var pic_header_on
        var pic_header_off

        if (user.deets[0]['profile'] == "avatar/athlete/large.png") {
            pic = "<img style=\"width:80px;height:auto\" src=\"img/blank_avatar.jpg\">";
            pic_header_on = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"img/blank_avatar.jpg\">";
            pic_header_off = "<img id=\"headpfl\" class=\"circular_pfl_off\" src=\"img/blank_avatar.jpg\">";
        } else {
            pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
            pic_header_on = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"" + user.deets[0]['profile'] + "\">";
            pic_header_off = "<img id=\"headpfl\" class=\"circular_pfl_off\" src=\"img/blank_avatar.jpg\">";
        }

        if (isOnLine()) {
            devOnline = true;

            $('#onlineStatus').removeClass("status_off");
            $('#onlineStatus').addClass("status_on");
            $('#onlineStatus').html("Online");
            $('#Statusreport').hide();
            $('#pic_header').html(pic_header_on);
            $('#stRefBtn').show();
            $('#frRefBtn').show();
           // var purch = localStorage.getItem("OneYrSub");
           // if (purch == "0") {
           //     checkServerStatus(stravaID, "555")
           // }
        }
        else {
            devOnline = false;


            $('#onlineStatus').removeClass("status_on");
            $('#onlineStatus').addClass("status_off");
            $('#onlineStatus').html("Offline");
            $('#pic_header').html(pic_header_off);
            $('#Statusreport').show();
            $('#stRefBtn').hide();
            $('#frRefBtn').hide();
        }
    } else {
        if (isOnLine()) {
            document.getElementById('stConnimg').style.pointerEvents = 'auto';
            $('#Statusreport').hide();
            $('#stConnimg').show();
        }
        else {
            document.getElementById('stConnimg').style.pointerEvents = 'none';
            $('#Statusreport').show();
            $('#stConnimg').hide();
        }
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


function onError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function geo() {
    alert(" geo connecting ...");

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

        gaugeWidthScale: 1.1,
        counter: true,
        hideInnerShadow: true,
        titlePosition: "above",
        valueFontColor: "#8bc7eb",
        titleFontColor: "#8bc7eb",
        titleFontSize: "30px",
        title: "KOM-ability Rating",
        startAnimationTime: 5000,
        startAnimationType: ">",
        refreshAnimationTime: 1000,
        refreshAnimationType: "bounce",
        levelColors: ["#ffca4a"],
        gaugeColor: "#333333",
    });
});

var totalDist = 0;


function checkLoc() {


    navigator.geolocation.getCurrentPosition(
    function (position) {

        $('#winfomap').html("Retrieving Location ...");
        showmap(11, position.coords.latitude, position.coords.longitude);
        localStorage.setItem("latgps", position.coords.latitude);
        localStorage.setItem("lnggps", position.coords.longitude);
    },
    function (error) {

        $('#winfomap').html("Location not available");
        var lat = localStorage.getItem("latmap");
        if (lat == null) {
            showmap(11, 48.14, 17.11);
        } else {

        }
    }, {
        enableHighAccuracy: true
              , timeout: 5000
    }


    );
}



function saveTW(segID, wspd, loc, stars, epoch, timestamp) {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var UserID = user.deets[0]['stravaID'];

    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/SaveTopWeather",
        data: "UserID=" + UserID + "&segID=" + segID + "&wspd=" + wspd + "&loc=" + loc + "&stars=" + stars + "&epoch=" + epoch + "&timestamp=" + timestamp,
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

function saveFriend(firstname, lastname, frID, ID) {


}

function getKWS() {

	 $.ajax({
		   type: "GET",
		   url: "http://komwiththewind.apphb.com/Home/AllW",
		   data: "stars=9",
		   dataType: "json",
		   timeout: 25000,
		   success: function (parsed_json) {
			   $.each(parsed_json.topw, function (i, seg) {
					   var kws = seg.Wspd;
					    localStorage.setItem("KWS", kws);

					  })


		   },
		   error: function (xhr, error) {
			   console.debug(xhr); console.debug(error);
		   }
	   });
	   return false;



}

function getMsg(firstname, lastname, stravaID) {
$('#pmsg').append("Getting message for " + firstname + " " + lastname + "....");
     $.ajax({
                   type: "GET",
                   url: "http://komwiththewind.apphb.com/Home/AllW",
                   data: "stars=" + stravaID,
                   dataType: "json",
                   timeout: 25000,
                   success: function (parsed_json) {


                       $.each(parsed_json.topw, function (i, seg) {
                               var msgstr = seg.Name;
				//alert(msgstr);
				$('#pmsg').append("<br />" + msgstr);
                              })

   		             //updateUser(firstname, lastname, stravaID, "157", "158");
                   },
                   error: function (xhr, error) {
                       console.debug(xhr); console.debug(error);


                       $('#pmsg').append("error");

                   }
               });
               return false;


}


function getMsg2() {
    $('#pmsg').append("Getting message ....");
        $.ajax({
               type: "GET",
               url: "http://komwiththewind.apphb.com/Home/AllW",
               data: "stars=101",
               dataType: "json",
               timeout: 25000,
               success: function (parsed_json) {


               $.each(parsed_json.topw, function (i, seg) {
                      var msgstr = seg.Name;
                      //alert(msgstr);
                      $('#pmsg').append("<br />" + msgstr);
                      })

               //updateUser(firstname, lastname, stravaID, "157", "158");
               },
               error: function (xhr, error) {
               console.debug(xhr); console.debug(error);


               $('#pmsg').append("error");

               }
               });
        return false;

}

function saveUser(firstname, lastname, stravaID, NumAct, NumSeg) {

    $.ajax({
        type: "POST",
        timeout: 15000,
        url: "http://komwiththewind.apphb.com/Home/SaveUser",
        data: "firstname=" + firstname + "&lastname=" + lastname + "&StravaID=" + stravaID + "&NumAct=" + NumAct + "&NumSeg=" + NumSeg,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {

        }
    });
    return false;
}

function savePmt(stravaID, payID) {

    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/SavePmt",
        data: "StravaID=" + stravaID + "&PayID=" + payID,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {

        }
    });
    return false;
}

function saveCredit(stravaID, credit) {

    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/SaveCredit",
        data: "StravaID=" + stravaID + "&cred=" + credit,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {

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
        url: "http://komwiththewind.apphb.com/Home/AllUsers",
        timeout: 15000,

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

                ctx2d.fillText(name, 20, posy);
                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillText("Activities: " + acts, 20, posy + 22);
                ctx2d.fillText("Segments: " + segs, 20, posy + 38);

                 posy = posy + 75;
            })


        },
        error: function (xhr, error) {


        }
    });
    return false;

}

function getWindiest(daysago) {
    $('#comcanvas').hide();
    $('#comHead').html("<h1>Top 10 Highest Star Rated Segments for the Last 7 Days</h1>");
    $('#comspin').show();

    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";
    var midhtml;


    var seg_loc_data = {
        points: []
    };

    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/TopW",
        dataType: "json",
        timeout: 15000,
        success: function (parsed_json) {

            $('#comspin').hide();

            $('#com_table').show();

            localStorage.setItem("topw_data", JSON.stringify(parsed_json));
            $.each(parsed_json.topw, function (i, seg) {

                var stars = seg.Stars;
                var name = seg.UserID;
                var wspd = seg.Wspd;
                var timestamp = seg.TS_pretty;
                var loc = seg.Location;
                var segname = seg.Name;
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

            $('#comspin').hide();
            var midhtml = "<li style=\"height:65px\"><i class=\"read\"></i><p class=\"un_sel\">Data not available</li>";
            $('#com_table').html(top + midhtml + "</ul></div></div>");

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
 //   $('#logmsg').append("<br/>KOMs CT: " + koms_ct);
    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/SaveUser",
        data: "StravaID=" + stravaID + "&NumAct=" + koms_ct,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {

        }
    });
    return false;
}

function updateUser(firstname, lastname, stravaID, exp1, exp2) {


    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/SaveUser",
        data: "firstname=" + firstname + "&lastname=" + lastname + "&StravaID=" + stravaID + "&NumAct=" + exp1 + "&NumSeg=" + exp2,
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {

        }
    });
    return false;
}






function SignOut() {
     for (var i = 0; i < localStorage.length; i++) {

         localStorage.removeItem(localStorage.key(i));

     }
     for (var i = 0; i < localStorage.length; i++) {

         localStorage.removeItem(localStorage.key(i));

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


function getWloc(ID, type) {
    var jasondata = localStorage.getItem(ID + "_weather_" + type);
    var parsed_json = eval('(' + jsondata + ')');
    var country = parsed_json['location']['country_name'];
    var location = parsed_json['location']['city'];
    return location + ", " + country;
}

function removeOldweather() {
  //  $('#logmsg').html("");
    var remw = 0;
    var wdata = localStorage.getItem("weatherdata");
   // $('#logmsg').append("<br/>wdata" + wdata);
    if (wdata == null) {
     //   $('#logmsg').append("<br/>wdata_ct " + localStorage.getItem("weatherdata_ct"));
        localStorage.removeItem('weatherdata_ct');
    } else {
        var wdatap = eval('(' + wdata + ')');
        var epoch = 0;
        var datestr;
        var timenow = Math.round(new Date().getTime() / 1000);
        var diff = 0;
        var weather_deets = {
            wdata: []
        };
        var timery = setInterval(function () { rewrite() }, 5000);

        $.each(wdatap.wdata, function (i, wd) {
            diff = timenow - wd.timestamp;
       //     $('#logmsg').append("<br/>diff=" + diff + " " + wd.ID);
            if (diff > 86400) { //86400
                var str = wd.ID + "_weather_act";

                localStorage.removeItem(str);
       //         $('#logmsg').append("<br/>rem: " + diff + " " + str);
                remw++;

            } else {

                weather_deets.wdata.push({
                    "ID": wd.ID,
                    "lat": wd.lat,
                    "lng": wd.lng,
                    "timestamp": wd.timestamp,
                    "datestr": moment().format("MMM Do YYYY, h:mm:ss a")

                });


            }


        });
        var remMapw = false;
        function rewrite() {
            clearInterval(timery);
            var jsondeets = JSON.stringify(weather_deets);

            if (jsondeets.length > 50) {
                localStorage.setItem('weatherdata', jsondeets);
      //          $('#logmsg').append("<br/>wdeets" + jsondeets);
                countWdata();
            } else {
                remMapw = true;
                localStorage.removeItem('weatherdata');
                localStorage.removeItem('weatherdata_ct');
            }
        }

    }

    var str = "weather_map";
    var timenow = Math.round(new Date().getTime() / 1000);
    for (var i = 0; i < localStorage.length; i++) {

        if (localStorage.key(i).indexOf(str) > -1) {
            var jsondata = localStorage.getItem(localStorage.key(i));
            var parsed_json = eval('(' + jsondata + ')');
            var wepoch = parsed_json.hourly_forecast[0].FCTTIME.epoch;
            if ((timenow - wepoch) > 86400) {  //86400

                remw++;

                var country = parsed_json['location']['country_name'];
                var location = parsed_json['location']['city'];
                var loc = location + ", " + country;
                localStorage.removeItem(localStorage.key(i));
            //    $('#logmsg').append("<br/>rem w: " + localStorage.key(i));
            }
        }

    }
    var now = moment().format('LTS');
    if (remw == 0) {
        $('#logmsg').html(now + ":  No expired weather data found.</br>")
    } else {
        $('#logmsg').html(now + ":  Removed expired weather data for " + remw + " Segments.</br>")
    }
    calcStorage();
}


function calcFrStorage() {
    var total = 0;
    var fdata = localStorage.getItem("frdata");
    if (fdata == null) {
        return total;
    } else {
        var amount0 = (fdata.length * 2) / 1024;
        total += amount0;
        var fdatap = eval('(' + fdata + ')');

        $.each(fdatap.people, function (i, p) {
            var komdata = localStorage.getItem("komdata_" + p.ID);
            if (komdata != null) {
                var komdatap = eval('(' + komdata + ')');
                $.each(komdatap.segs, function (i, fr) {
                    var segID = fr.ID;
                    var chart = localStorage.getItem(segID + "_chart");
                    var poly = localStorage.getItem(segID + "_poly");
                    var array = localStorage.getItem(segID + "_array");
                    if (chart != null) {
                        var amount1 = (chart.length * 2) / 1024;
                        total += amount1;
                        var amount2 = (poly.length * 2) / 1024;
                        total += amount2;
                        var amount3 = (array.length * 2) / 1024;
                        total += amount3;
                    }

                });
            }
        });
        return total;
    }
}



function calcStarStorage() {
    var total = 0;
    var sdata = localStorage.getItem("starsdata");
    if (sdata == null) {
        return total;
    } else {
        var sdatap = eval('(' + sdata + ')');
        $.each(sdatap.segs, function (i, s) {
            var segID = s.ID;
            var chart = localStorage.getItem(segID + "_chart");
            var poly = localStorage.getItem(segID + "_poly");
            var array = localStorage.getItem(segID + "_array");
            var amount1 = (chart.length * 2) / 1024;
            total += amount1;
            var amount2 = (poly.length * 2) / 1024;
            total += amount2;
            var amount3 = (array.length * 2) / 1024;
            total += amount3;

        });
        return total;
    }
}


function checkExp() {
    var sub = localStorage.getItem("sub");

    if (sub == null) { //not auth


    } else {
        var ExpDate = parseInt(1209600) + parseInt(sub)
        var today2 = Math.floor(moment() / 1000);
        var diff = parseInt(ExpDate - today2);
        var edays = Math.floor(diff / 86400);
        var estr;
        if (edays == 0) {
            estr = "tomorrow.";
        } else {
            estr = "in " + edays + " days."
        }
        var cstr = "<div id=\"credits_no\" style=\"display:inline-block\"></div>";

        if (diff > 0) {
            //not expired

            $('#pmsg').html("Trial period expires " + estr + " <br/>You have " + cstr + " Historical data queries left.<br/>Purchase a Monthly Subscription to get unlimited Historical data queries.");
            $('#credits_no').html(credits);
            $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");

        } else {
            //expired
            listSub();
            $('#pills_row').hide();
            $('#seg_nearby').hide();
            $('#seg_efforts').hide();
            $('#seg_weather').hide();
            $('#seg_leaderboard').hide();
            $('#deets_tile').hide();
            $('#locIcon').hide();
            $('#my_friends').hide();
            $('#friend_info').hide();
            $('#my_activities').hide();
            $('#menu_buttons').hide();
            $('#profile_settings').hide();
            $('#profile_tile').show();
            $('#pmsg').html("Thank you for using KOM With The Wind. Trial period expired.");


        }

    }
}

function calcStorage() {

    var LB_hist = 0;
    var star_fav = 0;
    var favc = 0;
    var star = 0;
    var unused = 0;
    var lweather = 0;
    var friend = 0;
    var total = 0;
    var total_all = 0;
    var str = "_chart";
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(str) > -1) {
            var IDstr = localStorage.key(i).split("_");
            var ID = IDstr[0];
            var isStarred = checkSegisStarred(ID);
            var isMap = checkSegisMap(ID);
            var key1 = ID + "_chart";
            var key2 = ID + "_array";
            var key3 = ID + "_weather_map";
            var wdata1 = localStorage.getItem(ID + "_weather_act");
            var wdata2 = localStorage.getItem(ID + "_weather_map");

            var fav = localStorage.getItem(ID + "_fav");
            if ((wdata1 == null) && (fav == null) && (isStarred == false) && (isMap == false)) {
                var amount1 = (localStorage.getItem(key1).length * 2) / 1024;
                unused += amount1;
                var amount2 = (localStorage.getItem(key2).length * 2) / 1024;
                unused += amount2;

            }
            if (wdata1 != null) {

                var amount1 = ((wdata1).length * 2) / 1024;
                lweather += amount1

            }

            if (wdata2 != null) {

                var amount2 = ((wdata2).length * 2) / 1024;
                lweather += amount2

            }
        }

    }

    var stardata = localStorage.getItem("starsdata");
    if (stardata != null) {
        star = (stardata.length * 2) / 1024;
    }
    var str = "_fav";
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(str) > -1) {
            var amount1 = (localStorage.key(i).length * 2) / 1024;
            favc += amount1
        }
    }

    var str = "_hist";
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(str) > -1) {
            var amount1 = (localStorage.key(i).length * 2) / 1024;
            LB_hist += amount1
        }
    }

    star_fav = calcStarStorage() + star + favc;


    friend = calcFrStorage();
    total = star_fav + LB_hist + friend + lweather;
    for (var x in localStorage) {
        var amount = (localStorage[x].length * 2) / 1024 / 1024;
        total_all += amount;

    }
    var other = total_all - (total / 1024);
    var top = "<div id=\"ttop\"><table class=\"table table-striped\">"

    var w = window.innerWidth;
    var nameW = w - 80;
    var midhtml = "";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Starred and Favorite Segments</div>" +
                   "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + star_fav.toFixed(2) + " Kb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Current weather</div>" +
                   "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + lweather.toFixed(2) + " Kb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Friend data</div>" +
                  "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + friend.toFixed(2) + " Kb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Historical wind data</div>" +
                "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + LB_hist.toFixed(2) + " Kb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Other essential data</div>" +
                "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + other.toFixed(2) + " Kb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">Total</div>" +
               "<div class=\"msg_sml\" style=\"display:inline-block;padding-left:3px\">" + total_all.toFixed(2) + " Mb</div></td></tr>";
    midhtml = midhtml + "<tr class=\"un_sel\" style=\"height:1px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\"></div>" +
              "</td></tr>";

    $('#stmsg').html(top + midhtml + "</table></div>");

    if (total_all.toFixed(2) > 4.5) {
        var spare = 5 - total_all;
        $('#Storagereport').show();
        $('#stgmsg').html("You have " + spare.toFixed(2) + "Mb remaining. You may need to wait up to 24 hours for some weather data to clear.");
    } else {
        $('#Storagereport').hide();
    }
  //  checkExp();
}

function delOldst(type) {

    if (type == "unused") {

        var str = "_chart";
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf(str) > -1) {
                var IDstr = localStorage.key(i).split("_");
                var ID = IDstr[0];
                var isStarred = checkSegisStarred(ID);
                var isMap = checkSegisMap(ID);
                var isFr = checkSegisFr(ID);
                var key1 = ID + "_chart";
                var key2 = ID + "_array";
                var wdata1 = localStorage.getItem(ID + "_weather_act");
                var wdata2 = localStorage.getItem(ID + "_weather_map");
                var fav = localStorage.getItem(ID + "_fav");
                if ((wdata1 == null) && (wdata2 == null) && (fav == null) && (isStarred == false) && (isMap == false) && (isFr == false)) {
                    localStorage.removeItem(key1);
                    localStorage.removeItem(key2);
                } else {

                }
            }
        }

    } else if (type = "weather") { // non-fav or star weather
        var str = "_weather_";
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf(str) > -1) {
                var IDstr = localStorage.key(i).split("_");
                var ID = IDstr[0];
                var isStarred = checkSegisStarred(ID);
                var isMap = checkSegisMap(ID);
                var wdata1 = localStorage.getItem(ID + "_weather_act");
                var wdata2 = localStorage.getItem(ID + "_weather_map");
                var fav = localStorage.getItem(ID + "_fav");
                if ((wdata1 == null) && (wdata2 == null) && (fav == null) && (isStarred == false) && (isMap == false)) {

                    localStorage.removeItem(ID + "_weather_map");
                } else {

                }
            }
        }

    } else { //all
        for (var i = 0; i < localStorage.length; i++) {
            if ((localStorage.key(i) != 'userdata') && (localStorage.key(i) != 'fulluserdata') && (localStorage.key(i) != 'sub') && (localStorage.key(i) != 'starsdata') && (localStorage.key(i) != 'credits') && (localStorage.key(i) != 'oauthio_cache') && (localStorage.key(i) != 'oauthio_provider_strava') && (localStorage.key(i) != 'starsdata')) { //and more todo
                localStorage.removeItem(localStorage.key(i));
            }
        }

    }



}

function getFriends() {

    showKOMsTile();
    var frdata = localStorage.getItem('frdata');
    if (frdata != null) {
        drawFriends();

    } else {

        stFriends();
    }
}



function appPurchChk() {
    listSub();
    //var purch = "0";
	getKWS();
    var timer1 = setInterval(function () { startPchk1() }, 2000);
    function startPchk1() {
        clearInterval(timer1);

        restorePurchases();

        var timer2 = setInterval(function () { startPchk2() }, 2000);
        function startPchk2() {
            clearInterval(timer2);
            var purch = localStorage.getItem("OneYrSub");

                checkData(purch);

        }

    }
}


function checkData(purch) {
	var kws = localStorage.getItem("KWS");

        var udata = localStorage.getItem("userdata");
        if (udata == null) {
				$('#splashDiv').fadeOut();
				$('#UnAuthApp').show();
				$('#onlineStatus').hide();
				$('#pic_header').hide();
				$('#logo_header').hide();
				$('#menu_buttons').hide();
            	$('#deets_tile').hide();
        } else  { //have udata

            var wdata = localStorage.getItem("weatherdata");
			var acts = localStorage.getItem("starsdata");

            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
            var firstname = user.deets[0]['firstname'];
            var lastname = user.deets[0]['lastname'];
            var StravaID = user.deets[0]['stravaID'];
          //  $('#logmsg').append("<br/>Strava ID " + stravaID);
            var name = user.deets[0]['firstname'] + " " + user.deets[0]['lastname']
            var loc = user.deets[0].city + ", " + user.deets[0].country; //data.city + ", " + data.country;
            var pic
            var pic_header
            if (user.deets[0]['profile'] == "avatar/athlete/large.png") {
                pic = "<img style=\"width:80px;height:auto\" src=\"img/blank_avatar.jpg\">";
                pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"img/blank_avatar.jpg\">";
            } else {
                pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
                pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"" + user.deets[0]['profile'] + "\">";
            }
            $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
            $('#pic_header').show();
            $('#userimg').html(pic);
            $('#pic_header').html(pic_header);
           // $('#pBtns').hide();
			$('#purch_tile').height(180);
			$('#menu_buttons').show();
			$('#status_msgs').hide();
			$('#status_area').hide();
			$('#rem_info').show();
			$('#info').hide();
			$('#table_calc_area2').hide();
			$('#splashDiv').fadeOut();
		    updateUser(firstname, lastname, StravaID, "113", "113");

            if (kws == "1") {   //have udata, no check on purch?
				alert("fire msg");
				  $('#splashDiv').fadeOut();
				    reportOnlineStatus();
				    removeOldweather();
				    hideAll();
				    $('#menu_buttons').hide();
				    $('#info').hide();
				    $('#locIcon').hide();
				    $('#pmsg').show();
					$('#pBtns').hide();
				     //sub
				    $('#creditsBtn').hide();
       			 	$('#status_msgs').show();
					if (purch == "1") {
						getMsg(firstname,lastname,StravaID,purch);
					} else { //no sub
						getMsg2();
			//checkServerStatus(stravaID,sub);
					}
			} else { //kws == 0
					if (purch == "1")  {
					alert("pp"+purch);
					 $('#creditsBtn').hide();
					var sub = localStorage.getItem("sub");
				localStorage.setItem("credits", "3000000");
					if (acts.length > 40) {
						getAct("stars");
					} else {
						noActsmsg("stars");
					}
				} else {  //purch = 0
					alert("no purch");
					var sub = localStorage.getItem("sub");
					 var credits = localStorage.getItem("credits");
					 var pass = false;
					 if (sub == null) { //not auth
						 pass = true;

					 } else { //has logged in before
						 var ExpDate = parseInt(1209600) + parseInt(sub) //Math.floor(moment(sub).add(7, 'days') / 1000);
						 var today2 = Math.floor(moment() / 1000);
						 var diff = parseInt(ExpDate - today2);
						 var edays = Math.floor(diff / 86400);
						 var estr;
						 if (edays == 0) {
							 estr = "tomorrow.";
						 } else {
							 estr = "in " + edays + " days."
						 }
						 var cstr = "<div id=\"credits_no\" style=\"display:inline-block\"></div>";

						 if (diff > 0) {
							 //not expired
							 $('#pBtns').show();
							 $('#status_msgs').append("Trial period expires on " + ExpDate);
							 $('#pmsg').html("Trial period expires " + estr + " .<br/>You have " + cstr + " Historical data queries left.<br/>Purchase a Monthly Subscription to get unlimited Historical data queries.");
							 $('#credits_no').html(credits);
							 $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");
							 pass = true;
						 } else {
							 //expired
							 $('#status_msgs').append("Trial expired");
							 updateUser(firstname, lastname, StravaID, "-1",sub);
							listSub();
							hideAll();
						 //
						 $('#menu_buttons').hide();
							 $('#pBtns').show();
							 $('#purch_tile').height(260);
							 $('#pmsg').html("Thank you for using KOM With The Wind. Trial period expired.");
							 pass = false;

							 //add expired call

						 }
					 }

					 if (pass == true) {

						 var data = localStorage.getItem("userdata");
						 var wdata = localStorage.getItem("weatherdata");
						 var acts = localStorage.getItem("starsdata");
						 var userdata = localStorage.getItem('userdata');
						 var user = eval('(' + userdata + ')');
						 var firstname = user.deets[0]['firstname'];
						 var lastname = user.deets[0]['lastname'];
						 var stravaID = user.deets[0]['stravaID'];

						 var name = user.deets[0]['firstname'] + " " + user.deets[0]['lastname']
						 var loc = user.deets[0].city + ", " + user.deets[0].country; //data.city + ", " + data.country;
						 updateUser(firstname, lastname, stravaID, "1",sub);
						 var pic
						 var pic_header

						 if (user.deets[0]['profile'] == "avatar/athlete/large.png") {
							 pic = "<img style=\"width:80px;height:auto\" src=\"img/blank_avatar.jpg\">";
							 pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"img/blank_avatar.jpg\">";
						 } else {
							 pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
							 pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"" + user.deets[0]['profile'] + "\">";
						 }

						 $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
						 $('#pic_header').show();
						 $('#userimg').html(pic);
						 $('#pic_header').html(pic_header);
						 $('#menu_buttons').show();
						 $('#status_msgs').hide();
						 $('#status_area').hide();
						 $('#rem_info').show();
						 $('#info').hide();
						 $('#table_calc_area2').hide();
						 $('#act_table_header').show();
						 $('#act_table').show();
						 $('#my_activities').show();
						 $('#splashDiv').fadeOut();
						 if (acts.length > 40) {
							 getAct("stars");
					   //      $('#pmsg').append("<br/>" + sub);

						 } else {
							 noActsmsg("stars");
						 }
						 checkServerStatus(stravaID,sub);
					 }

			}
			}

		}




}


function getPolyx( param1, callbackFunction ) {
var json = localStorage.getItem('all_seg_efforts');
  var jact = eval('(' + json + ')');

    $.each(jact.segs, function (i, seg) {

   $('#location').append(seg.name + "</br>");

    });
     return "hi"

}

function dispStarsChk(type) {

    hrs = 24;
    displayStars(type); //v0.1
    var fh = hrs - 2;
    var lh = hrs;
    fh = fh.toString();
    lh = lh.toString();

    if (hrs == 24) {
        var hrstxt = "Best (24 hrs)";
    } else {
        var hrstxt = fh + " - " + lh + " Hrs";
    }

}


function getAct(type) {
    $('#map_table').html("");
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#seg_efforts').hide();
    var favsct = countFavs();
    if (type == "act") {
        var segdata = localStorage.getItem("segdata")
    } else if (type == "kom") {
        var segdata = localStorage.getItem("komdata")
    } else if (type == "stars") {
        var segdata = localStorage.getItem("starsdata")
        $('#act_tile_title').html("<dtitle>Segments Starred in Strava</dtitle>");
        favsct = 1;
    } else if (type == "favs") {
        var segdata = "1234567890123456789012345678901234567890"
        $('#act_tile_title').html("<dtitle>KOM With The Wind Favorites</dtitle>");
        $('#stinfo').html("");
        $('#winfo').html("");
    }

    if ((segdata.length < 30) || (favsct == 0)) {
        showActsTile();

        noActsmsg(type);

    } else {
        showActsTile();

        drawTable(type);
        var timer = setInterval(function () { startDecode() }, 500);
        function startDecode() {
            clearInterval(timer);
            dispStarsChk(type);

        }
    }
}

function hideAll() {
    $('#act_table_header').hide();
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#seg_nearby').hide();
    $('#locIcon').hide();
    $('#deets_tile').hide();
    $('#seg_leaderboard').hide();
    $('#pills_row').hide();
    $('#my_friends').hide();
    $('#friend_info').hide();
    $('#seg_weather').hide();
    $('#profile_tile').show();
    $('#profile_settings').hide();
    $('#storage_tile').hide();
}

function showActsTile() {
    calcStorage();  //do check data in case of expirary
    $('#seg_nearby').hide();
    $('#locIcon').hide();
    $('#deets_tile').hide();
    $('#seg_leaderboard').hide();
    $('#pills_row').hide();
    $('#my_friends').hide();
    $('#friend_info').hide();
    $('#seg_weather').hide();
    $('#profile_tile').hide();
}

function showMapTile() {
    calcStorage();
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
    $('#profile_tile').hide();
    $('#deets_tile').hide();
    $('#seg_leaderboard').hide();
    $('#pills_row').hide();
    $('#act_table_header').hide();
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#locIcon').show();
    $('#seg_nearby').show();
    $('#seg_weather').hide();
    $('#comty_tile').hide();
    $('#my_friends').hide();
    $('#friend_info').hide();
}

function showKOMsTile() {
    calcStorage();
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
    $('#profile_tile').hide();
    $('#act_table_header').hide();
    $('#my_activities').hide();
    $('#seg_nearby').hide();
    $('#deets_tile').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    $('#seg_leaderboard').hide();
    $('#pills_row').hide();
    $('#my_friends').show();
}

function showSettingsTile() {
    listSub();
    calcStorage();
//    showLocal();
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
    $('#profile_settings').show();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_efforts').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#storage_tile').show();
    $('#locIcon').hide();
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
    $('#locIcon').hide();
    $('#menubtns').hide();
    $('#comty_tile').show();
    $('#my_friends').hide();
    $('#friend_info').hide();
    getWindiest(0);
}

function getNearby(ID,lat,lng) {
    $("#winfomap").html("");
    if (ID == null) {
        showMapTile();
        if (devOnline == true) {
            showmap();
        } else {
            $("#winfomap").html("Device is offline");
        }

    } else {

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
    var top = "<table class=\"table table-striped\">";
    if (type == "stars") {
        var midhtml = "<tr style=\"height:50px\"><td>You have no Starred Segments, please star Segments in Strava then refresh</td></tr>";
        var refBtn = "<div style=\"text-align:center\"><button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"stConn2()\">Refresh data from Strava</button></div>";
        $('#act_table2').html(top + midhtml + "</table>" + refBtn);
    } else {
        var midhtml = "<tr style=\"height:50px\"><td>You have no Favorite Segments<br/>To Favorite a Segment, click the <i class=\"fa fa-heart-o\"></li></td></tr>";
        $('#act_table2').html(top + midhtml + "</table>");
    }
    $('#tableback').height(160);
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
    $('#locIcon').hide();
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
        profile = "img/blank_avatar.jpg";
    }
    var myKOMS = localStorage.getItem('komdata_' + stravaID);
    var midhtml = "";
  //  $('#logmsg').append("<br/>myKOMS: " + myKOMS);
    if (myKOMS != null) {
        var myKOMSj = eval('(' + myKOMS + ')');
        var koms_ct = count = myKOMSj.count[0].num; //"3"; //strava_segs.count();
        midhtml = midhtml + "<tr id=\"trow_" + stravaID + "\" onclick=\"showFriend(" + stravaID + ",'" + firstname + " " + lastname + "',-2)\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">" + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
      " KOMs</div></td></tr>";


    } else {
        var koms_ct = 0;
        midhtml = midhtml + "<tr id=\"trow_" + stravaID + "\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">" + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
          " KOMs</div></td></tr>";
    }
    var json = localStorage.getItem('frdata');
    var j2 = eval('(' + json + ')');

  //  $('#logmsg').append("<br/>fr: " + json);
    var fr_ct = 1;

    var n;
    var name;
    var top = "<table class=\"table table-striped\">"
    $.each(j2.people, function (i, peeps) {
        var koms_ct = countKOMs(peeps.ID);
 //      $('#logmsg').append("<br/>KOMS ct p: " + peeps.ID + " " + koms_ct);
        if (koms_ct > 0) {
            midhtml = midhtml + "<tr id=\"trow_" + peeps.ID + "\" onclick=\"showFriend(" + peeps.ID + ",'" + peeps.firstname + " " + peeps.lastname + "'," + i + ")\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + peeps.profile + "\"></div></td><td><div class=\"h3\">" + peeps.firstname + " " + peeps.lastname + "</div><div class=\"msg_sml\">" + koms_ct +
            " KOMs</div></td></tr>";
        } else {
            midhtml = midhtml + "<tr id=\"trow_" + peeps.ID + "\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + peeps.profile + "\"></div></td><td><div class=\"h3\">" + peeps.firstname + " " + peeps.lastname + "</div><div class=\"msg_sml\">" + koms_ct +
          " KOMs</div></td></tr>";
        }
        fr_ct++;
    });


    var ht = parseInt((fr_ct) * 50) + 12; //56
    $('#frback').height(ht);

    if (fr_ct == 1) {
        ht = ht + 45;
        $('#frback').height(ht);
        midhtml = midhtml + "<p>Add friends in Strava, then refresh Friend data in Settings";
    }
    $('#friend_list').html(top + midhtml + "</table>");

}

function countKOMs(ID) {
    var str = "komdata_" + ID;
    var kdata = localStorage.getItem(str);
    if (kdata == null) {
        return 0;
    } else {
        var kdata_json = eval('(' + kdata + ')');
        var ct = 0;
        $.each(kdata_json.segs, function (i, wd) {
            ct++;
        });

        return ct;
    }
}


function drawTable(type) {

    $('#act_table2').html("");
    $('#act_table_header').show();
    $('#act_table2').show();
    $('#my_activities').show();
    $('#deets_tile').hide();
    $('#menubtns').show();
    $('#Hrsdd').show();
    $('#refreshBtn').show();
    var fav = false;
    var purch = localStorage.getItem("OneYrSub");
    var st_ct = localStorage.getItem("starsct");

    if (type == "favs") {
        fav = true;
        $('#stinfo').html("");
    } else if (type == "kom") {
        var json = localStorage.getItem('komdata');
    } else if (type == "stars") {
        if (purch == "0") {
            $('#stinfo').html(st_ct + " Starred Segments Retrieved.<br/>Purchase a Monthly Subscription to retrieve all your Starred Segments.");
            $('#stinfo').fadeIn();
        } else {

            $('#stinfo').html(st_ct + " Starred Segments Retrieved.");
            $('#stinfo').fadeIn();
        }

        var json = localStorage.getItem('starsdata');
        var segct = 1;
    } else {
        var json = localStorage.getItem('segdata');
        var segct = countSegs();
    }
    var midhtml = "";
    var act_ct = 0;

    var LB = false;
    var firstID;
    var n;
    var name;
    var top = "<div id=\"ttop\"><table class=\"table table-striped\">"
    var pageht = 50;
    var w = window.innerWidth;
    var nameW = w - 80;
    if (fav == false) {
        var j2 = eval('(' + json + ')');
        $.each(j2.segs, function (i, seg) {
            var seg_ct = 0;
            LB = true
            midhtml = midhtml + "<tr id=\"trow_" + seg.ID + "\" class=\"un_sel\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "')\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">" + seg.name + "</div>" +
                   "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + seg.ID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + seg.ID + "\"></div></td></tr>";

            act_ct++;

        });

        var act_ct_n = parseInt(act_ct);
        var page = Math.floor(act_ct_n / 30);
        var page_next = page + 1;

        var pchk = ((parseInt(page) * 30) - parseInt(st_ct));

        if (act_ct > 0 && pchk == 0 && purch == "1") {
            pageht = pageht + 25;
            midhtml = midhtml + "<tr class=\"un_sel\" onclick=\"stStars_paging('" + page_next + "','" + act_ct + "')\" style=\"height:50px;color:#ffca4a;font-size:14px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:200px\">Retrieve More Segments</div></td></tr>";
            }

    } else {
        for (var i = 0; i < localStorage.length; i++) {

            if (localStorage.key(i).indexOf("_fav") > -1) {
                var ID = localStorage.key(i).replace("_fav", "");

                var json = localStorage.getItem(localStorage.key(i));
                var j2 = eval('(' + json + ')');
                var name = j2.segs[0].name;
                var ftype = j2.segs[0].type;

                act_ct++;

                midhtml = midhtml + "<tr id=\"trow_" + ID + "\" class=\"un_sel\" onclick=\"polyF(" + ID + ",'" + ftype + "')\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">" + name + "</div>" +
                    "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + ID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + ID + "\"></div></td></tr>";

            }
        }


    }

    var ht = parseInt(((act_ct) * 50) + pageht + 50); //56

    $('#tableback').height(ht);
    $('#act_table2').html(top + midhtml + "</table></div>");



}

var getSegtimer;



function StartgetSegs() {

    getSegtimer = setTimeout(getSegs, 5000);

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

function convertTime(seconds) {
    var duration = moment().startOf('day').add("s", seconds),
       format = "";

    if (duration.hour() > 0) { format += "H"; }

    if (duration.minute() > 0) { format += "m"; }

    format += " s [s";

    return duration.format("HH:mm:ss");

}

function formatTime(time) {
    var timestr = moment(time).format("MMM Do YYYY, h:mm:ss a");
    return timestr;
}

function clearCanvas(datatype) {
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
    $('#komdata').show();
    $('html, body').animate({
        scrollTop: $("#leaderback").offset().top
    }, 2000);
   var lbhistchk0 = localStorage.getItem(ID + '_0_hist');
    var lbhistchk1 = localStorage.getItem(ID + '_1_hist');

    if ((lbhistchk0 != null) && (lbhistchk1 == null)) {
        //have historical data, just show
        $('#g1').show();
        $('#lbBtn').hide();

        g1.refresh(0);
        var btnhtml = "";
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
        $('#lbBtn').hide();
        g1.refresh(0);
        var btnhtml = "";
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
    if ((lbhistchk1 == null) && (lbhistchk0 != null)) {
        var credits = localStorage.getItem("credits");
        if (credits >= 3) {
            var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',true,'all')\">" +
                          "Show all historical wind data</i></a></div>";
            $('#lbBtn').show();
            $('#lbBtn').html(btnhtml);

        } else {
            $('#lbBtn').show();
            $('#lbBtn').html("<div class=\"msg_sml\">You do not have enough credits to<br/>retrieve all historical data</div>");

        }

        $('#g1').hide();
    }


    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var dist = j2.dist[0].dist;
    var refstr = "Data as of " + timestr;
    var refreshbtnlb = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"refreshData(" + ID + ",'" + type + "','lb','" + dist + "')\">Refresh</button>";
    $('#refreshBtnLB').html(refreshbtnlb);

    var kompic = j2.segs[0].profile;
    if (kompic == "avatar/athlete/large.png") {
        kompic = "/Content/blank_avatar.jpg";
    } else {
        kompic = j2.segs[0].profile;
    }
    var komname = j2.segs[0].name;
    var komtime = j2.segs[0].mov_time;
    var komimg = "<img style=\"width:35px;height:35px\" src=\"" + kompic + "\">";
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
        var dist = j2.dist[0].dist / 1000;
        var date = seg.time;
        var timef = formatTime(date);
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        var time_mins = seg.mov_time / 60;
        var time_hrs = time_mins / 60;
        var mov_spd = (dist / time_hrs).toFixed(2);
        ctx2d.font = '12px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 5, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(seg.name, 5, posyt + 16);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(mov_time, 5, posyt + 32);
        ctx2d.fillStyle = '#f93';
        ctx2d.fillText(mov_spd, 70, posyt + 32);
        ctx2d.fillText("kph", 106, posyt + 32);


        var wspd = 0;
        if (hist == true && lbhistchk1 != null) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
            var brg = brg2;
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(225, posy + 22, wspd2 + 25, 22);
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '14px Arial';

            ctx2d.fillText(Math.round(wspd2), 227, posyt + 26);
            if (Math.round(wspd2) < 10) {
                ctx2d.fillText("kph", 236, posyt + 26);
            } else {
                ctx2d.fillText("kph", 244, posyt + 26);
            }

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(205, posy + 32);
            ctx2d.rotate(90 * Math.PI / 180);


            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";

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

            var windspeed = wspd2;

            arval1f = cleanPval(arval1f);
            arval2f = cleanPval(arval2f);
            arval3f = cleanPval(arval3f);
            arval1h = cleanPval(arval1h);
            arval2h = cleanPval(arval2h);
            arval3h = cleanPval(arval3h);

            var brgf0 = arval1f * windspeed;

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
                var hdata = localStorage.getItem(ID + '_' + i + '_hist');
                var j3 = eval('(' + hdata + ')');
                var brg2 = j3.hdata[0].wbrg;
                var wspd2 = j3.hdata[0].wspeed;
                var brg = brg2;

                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillRect(225, posy + 22, wspd2 + 25, 22);
                ctx2d.fillStyle = "#fff";
                ctx2d.font = '14px Arial';

                ctx2d.fillText(Math.round(wspd2), 227, posyt + 26);
                if (Math.round(wspd2) < 10) {
                    ctx2d.fillText("kph", 236, posyt + 26);
                } else {
                    ctx2d.fillText("kph", 244, posyt + 26);
                }

                ctx2d.save();
                ctx2d.strokeStyle = "#2fb4c8";
                ctx2d.translate(205, posy + 32);

                ctx2d.rotate(90 * Math.PI / 180);


                ctx2d.rotate(brg2 * Math.PI / 180);

                ctx2d.lineWidth = 1;
                ctx2d.fillStyle = "#2fb4c8";

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

                var windspeed = wspd2;

                arval1f = cleanPval(arval1f);
                arval2f = cleanPval(arval2f);
                arval3f = cleanPval(arval3f);
                arval1h = cleanPval(arval1h);
                arval2h = cleanPval(arval2h);
                arval3h = cleanPval(arval3h);

                var brgf0 = arval1f * windspeed;

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
        var ht = parseInt((ct * 100) + 60);
    }
    $('#leaderback').height(ht);

    timerG = setTimeout(function () { drawG() }, 1000);

    function drawG() {
        clearTimeout(timerG);
        if (komf > -1) {
            $('#g1').show();
            g1.refresh(komf);
        } else {
            $('#lbBtn').html("<div class=\"msg_sml\">Historical data unavailable<br/>please Refresh to try again</div>");
            var credits = localStorage.getItem("credits");
            if (credits >= 1) {
            } else {

                $('#lbBtn').html("<div class=\"msg_sml\">You do not have enough credits to<br/>retrieve the KOM historical data</div>");
            }
            $('#lbBtn').show();

        }
    }

}

function drawSegEffort(ID, frID) {
    $('#seg_leaderboard').hide();
    $('#lb_table').hide();
    $('#eff_table').show();
    $('#seg_weather').hide();
    $('#seg_efforts').show();
    var type = 'segs';
    if (frID != null) {
        var lbhistchk0 = localStorage.getItem(ID + '_' + frID + '_0_hist_user');
        var lbhistchk1 = localStorage.getItem(ID + '_' + frID + '_1_hist_user');
        type = "kom";
    } else {
        var lbhistchk0 = localStorage.getItem(ID + '_0_hist_user');
        var lbhistchk1 = localStorage.getItem(ID + '_1_hist_user');
    }

    if (lbhistchk1 != null) {
        //have historical data, just show

        $('#sgBtn').html("");
        var btnhtml2 = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"stEffort(" + ID + ")\">Refresh</button>";
        $('#refreshBtneffs').html(btnhtml2)

        var bearing_store = ID + "_array";
        var j3 = eval('(' + lbhistchk1 + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);

    } else if (lbhistchk0 != null) {
        //have historical data, just sho

        $('#sgBtn').html("");
        var btnhtml2 = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"stEffort(" + ID + ")\">Refresh</button>";
        $('#refreshBtneffs').html(btnhtml2)


        var bearing_store = ID + "_array";
        var j3 = eval('(' + lbhistchk0 + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);
    }


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

        ctx2d.font = '14px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 10, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';

        ctx2d.fillText(mov_time, 10, posyt + 25);


        ctx2d.font = '14px Arial';


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


            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";

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

            var windspeed = wspd2;

            arval1f = cleanPval(arval1f);
            arval2f = cleanPval(arval2f);
            arval3f = cleanPval(arval3f);
            arval1h = cleanPval(arval1h);
            arval2h = cleanPval(arval2h);
            arval3h = cleanPval(arval3h);

            var brgf0 = arval1f * windspeed;

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


        } else if (hist == true && lbhistchk1 == null) {
            if (i == 0) {
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


                ctx2d.rotate(brg2 * Math.PI / 180);

                ctx2d.lineWidth = 1;
                ctx2d.fillStyle = "#2fb4c8";

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

                var windspeed = wspd2;

                arval1f = cleanPval(arval1f);
                arval2f = cleanPval(arval2f);
                arval3f = cleanPval(arval3f);
                arval1h = cleanPval(arval1h);
                arval2h = cleanPval(arval2h);
                arval3h = cleanPval(arval3h);

                var brgf0 = arval1f * windspeed;

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
            }
        }

        posy = posy + 60
        posyt = posyt + 60
        i++;
    })
    var credits = localStorage.getItem("credits");

    var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',true,'all')\">" +
                  "Show all historical wind data</i></a></div>";
    $('#lbBtn').show();
    $('#lbBtn').html(btnhtml);


    if (ct > 1) {
        if ((lbhistchk0 != null && lbhistchk1 == null) || (lbhistchk0 == null && lbhistchk1 == null)) {
            if (credits >= 3) {
                var btnhtml = "<div style=\"padding-left:5px\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',false,'all'," + frID + ")\">" +
                               "Show all historical wind conditions</i></a></div>";
                $('#effortPadding').show();

                $('#sgBtn').show();
                $('#sgBtn').html(btnhtml);
            } else {
                $('#sgBtn').show();
                $('#sgBtn').html("<div style=\"padding-left:5px\" class=\"msg_sml\">You do not have enough credits to<br/>retrieve all historical data</div>");

            }
        }
    }

    var ht = parseInt((ct * 48) + 120);
    $('#effortback').height(ht);


}
var hc = -1;;

function countHistW(count, SegID, frID, lb) {

    var j = -1;
    for (var i = 0; i < localStorage.length; i++) {

        if ((localStorage.key(i).indexOf(SegID) > -1))
            if (lb == true) {

                if (localStorage.key(i).indexOf("_hist") > -1) {

                    if ((localStorage.key(i).split("_").length - 1) == 2) {

                        j++
                    }
                }
            } else if (frID == null) {

                if (localStorage.key(i).indexOf("_hist_") > -1) {

                    if ((localStorage.key(i).split("_").length - 1) == 3) {

                        j++
                    }
                }

            } else {

                if (localStorage.key(i).indexOf("_hist_") > -1) {

                    if ((localStorage.key(i).split("_").length - 1) == 4) {

                        j++
                    }
                }
            }



    }

    if (j == count) {
        return 1;
    } else {
        return 0;
    }

}

function showHistweather(SegID, type, lb, num, frID) {

    $('#sgBtn').hide();

    $('#lbBtn').hide();
    var lbhistchk1 = "";
    var count = null;

    if (lb == true) {
        var json = localStorage.getItem('lb_data_' + SegID);
        var j2 = eval('(' + json + ')');
        count = (j2.count[0].num - 1);
        countHistW(count, SegID, frID, lb);

        lbhistchk1 = localStorage.getItem(SegID + '_1_hist');
    } else {
        if (frID != null) {
            var json = localStorage.getItem('eff_data_' + SegID + "_" + frID);
            var j2 = eval('(' + json + ')');
            count = (j2.count[0].num - 1);
            lbhistchk1 = localStorage.getItem(SegID + "_" + frID + '_1_hist_user');
        } else {
            var json = localStorage.getItem('eff_data_' + SegID);
            var j2 = eval('(' + json + ')');
            count = (j2.count[0].num - 1);
            lbhistchk1 = localStorage.getItem(SegID + '_1_hist_user');
        }



    }



    if (lbhistchk1 != null) {

        if (lb == true) {
            drawLeaderboard(SegID, type);
        } else {
            drawSegEffort(SegID, frID, type);
        }

    } else {
        if (num == "all") {
            $('#lbdata').html("Retrieving historical data ...");
            $('#sgdata').html("Retrieving historical data ...");
            count = (j2.count[0].num - 1);

            $('#sgBtn').html("");
            var done = false;
            var latlng = getLatlng(SegID, type);

            var time = 0;
            var j = 1;

            $.each(j2.segs, function (i, seg) {

                if ((i == 0)) {

                } else {
                    var date = j2.segs[i].time;
                    setTimeout(function () {

                        CallHistWeather(latlng, date, SegID, i, type, lb, frID);
                        if (i == count) {
                            var timerAA = setTimeout(function () { showdata() }, 4000);
                            function showdata() {
                                clearTimeout(timerAA);
                                if (lb == true) {

                                    if (countHistW(count, SegID, frID, lb) == 1) {
                                        drawLeaderboard(SegID, type); //was hist yyy
                                        var credits = localStorage.getItem("credits");
                                        credits = credits - 3;
                                        var userdata = localStorage.getItem('userdata');
                                        var user = eval('(' + userdata + ')');
                                        var stravaID = user.deets[0]['stravaID'];
                                        saveCredit(stravaID, "3")
                                        localStorage.setItem("credits", credits);
                                        $('#credits_no').html(credits);
                                        $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");

                                    } else {
                                        $('#lbdata').html("Incomplete Historical data, please try again.");
                                        //  if (type == 'lb') { //user later yyy
                                        clearCanvas(type);

                                        while (j < 20) {

                                            // }
                                            localStorage.removeItem(SegID + "_" + j + "_hist");
                                            j++;
                                        }
                                        $('#lbBtn').show();
                                        //localStorage.removeItem(str);


                                        //  }

                                    }
                                } else {

                                    if (countHistW(count, SegID, frID, lb) == 1) {
                                        showEfforts(SegID, type, frID);
                                        var credits = localStorage.getItem("credits");
                                        credits = credits - 3;
                                        var userdata = localStorage.getItem('userdata');
                                        var user = eval('(' + userdata + ')');
                                        var stravaID = user.deets[0]['stravaID'];
                                        saveCredit(stravaID, "3");
                                        localStorage.setItem("credits", credits);
                                        $('#credits_no').html(credits);
                                        $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");

                                    } else {
                                        $('#lbdata').html("Incomplete Historical data, please try again.");
                                        if (frID == null) {
                                            while (j < 20) {

                                                // }
                                                localStorage.removeItem(SegID + "_" + j + "_hist_user");
                                                j++;
                                            }
                                        } else {
                                            while (j < 20) {

                                                localStorage.removeItem(SegID + "_" + frID + "_" + j + "_hist_user");
                                                j++;
                                            }
                                        }
                                        $('#lbBtn').show();
                                    }
                                }
                            }
                        }
                    }, time);
                    time += 2000;
                }
            });


        } else {
            var done = false;
            var latlng = getLatlng(SegID, type);
            var date = j2.segs[0].time;
            var credits = localStorage.getItem("credits");
            if (credits > 0) {
                $('#lbdata').html("Retrieving historical data ...");
                $('#sgdata').html("Retrieving historical data ...");
                CallHistWeather(latlng, date, SegID, 0, type, lb, frID);
            } else {
                var btnhtml = "<div class=\"msg_sml\">You do not have enough credits to<br/>retrieve the KOM historical data</div>";

                $('#lbBtn').html(btnhtml);
            }


            var timerAB = setTimeout(function () { showdata() }, 2000);
            function showdata() {
                clearTimeout(timerAB);
                $('#lbBtn').show();
                if (lb == true) {
                    drawLeaderboard(SegID, type);  //was segs yyy
                } else {
                    showEfforts(SegID, type, frID);
                }
            }
        }
    }
}

function CallHistWeather(latlng, date, SegID, i, type, lb, frID) {
    var hist_deets = {
        hdata: []
    };
    var j = i + 1;
    $.ajax({
        type: "GET",
        url: "https://api.forecast.io/forecast/1373a09f8179192ac902765c8b56bae5/" + latlng + "," + date,
        dataType: "jsonp",
        success: function (json) {
            var wspd = json.currently.windSpeed;
            var brg = json.currently.windBearing;

            if (wspd == undefined) {
                wspd = "0"
            }
            if (brg == undefined) {
                brg = "0"
            }

            var jsontext = JSON.stringify(json);
            hist_deets.hdata.push({
                "wspeed": wspd,
                "i": i,
                "wbrg": brg,
                "timestamp": Math.round(new Date().getTime() / 1000),
                "timestamp_pretty": moment().format("MMM Do YYYY, h:mm:ss a")

            })
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

            if (i == 0) {
                var credits = localStorage.getItem("credits");
                credits--;
                var userdata = localStorage.getItem('userdata');
                var user = eval('(' + userdata + ')');
                var stravaID = user.deets[0]['stravaID'];
                saveCredit(stravaID, "1")
                localStorage.setItem("credits", credits);
                $('#credits_no').html(credits);
                $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");

            }


        },
        error: function (xhr, error) {
           return false;
        },
        complete: function () {

        }

    });

}


function startWeather() {

    weatherAct();

}


function refreshWeather(type, ct) {

    if (type == 'map') {
        $('#winfomap').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                        "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Retrieving weather ...</div>");
        weatherMap1(type, ct);
        $('#refreshBtnmap').fadeOut();

    } else {


        var timenow = Math.round(new Date().getTime() / 1000);
        var wdata = localStorage.getItem("weatherdata");
        if (wdata != null) {
            var wdatap = eval('(' + wdata + ')');
            var epochw = wdatap.wdata[0].timestamp;
            var diff = timenow - epochw;

            function revertText() {
                clearInterval(timer1);
                $('#winfo').fadeOut();
                dispStarsChk(type);
                $('#refreshBtn').fadeIn();

            }

            if (diff < 10800) { //10800
                var timer1 = setInterval(function () { revertText() }, 5000);
                $('#refreshBtn').fadeOut();
                $('#winfo').fadeOut('slow', function () {
                    $('#winfo').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available");
                     $('#winfo').fadeIn();
                });
            } else {
                $('#refreshBtn').fadeOut('slow');
                var timex = 20000;
                var actct = localStorage.getItem("actct");
                var segct = localStorage.getItem("segct");
                var total = parseInt(actct) + parseInt(segct);
                timex = (total * 2000)
                var timer2 = setInterval(function () { getSegWeather() }, timex); //timer = weatherct * 2s

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

                    var timer3 = setInterval(function () { finishedW() }, 500);
                    function finishedW() {
                        clearInterval(timer3);
                        dispStarsChk(type);
                        countWdata();
                        $('#refreshBtn').fadeIn('slow');
                    }
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
                    dispStarsChk(type);
                    countWdata();
                    $('#refreshBtn').fadeIn('slow');
                }
                //  dispStarsChk();
            }
        }
    }
}


function checkSegisStarred(ID) {
    var json = localStorage.getItem('starsdata');
    var star = false;
    if (json != null) {
        var j2 = eval('(' + json + ')');
        $.each(j2.segs, function (i, seg) {
            if (seg.ID == ID) {
                star = true;
                return false;
            }

        });
    } else {
        star = false;
    }

    return star;
}


function checkSegisFr(ID) {

    var fdata = localStorage.getItem("frdata");
    if (fdata == null) {
        var fr = false;
        return fr;
    } else {

        var fdatap = eval('(' + fdata + ')');

        $.each(fdatap.people, function (i, p) {
            var komdata = localStorage.getItem("komdata_" + p.ID);
            if (komdata != null) {
                var komdatap = eval('(' + komdata + ')');
                $.each(komdatap.segs, function (i, fr) {
                    var segID = fr.ID;

                    if (segID == ID) {
                        var fr = true;
                        return false;
                    }
                 });
            } else {
                var fr = false;
            }
        });
        return fr;
    }
}

function checkSegisMap(ID) {
    var json = localStorage.getItem('seg_loc_data');
    var inmap = false;
    if (json != null) {
        var j2 = eval('(' + json + ')');
        $.each(j2.points, function (i, seg) {
            if (seg.PID == ID) {
                inmap = true;
                return false;
            }

        });
    } else {
        inmap = false;
    }
    return inmap;
}

function weatherAct() {
    var json = localStorage.getItem('starsdata');
    var j2 = eval('(' + json + ')');
    $('#status_msgs').append("Retrieving weather data for Starred Segments</br>");
     var wct = 1;
    var time = 0;
    var ct = localStorage.getItem('weatherdata_ct');
    var timerw = ct * 4000;
    var actct = localStorage.getItem("starsct");
    timex = (actct * 4000)
    var timerst = setInterval(function () { closeStatus() }, timex);
    function closeStatus() {
        clearInterval(timerst);
        $('#status_msgs').append("</br>Done .... stand by");
        drawTable_x


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
    $.each(j2.segs, function (i, seg) {

        setTimeout(function () {
            getW(seg.latlng, seg.ID, "act");
            $('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
            "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ... " + wct + "</div>");
            $('#status_msgs').html("Retrieving weather data for Activities and Segments ... " + wct + "</br>");
            wct++;
        }, time);
        time += 4000;
    });


}

function weatherMap1(type, ct) {
    var json = localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + json + ')');

    var ID = checkLocalW();
    if (ID != null) {
        copyMapWeather(ID);
    } else {
        weatherMap(ct);
    }

}

function weatherMap(ct) {
    var json = localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + json + ')');
    $('#winfomap').html("<div style=\"display:inline-block;margin-bottom:8px\">Refreshing weather ...</div>");
    getW(j2.points[0].endlatlong, j2.points[0].PID, "map");
}

function weatherSeg() {
    var all_seg_data = localStorage.getItem('all_seg_efforts');
    var j2 = eval('(' + all_seg_data + ')');
    if (all_seg_data.length > 80) {
        var index = 0;
        $.each(j2.segs, function (i, seg) {
            var name = i;
            var timer1 = setInterval(function () { startDecode(seg.ID, seg.parentID) }, 1000);
            index++;
            function startDecode(toID, fromID) {
                clearInterval(timer1);
                copyWeather(fromID, toID);


            }
        });

    }

}

function displayStarsmap(hrs, ct) {
    $('#refreshBtnmap').html("");
    $('#refreshBtnmap').hide();
    var wdata = localStorage.getItem("weatherdata");
    var wdataj = eval('(' + wdata + ')');
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    var segct = j2s.count[0].num;

    if (jsonact.length > 50) {
        var ID = j2s.points[0].PID;
        var jsondata = localStorage.getItem(ID + "_weather_map");
        $('#refreshStarsmapbtn').html("Refresh Stars Ratings");

        localStorage.setItem("Hrs_map", hrs);

        var parsed_json = eval('(' + jsondata + ')');

        var fh = hrs - 2;
        var lh = hrs;
        fh = fh.toString();
        lh = lh.toString();

        var hrstxt = fh + " - " + lh + " Hrs";


        //
        $('#winfomap').html("Showing the best star ratings for the next 24 hours of retrieved weather");

        $('#seg_weather').hide();
        var noW = 0;
        $.each(j2s.points, function (i, seg) {
            var wdata = localStorage.getItem(seg.PID + "_weather_map");
            if (wdata == null) {
                noW++
            }

            calcStarsInline(seg.PID, hrs, 'map');
        });
        if (noW == segct) {
        }

    }
}

function changeGender(g) {
    localStorage.setItem("gender", g);
}

function drawWindcanvas(ID, from, to, ct) {
    var zoom = localStorage.getItem("zoommap");
    ct = 0;
    var wdata = localStorage.getItem("seg_loc_data");
    if (wdata == null) {

    } else {

        if (wdata.length < 20) {

        } else {
            var j2 = eval('(' + wdata + ')');
            var fPID;
            var flatlng
            $.each(j2.points, function (i, wd) {
                ct++;

                fPID = wd.PID;
                flatlng = wd.endlatlong;
                var wchk = localStorage.getItem(wd.PID + "_weather_map");
                if (wchk != null) {

                    ID = wd.PID;
                }
            });
        }

        var jsondata = localStorage.getItem(ID + "_weather_map");
        if (ID == null) {
            if (zoom >= 12) {

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
                    ctx2d.rotate(winddeg * Math.PI / 180);

                    ctx2d.lineWidth = 1;
                    ctx2d.fillStyle = "#2fb4c8";
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

                    ctx2d.font = '14px Arial';
                    ctx2d.fillStyle = "#fff";

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
}

function tryMapWeatherStars(SegID) {
    var wdata = localStorage.getItem(SegID + "_weather_map");
    var hrs = "24";
    if (wdata == null) {
    } else {
        calcStarsInline(SegID, hrs, 'map');
    }
}

function displayStars(type) {
    var hrs = 24;
    var wdata = localStorage.getItem("weatherdata");
    if (wdata == null) {
    } else {
        var jsonact = localStorage.getItem('starsdata');
        localStorage.setItem("Hrs", hrs);
        hrs = 24
        var j2a = eval('(' + jsonact + ')');
        var fh = hrs - 2;
        var lh = hrs;
        fh = fh.toString();
        lh = lh.toString();

            var hrstxt = "Best (24 hrs)";

        if (type == "stars") {
            var purch = localStorage.getItem("OneYrSub");
            var st_ct = localStorage.getItem("starsct");
            if (purch == "0") {
                $('#stinfo').html(st_ct + " Starred Segments Retrieved.<br/>Purchase a Monthly Subscription to retrieve all your Starred Segments.");
                $('#stinfo').fadeIn();
            } else {

                $('#stinfo').html(st_ct + " Starred Segments Retrieved.");
                $('#stinfo').fadeIn();
            }

        } else {
            $('#stinfo').html("");
        }

        $.each(j2a.segs, function (i, seg) {
            calcStarsInline(seg.ID, hrs, 'stars');
        });



    }

    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf("_fav") > -1) {
            var ID = localStorage.key(i).replace("_fav", "");
            calcStarsInline(ID, hrs, 'act');
            calcStarsInline(ID, hrs, 'map');

        }
    }

}

function stConn2() {
    var strava_deets = {
        deets: []
    };
    var ID;
    $('#status_area').show();
    $('#status_msgs').html("Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
        localStorage.removeItem('userdata');
        result.get('https://www.strava.com/api/v3/athlete').done(function (data) {
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
            localStorage.setItem('credits', "15");
            ID = data.id;

            if (data.profile == "avatar/athlete/large.png") {
                pic = "<img style=\"width:80px;height:auto\" src=\"img/blank_avatar.jpg\">";
                pic_header = "<img class=\"circular_pfl\" src=\"img/blank_avatar.jpg\">";
            } else {
                pic = "<img style=\"width:80px;height:auto\" src=\"" + data.profile + "\">";
                pic_header = "<img class=\"circular_pfl\" src=\"" + data.profile + "\">";
            }

            var name = data.firstname + " " + data.lastname;

            var loc = data.city + ", " + data.country;


            $('#pic_header').show();
            $('#logo_header').show();
            $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
            $('#userimg').html(pic);
            $('#pic_header').html(pic_header);

            var timex = 30000;

            var sub = Math.floor(moment().add(0, 'days') / 1000);
            var subt = Math.floor(moment().add(-13, 'days') / 1000);

            if (data.id == "11908562") {
				localStorage.setItem("sub", subt);

			} else {
            localStorage.setItem("sub", sub);

		}
			checkServerStatus(data.id, "111")
            var timerst = setInterval(function () { closeStatus() }, timex); //rem bkk2
            function closeStatus() {
                clearInterval(timerst);
                $('#status_msgs').append("</br>Done .... stand by");
               // checkServerStatus(ID);
                var timerst2 = setInterval(function () { dispstarst() }, 2000);
                function dispstarst() {
                    clearInterval(timerst2);
                    $('#UnAuthApp').hide();
                    $('#status_msgs').hide();
                    $('#status_area').hide();
                    $('#stRefBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"stRefresh\" onclick=\"stConn2()\">Refresh data from Strava</button>");
                    appPurchChk();
                }
            }
            $('#status_msgs').append("</br >Retrieving Starred Segments for </br>" + data.firstname + " " + data.lastname + "</br >");
            $('#stRefBtn').html("Retrieving Starred Segments for </br>" + data.firstname + " " + data.lastname);
            stKOMs(ID);
            stStars(ID);

        });

    });
}

function checkServerStatus(stravaID,sub) {

    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/Ustatus",
        dataType: "json",
        timeout: 25000,
        data: "StravaID=" + stravaID,
        success: function (parsed_json) {

                var credits = parsed_json.ustatus[0]['Credits'];
                var LoginDate = parsed_json.ustatus[0]['FirstLogin'];
                localStorage.setItem('credits', credits);

                var ExpDate = Math.floor(moment(LoginDate, "DD-MM-YYYYY").add(14, 'days') / 1000);

                var today2 = Math.floor(moment() / 1000);
                var diff = parseInt(ExpDate - today2);
                var edays = Math.floor(diff / 86400);
                var estr;
                var cint = parseInt(credits);
                if (edays == 0) {
                    estr = "tomorrow.";
                } else {
                    estr = "in " + edays + " days."
                }

                var cstr = "<div id=\"credits_no\" style=\"display:inline-block\"></div>";
                if (diff > 0) {
                     $('#pmsg').html("Trial period expires " + estr + " <br/>You have " + cstr + " Historical data queries left.<br/>Purchase a Monthly Subscription to get unlimited Historical data queries.");
                    if (cint < 0) {
                        credits = "0";
                    }
                    $('#credits_no').html(credits);
                    $('#creditsBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\">Credits: " + credits + "</button>");
                    updateUser("first", "last", stravaID, "2",sub);
                } else {
					var purch = localStorage.getItem("OneYrSub");
            		if (purch == "1") {
						updateUser("first", "last", stravaID, "3",sub);
					} else {
                   listSub();
					$('#UnAuthApp').hide();
                    $('#menu_buttons').hide();
                    //$('#profile_settings').hide();
                    updateUser("first", "last", stravaID, "-2",sub);
                    hideAll();
                    var sub = Math.floor(moment().add(-21, 'days') / 1000);
                    localStorage.setItem("sub", sub);
                    $('#pmsg').html("Thank you for using KOM With The Wind. Your trial period has now expired.<br/>Purchase a Monthly Subscription to get full access including unlimited Historical data queries.");
			}
                }

        },
        error: function (xhr, error) {
            //$('#menu_buttons').hide();
            //$('#profile_settings').hide();
            //hideAll();
            //alert(error + xhr);
            //$('#pmsg').html("User status unknown.<br/>Please restart the app.");


        }
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

    });


}

var timer1
var timer2

function analyseSegs() {

    var all_seg_data = localStorage.getItem('all_seg_efforts');
    if (all_seg_data != null) {
        var j2 = eval('(' + all_seg_data + ')');

        if (all_seg_data.length > 80) {
            var index = 0;
            $.each(j2.segs, function (i, seg) {

                var name = i;
                var poly = localStorage.getItem(seg.ID + "_poly");
                var ID = seg.ID
                var parentID = seg.parentID
                var timer1 = setInterval(function () { startDecode(poly, ID, parentID, i, index) }, 5000);
                index++;

                function startDecode(poly, ID, parentID, i, index) {
                    clearInterval(timer1);
                    decodepoly(poly, ID, parentID,"notkml");

                }
            });

            var timer2 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer2);

                weatherAct();

            }


        } else {

            var timer3 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer3);
                weatherAct();
            }

        }
    } else {
        $('#AuthApp').show();
    }
}


function parse(type, ID) {
    var parentID = "111";
    if (type == "act") {

        var seg_data = localStorage.getItem('segdata');
        var j2 = eval('(' + seg_data + ')');
        var dist = j2.segs[0].dist;
        $.each(j2.segs, function (i, seg) {
            var poly = seg.poly;
            var ID = seg.ID;
            var timer2 = setInterval(function () { startDecode(poly, ID, parentID) }, 2000);

            function startDecode(poly, ID, parentID) {
                clearInterval(timer2);
                decodepoly(poly, ID, parentID, "notkml");

            }
        });

    } else if (type == "kom") {

        var seg_data = localStorage.getItem('komdata_' + ID);
        var j2 = eval('(' + seg_data + ')');
        var dist = j2.segs[0].dist;
        $.each(j2.segs, function (i, seg) {
            var ID2 = seg.ID;
            var poly = localStorage.getItem(ID2 + '_poly');
            var timer2 = setInterval(function () { startDecode(poly, ID2, parentID) }, 2000);

            function startDecode(poly, ID2, parentID) {
                clearInterval(timer2);

                decodepoly(poly, ID2, parentID, "nokkml");

            }
        });


    } else if (type == "stars") {

        var seg_data = localStorage.getItem('starsdata');
        var j2 = eval('(' + seg_data + ')');
        var dist = j2.segs[0].dist;
        $.each(j2.segs, function (i, seg) {

            var ID = seg.ID;

            var pstr = ID + "_poly";
            var poly = localStorage.getItem(pstr);
            var timer2 = setInterval(function () { startDecode(poly, ID, parentID) }, 2000);



            function startDecode(poly, ID, parentID) {
                clearInterval(timer2);
                decodepoly(poly, ID, parentID, "notkml");

            }
        });




    } else if (type == "seg") {

        var seg_data = localStorage.getItem('segdata');
        var j2 = eval('(' + seg_data + ')');

        var index = 0;
        $.each(j2.segs, function (i, seg) {
            var seg_eff = localStorage.getItem(seg.ID + '_seg_efforts');
            var j2eff = eval('(' + seg_eff + ')');
            var name = i;
            var segjson = localStorage.getItem(ID + "_poly");
            var poly = segjson.segs.poly;
            var ID = segjson.segs.ID;
            var timers = setInterval(function () { startDecode(poly, ID, i, index) }, 5000);
            index++;
            function startDecode(poly, ID, i, index) {
                clearInterval(timers);
                $('#location').append("decode poly for segment: " + ID);
                decodepoly(poly, ID, parentID, "notkml");

            }

        });

        getAct("act");




    } else if (type == "map") {

        var seg_data = localStorage.getItem('seg_loc_data');
        var j2 = eval('(' + seg_data + ')');
        var index = 0;
        $.each(j2.points, function (i, seg) {

            var name = i;
            var poly = seg.points;
            var ID = seg.PID;
            var chk = localStorage.getItem(ID + '_array');
            if (chk == null) {
                var timer = setInterval(function () { startDecode(poly, ID, i, index) }, 500);
                index++;
                function startDecode(poly, ID, i, index) {
                    clearInterval(timer);

                    decodepoly(poly, ID, parentID, "notkml");
                }
            } else {

            }

        });

    }


}

function ActsSegsRefresh() {
    stConn2();
}



function stAct() {

    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {

            var jsontext = JSON.stringify(data);
            var ct = 0;
            $.each(data, function (i, seg) {
            var poly = data[i]['map']['summary_polyline'];
            var ID = data[i]['id'];
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain'],
                    "latlng": data[i]['end_latlng'],

                });

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
            if (ct > 0) {
                parse("stars");
                var timer = setInterval(function () { startDecode() }, 5000);

                function startDecode() {

                    clearInterval(timer);
                    analyseSegs();
                }
            } else {
                $('#UnAuthApp').hide();
                noActsmsg("stars");
            }
        });

    });
}

function stFriends() {
    $('#frRefBtn').html("Refreshing Friend data...");
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var ID = user.deets[0]['stravaID'];
    var friends = {
        people: []
    };

    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/friends').done(function (data) {

            var jsontext = JSON.stringify(data);
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
            $('#frRefBtn').html("<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"stFrRefresh\" onclick=\"stFriends()\">Refresh Friend data from Strava</button>");
            drawFriends();
        }


    });
}

function stKOMs(ID) {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var myID = user.deets[0]['stravaID'];
    var TestID;
    if ((myID == "10375624") && (ID == myID)) {
        TestID = "2280438";
     //   $('#logmsg').append("<br/>ID for KOMS: " + TestID + " not " + ID);
    } else {
        TestID = ID;
     //   $('#logmsg').append("<br/>ID for KOMS: " + TestID);
    }

    var strava_segs = {
        segs: [],
        count: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/athletes/' + TestID + '/koms').done(function (data) {
    //    result.get('https://www.strava.com/api/v3/segments/4273689/all_efforts', { data: { athlete_id: ID } }).done(function (data) {

            var jsontext = JSON.stringify(data);
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
                });
          //      $('#logmsg').append("<br/>" + seg.name);
                seg_details(seg.segment.id);
                ct++;
            });
            strava_segs.count.push({
                "num": ct
            });
            if (ct > 0) {
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('komdata_' + ID, jsonsegs);
        //    $('#logmsg').append("<br/>" + jsonsegs);
            $('#status_msgs').append('Found ' + ct + ' KOMs</br>');
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');

            var stravaID = user.deets[0]['stravaID'];
       //     $('#logmsg').append("<br/>" + stravaID + "  " + ID);
            var timer = setInterval(function () { startDecode() }, 5000);
            function startDecode() {
                clearInterval(timer);
                if (stravaID == ID) {
                    updateUserKOMs(ID, ct);
                } else {

                }
                parse("kom",ID);
            }

            } else {
                $('#status_msgs').append('No KOMs/QOMs Found</br>');
            }
        });

    });
}

function stStars(ID) {
    var page = '1';
    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/segments/starred', { data: { page: page } }).done(function (data) {

            var jsontext = JSON.stringify(data);
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
                });


                ct++;
                seg_details(segID);
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('starsdata', jsonsegs);
            localStorage.setItem('starsct', ct);
            if (ct == 30) {
                $('#status_msgs').append('Retrieved first 30 Starred Segments </br>');
            } else {
                $('#status_msgs').append('Retrieved ' + ct + ' Starred Segments </br>');
            }

            if (ct > 0) {

                var timer = setInterval(function () { startDecode() }, 5000);
                function startDecode() {
                    $('#status_msgs').append('Processing Starred Segments </br>')
                    parse("stars");
                    clearInterval(timer);

                }
            } else {
                $('#status_msgs').append('Stand by ... </br>')

            }
        });

    });
}

function stStars_paging(page, count) {
    //show refresh view: Retrieving more segments ...
    //redirect to settings purch if not paid
    $('#stinfo').html();
    $('#winfo').html();
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');

    var ID = user.deets[0]['stravaID'];
    //scroll to top
    var top = "<table class=\"table table-striped\">";
    midhtml = "<tr style=\"height:15px\"><td><div style=\"height:13px;width:13px;text-align:center;color:#00AF96\" class=\"fa fa-cog fa-spin\"></div><div class=\"msg_sml\" style=\"padding-left:3px;display:inline-block;color:#00AF96\">Retrieving more starred segments ...</div></td></tr>";
    $('#act_table2').html(top + midhtml + "</table>");
    $('html, body').animate({
        scrollTop: $("#onlineStatus").offset().top
    }, 2000);
    // var json = eval('(' + localStorage.getItem('starsdata') + ')');
    var strava_segs = {
        segs: []
    };
    var ct_o = localStorage.getItem('starsct');
    var strava_segs_f = {
        segs: []
    };

    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //console.log(result)
        result.get('https://www.strava.com/api/v3/athletes/' + ID + '/segments/starred', { data: { page: page } }).done(function (data) {
            //page=
            var jsontext = JSON.stringify(data);
            // $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
                var segID = data[i]['id'];
                //  alert(data[i]['name']);
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
            var ct_n = Number(ct) + Number(ct_o);
            localStorage.setItem('starsct', ct_n);
            var sdata = localStorage.getItem('starsdata');
            var sdata2 = eval('(' + sdata + ')');


            var segs2 = strava_segs['segs'];
            var segs3 = sdata2['segs'];
            var finalObj = $.merge(segs2, segs3);
            //
            strava_segs_f.segs.push(finalObj);
            var allsegs1 = JSON.stringify(strava_segs_f);
            var allsegs2 = allsegs1.replace('[{', '{');
            var allsegs2a = allsegs2.replace('}]', '}');
            //   var allsegs3 = eval('(' + allsegs2a + ')');

            //    var jsonsegs = JSON.stringify(strava_segs_f);
            localStorage.setItem('starsdata', allsegs2a);
            //localStorage.setItem('starsct', ct + count);
            $('#status_msgs').append('Found ' + ct + ' more Starred Segments </br>');

            //drawTable();
            if (ct > 0) {

                var timer = setInterval(function () { startDecode() }, 5000);
                console.log("parse stars")
                function startDecode() {
                    //  drawTable("stars");
                    $('#status_msgs').append('Processing Starred Segments </br>')
                    parse("stars");
                    clearInterval(timer);
                    var timer2 = setInterval(function () { drawTable_x() }, 25000);
                    function drawTable_x() {

                        clearInterval(timer2);
                        drawTable("stars");
                    }


                }
            } else {
                $('#UnAuthApp').hide();
                //   noActsmsg("stars");
            }
            //myFunction();
        });

    });
}

function stLeader(ID,type,metres) {
    $('#lbBtn').hide();
    var strava_segs = {
        segs: [],
        timestamp: [],
        count: [],
        dist: []
    };
    var timenow = Math.round(new Date().getTime() / 1000);
    var gender = localStorage.getItem("gender");
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
     if (gender == "B" || gender == null) {
         OAuth.popup('strava', { cache: true }).done(function (result) {

             result.get('https://www.strava.com/api/v3/segments/' + ID + '/leaderboard').done(function (data) {
                 var jsontext = JSON.stringify(data);
                 var ct = 0;
                 var entries = data['entry_count'];
                 $.each(data.entries, function (i, seg) {


                     strava_segs.segs.push({
                         "name": seg.athlete_name,
                         "time": seg.start_date_local,
                         "profile": seg.athlete_profile,
                         "mov_time": seg.moving_time
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
                 strava_segs.dist.push({
                     "dist": metres
                 });
                 var jsonsegs = JSON.stringify(strava_segs);
                 localStorage.setItem('lb_data_' + ID, jsonsegs);

                 var timer = setInterval(function () { startDecode() }, 5000);

                 function startDecode() {
                     clearInterval(timer);
                     showHistweather(ID, type, true, 'one', null)

                 }


             });

         });
     } else {


         OAuth.popup('strava', { cache: true }).done(function (result) {

             result.get('https://www.strava.com/api/v3/segments/' + ID + '/leaderboard', { data: { gender: gender } }).done(function (data) {
                 var jsontext = JSON.stringify(data);

                 var ct = 0;
                 var entries = data['entry_count'];
                 $.each(data.entries, function (i, seg) {


                     strava_segs.segs.push({
                         "name": seg.athlete_name,
                         "time": seg.start_date_local,
                         "profile": seg.athlete_profile,
                         "mov_time": seg.moving_time
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
                 strava_segs.dist.push({
                     "dist": metres
                 });
                 var jsonsegs = JSON.stringify(strava_segs);
                 localStorage.setItem('lb_data_' + ID, jsonsegs);

                 var timer = setInterval(function () { startDecode() }, 5000);

                 function startDecode() {
                     clearInterval(timer);
                     showHistweather(ID, type, true, 'one', null)
                 }


             });

         });
     }
}

var strava_all_segs = {
        segs: []
    };

//https://www.strava.com/api/v3/segments/:id

function seg_efforts(ID) {
    var strava_segs = {
        segs: [],
        count: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities/' +ID).done(function (data) {
            var jsontext = JSON.stringify(data);
            var ct = 0;
           $.each(data.segment_efforts, function (i, seg) {
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
                });

            seg_details(seg.segment.id);
                    ct++;

            });
            if (ct > 0) {
            strava_segs.count.push(ct);
           var jsonsegs = JSON.stringify(strava_segs);
            var jsonsegsall = JSON.stringify(strava_all_segs);
            $('#status_msgs').append('Found ' + ct + ' segment efforts for activity ' + ID + '</br>');
            localStorage.setItem(ID+'_seg_efforts', jsonsegs);
            localStorage.setItem('all_seg_efforts', jsonsegsall);

            }

        });

    });
}
function seg_details(ID) {
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    var poly = "";
    OAuth.popup('strava', { cache: true }).done(function (result) {
         result.get('https://www.strava.com/api/v3/segments/' +ID).done(function (data) {
            poly = data.map.polyline;
            localStorage.setItem(ID+'_poly',poly);
        });

    });
}

function stEffort(ID,frID,type) {
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
            var ct = 0;
            $.each(data, function (i, seg) {
                strava_segs.segs.push({
                    "pr_rank": seg.pr_rank,
                     "time": seg.start_date_local,
                     "kom_rank": seg.kom_rank,
                     "mov_time": seg.moving_time,
                     "latlng": seg.segment.end_latlng
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
                $('#sgBtn').html("")
            }

        });

    });
}

function refreshData(ID, datatype, type, dist) {
    var str;
    $('#komimg').hide();
    $('#komdata').hide();
    $('#lbBtn').hide();
    var time = 500;
    var timer1 = setTimeout(function () { startDecode() }, 5000);
    var i = 0;
    if (type == 'lb') { //user later yyy
        clearCanvas(type);
        str = "lb_data_" + ID;
        while (i < 10) {

            localStorage.removeItem(ID + "_" + i + "_hist");
            i++;
        }
        localStorage.removeItem(str);
        function startDecode() {
            clearTimeout(timer1);
            stLeader(ID, datatype, dist)

        }

    }

}

function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    var str = "weather";
    for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
         localStorage.removeItem(localStorage.key(i));
      }
    }
    localStorage.removeItem('weatherdata_ct');
    showLocal();
}

function deleteOldweather(type) {
    var str = "weather_act";
    $('#status_msgs').show();
    localStorage.removeItem("weatherdata");
    localStorage.removeItem("weatherdata_ct");
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(str) > -1) {
            $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
            localStorage.removeItem(localStorage.key(i));
        }
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
     if (localStorage.key(i).indexOf(str) > -1) {
    //     $('#logmsg').append("</br > " + localStorage.key(i)); //+ " data: " + localStorage.getItem(localStorage.key(i)));
      }

      if (localStorage.key(i).indexOf(str2) > -1) {
    //    $('#logmsg').append("</br > " + localStorage.key(i));
      }
    }


    $('#status_msgs').append("</br > st: " + localStorage.getItem('oauthio_provider_strava'));

}

function twitterConn() {
    $('#result').html("");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.redirect('twitter','/home/index').done(function (r) {
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

    });


    $('.polylinkx').on('click', function (e) {
        $(e.target).find('p').removeClass('un_sel');
        $(e.target).find('p').addClass('sel');

    });
    var strava_segs = {
        segs: []
    };


    var strava_deets = {
        deets: []
    };

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {
        if (res == false) {
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

            res.get('https://www.strava.com/api/v3/activities').done(function (data) {
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
                });
                var jsonsegs = JSON.stringify(strava_segs);
                localStorage.setItem('segdata', jsonsegs);
                $('#status_msgs').append("Retrieved " + ct + " Activities");

            }).fail(function (err) {

            });
        }
    });

    $('#nearby').on('click', function () {
        var token = localStorage.getItem('st_token');
        res = OAuth.create('strava');
        if (res == false) {
            $('#status_msgs').append("Not connected");
        } else {
            $('#status_msgs').append("Connecting with: " + token);
            res.get('https://www.strava.com/api/v3/segments/explore', { data: { access_token: token, bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
                var jsondeets = JSON.stringify(data);
                $('#main_menu').hide();
                $('#seg_nearby').show();
                showmap();
            }).fail(function (err) {

            });
        }
    });



    $('#st-connect').on('click', function () {
        $('#result').html("status_msgs ...");
        OAuth.popup('strava', { cache: true }).done(function (r) {
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