
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
      //  alert("ready");
      // reportOnlineStatus();
   //     $('#menu_buttons').show();
      //  getFriends();
        //
       checkData();
        //var ol = isOnLine();
        
        //if (ol == true) {
        //    var userdata = localStorage.getItem('userdata');
        //    //app.receivedEvent('online');
        //    if (userdata == null) {
        //        $('#status_msgs').show();
        //        $('#status_msgs').append("App is not authenticated with a Strava account");
        //        $('#UnAuthApp').show();
        //        $('#pic_header').hide();
        //        $('#logo_header').hide();
        //        $('#menu_buttons').hide();
        //        $('#deets_tile').hide();
        //    } else {
               
        //        var user = eval('(' + userdata + ')');
        //        var stravaID = user.deets[0]['stravaID'];
        //        checkData();
                
        //    }
        //} else {
        //    //offline
        //    var userdata = localStorage.getItem('userdata');
        //    //app.receivedEvent('online');
        //    if (userdata == null) {
        //        $('#status_area').show();
        //        $('#status_msgs').show();
        //        $('#status_msgs').append("App is not authenticated with a Strava account, and device is offline");
        //    } else {
        //        var user = eval('(' + userdata + ')');
        //        var stravaID = user.deets[0]['stravaID'];
        //        checkData();
        //    }


       // }
        
        
      
    },

  
    // Update DOM on a Received Event
    receivedEvent: function (id) {
      
        console.log('Received Event: ' + id);
    }
};

app.initialize();


function listSub() {
    // alert("buy sub");
    $('#pmsg').append("list sub")
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
        //alert(JSON.stringify(result));

        for (var i = 0 ; i < result.length; ++i) {
            var p = result[i];

            product_info[p["productId"]] = { title: p["title"], price: p["price"] };
            $('#pmsg').append("Loaded: " + p["title"]);
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
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var stravaID = user.deets[0]['stravaID'];
    $('#pmsg').append(stravaID);
    //purchase product id, put purchase product id info into server.
    window.iap.purchaseProduct(productId, function (result) {
        //alert("purchaseProduct");
        //alert(JSON.stringify(result));
        var payID = "dskfdsfgdssd944may6";
        savePmt(stravaID, result.orderId);
        localStorage.setItem("credits", "-1");
        $('#pmsg').html("Thank you for your subscription");
        $('#pmsg').append("OID= " + result.orderId + " " + JSON.stringify(result));
        //checkData();
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

            if (self.existing_purchases.indexOf(p['productId']) === -1) {
                self.existing_purchases.push(p['productId']);

                $('#pmsg').append("One year subscription purchased.");
            } else {
                $('#pmsg').append("Subscription not purchased.");
            }
        }
    },
    function (error) {
        alert("error: " + error);
    });
}

var devOnline;

function isOnLine() {
    return navigator.onLine;
}

function reportOnlineStatus() {
    var userdata = localStorage.getItem('userdata');
    if (userdata != null) {
        var user = eval('(' + userdata + ')');
        var pic_header_on
        var pic_header_off
        //  console.log(user.deets[0]['profile'])
        if (user.deets[0]['profile'] == "avatar/athlete/large.png") {
            pic = "<img style=\"width:80px;height:auto\" src=\"/Content/blank_avatar.jpg\">";
            pic_header_on = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"/Content/blank_avatar.jpg\">";
            pic_header_off = "<img id=\"headpfl\" class=\"circular_pfl_off\" src=\"/Content/blank_avatar.jpg\">";
        } else {
            pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
            pic_header_on = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"" + user.deets[0]['profile'] + "\">";
            pic_header_off = "<img id=\"headpfl\" class=\"circular_pfl_off\" src=\"/Content/blank_avatar.jpg\">";
        }

        //    alert(isOnLine());
        if (isOnLine()) {
            devOnline = true;
            document.getElementById('stRefresh').style.pointerEvents = 'auto';
            document.getElementById('stFrRefresh').style.pointerEvents = 'auto';
            document.getElementById('purchBtn').style.pointerEvents = 'auto';
            document.getElementById('refreshBtnW').style.pointerEvents = 'auto';
            document.getElementById('stConnimg').style.pointerEvents = 'auto';
            $('#onlineStatus').removeClass("status_off");
            $('#onlineStatus').addClass("status_on");
            $('#onlineStatus').html("Online");
            $('#Statusreport').hide();
            $('#pic_header').html(pic_header_on);
        }
        else {
            devOnline = false;
            document.getElementById('stRefresh').style.pointerEvents = 'none';
            document.getElementById('stFrRefresh').style.pointerEvents = 'none';
            document.getElementById('purchBtn').style.pointerEvents = 'none';
            document.getElementById('refreshBtnW').style.pointerEvents = 'none';
            document.getElementById('stConnimg').style.pointerEvents = 'none';

            $('#onlineStatus').removeClass("status_on");
            $('#onlineStatus').addClass("status_off");
            $('#onlineStatus').html("Offline");
            $('#pic_header').html(pic_header_off);
            $('#Statusreport').show();
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

var totalDist = 0;

function getBearing(latlng1, latlng2, totalDist) {
    var bearing = google.maps.geometry.spherical.computeHeading(latlng1, latlng2);
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    var percent = calcDistProp(dist, totalDist);
    dist = Math.round(parseInt(dist));
    bearing = Math.round(parseInt(bearing));
    if (bearing < 0) {
        bearing = calcBearing(bearing);
    }
    $('#result2').html("bearing= " + bearing + " percent= " + percent + "</br>");
    whichP(bearing, percent);
}

function calcDistProp(dist, totalDist) {
    var perc = (dist / totalDist) * 100;
    return perc;
}

var w1 = 0, w2 = 0, w3 = 0, w4 = 0, w5 = 0, w6 = 0, w7 = 0, w8 = 0, w9 = 0, w10 = 0, w11 = 0, w12 = 0;
var besthtml;

function whichP(bearing, percent) {
    //  alert(bearing + " .. " + percent);
    if (bearing < 30) {
        p1 = p1 + (percent / 100);
    }
    if (bearing >= 30 && bearing < 60) {
        p2 = p2 + (percent / 100);
    }
    if (bearing >= 60 && bearing < 90) {
        p3 = p3 + (percent / 100);
        //alert(p3);
    }
    if (bearing >= 90 && bearing < 120) {
        p4 = p4 + (percent / 100);
    }
    if (bearing >= 120 && bearing < 150) {
        p5 = p5 + (percent / 100);
    }
    if (bearing >= 150 && bearing < 180) {
        p6 = p6 + (percent / 100);
    }
    if (bearing >= 180 && bearing < 210) {
        p7 = p7 + (percent / 100);
        // alert("p7=" + p7);
    }
    if (bearing >= 210 && bearing < 240) {
        p8 = p8 + (percent / 100);
    }
    if (bearing >= 240 && bearing < 270) {
        p9 = p9 + (percent / 100);
    }
    if (bearing >= 270 && bearing < 300) {
        p10 = p10 + (percent / 100);;
    }
    if (bearing >= 300 && bearing < 330) {
        p11 = p11 + (percent / 100);
    }
    if (bearing >= 330 && bearing < 360) {
        p12 = p12 + (percent / 100);
    }


}

function showP() {
    $('#result2').html("p1=" + p1 + "</br>" + "p2=" + p2 + "</br>" + "p3=" + p3 + "</br>" + "p4=" + p4 + "</br>" + "p6=" + p6 + "</br>" + "p7=" + p7 + "</br>" + "p8=" + p8 + "</br>" + "p9=" + p9 + "</br>" + "p10=" + p10 + "</br>" + "p11=" + p11 + "</br>" + "p12=" + p12 + "</br>");
}
//route profile
//12 portions
//cycle thru each portion as degrees and count up score 
//multiply scores by percent for the route
//decide colors
//var p1val = xx    p2col = xx
//draw chart from score

function x10(val) {
    return (val * 100);
}

function segAlgoData() {
    // alert(pArray);
    var i = 4;
    var segBearings = {
        pvals: []
    };

    var str = "1234";

    for (var i = 0; i < str.length; i++) {
        var nextChar = str.charAt(i);
        var pval = "p" + nextChar;
        //var flipval = document.getElementById(flipstr).value;
        //  alert(pval);
        //selected.push(flipstr + "=" + flipval);
        //selected.push(("flip" + nextChar).val());
        //   alert(nextChar)
    }

    //do {
    // segBearings.pvals.push({
    //    i: p+i            
    // });
    //  alert(p3);
    // }
    //while (--i);


}



function saveChart(ID) {
    $('#location').append("save" + ID + "</br>");
    p1 = parseInt(x10(p1));
    p2 = parseInt(x10(p2));
    p3 = parseInt(x10(p3));
    p4 = parseInt(x10(p4));
    p5 = parseInt(x10(p5));
    p6 = parseInt(x10(p6));
    p7 = parseInt(x10(p7));
    p8 = parseInt(x10(p8));
    p9 = parseInt(x10(p9));
    p10 = parseInt(x10(p10));
    p11 = parseInt(x10(p11));
    p12 = parseInt(x10(p12));
    //alert("drawing chart, p1=" + p1);
    var pArray = new Array();
    pArray.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
    localStorage.setItem(ID + "_array", pArray);
    //   $('#pdata').html("ID: " + ID + " " + pArray);
    // segAlgoData();
    //alert(pArray);
    console.log("array for " + ID + " " + pArray + "<br />");
    var obj = [{
        value: p1,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p2,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p3,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p4,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p5,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p6,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p7,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
	{
	    value: p8,
	    color: "#f93",
	    highlight: "#f93",
	    label: "% NNE"
	},
	{
	    value: p9,
	    color: "#f93",
	    highlight: "#f93",
	    label: "% NNE"
	},
	{
	    value: p10,
	    color: "#f93",
	    highlight: "#f93",
	    label: "% NNE"
	},
	{
	    value: p11,
	    color: "#f93",
	    highlight: "#f93",
	    label: "% NNE"
	},
	{
	    value: p12,
	    color: "#f93",
	    highlight: "#f93",
	    label: "% NNE"
	}];

    localStorage.setItem(ID + "_chart", JSON.stringify(obj));

}


function drawChart(ID) {


    var chart_store = ID + "_chart";
    //alert(chart_store);
    var obj = JSON.parse(localStorage.getItem(chart_store)); //eval
    //var obj = eval('(' + chart_json + ')');

    var canvas = document.getElementById("chart-area")
    var ctx = canvas.getContext("2d");
    //alert("p1= " + p1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.myPolarArea = new Chart(ctx).PolarArea(obj, {
        responsive: false,
        showScale: true,
        scaleOverride: false,
        scaleShowLabels: false,
        scaleLineColor: "#2fb4c8",
        segmentShowStroke: false,
        scaleLineWidth: 1,
        tooltipTemplate: "<%if (label){%><%= value %><%}%><%=label%>",

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: 1,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: 1,
        // Number - The scale starting value
        scaleStartValue: 0
    });

}


function getDistance(latlng1, latlng2) {
  
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    dist = Math.round(parseInt(dist));
    totalDist = totalDist + dist;
    $('#result2').append("totaldist= " + totalDist + " <br />");
}

function calcBearing(val) {
    var valx = Math.abs(parseInt(val));
    return (180 - valx) + 180;

}

function back(type) {
    if ($('#seg_data').is(':visible')) {
        $('#act_table').show();
        $('#seg_data').hide();
    } else {
        $('#main_menu').show();
        $('#act_table').hide();
        $('#seg_nearby').hide();
        //  drawTable();
    }
}

function showTest() {
    $('#testBtns').show();
    $('#actmsgs').show();
    $('#info').show();
    $('#get_activities').show();
    $('#status_msgs').show();

}

function poly1() {
    decodepoly("}vculjey0cF{jAjK'A");
}

var timera;
var timerb;
var timerc;
var timerd;

function startmap(ID, lat, lng) {
    clearTimeout(timera);
    //var position = getPosition();
    if (ID == 11) {
        var map = new GoogleMap(ID, lat, lng, 12);
        map.initialize();
    } else {
        var latlngsaved = localStorage.getItem("latmap");
        //var latlng = position.split(',');
        if (latlngsaved == null) {
            var lat = "48.14";
            var lng = "17.11";
            var zoom = 5;
        } else {
            var lat = localStorage.getItem("latmap");
            var lng = localStorage.getItem("lngmap");
            var zoom = localStorage.getItem("zoommap");
        }
        //}
        var map = new GoogleMap(ID, lat, lng, zoom);
        map.initialize();
    }
    console.log("latlngmap" + lat + " ... " + lng);

}

function showmap(ID, lat, lng) {
    // if (ID != null) {
    $('#map_canvas_nearby').show();
    //}
    timera = setInterval(function () { startmap(ID, lat, lng) }, 1500);
}

function setZoom(map, lat, lng) {
    var boundbox = new google.maps.LatLngBounds();
    boundbox.extend(new google.maps.LatLng(lat, lng));
    console.log("fit" + lat + " " + lng);

    map.setCenter(boundbox.getCenter());
    //  map.setZoom(8);
    // map.fitBounds(boundbox);



}

function GoogleMap(ID, lat, lng, zoom1) {
    this.initialize = function () {
        var map = showMap();
    }
    var showMap = function () {

        var mapOptions = {
            zoom: parseInt(zoom1),
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        }
        var map = new google.maps.Map(document.getElementById("map_canvas_nearby"), mapOptions);
        var bounds_saved = new google.maps.LatLngBounds();
        bounds_saved = localStorage.getItem("BdsMap");
        //  setZoom(map, lat, lng);
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', (function () {
            bounds = map.getBounds();
            $("#map_msg").html("Map moved ...");
            var timer;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(function () {

                    bounds = map.getBounds();
                    var zoom2 = map.getZoom();
                    var latn = map.getCenter().lat();
                    var lngn = map.getCenter().lng();
                    console.log(zoom2)
                    localStorage.setItem("zoommap", zoom2);
                    localStorage.setItem("latmap", latn);
                    localStorage.setItem("lngmap", lngn);
                    $("#winfomap").html("Retrieving segments ...");
                    removeMarkers(null);

                    markers_array = [];
                    $('#deets_tile').hide();

                    $('#pills_row').hide();

                    $('#seg_weather').hide();
                    $('#seg_leaderboard').hide();
                    setMarkers(map, bounds, ID);
                }, 2000);
            }
        }()));


        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });
        console.log("Loading markers ... ");

        return map;
    }

}



