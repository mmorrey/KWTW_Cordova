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
        p10 = p10 + (percent / 100); ;
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
    localStorage.setItem(ID+"_array", pArray);
 //   $('#pdata').html("ID: " + ID + " " + pArray);
    // segAlgoData();
    //alert(pArray);
    console.log("array for " + ID + " " + pArray + "<br />");
    var obj = [{ value: p1,
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

    localStorage.setItem(ID+"_chart", JSON.stringify(obj));
   
}


function drawChart(ID) {
    
   
    var chart_store = ID+"_chart";
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

function startmap(ID,lat,lng) {
    clearTimeout(timera);
    //var position = getPosition();
  //  if (ID != null) {
        var latlngsaved = localStorage.getItem("latmap");
        //var latlng = position.split(',');
        if (latlngsaved == null) {
            var lat = "56.058168";
            var lng = "-2.719811";
        } else {
            var lat = localStorage.getItem("latmap");
            var lng = localStorage.getItem("lngmap");
            var zoom = localStorage.getItem("zoommap");
        }
    //}
   
    console.log("latlngmap" + lat + " ... " + lng);
   // var lat = "56.058168";
   // var lng = "-2.719811";
    //latlngsaved = "16.78,96.157";
 //   var map = new GoogleMap(latlngsaved);
    var map = new GoogleMap(ID, lat, lng, 12);
    map.initialize();
    //google.maps.event.trigger(map, 'resize');

}

function showmap(ID, lat, lng) {
   // if (ID != null) {
    $('#map_canvas_nearby').show();
    //}
  timera = setInterval(function () { startmap(ID,lat,lng) }, 1500);
}

function setZoom(map, lat,lng) {
    var boundbox = new google.maps.LatLngBounds();
    boundbox.extend(new google.maps.LatLng(lat, lng));
    console.log("fit" + lat + " " + lng);
    
    map.setCenter(boundbox.getCenter());
  //  map.setZoom(8);
   // map.fitBounds(boundbox);



}

function GoogleMap(ID, lat,lng, zoom1) {
    this.initialize = function () {
        var map = showMap();
    }
    var showMap = function () {

        var mapOptions = {
            zoom: parseInt(zoom1),
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
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
        } ()));


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
    //var timage = 'marker_search.png';
    //var position = getPosition();
    //var latlng = position.split(',');
    //var tlat = latlng[0];
    //var tlng = latlng[1];
    var tlat = "56.058168";
    var tlng = "-2.719811";
    //  var hereLatLng = new google.maps.LatLng(latlng);
    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //result.get('https://www.strava.com/api/v3/activities').done(function (data) {

        result.get('https://www.strava.com/api/v3/segments/explore', { data: { bounds: bds_fmt} }).done(function (data) {

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
                midhtml = midhtml + "<li onclick=\"poly_map(" + seg.id + "," + i + ")\"><i class=\"read\"></i><p id=\"trow_" + seg.id + "\" class=\"un_sel\">" + segname + "</p><p class=\"message\">" + seg.distance + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.id + "\"></div></li>";
 
               
                ct++;
            });
            seg_loc_data.count.push({
                "num": ct
            });
            if (ct > 0) {
                //$('#refreshBtnmap').html("<a class=\"btn btn-primary btn-sm\" href=\"#tableback\" onclick=\"refreshWeather('map'," + ct + ")\" id=\"refreshStarsbtn\">Get weather for " + ct + " Segments</a>");
                
                $('#HrsddMap').show();
            } else {
                $('#refreshBtnmap').html("");
                $('#HrsddMap').hide();
            }
            var ht = parseInt((ct * 48) + 95);
            $('#tableback_map').height(ht);
            var jsonsegs = JSON.stringify(seg_loc_data);
            localStorage.setItem('seg_loc_data', jsonsegs);
            

            var json_loc = { "points": [{ "lat": tlat, "longval": tlng, "name": "You are here!", "PID": "1"}] };
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
                    //   var image = 'marker_s4.png';
                }
                //var infoWindow = new google.maps.InfoWindow({ content: 'Place ID' + markers.PID });
                var siteLatLng = new google.maps.LatLng(markers.lat, markers.longval);
                //var markerp = new google.maps.Marker({ 'position': siteLatLng, 'icon': image });
                var markerp = new google.maps.Marker({ 'position': siteLatLng, 'map': map });
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
                    var marker_end = new google.maps.Marker({ 'position': endLatLng, 'map': map });
                    $('#seg_' + markers.PID).addClass("list");
                    addPolyline(returnpoly(markers.points)).setMap(map);
                    $('#ultop > li').each(function (index, el) {
                        //     alert($(this)[0]);
                        $(this).siblings().find('p').removeClass('sel');

                    });
                    jQuery('#trow_' + markers.PID).addClass('sel').removeClass('un_sel');

                    //infoWindow.open(map, markerp);
                });

            });

            var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";

            $('#map_table').html(top + midhtml + "</ul></div></div>");
            //var mcOptions = { gridSize: 50, maxZoom: 18 };
            //var markerCluster = new MarkerClusterer(map, markers_array, mcOptions);
            $("#winfomap").html("Found " + ct + " segments");
            displayStarsmap(3);
            parse("map");
           
            var timer1 = setTimeout(function () { startDecode() }, 8000);

            function startDecode() {
                clearTimeout(timer1);
                saveSegmentsDB("map");

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

function getFriends() {
    
    var frdata = localStorage.getItem('frdata');
    if (frdata != null) {
        drawFriends();
        
    } else {
         $('#profile_tile').hide();
        $('#act_table_header').hide();
        $('#act_table2').hide();
        $('#my_activities').hide();
        $('#seg_nearby').hide();
        $('#deets_tile').hide();
        $('#seg_weather').hide();
        $('#menubtns').hide();
        $('#seg_efforts').hide();
        $('#seg_leaderboard').hide();
        $('#Hrsdd').hide();
        $('#pills_row').hide();
        $('#refreshBtn').hide();
        $('#my_friends').show();
        stFriends(); //changed
    }
}

function showFriend(ID, name, i) {
    $('#friend_info').show();
    //$('#friend_tile').html("<dtitle>KOMS: " + name + "</dtitle><hr>");
    $('#deets_tile').show();
    localStorage.setItem("frID", ID);
    var type = "kom";
    var top = "<dtitle>KOMS: " + name + "</dtitle><hr><div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" style=\"list-style-type:none\" id=\"ultop\">";
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
    $.each(j2.segs, function (i, seg) {
        var date = formatTime(seg.time);
        if (act_ct == 0) {
            firstID = seg.ID;
            n = i;
            name = seg.name;
           
            midhtml = midhtml + "<li style=\"list-style-type:none\" class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "', " + frID + ")\"><i class=\"read\" style=\"list-style-type none\"></i><p id=\"trow_" + seg.ID + "\" class=\"sel\">" + seg.name + "</p><p class=\"message\">" + date + "</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        } else {
            midhtml = midhtml + "<li style=\"list-style-type:none\" class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",true, '" + type + "', " + frID + ")\"><i class=\"read\" style=\"list-style-type none\"></i><p id=\"trow_" + seg.ID + "\" class=\"un_sel\">" + seg.name + "</p><p class=\"message\">" + date + "</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        }
        act_ct++;
       
    });


    var ht = parseInt((act_ct * 48) + 80); //56
    $('#friend_tile').height(ht);
    // alert(firstID)
    poly2(firstID, n, name, type, frID);
   
    $('#friend_tile').html(top + midhtml + "</ul></div></div>");

}

function showLeader(ID,type) {
    console.log("show leader" + ID);
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    $('#refreshBtnLB').hide();
    $('#komimg').hide();
    $('#komdata').html("");
    $('#lbBtn').hide();
    $('#g1').hide();
    var lbdata = localStorage.getItem('lb_data_' + ID);
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    if (lbdata == null) {
        stLeader(ID, type);
        $('#seg_leaderboard').show();
        $('#lbdata').html("Retrieving Leaderboard ...");
        console.log("no local lb data");
    } else {
        console.log("local lb data");
        drawLeaderboard(ID,type); //changed
    }
}

function showEfforts(ID,type,frID) {
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
            stEffort(ID,frID,type); //add frID to 
        } else {
           stEffort(ID,null,type);
        }
        //save to _seg_efforts
    } else {
        if (frID != null) {
            drawSegEffort(ID,frID); //add frID to 
        } else {
            drawSegEffort(ID,null);
        }
       
    }
    
}