function removeMarkers(map) {

    for (var i = 0; i < markers_array.length; i++) {
        markers_array[i].setMap(map);


    }
    markers_array.length = 0;

}

var mappoly;
var flightPlanCoordinates;
var polyline_o;

function addPolyline(el) {
    polyName = new google.maps.Polyline({
        path: el,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    return polyName;
}

var markers_array = [];

var timer_m;

function setMarkers(map, bounds_map, PID) {
    $('#map_table').show();
    $("#winfomap").html();
    var midhtml = "";
    clearTimeout(timer_m);
    var bds_fmt = format_bounds(bounds_map.toString());
    var marktxt = "";
    var seg_loc_data = {
        points: [],
        count: []
    };
    var ct = 0;
    if (PID == null) {
    }

    var tlat = "56.058168";
    var tlng = "-2.719811";
    //  var hereLatLng = new google.maps.LatLng(latlng);
    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //result.get('https://www.strava.com/api/v3/activities').done(function (data) {

        result.get('https://www.strava.com/api/v3/segments/explore', { data: { bounds: bds_fmt } }).done(function (data) {

            //res.get('https://www.strava.com/api/v3/segments/explore?bounds=' + bds_fmt).done(function (data) {
            var jsondeets = JSON.stringify(data);

            $.each(data.segments, function (i, seg) {
                //alert(seg.start_latlng[0]);
                seg_loc_data.points.push({
                    "name": seg.name,
                    "lat": seg.start_latlng[0],
                    "longval": seg.start_latlng[1],
                    "PID": seg.id,
                    "points": seg.points,
                    "endlat": seg.end_latlng[0],
                    "endlongval": seg.end_latlng[1],
                    "endlatlong": seg.end_latlng,
                    "dist": seg.distance,
                    "egain": seg.elev_difference,
                    "gain": seg.elev_difference
                });
                var latlng = seg.end_latlng;
                var segname = seg.name;
                // segname = segname.replace(/[^a-z0-9 ,.?!]/ig, '');
                segname = segname.replace("'", "");
                midhtml = midhtml + "<tr id=\"trow_" + seg.id + "\" class=\"hover_o\" onclick=\"poly_map(" + seg.id + "," + i + ")\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px\">" + segname + "</div>" +
                "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + seg.id + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + seg.id + "\"></div></td></tr>";


                ct++;
            });
            seg_loc_data.count.push({
                "num": ct
            });
            if (ct > 0) {
                //$('#refreshBtnmap').html("<a class=\"btn btn-primary btn-sm\" href=\"#tableback\" onclick=\"refreshWeather('map'," + ct + ")\" id=\"refreshStarsbtn\">Get weather for " + ct + " Segments</a>");

                $('#mapWind').show();  //aaa
            } else {
                $('#refreshBtnmap').html("");
                $('#mapWind').hide(); //aaa
            }
            var ht = parseInt((ct * 48) + 50);
            $('#tableback_map').height(ht);
            var jsonsegs = JSON.stringify(seg_loc_data);
            localStorage.setItem('seg_loc_data', jsonsegs);


            var json_loc = { "points": [{ "lat": tlat, "longval": tlng, "name": "You are here!", "PID": "1" }] };
            $.each(seg_loc_data.points, function (i, markers) {
                // console.log(json);
                //      alert("hihi");
                $('#stars_n' + markers.PID).html("<p>stars n</p>");
                if (markers.PID == parseInt(PID)) {
                    //   var image = 'marker_search.png';
                    //ListComments(markers.PID);
                    $('#place_name').html(markers.name);
                } else if (markers.PID == 1) {
                    //   var image = 'marker_search.png';
                } else {
                    var image = '/Content/map_marker_start.png';
                }
                //var infoWindow = new google.maps.InfoWindow({ content: 'Place ID' + markers.PID });
                var siteLatLng = new google.maps.LatLng(markers.lat, markers.longval);
                //var markerp = new google.maps.Marker({ 'position': siteLatLng, 'icon': image });
                var markerp = new google.maps.Marker({ 'position': siteLatLng, 'map': map, 'icon': image });
                var endLatLng = new google.maps.LatLng(markers.endlat, markers.endlongval);
                var endpos = "(" + markers.endlatlong + ")";
                //     alert(endpos);

                if (markers.name == "You are here!") {
                } else {
                    markers_array.push(markerp);
                }

                //   alert(markers.points);
                //   alert(returnpoly(markers.points));
                //console.log("marker " + markers.PID);
                //initMap("}g|eFnm@n@Op@VJr@");
                google.maps.event.addListener(markerp, "click", function () {
                    //$('#map_markers').fadeOut().html("<p>Click: " + markers.name + markers.PID + "</p>").fadeIn();

                    //highlight table entry
                    var marker_end = new google.maps.Marker({ 'position': endLatLng, 'map': map, 'icon': image });
                  
                    var images = '/Content/map_marker_end.png';
                    addPolyline(returnpoly(markers.points)).setMap(map);
                    $('table tbody tr').each(function (index, el) {

                        $(this).siblings().removeClass('sel_p');

                    });
                    jQuery('#trow_' + markers.PID).addClass('sel_p').removeClass('un_sel').removeClass('sel');
                });

            });

            var top = "<div id=\"ttop_map\"><table class=\"table table-striped\">"

            $('#map_table').html(top + midhtml + "</table></div>");
            //var mcOptions = { gridSize: 50, maxZoom: 18 };
            //var markerCluster = new MarkerClusterer(map, markers_array, mcOptions);
            $("#winfomap").html("Found " + ct + " segments");
            if (ct > 0) {
                var zoom = localStorage.getItem("zoommap");
                if (zoom >= 12) {
                    $('#winfomap').append("<br/>Retrieve one segment's weather to see all star ratings in this view");
                }
                displayStarsmap(24, ct); //aaa
                drawWindcanvas(null, 0, 5, ct);
                parse("map");

            }
        }).fail(function (err) {
            //alert("fail");
        });

    });


}




function format_bounds(bds) {
    //console.log(bds);
    var bds2 = bds.replace("((", "");
    var bds3 = bds2.replace("))", "");
    var bds4 = bds3.replace("), (", ",");
    var bds5 = bds4.replace(" ", "");
    var bds6 = bds5.replace(" ", "");

    var bdsar = bds6.split(',');
    var lat = (parseFloat(bdsar[2] - bdsar[0])) + parseFloat(bdsar[0]);
    var lng = (parseFloat(bdsar[3] - bdsar[1])) + parseFloat(bdsar[1]);

    //console.log("lat=" + lat + "lng=" + lng);
    return (bds6);
}

function backMap() {
    $('#map_table').show();
    $('#seg_data').hide();
    $('#seg_weather').hide();
    $('#seg_details').hide();
    $('#map_activities').show();
    $('#map_canvas_nearby').show();
    $('#deets_tile').hide();
    $('html, body').animate({
        scrollTop: $("#seg_nearby").offset().top
    }, 2000);
}

function backAct() {

    $('html, body').animate({
        scrollTop: $("#my_activities").offset().top
    }, 2000);

}



function showEfforts(ID, type, frID) {
    var canvas = document.getElementById('segeff');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    // var effs = localStorage.getItem('eff_data_' + ID);
    console.log(ID);
    if (frID != null) {
        var effs = localStorage.getItem('eff_data_' + ID + '_' + frID);
    } else {
        var effs = localStorage.getItem('eff_data_' + ID);
    }
    if (effs == null) {
        $('#seg_weather').hide();
        $('#seg_leaderboard').hide();
        $('#seg_efforts').show();
        $('#sgdata').html("Retrieving segment efforts ...");
        if (frID != null) {
            stEffort(ID, frID, type); //add frID to 
        } else {
            stEffort(ID, null, type);
        }
        //save to _seg_efforts
    } else {
        if (frID != null) {
            drawSegEffort(ID, frID); //add frID to 
        } else {
            drawSegEffort(ID, null);
        }

    }

}

function poly_map(ID, i) {
    //  $('#map_table').hide();
    $('table tbody tr').each(function (index, el) {
        $(this).siblings().removeClass('sel');
    });

    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel').removeClass('sel_p');
    $('#seg_data').show();
    $('#seg_weather').show();
    $('#data_pills').show();
    $('#seg_details').show();
    $('#pills_row').show();
    $('#data_pills').show();
    $('#deets_tile').show();
    $('html, body').animate({
        scrollTop: $("#seg_title").offset().top
    }, 2000);
   
    $('#static_map').fadeIn();
    var json = localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + json + ')');
    //alert(json);
    var dist = j2.points[i].dist;
    var egain = j2.points[i].gain;
    var name = j2.points[i].name;
    var latlng = getLatlng(ID, "map");
    var fstate = localStorage.getItem(ID + "_fav");
    if (fstate == null) {
        fstate = 1;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','map','" + dist + "','" + egain + "')\"><i class=\"fa fa-heart-o\"></li></button>";
    } else {
        fstate = 0;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','map','" + dist + "','" + egain + "')\"><i class=\"fa fa-heart\"></li></button>";
    }
    $('#favBtn').html(favbtn);
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + egain + "</bold></p>");
    //$('#leaderboardBtn').html(Lbbtn);
    $('#backBtn').html(favbtn);
    // $('#favBtn').html(favbtn);
    var type = "map";
    $('#ultop > li').each(function (index, el) {
        //     alert($(this)[0]);
        $(this).siblings().find('p').removeClass('sel');

    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');
    var effs = localStorage.getItem('eff_data_' + ID);
    if (effs == null) {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'map')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
"</div></div>");
    } else {

        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'map')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
"</div></div>");
    }


    var pl = j2.points[i].points;
    drawMap(pl);



    p1 = 0
    p2 = 0
    p3 = 0
    p4 = 0
    p5 = 0
    p6 = 0
    p7 = 0
    p8 = 0
    p9 = 0
    p10 = 0
    p11 = 0
    p12 = 0;
    totalDist = 0
    $('#title').html(name);
    //decodepoly(pl, ID);
    drawChart(ID);

    drawWeather(ID, 'map');


}



function polyF(ID) {
    $('#deets_tile').show();
    var canvas = document.getElementById('weather_stars');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 130, 2000);
    var scroll = true;
    $('#seg_data').show();
    $('#pills_row').show();
    $('#seg_weather').show();
    $('#deets_tile').show();
    $('#data_pills').show();
    $('#seg_details').show();
    $('#static_map').fadeIn();
    var pl = localStorage.getItem(ID + "_poly");
    if (scroll == true) {
        $('html, body').animate({
            scrollTop: $("#seg_title").offset().top
        }, 2000);
    }

    var fstate = localStorage.getItem(ID + "_fav");
    var j2 = eval('(' + fstate + ')');

    var name = j2.segs[0].name;
    var latlng = j2.segs[0].latlng;
    var type = "favs";
    var dist = j2.segs[0].dist;
    var gain = j2.segs[0].gain;
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("");
    $('#seg_egain').html("");
    if (fstate == null) {
        fstate = 1;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "')\"><i class=\"fa fa-heart-o\"></li></button>";
    } else {
        fstate = 0;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "')\"><i class=\"fa fa-heart\"></li></button>";
    }
    $('#favBtn').html(favbtn);

    $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'" + type + "')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ",'" + type + "')\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
"</div></div>");
    drawWeather(ID, type);

    drawMap(pl);
    drawChart(ID);

    p1 = 0
    p2 = 0
    p3 = 0
    p4 = 0
    p5 = 0
    p6 = 0
    p7 = 0
    p8 = 0
    p9 = 0
    p10 = 0
    p11 = 0
    p12 = 0;
    totalDist = 0
}


function setFav(ID, fstate, name, latlng, type, dist, gain) {
        
    if (fstate == 0) {
        //remove 
        localStorage.removeItem(ID + "_fav")
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + ",1,'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart-o\"></li></button>";
        // getAct('favs');
    } else {
        var strava_segs = {
            segs: []
        };
        console.log(name + " " + latlng);
        strava_segs.segs.push({
            "name": name,
            "latlng": latlng,
            "type": type,
            "dist": dist,
            "gain": gain
            //"seg_efforts" : data[i]['segment_efforts']
        });
        var jsonsegs = JSON.stringify(strava_segs);
        localStorage.setItem(ID + "_fav", jsonsegs);
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + ",0,'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart\"></li></button>";
    }

    $('#favBtn').html(favbtn);
   

}