function poly_map(ID, i) {
  //  $('#map_table').hide();
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
   // $('#map_activities').hide();
   // $('#map_canvas_nearby').hide();
    $('#static_map').fadeIn();
    var json = localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + json + ')');
    //alert(json);
    var dist = j2.points[i].dist;
    var egain = j2.points[i].gain;
    var name = j2.points[i].name;
    var favbtn = "<a class=\"btn btn-large btn-primary\" href=\"#\" onclick=\"addFav(" + ID + ")\"><i class=\"fa fa-star-o icon-2x pull-left\"></i>Add<br>To Fvourites</a>";
    var Backbtn ="<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"backMap()\">Back</button>";
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + egain + "</bold></p>");
    //$('#leaderboardBtn').html(Lbbtn);
    $('#backBtn').html(Backbtn);
    $('#favBtn').html(favbtn);
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
    
    drawWeather(ID,'map');

    
}



function poly2(ID, i, scroll, type, frID) {
    $('#deets_tile').show();
    var canvas = document.getElementById('weather_stars');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 130, 2000);
    $('#ultop > li').each(function (index, el) {
   //     alert($(this)[0]);
        $(this).siblings().find('p').removeClass('sel');     
    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');

   
    $('#seg_data').show();
    $('#pills_row').show();
    $('#seg_weather').show();
    $('#deets_tile').show();
    $('#data_pills').show();
    $('#seg_details').show();
    $('#static_map').fadeIn();

    if (scroll == true) {
        $('html, body').animate({
            scrollTop: $("#seg_title").offset().top
        }, 2000);
    }
    // alert(i + name);
    if (type == "stars") {
        var json = localStorage.getItem('starsdata');
    } else {
        var json = localStorage.getItem('komdata_' + frID);
    }
  
    var pl = localStorage.getItem(ID + "_poly"); //j2.segs[i].poly;
    if (frID != null) {
        var frStr = getFriendFirstname(frID) + "'s Efforts";
    }
    
  //  alert(json);
    var j2 = eval('(' + json + ')');
    var dist = j2.segs[i].dist;
  //  var egain = j2.segs[i].egain;
    var name = j2.segs[i].name;
    var elev_h = j2.segs[i].elev_h;
    var elev_l = j2.segs[i].elev_l;
    var gain = parseInt(elev_h) - parseInt(elev_l);
    //var Lbbtn ="<button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"showLeader(" + ID +")\">Leaderboard</button>";
    var Backbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"backAct()\">Back</button>";
    var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"addFav(" + ID + ")\">Back</button>";
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");
    //$('#leaderboardBtn').html(Lbbtn);
    $('#backBtn').html(Backbtn);
    $('#favBtn').html(favbtn);
    //$('#seg_details').html(top_html + side_html);
    if (type == "stars") {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'" + type + "')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
"</div></div>");
        drawWeather(ID, type);
    } else {
       
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">My Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ",'" + type + "', " + frID +")\">" + frStr + "</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "')\">Leaderboard</button>" +
"</div></div>");
        showLeader(ID, type);
        //showHistweather(ID, type, true, "one")
    }
    drawMap(pl);
   drawChart(ID);

    $('#location').append(ID + "poly2" + pl +"</br>");
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

   // $('#title').html(name);
    //decodepoly(pl, ID);
    

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
    var Sebtn ="<button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"showEfforts(" + parentID +")\">Segment Efforts l</button>";
    var Backbtn ="<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"backAct()\">Back</button>";
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");
   // $('#leaderboardBtn').html(Lbbtn);
    $('#backBtn').html(Backbtn);
   // $('#seBtn').html(Sebtn);
     //$('#seg_details').html(top_html + side_html);
    var pl = localStorage.getItem(ID+"_poly");
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
    drawWeather(ID,'act');
    $('#location').append(ID + "poly2" + pl +"</br>");
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
    
    var mapStyle = [{ elementType: "geometry", stylers: [{ hue: "#ff4400" }, { saturation: -68 }, { lightness: -4 }, { gamma: .72}] }, { featureType: "road", elementType: "labels.icon" }, { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ hue: "#0077ff" }, { gamma: 3.1}] }, { featureType: "water", stylers: [{ hue: "#00ccff" }, { gamma: .44 }, { saturation: -33}] }, { featureType: "poi.park", stylers: [{ hue: "#44ff00" }, { saturation: -23}] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ hue: "#007fff" }, { gamma: .77 }, { saturation: 65 }, { lightness: 99}] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ gamma: .11 }, { weight: 5.6 }, { saturation: 99 }, { hue: "#0091ff" }, { lightness: -86}] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ lightness: -48 }, { hue: "#ff5e00" }, { gamma: 1.2 }, { saturation: -23}] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ saturation: -64 }, { hue: "#ff9100" }, { lightness: 16 }, { gamma: .47 }, { weight: 2.7}]}];
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

    var map = "<img src=\"https://maps.googleapis.com/maps/api/staticmap?size=150x150&path=weight:3%7Ccolor:orange%7Cenc:" + poly + "&" + src + "&key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog\" alt=\"    Offline\" />";
    //var map = "<img src=\"https://maps.googleapis.com/maps/api/staticmap?size=150x150&path=weight:3%7Ccolor:orange%7Cenc:" + poly + "&key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog\" alt=\"<br> Offline\" />";
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
    var mapStyle = [{ elementType: "geometry", stylers: [{ hue: "#ff4400" }, { saturation: -68 }, { lightness: -4 }, { gamma: .72}] }, { featureType: "road", elementType: "labels.icon" }, { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ hue: "#0077ff" }, { gamma: 3.1}] }, { featureType: "water", stylers: [{ hue: "#00ccff" }, { gamma: .44 }, { saturation: -33}] }, { featureType: "poi.park", stylers: [{ hue: "#44ff00" }, { saturation: -23}] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ hue: "#007fff" }, { gamma: .77 }, { saturation: 65 }, { lightness: 99}] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ gamma: .11 }, { weight: 5.6 }, { saturation: 99 }, { hue: "#0091ff" }, { lightness: -86}] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ lightness: -48 }, { hue: "#ff5e00" }, { gamma: 1.2 }, { saturation: -23}] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ saturation: -64 }, { hue: "#ff9100" }, { lightness: 16 }, { gamma: .47 }, { weight: 2.7}]}];
    var src = get_static_style(mapStyle);

    $("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&" + src + "\">");
}