function polySegs(ID, i, name) {
    //$('#table_calc_area2').hide();
    //$('#my_activities').hide();
    //$('#act_table_header').hide();
    //    $('#seg_data').show();
    //    $('#seg_weather').show();
    g1.refresh(0);
    //    $('#deets_tile').show();
    $('#pills_row').show();
    $('#data_pills').show();
    //    $('#seg_details').show();
    $('#static_map').fadeIn();
    $('html, body').animate({
        scrollTop: $("#seg_title").offset().top
    }, 2000);
    $('#ultop > li').each(function (index, el) {
        //     alert($(this)[0]);
        $(this).siblings().find('p').removeClass('sel');

    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');

    //alert(i + name);
    var json = localStorage.getItem('all_seg_efforts');
    var j2 = eval('(' + json + ')');
    var dist = j2.segs[i].dist;
    var kom_rank = j2.segs[i].kom_rank;
    var parentID = j2.segs[i].parentID;
    var priv = j2.segs[i].private;
    var elev_h = j2.segs[i].elev_h;
    var elev_l = j2.segs[i].elev_l;
    var gain = parseInt(elev_h) - parseInt(elev_l);
    //var egain = j2.segs[i].egain;
    //  var Lbbtn ="<button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"showLeader(" + ID +"," + parentID + ")\">Leaderboard</button>";
    var Sebtn = "<button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"showEfforts(" + parentID + ")\">Segment Efforts l</button>";
    var Backbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"backAct()\">Back</button>";
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");
    // $('#leaderboardBtn').html(Lbbtn);
    $('#backBtn').html(Backbtn);
    // $('#seBtn').html(Sebtn);
    //$('#seg_details').html(top_html + side_html);
    var pl = localStorage.getItem(ID + "_poly");
    //var pl = j2.segs[i].poly;
    var type = "segs";
    if (priv == false) {
        $('#data_pills').html("<div style=\"padding-bottom:15px\"><button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"lpill\" onclick=\"saveFav(" + ID + ")\">" +
      "Save to Favorites</button><div id=\"fav_msg\" class=\"msg_sml\" style=\"display:inline-block;padding-left:20px\"></div></div>" +
     //"</div>" +
      "<div class=\"btn-group btn-group-s\" role=\"group\">" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'act')\">Weather</button>" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
     // "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showPhotos(" + ID + ")\">Photos</button>" +
      "</div>");

    } else {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
 "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'act')\">Weather</button>" +
 "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
 "</div></div>");
    }



    // $('#data_pills').html(ddmenu);

    drawMap(pl);
    drawChart(ID);
    drawWeather(ID, 'act');
    $('#location').append(ID + "poly2" + pl + "</br>");
    p1 = 0
    p2 = 0
    p3 = 0
    p4 = 0
    p5 = 0
    p6 = 0
    p7 = 0
    p8 = 0
    p9 = 0
    p10 = 0
    p11 = 0
    p12 = 0;
    totalDist = 0
    //    $('#title').html(name);
    //decodepoly(pl, ID);


}

function saveFav(ID) {
    $('#fav_msg').html("Saving ..");

}


function drawMap(poly) {

    var mapStyle = [{ elementType: "geometry", stylers: [{ hue: "#ff4400" }, { saturation: -68 }, { lightness: -4 }, { gamma: .72 }] }, { featureType: "road", elementType: "labels.icon" }, { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ hue: "#0077ff" }, { gamma: 3.1 }] }, { featureType: "water", stylers: [{ hue: "#00ccff" }, { gamma: .44 }, { saturation: -33 }] }, { featureType: "poi.park", stylers: [{ hue: "#44ff00" }, { saturation: -23 }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ hue: "#007fff" }, { gamma: .77 }, { saturation: 65 }, { lightness: 99 }] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ gamma: .11 }, { weight: 5.6 }, { saturation: 99 }, { hue: "#0091ff" }, { lightness: -86 }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ lightness: -48 }, { hue: "#ff5e00" }, { gamma: 1.2 }, { saturation: -23 }] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ saturation: -64 }, { hue: "#ff9100" }, { lightness: 16 }, { gamma: .47 }, { weight: 2.7 }] }];
    var bwstyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0f252e"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2fb4c8"
            },
            {
                "lightness": 50
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 80
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0f252e"
            },
            {
                "lightness": 100
            }
        ]
    }
    ];
    var src = get_static_style(bwstyle);

    //$("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&"+src+"\">");

    //var map = "<img src=\"https://maps.googleapis.com/maps/api/staticmap?size=150x150&path=weight:3%7Ccolor:orange%7Cenc:" + poly + "&" + src + "&key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog\" alt=\"    Offline\" />";
    var map = "<img src=\"https://maps.googleapis.com/maps/api/staticmap?size=150x150&path=weight:3%7Ccolor:red%7Cenc:" + poly + "&key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog\" alt=\"<br> Offline\" />";
    $('#static_map').html(map);

}

function get_static_style(styles) {
    var result = [];
    styles.forEach(function (v, i, a) {

        var style = '';
        if (v.stylers) { // only if there is a styler object
            if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
                style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
                style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
                v.stylers.forEach(function (val, i, a) {
                    var propertyname = Object.keys(val)[0];
                    var propertyval = val[propertyname].toString().replace('#', '0x');
                    style += propertyname + ':' + propertyval + '|';
                });
            }
        }
        result.push('style=' + encodeURIComponent(style));
    });

    return result.join('&');
}

function maptest() {
    //  alert("hi");
    var mapStyle = [{ elementType: "geometry", stylers: [{ hue: "#ff4400" }, { saturation: -68 }, { lightness: -4 }, { gamma: .72 }] }, { featureType: "road", elementType: "labels.icon" }, { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ hue: "#0077ff" }, { gamma: 3.1 }] }, { featureType: "water", stylers: [{ hue: "#00ccff" }, { gamma: .44 }, { saturation: -33 }] }, { featureType: "poi.park", stylers: [{ hue: "#44ff00" }, { saturation: -23 }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ hue: "#007fff" }, { gamma: .77 }, { saturation: 65 }, { lightness: 99 }] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ gamma: .11 }, { weight: 5.6 }, { saturation: 99 }, { hue: "#0091ff" }, { lightness: -86 }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ lightness: -48 }, { hue: "#ff5e00" }, { gamma: 1.2 }, { saturation: -23 }] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ saturation: -64 }, { hue: "#ff9100" }, { lightness: 16 }, { gamma: .47 }, { weight: 2.7 }] }];
    var src = get_static_style(mapStyle);

    $("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&" + src + "\">");
}

var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;
var latlongkml = [];
function decodeKML() {
    var kml = localStorage.getItem("kml1");
    var kmlarr = kml.split(" ");

    console.log("kmlarr:" + kmlarr);
    for (var i = 0; i < kmlarr.length; i++) {
        if (kmlarr[i + 1] != undefined) {
            var cords = kmlarr[i].split(",");
            var cords1 = kmlarr[i + 1].split(",");
            // alert(myStringArray1[i] + " ... " + myStringArray1[i + 1]);
            //getDistance(myStringArray1[i], myStringArray1[i + 1]);

            // latlongkml.push("(" + cords[1] + ", " + cords[0] + ")", "(" + cords1[1] + ", " + cords1[0] + ")");
            var xyz = new google.maps.LatLng(parseFloat(cords[1]).toFixed(2), parseFloat(cords[0]).toFixed(2));
            latlongkml.push(xyz);
        }
    }

    decodepoly(null, 000, 111, "kml");
}

function decodepoly(polyline, ID, parentID, type) {

    $('#location').append(polyline + " " + ID + " " + parentID + "</br>");
    p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;
    totalDist = 0;
    if (type == "kml") {
        var myStringArray1 = latlongkml;
        var myStringArray2 = latlongkml;
        var arrayLength2 = latlongkml.length;
        var arrayLength1 = latlongkml.length;

    } else {
        var latlong = "ll";
        var latlong2 = "ll";
        //alert(ID + "  " + polyline);
        latlong = google.maps.geometry.encoding.decodePath(polyline);
        latlong2 = latlong;
        //initMap(latlong);
        // alert(latlong);
        var myStringArray1 = latlong;
        var myStringArray2 = latlong2;
        var arrayLength2 = myStringArray2.length;
        var arrayLength1 = myStringArray1.length;
        //bearingArray(myStringArray2);
        // console.log(myStringArray1);
    }
    for (var i = 0; i < arrayLength1; i++) {
        getDistance(myStringArray1[i], myStringArray1[i + 1]);
        var plus1 = myStringArray1[i + 1];
        if ((plus1 != undefined) && (i == (arrayLength1 - 2))) {

            //bearingArray(myStringArray2, totalDist, ID);
            var arrayLength1 = myStringArray1.length;
            //alert("i=" + i + " " + arrayLength1);
            //  getBearing(myStringArray1[i], myStringArray1[i + 1], totalDist);

            for (var i = 0; i < arrayLength1; i++) {
                var latlng1 = myStringArray1[i];
                var latlng2 = myStringArray1[i + 1];
                if (latlng2 != undefined) {
                    var bearing = google.maps.geometry.spherical.computeHeading(latlng1, latlng2);
                    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
                }
                if (bearing != null) {
                    var percent = calcDistProp(dist, totalDist);
                    dist = Math.round(parseInt(dist));
                    bearing = Math.round(parseInt(bearing));
                    if (bearing < 0) {
                        bearing = calcBearing(bearing);
                    }
                    //$('#location').append("bearing= " + bearing + " percent= " + percent + "</br>");
                    //whichP(bearing, percent);  make it return > save
                    //alert(ID + "i="+i + " b=" + bearing);
                    if (bearing < 30) {
                        p1 = p1 + (percent / 100);
                    }
                    if (bearing >= 30 && bearing < 60) {
                        p2 = p2 + (percent / 100);
                    }
                    if (bearing >= 60 && bearing < 90) {
                        p3 = p3 + (percent / 100);
                        //alert(p3);
                    }
                    if (bearing >= 90 && bearing < 120) {
                        p4 = p4 + (percent / 100);
                    }
                    if (bearing >= 120 && bearing < 150) {
                        p5 = p5 + (percent / 100);
                    }
                    if (bearing >= 150 && bearing < 180) {
                        p6 = p6 + (percent / 100);
                    }
                    if (bearing >= 180 && bearing < 210) {
                        p7 = p7 + (percent / 100);
                        // alert("p7=" + p7);
                    }
                    if (bearing >= 210 && bearing < 240) {
                        p8 = p8 + (percent / 100);
                    }
                    if (bearing >= 240 && bearing < 270) {
                        p9 = p9 + (percent / 100);
                    }
                    if (bearing >= 270 && bearing < 300) {
                        p10 = p10 + (percent / 100);;
                    }
                    if (bearing >= 300 && bearing < 330) {
                        p11 = p11 + (percent / 100);
                    }
                    if (bearing >= 330 && bearing < 360) {
                        p12 = p12 + (percent / 100);
                    }

                }

                if (i == (arrayLength1 - 2)) {
                    //alert(ID + "endofarray " + (arrayLength1 - 2));
                    saveChart(ID);
                    // showP();

                }
            }
        }


    }


}

function returnpoly(polyline) {

    var latlong = [];


    latlong = google.maps.geometry.encoding.decodePath(polyline);

    return latlong;

}

function bearingArray(myStringArray1, totalDist, ID) {
    var arrayLength1 = myStringArray1.length;

    for (var i = 0; i < arrayLength1; i++) {
        var bearing = google.maps.geometry.spherical.computeHeading(latlng1, latlng2);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
        var percent = calcDistProp(dist, totalDist);
        dist = Math.round(parseInt(dist));
        bearing = Math.round(parseInt(bearing));
        if (bearing < 0) {
            bearing = calcBearing(bearing);
        }
        $('#result2').html("bearing= " + bearing + " percent= " + percent + "</br>");
        //whichP(bearing, percent);  make it return > save
        //alert(bearing);
        if (bearing < 30) {
            p1 = p1 + (percent / 100);
        }
        if (bearing >= 30 && bearing < 60) {
            p2 = p2 + (percent / 100);
        }
        if (bearing >= 60 && bearing < 90) {
            p3 = p3 + (percent / 100);
            //alert(p3);
        }
        if (bearing >= 90 && bearing < 120) {
            p4 = p4 + (percent / 100);
        }
        if (bearing >= 120 && bearing < 150) {
            p5 = p5 + (percent / 100);
        }
        if (bearing >= 150 && bearing < 180) {
            p6 = p6 + (percent / 100);
        }
        if (bearing >= 180 && bearing < 210) {
            p7 = p7 + (percent / 100);
            // alert("p7=" + p7);
        }
        if (bearing >= 210 && bearing < 240) {
            p8 = p8 + (percent / 100);
        }
        if (bearing >= 240 && bearing < 270) {
            p9 = p9 + (percent / 100);
        }
        if (bearing >= 270 && bearing < 300) {
            p10 = p10 + (percent / 100);;
        }
        if (bearing >= 300 && bearing < 330) {
            p11 = p11 + (percent / 100);
        }
        if (bearing >= 330 && bearing < 360) {
            p12 = p12 + (percent / 100);
        }



        //  getBearing(myStringArray1[i], myStringArray1[i + 1], totalDist);
        if (i == (arrayLength1 - 2)) {
            //alert(i + " " + (arrayLength1 - 2));
            saveChart(ID);
            // showP();

        }
    }
}