var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;

function decodepoly(polyline, ID, parentID) {
$('#location').append(polyline + " "  + ID + " " + parentID + "</br>");
    p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;
    totalDist = 0;
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
    
    for (var i = 0; i < arrayLength1; i++) {
   // alert(myStringArray1[i] + " ... " + myStringArray1[i + 1]);
       getDistance(myStringArray1[i], myStringArray1[i + 1]);
    var plus1= myStringArray1[i + 1];
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
        p10 = p10 + (percent / 100); ;
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
        p10 = p10 + (percent / 100); ;
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

function drawIDstars(ID,ctx,i) {
   // var canvas2 = document.getElementById('stars_' + ID);
   // var ctx = canvas2.getContext('2d');
    //alert(canvas2);
    var y = 20;
    y = (20 * (i +1));

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
   drawStarsF(ctx, 4, y,10);


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

function getTimediff(ID) {
    var wdata = localStorage.getItem("weatherdata");
    if (wdata == null) {
        return 5000000;
    } else {
        var wdatap = eval('(' + wdata + ')');
        var epoch = 0;
        var datestr;
        var timenow = Math.round(new Date().getTime() / 1000);
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
   //     console.log(ID + " " + json);
        //var timenow = Math.round(new Date().getTime() / 1000);
        $.each(j2.points, function (i, wd) {
            console.log(ID + " " + wd.PID);
            if (wd.PID == ID) { //or parentID
                //lat = wd.lat;
                // lng = wd.lng;
                latlng = wd.endlatlong;
            }
        });
        //alert(timenow + " " + epoch);
        return latlng;
    } else if (type == 'stars') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;
       
        //var timenow = Math.round(new Date().getTime() / 1000);
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                console.log(wd.latlng)
                //lat = wd.lat;
                // lng = wd.lng;
                latlng = wd.latlng;
            }
        });
        //alert(timenow + " " + epoch);
        return latlng;
    

    }  else if (type == 'segs') {
        var json = localStorage.getItem('starsdata');
        var j2 = eval('(' + json + ')');
        var lat;
        var lng;
        var latlng;

        //var timenow = Math.round(new Date().getTime() / 1000);
        $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                console.log(wd.latlng)
                //lat = wd.lat;
                // lng = wd.lng;
                latlng = wd.latlng;
            }
        });
        //alert(timenow + " " + epoch);
        return latlng;
    }

    else if (type == 'kom') {
        var stravaID = localStorage.getItem("frID");
    var json = localStorage.getItem('komdata_' + stravaID);
    var j2 = eval('(' + json + ')');
    var lat;
    var lng;
    var latlng;
       
    //var timenow = Math.round(new Date().getTime() / 1000);
    $.each(j2.segs, function (i, wd) {
        if (wd.ID == ID) { //or parentID
            console.log(wd.latlng)
            //lat = wd.lat;
            // lng = wd.lng;
            latlng = wd.latlng;
        }
    });
    //alert(timenow + " " + epoch);
    return latlng;
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
        var time = days +  " days ago";
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



function drawWeather(ID,type) {
    //var bdata = localStorage.getItem(ID+"_array");
  console.log("draw" + ID + type)
var starvals = {
    stardata: []
};
   
    var bearing_store = ID+"_array";
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
            //  alert(arval3h);
            var windspeed = zone.wspd.metric;
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

            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
            //head_wind_val = brgh0;
            //alert(brgh0);
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
     
        console.log(priv + " " + maxPpg.epoch);
        if (type == 'act' && priv == false) { //or is an act segment not a private activity
            saveTW(maxPpg.SegID, maxPpg.wspd, loc, maxPpg.stars, maxPpg.epoch, maxPpg.timestamp);
        }
        if (type == 'map' || type == 'stars' || type == 'kom') { //or is an act segment not a private activity
            saveTW(maxPpg.SegID, maxPpg.wspd, loc, maxPpg.stars, maxPpg.epoch, maxPpg.timestamp);
        }
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
var bearing_store = ID+"_array";
    //var ID2 = "421422146";
    //alert(bearing_store);
    //var bdata = JSON.parse(localStorage.getItem(bearing_store)); //eval
    var bdata = localStorage.getItem(bearing_store);
    //var bdata = eval('(' + bearing_json + ')');
    //readW();
    //alert(hrs);
    var latlng = getLatlng(ID,"stars")
    var jsondata;
    if (type == 'map') {
       jsondata  = localStorage.getItem(ID+"_weather_map");
    } else {
        jsondata = localStorage.getItem(ID+"_weather_act");
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
                    $('#stars_best_' + ID).html("<div style=\"color:#ffca4a\">" + maxPpg.timestamp + "</div>");//<i class=\"fa fa-trophy\"></i></p>");
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

function showStars(ID,numstars){
    //console.log("End for " + ID + "  " + numstars + "</br>");
    var starhtml = "";
    var starblankhtml= "";
    var i = numstars;
    var j;
    j = (5 - i);
 //   do {
    for (var x = i; x > 0; x--) {
        
            starhtml = starhtml + "<i class=\"fa fa-star\"></i>&nbsp;&nbsp;&nbsp;";
       
    }

    for (var x = j; x > 0; x--) {
        starblankhtml = starblankhtml + "<i class=\"fa fa-star-o\"></i>&nbsp;&nbsp;&nbsp;";
    }
  //  while (--i);
    
    
    $('#stars_' + ID).html("<p style=\"color:#ffca4a\">" + starhtml + starblankhtml + "</p>");//<i class=\"fa fa-trophy\"></i></p>");
    //alert(ID + starhtml);//<p>Calc<i class=\"fa fa-trophy\"></i></p>
}

function drawStarsO(ctx2d, i, y, xval) {
    do {
        star(ctx2d, xval, y, 8, 5, 0.5, "o");
        xval = xval + 20;
    }
    while (--i);

}

function drawStarsF(ctx2d,i, y,xval) {
    //var xval = 230;
    var j;
    j = (5 - i);
    do {
        star(ctx2d, xval, y, 8, 5, 0.5, "f");
        xval = xval + 20;
     if (i == 1 && j > 0) {
            drawStarsO(ctx2d,j,y,xval);
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
    var diff = getTimediff(ID);
    console.log(diff + "t" + type);
    function revertText() {
        clearInterval(timer1);
        //$('#wtitel').fadeOut();
        //dispStarsChk();
        //$('#refreshBtnW').fadeIn();
        // $('#winfo').fadeIn()
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

function checkWeather(latlng1, ct, ID,type) {
    var wdata = localStorage.getItem('weatherdata');
    var wdata_json = eval('(' + wdata + ')');

    var callW = true;
    var latlng = latlng1.toString().split(',');
  
    var lat = latlng[0];
    var lng = latlng[1];
    console.log("lat=" + lat);
    console.log("Checking weather2 for " + latlng + "</br>");
    var latx = lat - 0.1;
    var latxx = lat + 0.1;
    var lngx = lng - 0.1;
    var lngxx = lng + 0.1;
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
                
                    if ((callW == true) || ((fromJsonAct == null) && (fromJsonMap == null)))  { //no match
                        console.log("null check, callW=" + callW)
                    console.log("Getting weather for " + ID + "</br>");
                    callWeather(latlng,ID,type);
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

function copyWeather(fromID, toID, lat, lng, type) {
var jsondata;
if (type == "map") {
    jsondata = localStorage.getItem(fromID + "_weather_map");
    if (jsondata == null) {
        jsondata = localStorage.getItem(fromID + "_weather_act");
        localStorage.setItem(toID + '_weather_map', jsondata);
        console.log("json null, used act")
        calcStarsInline(toID, 24, type);
        drawWeather(toID, type);
        $('#refreshBtnW').show();
    } else {
        jsondata = localStorage.getItem(fromID + "_weather_map");
        localStorage.setItem(toID + '_weather_map', jsondata);
        console.log("json not null, used map")
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
   function RealCallWeather(latlng,ID,type) {
   
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

            var jsontext = JSON.stringify(json);
            var location = json['location']['city'];
            console.log("Retrieved weather for " + location + "  " + ID + "</br>");
            if (type == "map") {
                localStorage.setItem(ID + '_weather_map', jsontext);
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

//https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:3%7Ccolor:orange%7Cenc:polyline_data&key=YOUR_API_KEY


function initMap(poly) {

    var map = new google.maps.Map(document.getElementById('map_canvas_nearby'), {
        zoom: 13,
        center: { lat: 37.833, lng: -122.483 },
        zoomControl: false,
        scaleControl: true
    });

    //var flightPlanCoordinates = poly;

    var flightPath = new google.maps.Polyline({
        path: poly,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);

}