function whichW(bearing, speed) {
    //  alert(bearing + " .. " + percent);
    if (bearing < 30) {
        w1 = speed;
    }
    if (bearing >= 30 && bearing < 60) {
        w2 = speed;
    }
    if (bearing >= 60 && bearing < 90) {
        w3 = speed;
    }
    if (bearing >= 90 && bearing < 120) {
        p4 = p4 + (percent / 100);
    }
    if (bearing >= 120 && bearing < 150) {
        p5 = p5 + (percent / 100);
    }
    if (bearing >= 150 && bearing < 180) {
        p6 = p6 + (percent / 100);
    }
    if (bearing >= 180 && bearing < 210) {
        p7 = p7 + (percent / 100);
        // alert("p7=" + p7);
    }
    if (bearing >= 210 && bearing < 240) {
        p8 = p8 + (percent / 100);
    }
    if (bearing >= 240 && bearing < 270) {
        p9 = p9 + (percent / 100);
    }
    if (bearing >= 270 && bearing < 300) {
        p10 = p10 + (percent / 100);;
    }
    if (bearing >= 300 && bearing < 330) {
        p11 = p11 + (percent / 100);
    }
    if (bearing >= 330 && bearing < 360) {
        p12 = p12 + (percent / 100);
    }


}


function getP_foll(bearing) {
    //  alert(bearing + " .. " + percent);
    //  $('#bdata').append("folB: " + bearing + "</br>");
    if (bearing > 360) {
        bearing = bearing - 360;
    }
    if (bearing < 30 || bearing == 360) {
        return 7;
    }
    if (bearing >= 30 && bearing < 60) {
        return 8;
    }
    if (bearing >= 60 && bearing < 90) {
        return 9;
    }
    if (bearing >= 90 && bearing < 120) {
        return 10;
    }
    if (bearing >= 120 && bearing < 150) {
        return 11;
    }
    if (bearing >= 150 && bearing < 180) {
        return 12;
    }
    if (bearing >= 180 && bearing < 210) {
        return 1;
    }
    if (bearing >= 210 && bearing < 240) {
        return 2;
    }
    if (bearing >= 240 && bearing < 270) {
        return 3;
    }
    if (bearing >= 270 && bearing < 300) {
        return 4;
    }
    if (bearing >= 300 && bearing < 330) {
        return 5;
    }
    if (bearing >= 330 && bearing < 360) {
        return 6;
    }


}

function getP_head(bearing) {
    //  alert(bearing + " .. " + percent);
    //  $('#bdata').append("headB: " + bearing + "</br>");
    if (bearing > 360) {
        bearing = bearing - 360;
    }

    if (bearing <= -1) {
        return 1;
    }
    else if (bearing < 30 || bearing == 360) {
        return 1;
    }
    else if (bearing >= 30 && bearing < 60) {
        return 2;
    }
    else if (bearing >= 60 && bearing < 90) {
        return 3;
    }
    else if (bearing >= 90 && bearing < 120) {
        return 4;
    }
    else if (bearing >= 120 && bearing < 150) {
        return 5;
    }
    else if (bearing >= 150 && bearing < 180) {
        return 6;
    }
    else if (bearing >= 180 && bearing < 210) {
        return 7;
    }
    else if (bearing >= 210 && bearing < 240) {
        return 8;
    }
    else if (bearing >= 240 && bearing < 270) {
        return 9;
    }
    else if (bearing >= 270 && bearing < 300) {
        return 10;
    }
    else if (bearing >= 300 && bearing < 330) {
        return 11;
    }
    else if (bearing >= 330 && bearing < 360) {
        return 12;
    }
    else {
        return 1;
    }

}

function cleanPval(val) {
    if (val == undefined) {
        return 0;
        //   alert(val);
    }
    else if (val > 20) {
        return val;
    } else {
        return 0;
    }
}

function calcStars(val) {
    if (val > 4000) {
        return 5;
    }
    else if (val > 3000 && val <= 4000) {
        return 4;
    }
    else if (val > 2000 && val <= 3000) {
        return 3;
    }
    else if (val > 1000 && val <= 2000) {
        return 2;
    }
    else if (val > 0 && val <= 1000) {
        return 1;
    }
    else if (val <= 0) {
        return 0;
    }

    else return 0;

}

function drawIDstars(ID, ctx, i) {
    // var canvas2 = document.getElementById('stars_' + ID);
    // var ctx = canvas2.getContext('2d');
    //alert(canvas2);
    var y = 20;
    y = (20 * (i + 1));

    //ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    // ctx2d.font = '13px Arial Bold ';
    ctx.fillStyle = "#ffca4a";
    //  ctx.font = '10px Arial';
    //  ctx.fillText("hi", 0, 0);
    //  ctx.fillStyle = "#FF0000";
    //

    //ctx.fillRect(0, 10, 100, 15);
    //drawStarsF(ctx, 3, 0);
    //

    //star(ctx, 20, y, 10, 5, 0.5, "f");
    drawStarsF(ctx, 4, y, 10);


}

function getTimeW(ID) {
    var wdata = localStorage.getItem("weatherdata");
    var wdatap = eval('(' + wdata + ')');
    var epoch = 0;
    var datestr;
    var timenow = Math.round(new Date().getTime() / 1000);
    $.each(wdatap.wdata, function (i, wd) {
        // alert(wd.timestamp);
        if (wd.ID == ID) {
            epoch = wd.timestamp;
            datestr = wd.datestr;
        }
    });
    //alert(timenow + " " + epoch);
    console.log("epoch" + epoch);
    return datestr;

}



function getTimediff(ID, type) {
    var epoch = 0;
    var datestr;
    var timenow = Math.round(new Date().getTime() / 1000);
    if (type == "map") {
        var jsondata = localStorage.getItem(ID + "_weather_map");
        var parsed_json = eval('(' + jsondata + ')');
        if (jsondata == null) {
            return 50000001;
        } else {
            var firsthour = parsed_json.hourly_forecast[0].FCTTIME.epoch;
            console.log(firsthour)
            //epoch = wdatap.hourly_forecast[0].FCCTIME.civil;
            //console.log(epoch)
            return parseInt(timenow - firsthour);
        }
    } else {
        var wdata = localStorage.getItem("weatherdata");
        var wdatap = eval('(' + wdata + ')');
       
        var wdatac = localStorage.getItem(ID + "_weather_act");
        console.log(wdatac);
        if ((wdatap == null) || (wdatac == null)) {
            return 50000002;
        } else {
           
           
            $.each(wdatap.wdata, function (i, wd) {
                // alert(wd.timestamp);
                if (wd.ID == ID) {
                    epoch = wd.timestamp;
                }
            });
            //alert(timenow + " " + epoch);
            // alert("epoch" + epoch);
            return parseInt(timenow - epoch);
        }
    }
}

function getFriendFirstname(frID) {
    var json = localStorage.getItem('frdata');
    var j2 = eval('(' + json + ')');
    var firstname;
    $.each(j2.people, function (i, wd) {
        console.log(frID + " " + wd.ID);
        if (wd.ID == frID) { //or parentID
            //lat = wd.lat;
            // lng = wd.lng;
            firstname = wd.firstname;
        }
    });
    return firstname;
}
function getLatlng(ID, type) {
    
    if (type == 'map') {
        var json = localStorage.getItem('seg_loc_data');
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;
        $.each(j2.points, function (i, wd) {
            console.log(ID + " " + wd.PID);
            if (wd.PID == ID) { //or parentID
                latlng = wd.endlatlong;
            }
        });
        return latlng;
    } else if (type == 'stars') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;
       
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                console.log(wd.latlng)
                latlng = wd.latlng;
            }
        });
        return latlng;
    

    }  else if (type == 'segs') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;

        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                console.log(wd.latlng)
                latlng = wd.latlng;
            }
        });
        return latlng;
    }

    else if (type == 'kom') {
        var stravaID = localStorage.getItem("frID");
        var json = localStorage.getItem('komdata_' + stravaID);
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                console.log(wd.latlng)
                latlng = wd.latlng;
            }
        });
        return latlng;
    }
    else if (type == 'favs') {
        console.log("ty" + type)
        var json = localStorage.getItem(ID + "_fav");
        var j2 = eval('(' + json + ')');
        
        var latlng = j2.segs[0].latlng;
      
        return latlng;
    }
}

function getSegName(ID, type) {

    if (type == 'map') {
        var json = localStorage.getItem('seg_loc_data');
        var j2 = eval('(' + json + ')');
        var name
        $.each(j2.points, function (i, wd) {  
            if (wd.PID == ID) { //or parentID      
                name = wd.name;
            }
        });
      
        return name;
    } else if (type == 'stars') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var name;
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                name = wd.name;
            }
        });
        //alert(timenow + " " + epoch);
        return name;


    } else if (type == 'segs') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var name
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID            
                name = wd.name;
            }
        });
        //alert(timenow + " " + epoch);
        return name;
    }

    else if (type == 'kom') {
        var stravaID = localStorage.getItem("frID");
        var json = localStorage.getItem('komdata_' + stravaID);
        var j2 = eval('(' + json + ')');
        var name
        //var timenow = Math.round(new Date().getTime() / 1000);
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                name = wd.name;
            }
        });
        //alert(timenow + " " + epoch);
        return name;
    }
}

function getParent(ID) {

    var json = localStorage.getItem('all_seg_efforts');
    var j2 = eval('(' + json + ')');

    var PID;
    //alert(ID + " " + wdata);
    //var timenow = Math.round(new Date().getTime() / 1000);
    $.each(j2.segs, function (i, wd) {
        if (wd.ID == ID) {
            lat = wd.lat;
            lng = wd.lng;
            latlng = lat + "," + lng;
        }
    });
    //alert(timenow + " " + epoch);
    return PID;

}

function prettify(diff) {


    var str;
    var sec_num = parseInt(diff, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var days = Math.floor(hours / 24);
    //if (hours < 10) { hours = "0" + hours; }
    //if (minutes < 10) { minutes = "0" + minutes; }
    //if (seconds < 10) { seconds = "0" + seconds; }
    if (days == 1) {
        var time = days + " day ago";
    } else if (days > 0) {
        var time = days + " days ago";
    }
    if (days == 0) {
        if (hours == 0) {
            if (minutes == 0) {
                var time = seconds + " seconds ago";
            } else {
                var time = minutes + " minutes ago";
            }
        } else {
            if (hours == 1) {
                var time = hours + " hour ago";
            } else {
                var time = hours + " hours ago";
            }

        }

    }
    // var time = days + ":" + hours + ':' + minutes + ':' + seconds;
    //return time;
    //   var date = new Date(null);
    // date.setSeconds(diff); // specify value for SECONDS here
    //  str = date.toISOString().substr(11, 8);

    //   if ((diff / 60) < 0) {
    //just now
    //       str = "just now."
    //   } else if (parseInt(diff / 60) > 0 && parseInt(diff / 60) < 60) {
    //minutes
    //       str = parseInt(diff / 60) + " minutes ago.x"
    //   } else {
    //hours
    //       str = parseInt(diff / 360) + " hours ago.h"
    //   }
    return time;
}



function drawWeather(ID, type) {
    //var bdata = localStorage.getItem(ID+"_array");
    console.log("draw" + ID + type)
    var starvals = {
        stardata: []
    };

    var bearing_store = ID + "_array";
    $('#seg_leaderboard').hide();
    $('#seg_efforts').hide();
    $('#seg_weather').show();
    $('#lb_table').hide();
    $('#eff_table').hide();
    var jsondata;
    var latlng = getLatlng(ID, type);
    if (type == 'map') {
        var jsondata = localStorage.getItem(ID + "_weather_map");
    } else {
        var jsondata = localStorage.getItem(ID + "_weather_act");
    }
    // var jsondata = localStorage.getItem(ID + "_weather");
    if (jsondata != null) {
        $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Refresh Weather</a>");
        var bdata = localStorage.getItem(bearing_store);
        var parsed_json = eval('(' + jsondata + ')');
        //alert(parsed_json);
        var cutoff = parseInt("16");
        var country = parsed_json['location']['country_name'];
        var location = parsed_json['location']['city'];
        //alert(location);
        var locstr = location + ", " + country
        // var timediff = getTimediff(ID);
        var wdate = getTimeW(ID);
        $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather for " + location + ", " + country + "</div>");
        //var theDatas = new Lawnchair('data');
        var timenow = new Date();
        var hour_now = timenow.getHours();
        var today = timenow.getDate();
        // var timesaved = theJsonData.timesaved;
        //if (age == "olddata") {
        //    $('#loc_result').append("<br /> cached data from: " + age);
        // }
        //  var country = parsed_json['location']['country'];
        //alert("saved= " + json_data);
        var posy = 4; //54;
        var posyt = 15; //65;
        var canvas = document.getElementById('weather');
        var canvasr = document.getElementById('weather_stars');
        //   canvas.width = 350;
        // canvas.height = 1500;
        //   canvas.style.width = '350px';
        //   canvas.style.height = '1500px';
        var ctx2d = canvas.getContext('2d');
        var ctx2dr = canvasr.getContext('2d');
        ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
        ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx2d.fillRect(0, 0, 360, 2000);
        ctx2dr.clearRect(0, 0, ctx2dr.canvas.width, ctx2dr.canvas.height);
        ctx2dr.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx2dr.fillRect(0, 0, 350, 2000);

        var ni = 1;
        var done_dt = 0;
        var first_hour = -1;
        hour_bg_bk = "000";
        var totalsnow = 0;
        //var diff = (Math.round(new Date().getTime() / 1000) - epochdata) / 360;
        //var hours = Math.round(diff);
        var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';
        ctx2d.strokeStyle = "#2fb4c8";
        ctx2d.save();


        $.each(parsed_json.hourly_forecast, function (i, zone) {
            //ctx2d.restore();


            var imgi = new Image();
            imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif" //"http://icons.wxug.com/i/c/i/" + zone.icon + ".gif";
            var ws = (parseInt(zone.wspd.english) * 5) + 10;
            var temp = (parseInt(zone.temp.metric) * 3) + 10;
            var winddeg = parseInt(zone.wdir.degrees);
            var epoch = zone.FCTTIME.epoch;
            var start = 59;
            if (parseInt(zone.temp.metric) < 1) {
                start = 42 + (parseInt(zone.temp.metric) * 3);
                temp = 53 - start;
            }
            var hour = zone.FCTTIME.hour;
            if (hour > 12) {
                hour = hour - 12
            }
            var sky = parseInt(zone.sky);
            var rain_txt = parseInt(zone.qpf.metric);

            var rain = (parseInt(zone.qpf.metric) * 20) + 10;
            var snowlen = Math.round(zone.snow.metric);
            totalsnow = totalsnow + Math.round(zone.snow.metric);

            var snow = (parseInt(zone.snow.metric) * 2) + 10;
            var hour_bg_bk = "9F9F9F";
            var border = "2fb4c8";
            var wind_bg = "51D251";
            var temp_bg = "FFB336";
            var wind_txt = "2f3e46";
            var temp_txt = "FFF";
            var ampm = zone.FCTTIME.ampm;
            if (first_hour == -1) {
                first_hour = zone.FCTTIME.hour;
            }
            var humid = parseInt(zone.humidity);
            var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);
            var new_score = 0;

            if (humid < 80) {
                new_score = Math.round((parseInt(zone.wspd.metric) * 3) + (parseInt(zone.temp.metric) * 2) + (100 - sky));

            }

            var cond = zone.condition;

            var yday = parseInt(zone.FCTTIME.yday);
            var hour_padded = parseInt(zone.FCTTIME.hour);
            var civil = parseInt(zone.FCTTIME.civil);
            var day = zone.FCTTIME.weekday_name;
            var mon = zone.FCTTIME.month_name;
            var mday = zone.FCTTIME.mday;
            var userhtml = " ";
            var longtime = zone.FCTTIME.pretty;
            ctx2d.font = '20px Arial';
            ctx2d.fillStyle = '#FFF';
            if (hour < 10) {

                ctx2d.fillText(hour, 14, posyt + 10);
            } else {
                ctx2d.fillText(hour, 4, posyt + 10);
            }
            //alert(hour);
            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);
            ctx2d.fillText(day, 5, posyt + 20);
            ctx2d.fillText(mday + " " + mon, 5, posyt + 30);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(30, posy + 55);
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

            //ctx2d.lineTo(40, -5);
            //ctx2d.lineTo(40, -10);
            //c/tx2d.lineTo(50, 0);
            //ctx2d.lineTo(40, 10);
            //ctx2d.lineTo(40, 5);
            //ctx2d.lineTo(30, 5);
            //ctx2d.lineTo(30, -5);

            ctx2d.closePath();
            ctx2d.fill();
            ctx2d.stroke();
            //ctx2d.rotate(-(20*Math.PI/180));
            ctx2d.restore();



            //wind
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(59, posy + 42, ws + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            //  ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 80, posyt + 46);
            ctx2d.fillText(zone.wspd.metric, 62, posyt + 46);
            ctx2d.fillStyle = "#2fb4c8";

            //cond
            ctx2d.fillText(cond, 59, posyt + 6);  //was cond


            //temp
            //      ctx2d.fillStyle = "#66A68B";
            //      ctx2d.fillRect(start, posy + 32, temp, 16);
            ctx2d.font = '16px Arial';
            //        ctx2d.fillStyle = temp_txt;
            ctx2d.fillText(zone.temp.metric, (start), posyt + 27);//33
            ctx2d.fillText("°C", (start + 15), posyt + 27);//33


            //rain
            if (rain == 10 || zone.qpf.metric.length == 0) {
            } else {
            }
            total_score = total_score + new_score;

            dt_ct = dt_ct + 1;
            var brg = winddeg;
            //alert(brg);
            var pval0f = getP_foll(brg);
            // alert(pval0f);
            var pval1f = pval0f - 1; //add +1 60
            var pval2f = pval0f + 1;
            var pval3f = pval0f - 2 //add +1 60
            var pval4f = pval0f + 2;

            var pval0h = getP_head(brg);
            var pval1h = pval0h - 1;
            var pval2h = pval0h + 1;
            var pArray = bdata.split(',');
            var arval1f = parseInt(pArray[pval0f - 1]); //brg
            var arval2f = parseInt(pArray[pval1f - 1]);
            var arval3f = parseInt(pArray[pval2f - 1]);
            var arval4f = parseInt(pArray[pval3f - 1]);
            var arval5f = parseInt(pArray[pval4f - 1]);
            var arval1h = parseInt(pArray[pval0h - 1]);  //brg
            var arval2h = parseInt(pArray[pval1h - 1]);
            var arval3h = parseInt(pArray[pval2h - 1]);
            //  alert(arval3h);
            var windspeed = zone.wspd.metric;
            //windspeed = 20;
            arval1f = cleanPval(arval1f);
            arval2f = cleanPval(arval2f);
            arval3f = cleanPval(arval3f);
            arval4f = cleanPval(arval4f);
            arval5f = cleanPval(arval5f);
            arval1h = cleanPval(arval1h);
            arval2h = cleanPval(arval2h);
            arval3h = cleanPval(arval3h);

            var brgf0 = arval1f * windspeed;
            var brgf1 = parseInt(arval2f * windspeed) * 0.75;
            var brgf2 = parseInt(arval3f * windspeed) * 0.75;
            var brgf3 = parseInt(arval4f * windspeed) * 0.5;
            var brgf4 = parseInt(arval5f * windspeed) * 0.5;
            var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
            var brgh1 = parseInt(arval2h * windspeed) * 0.75;
            var brgh2 = parseInt(arval3h * windspeed) * 0.75;
            console.log(brgf0 + " " + brgf1 + " " + brgf2)
            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2) + parseInt(brgf3) + parseInt(brgf4); //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
            //head_wind_val = brgh0;
            //alert(brgh0);
            console.log("new" + parseInt(brgf3) + " " + parseInt(brgf4))
            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
            // $('#bdata').append("starval:" + starval + "</br>");
            var numstars = 0;

            //var head_wind_val
            // alert(starval);
            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#f93";
            // ctx2d.fillText(brg + "." + pval0f + "." + arval1f + " .. " + (brg - 30) + "." + pval1f + "." + arval2f + " .. " + (brg + 30) + "." + pval2f + "." + arval3f + " " + foll_wind_val + "stm:" + numstars, 53, posyt);
            // ctx2d.fillText(brg + "." + pval0h + "." + arval1h + " .. " + (brg - 30) + "." + pval1h + "." + arval2h + " .. " + (brg + 30) + "." + pval2h + "." + arval3h + " " + head_wind_val + "st:" + starval, 53, posyt + 32);
            ctx2d.font = '13px Arial Bold';
            ctx2d.fillStyle = "#ffca4a";
            //if (foll_wind_val > 20 || 
            ctx2dr.fillStyle = "#ffca4a";

            if (starval <= 0) {
                drawStarsO(ctx2dr, 5, posy + 30, 9);
            } else {
                numstars = calcStars(starval);
                drawStarsF(ctx2dr, numstars, posy + 30, 9);
            }

            // console.log(numstars);
            if (dt_ct < 25) {
                starvals.stardata.push({
                    "stars": numstars,
                    "hour": hour,
                    "wspd": windspeed,
                    "SegID": ID,
                    "timestamp": longtime,
                    "epoch": epoch
                });
            }

            //star(ctx2d, 260, posy + 30, 10, 5, 0.5, "f");
            //star(ctx2d, 295, posy + 30, 10, 5, 0.5, "f");
            //star(ctx2d, 330, posy + 30, 10, 5, 0.5, "o");
            posy = posy + 76;
            posyt = posyt + 76;
            // ctx2d.save();

        });
        //  console.log(starvals.stardata
        var locupdate = localStorage.getItem("locupdate");
        if (locupdate == false) {
            saveSegment(null, ID, null, null, null, null, locstr);
            localStorage.setItem("locupdate", true);
        } else {

        }
        var maxPpg = getMax(starvals.stardata, "stars");
        var loc = location + ", " + country
        console.log(JSON.stringify(starvals) + " " + maxPpg.SegID + " - " + maxPpg.stars);
        if (type == "act") {
            var priv = checkSegisAct(ID);
        } else {
            var priv = false;
        }
        var segName = getSegName(ID, type);

       
    } else {
        var canvas = document.getElementById('weather');
        var canvasr = document.getElementById('weather_stars');
        var ctx2d = canvas.getContext('2d');
        var ctx2dr = canvasr.getContext('2d');
        ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
        ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx2d.fillRect(0, 0, 360, 2000);
        ctx2dr.clearRect(0, 0, ctx2dr.canvas.width, ctx2dr.canvas.height);
        ctx2dr.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx2dr.fillRect(0, 0, 350, 2000);
        $('#refreshBtnW').show();
        $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather not yet retrieved</div>");
        var latlng = getLatlng(ID, type);
        if (type != 'map') {
            $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Retrieve Weather</a>");
        } else {
            $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Retrieve Weather</a>");
        }
        //     $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#tableback_map\" onclick=\"getW('" + latlng + "'," + ID + ", 'stars')\">Retrieve Weather</a>");
        //no weather data for ID
    }

}

function getMax(arr, prop) {
    var max;
    for (var i = 0 ; i < arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function calcStarsInline(ID, hrs, type) {

    var starvals = {
        stardata: []
    };

    //   alert(ID);
    var bearing_store = ID + "_array";
    //var ID2 = "421422146";
    //alert(bearing_store);
    //var bdata = JSON.parse(localStorage.getItem(bearing_store)); //eval
    var bdata = localStorage.getItem(bearing_store);
    //var bdata = eval('(' + bearing_json + ')');
    //readW();
    //alert(hrs);
    var latlng = getLatlng(ID, "stars")
    var jsondata;
    if (type == 'map') {
        jsondata = localStorage.getItem(ID + "_weather_map");
        drawWindcanvas(null, 0, 5, 0);
    } else {
        jsondata = localStorage.getItem(ID + "_weather_act");
    }
    if (jsondata != null) {
        //  = localStorage.getItem(ID+"_weather");
        // alert(jsondata);
        var parsed_json = eval('(' + jsondata + ')');
        //  alert(bdata + jsondata);
        var star_avg = 0;
        var stars_tot = 0;
        var diff = 3;
        var ct = 3;
        if (hrs == 24) {
            //hrs = 24;
            var start = 0;
            var end = 24;
            diff = 24;
            ct = 24;
        } else {
            hrs = parseInt(hrs);
            var start = parseInt(hrs - 3);
            var end = parseInt(hrs);
        }

        console.log(start + " ID " + ID)
        while (start < end) {
            var winddeg = parsed_json.hourly_forecast[start].wdir.degrees;
            //  alert(wdeg);
            // $.each(parsed_json.hourly_forecast, function (i, zone) {
            // var winddeg = parseInt(zone.wdir.degrees);
            var longtime = parsed_json.hourly_forecast[start].FCTTIME.pretty;

            var brg = winddeg;
            var pval0f = getP_foll(brg);
            var pval1f = getP_foll(brg - 30);
            var pval2f = getP_foll(brg + 30);
            var pval0h = getP_head(brg);
            var pval1h = getP_head(brg - 30);
            var pval2h = getP_head(brg + 30);
            //   $('#bdata').append("fol: " + pval0f + "." + pval1f + "." + pval2f + "</br>");
            //   $('#bdata').append("head: " + pval0h + "." + pval1h + "." + pval2h + "</br>");
            var pArray = bdata.split(',');
            var arval1f = parseInt(pArray[pval0f - 1]); //brg
            var arval2f = parseInt(pArray[pval1f - 1]);
            var arval3f = parseInt(pArray[pval2f - 1]);
            var arval1h = parseInt(pArray[pval0h - 1]);  //brg
            var arval2h = parseInt(pArray[pval1h - 1]);
            var arval3h = parseInt(pArray[pval2h - 1]);
            var windspeed = parsed_json.hourly_forecast[start].wspd.metric;
            //windspeed = 20;
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
            console.log(brgf0 + " " + brgf1 + " " + brgf2 + " " + brgh0 + " " + brgh1 + " " + brgh2)
            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
            //head_wind_val = brgh0;
            //alert(brgh0);
            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
            // $('#bdata').append("starval:" + starval + "</br>");
            var numstars = 0;
            if (starval <= 0) {
                //drawStarsO(ctx2d, 5, posy + 30, 230);
                //$('#location').append("Stars for " + ID + "  " + numstars + "</br>");
            } else {
                numstars = calcStars(starval);
                //drawStarsF(ctx2d, numstars, posy + 30,230);
                //$('#location').append("Stars for " + ID + "  " + numstars + "</br>");
            }

            stars_tot = stars_tot + numstars;
            starvals.stardata.push({
                "stars": numstars,
                "hour": start,
                "wspd": windspeed,
                "SegID": ID,
                "timestamp": longtime

            });
            //"<p style=\"color:#ffca4a\">"
            diff--;
            console.log(diff + " " + hrs);
            if (diff == 0) {
                star_avg = Math.round(stars_tot / ct);
                $('#location').append("Avg Stars for " + ID + "  " + star_avg + "</br>");
                // alert(star_avg);
                //return false
                $('#stars_best_' + ID).html("");
                if (hrs == 24) {
                    var maxPpg = getMax(starvals.stardata, "stars");
                    //var loc = location + ", " + country
                    console.log(maxPpg.stars + "  " + maxPpg.SegID + " - " + maxPpg.wspd);
                    //var priv = checkSegisAct(ID);
                    console.log("max ts " + maxPpg.timestamp);
                    //  besthtml = "<div>" + maxPpg.timestamp + "</div>";
                    $('#stars_best_' + ID).fadeIn('slow');
                    $('#stars_best_' + ID).html("<div class=\"msg_sml\">" + maxPpg.timestamp + "</div>");

                    showStars(ID, maxPpg.stars);
                } else {
                    showStars(ID, star_avg);
                }

            }
            start++;
        }

    } else {
        if (type == "stars") {
            var wbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" style=\"z-index:2000;margin-top:9px;right:5px\" onclick=\"getW('" + latlng + "'," + ID + ", 'stars')\">Get Weather</button>";
            //        $('#stars_' + ID).html(wbtn);
        }

    }
    //  });
}

function showStars(ID, numstars) {
    //console.log("End for " + ID + "  " + numstars + "</br>");
    var starhtml = "";
    var starblankhtml = "";
    var i = numstars;
    var j;
    j = (5 - i);
    //   do {
    for (var x = i; x > 0; x--) {

        starhtml = starhtml + "<i class=\"fa fa-star\"></i>&nbsp;";

    }

    for (var x = j; x > 0; x--) {
        starblankhtml = starblankhtml + "<i class=\"fa fa-star-o\"></i>&nbsp;";
    }
    //  while (--i);


    $('#stars_' + ID).html("<div style=\"color:#ffca4a\">" + starhtml + starblankhtml + "</div>");
}

function drawStarsO(ctx2d, i, y, xval) {
    do {
        star(ctx2d, xval, y, 8, 5, 0.5, "o");
        xval = xval + 20;
    }
    while (--i);

}

function drawStarsF(ctx2d, i, y, xval) {
    //var xval = 230;
    var j;
    j = (5 - i);
    do {
        star(ctx2d, xval, y, 8, 5, 0.5, "f");
        xval = xval + 20;
        if (i == 1 && j > 0) {
            drawStarsO(ctx2d, j, y, xval);
        }

    }

    while (--i);



}


function star(ctx, x, y, r, p, m, type) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffca4a";
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - r);
    for (var i = 0; i < p; i++) {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r * m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    if (type == "f") {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();
}

var Arrow = function (o) {
    this.x = o.x | 0;
    this.y = o.y | 0;
    this.color = o.color || "#ffffff";
    this.rotation = o.rotation | 0;
    this.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(0, -5);
        ctx.lineTo(0, -10);
        ctx.lineTo(10, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(0, 5);
        ctx.lineTo(-10, 5);
        ctx.lineTo(-10, -5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };
};




function getW(latlng, ID, type) {
    $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Retrieving weather ...</div>");
    $('#refreshBtnW').hide();
    var timenow = Math.round(new Date().getTime() / 1000);
    var diff = getTimediff(ID, type);
    console.log(diff + "t" + type);
    function revertText() {
        clearInterval(timer1);
        //$('#wtitel').fadeOut();
        //dispStarsChk();
        //$('#refreshBtnW').fadeIn();
        // $('#winfo').fadeIn()
        clearInterval(timer1); 
        drawWeather(ID, type);
        $('#refreshBtnW').fadeIn();
    }
    if (diff < 10800) { //10800
        var timer1 = setInterval(function () { revertText() }, 5000);
        $('#refreshBtnW').fadeOut();
        $('#wtitle').fadeOut('slow', function () {
            // will be called when the element finishes fading out
            $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather data retrieved less than 3 hours ago.</br>Refresh not available</div>");
            // if selector matches multiple elements it will be called once for each
            $('#wtitle').fadeIn();
        });
    } else {

        var loc = latlng;
        console.log("Checking weather for " + ID + "</br>");
        var lat = latlng[0];
        var lng = latlng[1];
        var wdata = localStorage.getItem('weatherdata');
        if (wdata != null) {
            var wdata_json = eval('(' + wdata + ')');
            var ct = localStorage.getItem('weatherdata_ct');
            checkWeather(latlng, ct, ID, type);
        } else {
            callWeather(latlng, ID, type);
        }
    }
}

function checkWeather(latlng1, ct, ID, type) {
    var wdata = localStorage.getItem('weatherdata');
    var wdata_json = eval('(' + wdata + ')');

    var callW = true;
    var latlng = latlng1.toString().split(',');

    var lat = latlng[0];
    var lng = latlng[1];
    console.log("lat=" + lat);
    console.log("Checking weather2 for " + latlng + "</br>");
    var latx = lat - 0.05;
    var latxx = lat + 0.05;
    var lngx = lng - 0.05;
    var lngxx = lng + 0.05;
    var epoch = Math.round(new Date().getTime() / 1000);
    //Nb = 56.05,-2.7
    //hadd = 55.9,-2.7
    //dunbar = 55.9,-2.4
    //55.8 to BuT
    $.each(wdata_json.wdata, function (i, wd) {
        //     alert(wd.lat + " " + latx + " " + latxx);
        console.log("Is " + wd.lat + " > " + latx + " and < " + latxx + "</br>");
        console.log("Is " + wd.lng + " > " + lngx + " and < " + lngxx + "</br>");
        if ((wd.lat > latx && wd.lat < latxx) && (wd.lat > latx && wd.lat < latxx)) {
            var toID = ID;
            var fromID = wd.ID;
            var fromJsonAct = localStorage.getItem(fromID + "_weather_act");
            var fromJsonMap = localStorage.getItem(fromID + "_weather_map");
            //  alert(ct + "match" + lat + ID);
            if (epoch - wd.timestamp > 10800) {
                console.log("in bounds but old weather")
                callW = true;
            } else {
                console.log(epoch - wd.timestamp + "in bounds, not calling")
                callW = false;
            }

        }
        ct--;
        if (ct <= 0) {
            //  alert("return" + callW + ID);

            if ((callW == true) || ((fromJsonAct == null) && (fromJsonMap == null))) { //no match
                console.log("null check, callW=" + callW)
                console.log("Getting weather for " + ID + "</br>");
                callWeather(latlng, ID, type);
                //  alert("ct="+ct);
            } else {
                console.log("Not getting weather for " + ID + "</br>");
                var wchk;

                if (type == "map") {
                    wchk = localStorage.getItem(toID + "_weather_map");
                } else {
                    wchk = localStorage.getItem(toID + "_weather_act");
                }

                if (wchk == null) {
                    copyWeather(fromID, toID, lat, lng, type);
                    calcStarsInline(toID, 24, type);
                    drawWeather(toID, type);
                    $('#refreshBtnW').show();
                } else {
                    $('#location').append("Not copied weather from " + fromID + " to " + toID + ", alredy have it</br>");
                }


            }


        }





    });

    //return callW;

}

function copyMapWeather(ID) {
   
    jsondata = localStorage.getItem(ID + "_weather_map");
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    $.each(j2s.points, function (i, seg) {
      
        localStorage.setItem(seg.PID + '_weather_map', jsondata);
             
    });
    displayStarsmap(24,null)

}


function copyWeather(fromID, toID, lat, lng, type) {
    var jsondata;
    var zoom = localStorage.getItem("zoommap");
    if (type == "map") {
        jsondata = localStorage.getItem(fromID + "_weather_map");
        if (jsondata == null) {
            jsondata = localStorage.getItem(fromID + "_weather_act");
            localStorage.setItem(toID + '_weather_map', jsondata);
            console.log("json null, used act")
            calcStarsInline(toID, 24, type);
            drawWeather(toID, type);     
            if (zoom >= 12) {
                copyMapWeather(fromID);
            }
            $('#refreshBtnW').show();
        } else {
            jsondata = localStorage.getItem(fromID + "_weather_map");
            localStorage.setItem(toID + '_weather_map', jsondata);
            console.log("json not null, used map")
            if (zoom >= 12) {
                copyMapWeather(fromID);
            }
            calcStarsInline(toID, 24, type);
            drawWeather(toID, type);
            $('#refreshBtnW').show();
        }
        //localStorage.setItem(toID + '_weather_map', jsondata);
    } else {
        jsondata = localStorage.getItem(fromID + "_weather_act");
        localStorage.setItem(toID + '_weather_act', jsondata);

        calcStarsInline(toID, 24, type);
        drawWeather(toID, type);
        $('#refreshBtnW').show();
  

    }
    //var jsondata = localStorage.getItem(fromID+"_weather");
    //localStorage.setItem(toID+'_weather', jsondata);
    console.log("Copied weather from " + fromID + " to " + toID + "</br>");
    var epoch = Math.round(new Date().getTime() / 1000);
    var weather_deets = {
        wdata: []
    };
    //alert(ct);
    var ct = localStorage.getItem('weatherdata_ct');
    if (ct == null) {
        ct = 0;
    }
   
    var ct2 = 0;
    var wdata = localStorage.getItem('weatherdata');
    //  if (wdata != null) {
    var wdata_json = eval('(' + wdata + ')');
         
    $.each(wdata_json.wdata, function (i, wd) {
          
        weather_deets.wdata.push({
            "ID": wd.ID,
            "lat": wd.lat,
            "lng": wd.lng,
            "timestamp": wd.timestamp,
            "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
            //ct--;
        });
        // alert("pushed  "+ ID + "ct=" + ct + "ct2=" + ct2);
            
        //  var jsondeets = JSON.stringify(weather_deets);
        //   $('#location').append("Writing Weather data 1 = " + ID + "</br>");
        //   localStorage.setItem('weatherdata', jsondeets);
        //   countWdata();
        ct--;
        //alert(ct2 + "i=" + i + jsondeets);
        //  if (ct == i) {
        if (ct == 0) {
            weather_deets.wdata.push({
                "ID": toID,
                "lat": lat,
                "lng": lng, 
                "timestamp": epoch,
                "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
            });
            //alert("pushed last  "+ ID + "ct=" + ct + "ct2=" + ct2);
            var jsondeets = JSON.stringify(weather_deets);
      
            $('#location').append("Copied weather data " + toID + "</br>");
            //   localStorage.setItem('weatherdata', jsondeets); don'copy add copied weather to weatherdata //bkk2 not saving wdata for copies
            countWdata();
        
        }
        
    });  

}



function countSegs() {
    var ct = 0;
    var str = "_seg_efforts";
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        if (localStorage.key(i).indexOf(str) > -1) {
            ct++;
        }
    }
    return ct;
}

function countWdata() {

    var wdata = localStorage.getItem('weatherdata');
    if (wdata != null) {
        var wdata_json = eval('(' + wdata + ')');
        var ct = 0;
        $.each(wdata_json.wdata, function (i, wd) {

            ct++;

        });
        localStorage.setItem('weatherdata_ct', ct);
        $('#location').append("Weather data count = " + ct + "</br>");

    } else {

    }

}

function callWeather(latlng,ID,type)  {
    var lat = latlng[0];
    var lng = latlng[1];
    var epoch = Math.round(new Date().getTime() / 1000);
    console.log(ID + " " + type);
    var weather_deets = {
        wdata: []
    };
    //alert(ct);
    var ct = localStorage.getItem('weatherdata_ct');
    if (ct == null) {
        ct = 0;
    }
   
    var ct2 = 0;
    var wdata = localStorage.getItem('weatherdata');
    if (wdata != null) {
        var wdata_json = eval('(' + wdata + ')');
         
        $.each(wdata_json.wdata, function (i, wd) {
            if (ID != wd.ID) {
                weather_deets.wdata.push({
                    "ID": wd.ID,
                    "lat": wd.lat,
                    "lng": wd.lng,
                    "timestamp": wd.timestamp,
                    "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
                    //ct--;
                });
            }
            // alert("pushed  "+ ID + "ct=" + ct + "ct2=" + ct2);

            //   var jsondeets = JSON.stringify(weather_deets);
            //   $('#location').append("Writing Weather data 1 = " + ID + "</br>");
            //   localStorage.setItem('weatherdata', jsondeets);
            //   countWdata();
            ct--;
            //alert(ct2 + "i=" + i + jsondeets);
            //  if (ct == i) {
            if (ct == 0) {
                weather_deets.wdata.push({
                    "ID": ID,
                    "lat": lat,
                    "lng": lng, 
                    "timestamp": epoch,
                    "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
                });
                //alert("pushed last  "+ ID + "ct=" + ct + "ct2=" + ct2);
                var jsondeets = JSON.stringify(weather_deets);
                RealCallWeather(latlng,ID,type);
                $('#location').append("Writing Weather data 2 = " + ID + "</br>");
                localStorage.setItem('weatherdata', jsondeets);
                //   $('#location').append("Retrieved weather for " + ID + "</br>");
                //           localStorage.setItem(ID+'_weather', "weather here");

                countWdata();
                //   alert("push=" + wd.ID);
            } else {
                //    alert("not push=" + wd.ID);
            }         
         
            //ct--;
        
        });  
    
    } else {
        // alert("push " + ID);
        weather_deets.wdata.push({
            "ID": ID,
            "lat": lat,
            "lng": lng, 
            "timestamp": epoch,
            "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
        });
    
        var jsondeets = JSON.stringify(weather_deets);
        RealCallWeather(latlng,ID,type);
        $('#location').append("Writing Weather data = " + ID + "</br>");
        localStorage.setItem('weatherdata', jsondeets);
        //alert("get weather 1   " +ID + weather_deets);
        //   $('#location').append("Retrieved weather for  " + ID + "</br>");
        //        localStorage.setItem(ID+'_weather', "start weather here");

        countWdata();
    }
    
    // alert(wdata_json);
        
    //localStorage.getItem('loc');
    //"37.833,-122.483";
    //"56.052,-2.732";
    // alert(latlng);
}   

function RealCallWeather(latlng, ID, type) {
   
    $.ajax({
        type: "GET",
        url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + latlng + ".json",
        //56.052,-2.732
        //url: "json.txt",
        //dataType: "html",
        timeout: 4000,
        dataType: "jsonp",
        success: function (json) {
            //var jsontxt = eval('(' + json + ')');

            
            var key = "location.nearby_weather_stations";
            delete json['location']['nearby_weather_stations'];
            var jsontext = JSON.stringify(json);
            var location = json['location']['city'];
            console.log(jsontext);
            if (type == "map") {
                localStorage.setItem(ID + '_weather_map', jsontext);
                var zoom = localStorage.getItem("zoommap");
                if (zoom >= 12) {
                    copyMapWeather(ID);
                }
                //copyMapWeather(ID);
            } else {
                localStorage.setItem(ID + '_weather_act', jsontext);
            }
            // localStorage.setItem(ID+'_weather', jsontext);
            countWdata();
            var epoch = Math.round(new Date().getTime() / 1000)
            var timenow = new Date();
            var hour_now = timenow.getHours();
            var minute_now = timenow.getMinutes();
            var today = timenow.getDate();
            //   if (type == "stars") {
            calcStarsInline(ID, 24, type);
            drawWeather(ID, type);
            $('#refreshBtnW').show();
         
            //add ajax timeout as per lb, stop timer
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
            $("#winfomap").html("Weather data unavailable. Please try later");
            $("#winfo").html("Weather data unavailable. Please try later");
        },
        complete: function () {
            //load weather

        }

    });

}


function checkLoc() {


    navigator.geolocation.getCurrentPosition(
    function (position) {
        //alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        $('#winfomap').html("Retrieving Location ...");
        showmap(11, position.coords.latitude, position.coords.longitude);
    },
    function (error) {
      //  alert(error.message);
        $('#winfomap').html("Location not available");
        var lat = localStorage.getItem("latmap");
        alert(lat);
        if (lat == null) {
            showmap(11, 48.14, 17.11);
        } else {

        }
    }, {
        enableHighAccuracy: true
              , timeout: 5000
    }


    //navigator.geolocation.getCurrentPosition(function (position) {
    //    loc = position.coords.latitude + "," + position.coords.longitude;
    //    alert(loc);
      
    //    showmap(11, position.coords.latitude, position.coords.longitude);
    //}, function () {
    //    $('#winfomap').html("Location not available");
    //    return 0;
    );
}


function saveFriend(firstname, lastname, frID, ID) {

    console.log(lastname + " " + frID);
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
            console.debug(xhr); console.debug(error);
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
            console.debug(xhr); console.debug(error);
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
        url: "http://komwiththewind.apphb.com/Home/AllUsers",
        timeout: 15000,
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
    $('#comHead').html("<h1>Top 10 Highest Star Rated Segments for the Last 7 Days</h1>");
    $('#comspin').show();
   
   // $('#com_table').hide();
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
            // var parsed_json = eval(data);
           // alert(parsed_json);
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
            alert(error);
            $('#comspin').hide();
            var midhtml = "<li style=\"height:65px\"><i class=\"read\"></i><p class=\"un_sel\">Data not available</li>";
            $('#com_table').html(top + midhtml + "</ul></div></div>");
           
        }
    });
    return false;
}


function saveTW(segID, segName, wspd, loc, stars, epoch, timestamp) {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var UserID = user.deets[0]['stravaID'];
    var poly = localStorage.getItem(segID + "_poly")
    $.ajax({
        type: "POST",
        timeout: 15000,
        url: "http://komwiththewind.apphb.com/Home/SaveTopWeather",
        data: "UserID=" + UserID + "&segID=" + segID + "&segName=" + segName + "&poly=" + poly + "&wspd=" + wspd + "&loc=" + loc + "&stars=" + stars + "&epoch=" + epoch + "&timestamp=" + timestamp,
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
        url: "http://komwiththewind.apphb.com/Home/SaveUser",
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
        url: "http://komwiththewind.apphb.com/Home/SaveUser",
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
            console.log(diff + " " + wd.ID)
            if (diff > 10000) {
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

        function rewrite() {
            clearInterval(timery);
            var jsondeets = JSON.stringify(weather_deets);
            console.log(jsondeets);
            if (jsondeets.length > 50) {
                localStorage.setItem('weatherdata', jsondeets);

                countWdata();
            } else {
                localStorage.removeItem('weatherdata');
                localStorage.removeItem('weatherdata_ct');
            }
        }

    }

    var str = "weather_map";
    var timenow = Math.round(new Date().getTime() / 1000);
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        if (localStorage.key(i).indexOf(str) > -1) {
            var jsondata = localStorage.getItem(localStorage.key(i));
            var parsed_json = eval('(' + jsondata + ')');
            var wepoch = parsed_json.hourly_forecast[0].FCTTIME.epoch;
            if ((timenow - wepoch) > 1000) {
                console.log("Removing " + localStorage.key(i) + "</br >");
                // }
                localStorage.removeItem(localStorage.key(i));
            }
        }
        // do something with localStorage.getItem(localStorage.key(i));
    }

}

function getFriends() {
  
    showKOMsTile();
    var frdata = localStorage.getItem('frdata');
    if (frdata != null) {
        drawFriends();

    } else {
     
        stFriends(); //changed
    }
}

function showFriend(ID, name, i) {

    $('#friend_info').show();
    $('#friend_tile_title').html("<dtitle>KOMS: " + name + "</dtitle>");
    $('#deets_tile').hide();
    $('#seg_weather').hide();
    $('#pills_row').hide()
    $('#seg_efforts').hide();
    $('#seg_leaderboard').hide();
    $('table tbody tr').each(function (index, el) {
        $(this).siblings().removeClass('sel');
    });

    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');
    localStorage.setItem("frID", ID);
    var type = "kom";
    var top = "<table class=\"table table-striped\">";
    var json = localStorage.getItem('komdata_' + ID);
    var frID = ID;
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    var firstID;
    var n;
    var name;
    var w = window.innerWidth;
    var nameW = w - 70;
    $.each(j2.segs, function (i, seg) {
        var date = formatTime(seg.time);
        midhtml = midhtml + "<tr id=\"trow_" + seg.ID + "\" class=\"un_sel\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "', " + frID + ")\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">" + seg.name + "</div>" +
                   "<div class=\"msg_sml\" style=\"padding-left:3px\">" + date + "</div></td></tr>";
        act_ct++;
    });


    var ht = parseInt((act_ct * 50) + 18); //56
    $('#friend_tile').height(ht);
    // alert(firstID)
    //poly2(firstID, n, name, type, frID);   
    $('#friend_tile_list').html(top + midhtml + "</table></div>");

}

function checkData() {
    //var today2 = Math.floor(moment() / 1000);
    //localStorage.setItem("sub", today2);
  
    $('#info').hide();
    $('#locIcon').hide();
    $('#status_area').hide();
    removeOldweather()
    var sub = localStorage.getItem("sub");
  
    var credits = localStorage.getItem("credits");
    var pass = false;
    if (sub == null) { //not auth
        pass = true;

    } else { //has logged in before 
        var ExpDate = parseInt(604800) + parseInt(sub) //Math.floor(moment(sub).add(7, 'days') / 1000);   
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
            $('#status_msgs').append("Trial period expires on " + ExpDate);
            $('#pmsg').html("Trial period expires " + estr + " <br/>You have " + cstr + " Historical data queries left.<br/>Purchase Yearly Subscription to get unlimited Historical data queries.");
            $('#credits_no').html(credits);
            //localStorage.setItem("sub", LoginDate);
            pass = true;
        } else {
            //expired
            $('#status_msgs').append("Trial expired");
            //  localStorage.setItem("sub", "expired");
            // listSub();
            $('#menu_buttons').hide();
            $('#profile_settings').hide();
            $('#profile_tile').show();
            $('#pmsg').html("Thank you for using KOM With The Wind. Trial period expired.");
            pass = false;

        }
    }

    if (pass == true) {
        if (localStorage.getItem("userdata") == null) {
            $('#onlineStatus').hide();
            $('#status_msgs').show();
            $('#status_msgs').append("Not connected");
            $('#UnAuthApp').show();
            $('#pic_header').hide();
            $('#logo_header').hide();
            $('#menu_buttons').hide();
            $('#deets_tile').hide();
        } else {
         
            countWdata();
            var data = localStorage.getItem("userdata");
            var wdata = localStorage.getItem("weatherdata");
            var acts = localStorage.getItem("starsdata");
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
            var firstname = user.deets[0]['firstname'];
            var lastname = user.deets[0]['lastname'];
            var stravaID = user.deets[0]['stravaID'];
             checkServerStatus(stravaID);
        
            $('#menu_buttons').show();
            $('#status_msgs').hide();
            $('#status_area').hide();
            $('#rem_info').show();
            $('#info').hide();
            $('#table_calc_area2').hide();
            if (acts.length > 40) {
               drawTable("stars");
             //   $('#act_table').show();
                var timer = setInterval(function () { startDecode() }, 500);
                function startDecode() {
                    clearInterval(timer);
                    dispStarsChk();
                    $('#pmsg').append("<br/>" + sub);
                }
                // dispStarsChk();
            } else {
                noActsmsg("stars");
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
                pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"/Content/blank_avatar.jpg\">";
            } else {
                pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
                pic_header = "<img id=\"headpfl\" class=\"circular_pfl_on\" src=\"" + user.deets[0]['profile'] + "\">";
            }

            $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
            $('#pic_header').show();
            $('#userimg').html(pic);
            $('#pic_header').html(pic_header);
            $('#status_msgs').hide();
            //   $('#status_msgs').append(userdata);
            //  var name = 
            //  updateUser(user.deets[0]['firstname'], user.deets[0]['lastname'], user.deets[0]['stravaID']);

            // $('#get_activities').show();
        }
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
  
    hrs = 24;
    displayStars(hrs); //v0.1
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
  
}


function getAct(type) {
    var favsct = countFavs();
    if (type == "act") {
        var segdata = localStorage.getItem("segdata")
        console.log(segdata.length);
    } else if (type == "kom") {
        var segdata = localStorage.getItem("komdata")
        console.log(segdata.length);
    } else if (type == "stars") {
        var segdata = localStorage.getItem("starsdata")
        $('#act_tile_title').html("<dtitle>Segments Starred in Strava</dtitle>");
        console.log(segdata.length);
        favsct = 1;
    } else if (type == "favs") {
        var segdata = "1234567890123456789012345678901234567890"
        $('#act_tile_title').html("<dtitle>KOM With The Wind Favorites</dtitle>");
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
            dispStarsChk();

        }
    }
}


function showActsTile() {
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
    var timer = setInterval(function () { startDecode() }, 1000);
    function startDecode() {
        clearInterval(timer);
        restorePurchases();

    }
    $('#btnLeft').hide();
    $('#btnRight').hide();
    $('#mapWind').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_efforts').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
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
  
    if (ID == null) {
        showMapTile();
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
    $('#locIcon').hide();
    $('#Hrsdd').hide();
    $('#menu_buttons').show();
    $('#seg_nearby').hide();
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
        profile = "/Content/blank_avatar.jpg";
    }
    var myKOMS = localStorage.getItem('komdata_' + stravaID);
    var midhtml = "";

    if (myKOMS != null) {
        var myKOMSj = eval('(' + myKOMS + ')');
        var koms_ct = strava_segs.count();
        midhtml = midhtml + "<tr id=\"trow_" + stravaID + "\" onclick=\"showFriend(" + stravaID + ",'" + firstname + " " + lastname + "',-2)\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">" + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
      " KOMs</div></td></tr>";
    

    } else {
        var koms_ct = 0;
        midhtml = midhtml + "<tr id=\"trow_" + stravaID + "\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + profile + "\"></div></td><td><div class=\"h3\">" + firstname + " " + lastname + "</div><div class=\"msg_sml\">" + koms_ct +
          " KOMs</div></td></tr>";
    }
    var json = localStorage.getItem('frdata');
    var j2 = eval('(' + json + ')');


    var fr_ct = 1;

    var n;
    var name;
    var top = "<table class=\"table table-striped\">"
    $.each(j2.people, function (i, peeps) {
       var koms_ct = countKOMs(peeps.ID);
        
        if (koms_ct > 0) {
            midhtml = midhtml + "<tr id=\"trow_" + peeps.ID + "\" onclick=\"showFriend(" + peeps.ID + ",'" + peeps.firstname + " " + peeps.lastname + "'," + i + ")\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + peeps.profile + "\"></div></td><td><div class=\"h3\">" + peeps.firstname + " " + peeps.lastname + "</div><div class=\"msg_sml\">" + koms_ct +
            " KOMs</div></td></tr>";
        } else {
            midhtml = midhtml + "<tr id=\"trow_" + peeps.ID + "\"><td style=\"padding-left:5px;width:50px\"><div class=\"circular_sml\"><img style=\"width:40px;height:40px\" src=\"" + peeps.profile + "\"></div></td><td><div class=\"h3\">" + peeps.firstname + " " + peeps.lastname + "</div><div class=\"msg_sml\">" + koms_ct +
          " KOMs</div></td></tr>";
        }
        fr_ct++;
    });

    // alert(firstID)
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
    $('#refreshBtn').show();
    var fav = false;
  
    if (type == "favs") {
        fav = true;
    } else if (type == "kom") {
        var json = localStorage.getItem('komdata');
    } else if (type == "stars") {
        var json = localStorage.getItem('starsdata');
        var segct = 1;
    } else {
        var json = localStorage.getItem('segdata');
        var segct = countSegs();
    }
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    var firstID;
    var n;
    var name;
    var top = "<div id=\"ttop\"><table class=\"table table-striped\">"
    if (fav == false) {
        var j2 = eval('(' + json + ')');
        $.each(j2.segs, function (i, seg) {
            var seg_ct = 0;
            LB = true
        //    alert(seg.ID + "," + i + " b " + type);
            midhtml = midhtml + "<tr id=\"trow_" + seg.ID + "\" class=\"un_sel\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "')\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px\">" + seg.name + "</div>" +
                   "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + seg.ID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + seg.ID + "\"></div></td></tr>";
            //midhtml = midhtml + "<tr onclick=\"poly2a()\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px\">A1" + seg.name + "</div>" +
            ////       "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + seg.ID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + seg.ID + "\"></div></td></tr>";

            act_ct++;
           
        });

    } else {
        for (var i = 0; i < localStorage.length; i++) {
            //  if (localStorage.key(i) == 'weatherdata') {
            if (localStorage.key(i).indexOf("_fav") > -1) {
                var ID = localStorage.key(i).replace("_fav", "");

                var json = localStorage.getItem(localStorage.key(i));
                var j2 = eval('(' + json + ')');
                var name = j2.segs[0].name;
                var w = window.innerWidth;
                var nameW = w - 80;
                act_ct++;
                // var infoW = w - 
                midhtml = midhtml + "<tr id=\"trow_" + ID + "\" class=\"un_sel\" onclick=\"polyF(" + ID + ")\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">" + name + "</div>" +
                    "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + ID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + ID + "\"></div></td></tr>";

            }
        }


    }

    var ht = parseInt(((act_ct) * 50) + 55); //56

    $('#tableback').height(ht);
    $('#act_table2').html(top + midhtml + "</table></div>");
  
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
    $('#komdata').show();
    $('html, body').animate({
        scrollTop: $("#leaderback").offset().top
    }, 2000);
    var refreshbtnlb = "<button style=\"position:absolute;right:10px;top:29px\" type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"refreshData(" + ID + ",'" + type + "','lb')\">Refresh</button>";
    $('#refreshBtnLB').html(refreshbtnlb);
    var lbhistchk0 = localStorage.getItem(ID + '_0_hist');
    var lbhistchk1 = localStorage.getItem(ID + '_1_hist');

    if ((lbhistchk0 != null) && (lbhistchk1 == null)) {
        //have historical data, just show
        $('#g1').show();
        $('#lbBtn').hide();

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
        $('#lbBtn').hide();
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
            // $('#lbBtn').html(btnhtml);
        }

        $('#g1').hide();
    }




    //style=\"position:absolute;right:18px;top:40px;z-index:400\"

    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "Data as of " + timestr;
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

function countHistW(count, SegID) {
    var str1 = "_hist";
    var j = -1;
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        if ((localStorage.key(i).indexOf(str1) > -1) && (localStorage.key(i).indexOf(SegID) > -1)) { //separate
            if (localStorage.key(i).indexOf("_hist_") > -1) {

            } else {
                j++;
            }

            console.log(localStorage.getItem(localStorage.key(i)));
        }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    console.log("c: " + j + " " + count);
    if (j == count) {
        return 1;
    } else {
        return 0;
    }

}

function showHistweather(SegID, type, lb, num, frID) { //friday
    //make an array of the first three
    //find out if seg is private or not

    // $('#effortPadding').hide();
    $('#sgBtn').hide();

    $('#lbBtn').hide();
    var lbhistchk1 = "";
    var count = null;
    console.log("ht" + type);
    if (lb == true) {
        var json = localStorage.getItem('lb_data_' + SegID);
        var j2 = eval('(' + json + ')');
        count = (j2.count[0].num - 1);
        countHistW(count, SegID);
        console.log(count + " " + j2.segs[0].time)
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
            drawLeaderboard(SegID, type); //was hist yyy
        } else {
            drawSegEffort(SegID, frID, type);
        }

    } else {
        if (num == "all") {
            $('#lbdata').html("Retrieving historical data ...");
            $('#sgdata').html("Retrieving historical data ...");
            count = (j2.count[0].num - 1);
            console.log("count" + count);
            $('#sgBtn').html("");
            var done = false;
            var latlng = getLatlng(SegID, type);
            console.log("latlng" + latlng);
            var time = 0;
            var j = 1;

            $.each(j2.segs, function (i, seg) {
                console.log(i);
                if ((i == 0) && (lb == true)) {

                } else {
                    var date = j2.segs[i].time;
                    setTimeout(function () {
                        //alert('paused');
                        CallHistWeather(latlng, date, SegID, i, type, lb, frID);
                        if (i == count) {
                            var timerAA = setTimeout(function () { showdata() }, 4000);
                            function showdata() {
                                clearTimeout(timerAA);
                                if (lb == true) {
                                    console.log("finished" + count + " " + i);
                                    if (countHistW(count, SegID) == 1) {
                                        drawLeaderboard(SegID, type); //was hist yyy
                                        var credits = localStorage.getItem("credits");
                                        credits = credits - 3;
                                        var userdata = localStorage.getItem('userdata');
                                        var user = eval('(' + userdata + ')');
                                        var stravaID = user.deets[0]['stravaID'];
                                        saveCredit(stravaID, credits)
                                        localStorage.setItem("credits", "3");
                                        $('#credits_no').html(credits);
                                    } else {
                                        $('#lbdata').html(type + " lb Incomplete Historical data, please try again.");
                                        //  if (type == 'lb') { //user later yyy
                                        clearCanvas(type);

                                        while (j < 20) {
                                            console.log("Removing " + SegID + "_" + j + "_hist");
                                            // }
                                            localStorage.removeItem(SegID + "_" + j + "_hist");
                                            j++;
                                        }
                                        $('#lbBtn').show();
                                        //localStorage.removeItem(str);


                                        //  }

                                    }
                                } else {
                                    console.log("finished" + count + " " + i);
                                    if (countHistW(count, SegID) == 1) {
                                        showEfforts(SegID, type, frID);
                                        var credits = localStorage.getItem("credits");
                                        credits = credits - 3;
                                        var userdata = localStorage.getItem('userdata');
                                        var user = eval('(' + userdata + ')');
                                        var stravaID = user.deets[0]['stravaID'];
                                        saveCredit(stravaID, "3");
                                        localStorage.setItem("credits", credits);
                                        $('#credits_no').html(credits);
                                    } else {
                                        $('#lbdata').html(type + "Incomplete Historical data, please try again.");
                                        while (j < 20) {
                                            console.log("Removing " + SegID + "_" + j + "_hist");
                                            // }
                                            localStorage.removeItem(SegID + "_" + j + "_hist");
                                            j++;
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
            if (credits >= 0) {
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

function CallHistWeather(latlng, date, SegID, i, type, lb, frID) {
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

            if (i == 0) {
                var credits = localStorage.getItem("credits");
                credits--;
                var userdata = localStorage.getItem('userdata');
                var user = eval('(' + userdata + ')');
                var stravaID = user.deets[0]['stravaID'];
                console.log("ID=" + stravaID)
                saveCredit(stravaID, "1")
                localStorage.setItem("credits", credits);
                $('#credits_no').html(credits);
            }


        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
            return false;
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

                    var timer3 = setInterval(function () { finishedW() }, 500);
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

function displayStarsmap(hrs, ct) { //get seg weather
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


        // 
        if (parsed_json != null) {
            var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
            var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
            $('#location').append("Calculating activity ratings for selected wind conditions");
            var timediff = getTimediff(ID);
            var timeago = getTimeW(ID); //moment(getTimeW(ID)).fromNow;
            if (hrs == 24) {
                $('#winfomap').html("Showing the best star ratings for the next 24 hours of retrieved weather");
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
        var fPID;
        var flatlng
        $.each(j2.points, function (i, wd) {
            ct++;

            fPID = wd.PID;
            flatlng = wd.endlatlong;
            var wchk = localStorage.getItem(wd.PID + "_weather_map");
            if (wchk != null) { //or parentID
                console.log("found w for" + wd.PID);
                ID = wd.PID;
            }
        });
    }

    var jsondata = localStorage.getItem(ID + "_weather_map");
    //console.log(jsondata);
    if (ID == null) {
        if (zoom >= 12) {
            // $('#refreshBtnmap').html("<a class=\"btn btn-primary btn-sm\" href=\"#tableback\" onclick=\"refreshWeather('map'," + ct + ")\" id=\"refreshStarsbtn\">Get weather for Segments in this view</a>");
            // $('#refreshBtnmap').show();
            //getW(flatlng, fPID, "map");
            //refreshWeather('map', ct);

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
    if (wdata == null) {
        $('#winfo').html("Showing the best star ratings for the next 24 hours of retrieved weather");
        //  weatherAct();
        //alert("no weather");
    } else {
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

            $('#location').append("Calculating activity ratings for selected wind conditions");

            if (hrs == 24) {
                $('#winfo').html("Showing the best star ratings for the next 24 hours of retrieved weather");
                $('#winfo').fadeIn();
            } else {

            }
        
            $.each(j2a.segs, function (i, seg) {
            
               
                calcStarsInline(seg.ID, hrs, 'stars');
            });
       // }
    }

}


function stConn2() {
    var strava_deets = {
        deets: []
    };
    var ID;
    //   alert("connect");
    $('#status_area').show();
    $('#status_msgs').html("Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
        // alert(result);
        console.log(result)

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
            // saveUser(data.firstname, data.lastname, data.id, 0, 0);
            ID = data.id;
            checkServerStatus(ID);
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

            var sub = Math.floor(moment().add(0, 'days') / 1000);
            localStorage.setItem("sub", sub);

            var timerst = setInterval(function () { closeStatus() }, timex); //rem bkk2
            function closeStatus() {
                clearInterval(timerst);
                $('#status_msgs').append("</br>Done .... stand by");

                //console.log(timex + " seconds up")
                //// weatherSeg();
                //drawTable("stars");
                //$('#UnAuthApp').hide();
                //reportOnlineStatus();

                var timerst2 = setInterval(function () { dispstarst() }, 2000);
                function dispstarst() {
                    clearInterval(timerst2);
                    //$('#status_msgs').hide();
                    //$('#status_area').hide();

                    //$('#menu_buttons').show();

                    //displayStars(3);
                    checkData();

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

function checkServerStatus(stravaID) {
    $.ajax({
        type: "POST",
        url: "http://komwiththewind.apphb.com/Home/Ustatus",
        //url: "/Home/Ustatus",
        dataType: "json",
        timeout: 20000,
        data: "StravaID=" + stravaID,
        success: function (parsed_json) {
            var credits = parsed_json.ustatus[0]['Credits'];
            var LoginDate = parsed_json.ustatus[0]['FirstLogin'];
            localStorage.setItem('credits', credits);

            var ExpDate = Math.floor(moment(LoginDate, "DD-MM-YYYYY").add(7, 'days') / 1000);

            var LoginDate2 = new Date(LoginDate)
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
          //  alert(ExpDate + " " + today2 + " " + diff + " " + edays);

            //  ExpDate = moment(LoginDate).add(7, 'days');
            if (diff > 0) {
                //not expired
                $('#status_msgs').append("Trial period expires " + estr + " <br/");
                //localStorage.setItem("sub", LoginDate);
                $('#pmsg').html("Trial period expires " + estr + " <br/>You have " + cstr + " Historical data queries left.<br/>Purchase Yearly Subscription to get unlimited Historical data queries.");
                $('#credits_no').html(credits);
            } else {
                //expired

                $('#status_msgs').append("Trial expired");
                //  localStorage.setItem("sub", "expired");
                // listSub();
                $('#menu_buttons').hide();
                $('#profile_settings').hide();
                $('#profile_tile').show();
                $('#pmsg').html("Thank you for using KOM With The Wind. Your trial period has now expired.<br/>Purchase Yearly Subscription to get full access including unlimited Historical data queries.");

            }

        },
        error: function (xhr, error) {
            // alert(error);

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
    
    getAct("stars");

    
    
    
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
                parse("stars");
                var timer = setInterval(function () { startDecode() }, 5000);
                console.log("analyse segs in 5 seconds")
                function startDecode() {

                    clearInterval(timer);
                    analyseSegs();
                }
            } else {
                $('#UnAuthApp').hide();
                noActsmsg("stars");
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
                noActsmsg("stars");
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

function refreshData(ID, datatype, type) {
    var str;
    $('#komimg').hide();
    $('#komdata').hide();
    $('#lbBtn').hide();
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
