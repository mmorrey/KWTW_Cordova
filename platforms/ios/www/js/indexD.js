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
    if (bearing < 30) {
        p1 = p1 + (percent / 100);
    }
    if (bearing >= 30 && bearing < 60) {
        p2 = p2 + (percent / 100);
    }
    if (bearing >= 60 && bearing < 90) {
        p3 = p3 + (percent / 100);
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

function x10(val) {
    return (val * 100);
}

function segAlgoData() {
    var i = 4;
    var segBearings = {
        pvals: []
    };

    var str = "1234";

    for (var i = 0; i < str.length; i++) {
        var nextChar = str.charAt(i);
        var pval = "p" + nextChar;
    }

}



function saveChart(ID) {
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
    var pArray = new Array();
    pArray.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
    localStorage.setItem(ID + "_array", pArray);
    var obj = [{
        value: p1,
        color: "#f93",
    },
    {
        value: p2,
        color: "#f93",
    },
    {
        value: p3,
        color: "#f93",
    },
    {
        value: p4,
        color: "#f93",
    },
    {
        value: p5,
        color: "#f93",
    },
    {
        value: p6,
        color: "#f93",
    },
    {
        value: p7,
        color: "#f93",
    },
	{
	    value: p8,
	    color: "#f93",
	},
	{
	    value: p9,
	    color: "#f93",
	},
	{
	    value: p10,
	    color: "#f93",
	},
	{
	    value: p11,
	    color: "#f93",
	},
	{
	    value: p12,
	    color: "#f93",
	}];

    localStorage.setItem(ID + "_chart", JSON.stringify(obj));

}


function drawChart(ID) {
    var chart_store = ID + "_chart";
    var obj = JSON.parse(localStorage.getItem(chart_store)); 
    var canvas = document.getElementById("chart-area")
    var ctx = canvas.getContext("2d");
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
        color: "#f93",
        scaleSteps: 1,
        scaleStepWidth: 1,
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
    if (ID == 11) {
        var map = new GoogleMap(ID, lat, lng, 12);
        map.initialize();
    } else {
        var latlngsaved = localStorage.getItem("latmap");
        if (latlngsaved == null) {
            var lat = "48.14";
            var lng = "17.11";
            var zoom = 5;
        } else {
            var lat = localStorage.getItem("latmap");
            var lng = localStorage.getItem("lngmap");
            var zoom = localStorage.getItem("zoommap");
        }
        var map = new GoogleMap(ID, lat, lng, zoom);
        map.initialize();
    }

}

function showmap(ID, lat, lng) {
    $('#map_canvas_nearby').show();
    timera = setInterval(function () { startmap(ID, lat, lng) }, 1500);
}

function setZoom(map, lat, lng) {
    var boundbox = new google.maps.LatLngBounds();
    boundbox.extend(new google.maps.LatLng(lat, lng));
    map.setCenter(boundbox.getCenter());   
}

function GoogleMap(ID, lat, lng, zoom1) {
    $("#winfomap").html("");
    $("#seg_weather").hide();
    $("#seg_leaderboard").hide();
    $("#seg_efforts").hide();
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
            var timer;
            return function () {
                if (devOnline) { 
                clearTimeout(timer);
                timer = setTimeout(function () {

                    bounds = map.getBounds();
                    var zoom2 = map.getZoom();
                    var latn = map.getCenter().lat();
                    var lngn = map.getCenter().lng();

                    localStorage.setItem("zoommap", zoom2);
                    localStorage.setItem("latmap", latn);
                    localStorage.setItem("lngmap", lngn);
                    $("#winfomap").html("Retrieving segments ...");
                    $('#map_table').html("");
                    $('#mapWind').hide();
                    removeMarkers(null);

                    markers_array = [];
                    $('#deets_tile').hide();

                    $('#pills_row').hide();

                    $('#seg_weather').hide();
                    $('#seg_leaderboard').hide();
                    setMarkers(map, bounds, ID);
                }, 2000);
                } else {
                    $('#map_table').html("");
                    $("#winfomap").html("Device is offline.");
                }
            }
        }()));


        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });


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
    var zoom = localStorage.getItem("zoommap");
    var tlat = "56.058168";
    var tlng = "-2.719811";
    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/explore', { data: { bounds: bds_fmt } }).done(function (data) {
            var jsondeets = JSON.stringify(data);

            $.each(data.segments, function (i, seg) {
       
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


                ct++;

            });
            seg_loc_data.count.push({
                "num": ct
            });

            var jsonsegs = JSON.stringify(seg_loc_data);
            localStorage.setItem('seg_loc_data', jsonsegs);
            parse("map");

            if (ct > 0) {
                var timer2m = setTimeout(function () { startDecode1() }, 1500);
                function startDecode1() {
                    clearTimeout(timer2m);
                    var zoom = localStorage.getItem("zoommap");
                    if (zoom >= 12) {
                        weatherMap1("map", ct);
                    }
                }


            }

            var timer1m = setTimeout(function () { startDecode() }, 5000);
            function startDecode() {

                clearTimeout(timer1m);
                delOldst("unused");
                setMarkers2(map, bounds_map, PID, ct);
                calcStorage();
            }



        });
    });

}

function setMarkers2(map, bounds_map, PID, ct) {
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    $('#map_table').show();
    $("#winfomap").html();
    var midhtml = "";
    $.each(j2s.points, function (i, markers) {

        var latlng = markers.end_latlng;
        var segname = markers.name;
        segname = segname.replace("'", "");
        var w = window.innerWidth;
        var nameW = w - 80;
        midhtml = midhtml + "<tr id=\"trow_" + markers.PID + "\" class=\"hover_o\" onclick=\"poly_map(" + markers.PID + "," + i + ")\" style=\"height:50px\"><td><div style=\"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:3px;width:" + nameW + "px\">" + segname + "</div>" +
         "<div style=\"display:inline-block;padding-left:3px\" id=\"stars_" + markers.PID + "\"></div><div style=\"display:inline-block\" id=\"stars_best_" + markers.PID + "\"></div></td></tr>";
    
        $('#stars_n' + markers.PID).html("<p>stars n</p>");
        var stars = calcStarsInline(markers.PID, "24", "map");
        if (stars == "-1") {
            stars = "d";
        }
        if (markers.PID == parseInt(PID)) {
            $('#place_name').html(markers.name);
        } else if (markers.PID == 1) {
        } else {
            var image = 'img/map_marker_start_' + stars + '.png';

        }
        var siteLatLng = new google.maps.LatLng(markers.lat, markers.longval);
        var markerp = new google.maps.Marker({ 'position': siteLatLng, 'map': map, 'icon': image });
        var endLatLng = new google.maps.LatLng(markers.endlat, markers.endlongval);
        var endpos = "(" + markers.endlatlong + ")";

        if (markers.name == "You are here!") {
        } else {
            markers_array.push(markerp);

        }

        google.maps.event.addListener(markerp, "click", function () {
            var image2 = 'img/map_marker_end.png';
            var marker_end = new google.maps.Marker({ 'position': endLatLng, 'map': map, 'icon': image2 });
            addPolyline(returnpoly(markers.points)).setMap(map);
            $('table tbody tr').each(function (index, el) {
                $(this).siblings().removeClass('sel_p');
            });
            jQuery('#trow_' + markers.PID).addClass('sel_p').removeClass('un_sel').removeClass('sel');
        });

    });

    var top = "<div id=\"ttop_map\"><table class=\"table table-striped\">"
    if (ct > 0) {
        $('#mapWind').show();  //aaa

    } else {
        $('#refreshBtnmap').html("");
        $('#mapWind').hide(); //aaa
    }
    var ht = parseInt((ct * 50) + 80);
    $('#tableback_map').height(ht);
    $('#map_table').html(top + midhtml + "</table></div>");
    $("#winfomap").html("Found " + ct + " segments");

    var zoom = localStorage.getItem("zoommap");

    if (ct > 0) {
        displayStarsmap(24, ct); //aaa
        drawWindcanvas(null, 0, 5, ct);
    }

}

function format_bounds(bds) {
    var bds2 = bds.replace("((", "");
    var bds3 = bds2.replace("))", "");
    var bds4 = bds3.replace("), (", ",");
    var bds5 = bds4.replace(" ", "");
    var bds6 = bds5.replace(" ", "");
    var bdsar = bds6.split(',');
    var lat = (parseFloat(bdsar[2] - bdsar[0])) + parseFloat(bdsar[0]);
    var lng = (parseFloat(bdsar[3] - bdsar[1])) + parseFloat(bdsar[1]);
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


function showLeader(ID, type,dist) {
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
        $('#seg_leaderboard').show();
        $('html, body').animate({
            scrollTop: $("#leaderback").offset().top
        }, 2000);
        if (devOnline == true) {
            $('#lbdata').html("Retrieving Leaderboard ...");
            stLeader(ID, type,dist);
        } else {
            $('#lbdata').html("Device is offline.");
        }

      
    } else {

        drawLeaderboard(ID, type); //changed
    }
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
    if (devOnline == true) {

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
                stEffort(ID, frID, type); 
            } else {
                stEffort(ID, null, type);
            }
        } else {
            if (frID != null) {
                drawSegEffort(ID, frID); 
            } else {
                drawSegEffort(ID, null);
            }

        }

    } else {
        $('#seg_weather').hide();
        $('#seg_leaderboard').hide();
        $('#seg_efforts').show();
        $('#sgdata').html("Device is offline.");
    }
}

function poly_map(ID, i) {
    $('table tbody tr').each(function (index, el) {
        $(this).siblings().removeClass('sel');
    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel').removeClass('sel_p');
    $('#seg_data').show();
    $('#seg_weather').show();
    $('#data_pills').show();
    $('#seg_details').show();
    $('#pills_row').show();
    $('#deets_tile').show();
    $('html, body').animate({
        scrollTop: $("#seg_title").offset().top
    }, 2000);
    $('#static_map').fadeIn();
    var json = localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + json + ')');
    var dist = j2.points[i].dist;
    var egain = j2.points[i].gain;
    var name = j2.points[i].name;
    var latlng = getLatlng(ID, "map");
    var fstate = localStorage.getItem(ID + "_fav");
    name = name.replace("'", "");
    if (fstate == null) {
        fstate = 1;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','map','" + dist + "','" + egain + "'," + i + ")\"><i class=\"fa fa-heart-o\"></li></button>";
    } else {
        fstate = 0;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','map','" + dist + "','" + egain + "')\"><i class=\"fa fa-heart\"></li></button>";
    }
    $('#favBtn').html(favbtn);
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + egain + "</bold></p>");
    $('#backBtn').html(favbtn);
    var type = "map";
    $('#ultop > li').each(function (index, el) {
        $(this).siblings().find('p').removeClass('sel');

    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');
    var effs = localStorage.getItem('eff_data_' + ID);
    if (effs == null) {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'map')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
"</div></div>");
    } else {

        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'map')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
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
    drawChart(ID);

    drawWeather(ID, 'map');


}

function polyF(ID, ftype) {
    $('#deets_tile').show();
    $('table tbody tr').each(function (index, el) {
        $(this).siblings().removeClass('sel');
    });

    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');
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

    if (scroll == true) {
        $('html, body').animate({
            scrollTop: $("#seg_title").offset().top
        }, 2000);
    }

    var fstate = localStorage.getItem(ID + "_fav");
    var j2 = eval('(' + fstate + ')');
    if ((ftype == "kom") || (ftype == "stars")) {
        var pl = localStorage.getItem(ID + "_poly");
    } else {
        var pl = j2.segs[0].poly;
    }
    var name = j2.segs[0].name;
    var latlng = j2.segs[0].latlng;
    var type = "favs";
    var dist = j2.segs[0].dist;
    var gain = j2.segs[0].gain;
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");
    if (fstate == null) {
        fstate = 1;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "')\"><i class=\"fa fa-heart-o\"></li></button>";
    } else {
        fstate = 0;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "')\"><i class=\"fa fa-heart\"></li></button>";
    }
    $('#favBtn').html(favbtn);

    $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'" + ftype + "')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ",'" + type + "')\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
"</div></div>");
    drawWeather(ID, ftype);

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

function poly2(ID, i, scroll, type, frID) {

    $('#deets_tile').show();
    var canvas = document.getElementById('weather_stars');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 130, 2000);
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var stravaID = user.deets[0]['stravaID'];
    $('table tbody tr').each(function (index, el) {
        $(this).siblings().removeClass('sel');
    });

    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');

    $('#seg_data').show();
    $('#pills_row').show();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#seg_efforts').hide();
    $('#deets_tile').show();
    $('#data_pills').show();
    $('#seg_details').show();
    $('#static_map').fadeIn();

    if (scroll == true) {
        $('html, body').animate({
            scrollTop: $("#seg_title").offset().top
        }, 2000);
    }
    if (type == "stars") {
        var json = localStorage.getItem('starsdata');
    } else {
        var json = localStorage.getItem('komdata_' + frID);
    }

    var pl = localStorage.getItem(ID + "_poly"); //j2.segs[i].poly;
    if (frID != null) {
        var frStr = getFriendFirstname(frID) + "'s Efforts";
    }

    var j2 = eval('(' + json + ')');
    var dist = j2.segs[i].dist;
    var name = j2.segs[i].name;
    var elev_h = j2.segs[i].elev_h;
    var elev_l = j2.segs[i].elev_l;
    var latlng = j2.segs[i].latlng;
    var lat = latlng[0];
    var gain = parseInt(elev_h) - parseInt(elev_l);
    var fstate = localStorage.getItem(ID + "_fav");
    name = name.replace("'", "");
    if (fstate == null) {
        fstate = 1;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart-o\"></li></button>";
    } else {
        fstate = 0;
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + "," + fstate + ",'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart\"></li></button>";
    }
    $('#favBtn').html(favbtn);
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");
    if (type == "stars") {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'" + type + "')\">Weather</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ",'" + type + "')\">Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
"</div></div>");
        drawWeather(ID, type);
    } else {

        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">My Efforts</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ",'" + type + "', " + frID + ")\">" + frStr + "</button>" +
"<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
"</div></div>");

    }
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

function setFav(ID, fstate, name, latlng, type, dist, gain, i) {

    if (fstate == 0) {
      
        localStorage.removeItem(ID + "_fav")
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + ",1,'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart-o\"></li></button>";
        getAct('favs');
    } else {
        var strava_segs = {
            segs: []
        };
        if (i > -1) {
            if (type == "map") {
                var json = localStorage.getItem('seg_loc_data');
            //} else if (type == "kom") {
            //    var json = localStorage.getItem('seg_loc_data');
            }

            var j2 = eval('(' + json + ')');
            var pl = j2.points[i].points;
        }

        strava_segs.segs.push({
            "name": name,
            "latlng": latlng,
            "type": type,
            "dist": dist,
            "gain": gain,
            "poly": pl
          
        });
        var jsonsegs = JSON.stringify(strava_segs);
        localStorage.setItem(ID + "_fav", jsonsegs);
        var favbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"setFav(" + ID + ",0,'" + name + "','" + latlng + "','" + type + "','" + dist + "','" + gain + "')\"><i class=\"fa fa-heart\"></li></button>";
    }

    $('#favBtn').html(favbtn);


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
  
    $('#friend_tile_list').html(top + midhtml + "</table>");

}


function polySegs(ID, i, name) {
    g1.refresh(0);
 
    $('#pills_row').show();
    $('#data_pills').show();
    $('#static_map').fadeIn();
    $('html, body').animate({
        scrollTop: $("#seg_title").offset().top
    }, 2000);
    $('#ultop > li').each(function (index, el) {
        $(this).siblings().find('p').removeClass('sel');

    });
    jQuery('#trow_' + ID).addClass('sel').removeClass('un_sel');

    var json = localStorage.getItem('all_seg_efforts');
    var j2 = eval('(' + json + ')');
    var dist = j2.segs[i].dist;
    var kom_rank = j2.segs[i].kom_rank;
    var parentID = j2.segs[i].parentID;
    var priv = j2.segs[i].private;
    var elev_h = j2.segs[i].elev_h;
    var elev_l = j2.segs[i].elev_l;
    var gain = parseInt(elev_h) - parseInt(elev_l);
    var Sebtn = "<button type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"showEfforts(" + parentID + ")\">Segment Efforts l</button>";
    var Backbtn = "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"backAct()\">Back</button>";
    $('#seg_title').html("<h1>" + name + "</h1>");
    $('#seg_dist').html("<p><bold>" + dist + "</bold></p>");
    $('#seg_egain').html("<p><bold>" + gain + "</bold></p>");

    $('#backBtn').html(Backbtn);

    var pl = localStorage.getItem(ID + "_poly");

    var type = "segs";
    if (priv == false) {
        $('#data_pills').html("<div style=\"padding-bottom:15px\"><button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"lpill\" onclick=\"saveFav(" + ID + ")\">" +
      "Save to Favorites</button><div id=\"fav_msg\" class=\"msg_sml\" style=\"display:inline-block;padding-left:20px\"></div></div>" +
      "<div class=\"btn-group btn-group-s\" role=\"group\">" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'act')\">Weather</button>" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
      "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"lpill\" onclick=\"showLeader(" + ID + ",'" + type + "','" + dist + "')\">Leaderboard</button>" +
      "</div>");

    } else {
        $('#data_pills').html("<div class=\"btn-group btn-group-s\" role=\"group\">" +
 "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"wpill\" autofocus=\"true\" onclick=\"drawWeather(" + ID + ",'act')\">Weather</button>" +
 "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"ewpill\" onclick=\"showEfforts(" + ID + ")\">Efforts</button>" +
 "</div></div>");
    }

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
    var mapStyle = [{ elementType: "geometry", stylers: [{ hue: "#ff4400" }, { saturation: -68 }, { lightness: -4 }, { gamma: .72 }] }, { featureType: "road", elementType: "labels.icon" }, { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ hue: "#0077ff" }, { gamma: 3.1 }] }, { featureType: "water", stylers: [{ hue: "#00ccff" }, { gamma: .44 }, { saturation: -33 }] }, { featureType: "poi.park", stylers: [{ hue: "#44ff00" }, { saturation: -23 }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ hue: "#007fff" }, { gamma: .77 }, { saturation: 65 }, { lightness: 99 }] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ gamma: .11 }, { weight: 5.6 }, { saturation: 99 }, { hue: "#0091ff" }, { lightness: -86 }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ lightness: -48 }, { hue: "#ff5e00" }, { gamma: 1.2 }, { saturation: -23 }] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ saturation: -64 }, { hue: "#ff9100" }, { lightness: 16 }, { gamma: .47 }, { weight: 2.7 }] }];
    var src = get_static_style(mapStyle);

    $("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&" + src + "\">");
}

var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;
var latlongkml = [];
function decodeKML() {
    var kml = localStorage.getItem("kml1");
    var kmlarr = kml.split(" ");

    for (var i = 0; i < kmlarr.length; i++) {
        if (kmlarr[i + 1] != undefined) {
            var cords = kmlarr[i].split(",");
            var cords1 = kmlarr[i + 1].split(",");
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
          latlong = google.maps.geometry.encoding.decodePath(polyline);
        latlong2 = latlong;
         var myStringArray1 = latlong;
        var myStringArray2 = latlong2;
        var arrayLength2 = myStringArray2.length;
        var arrayLength1 = myStringArray1.length;

    }
    for (var i = 0; i < arrayLength1; i++) {
        getDistance(myStringArray1[i], myStringArray1[i + 1]);
        var plus1 = myStringArray1[i + 1];
        if ((plus1 != undefined) && (i == (arrayLength1 - 2))) {

            var arrayLength1 = myStringArray1.length;
           
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
                     if (bearing < 30) {
                        p1 = p1 + (percent / 100);
                    }
                    if (bearing >= 30 && bearing < 60) {
                        p2 = p2 + (percent / 100);
                    }
                    if (bearing >= 60 && bearing < 90) {
                        p3 = p3 + (percent / 100);
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
             
                    saveChart(ID);
               

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
         if (bearing < 30) {
            p1 = p1 + (percent / 100);
        }
        if (bearing >= 30 && bearing < 60) {
            p2 = p2 + (percent / 100);
        }
        if (bearing >= 60 && bearing < 90) {
            p3 = p3 + (percent / 100);
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

        if (i == (arrayLength1 - 2)) {
            saveChart(ID);
 
        }
    }
}


function whichW(bearing, speed) {
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
    var y = 20;
    y = (20 * (i + 1));
    ctx.fillStyle = "#ffca4a";
    drawStarsF(ctx, 4, y, 10);
}

function getTimeW(ID) {
    var wdata = localStorage.getItem("weatherdata");
    var wdatap = eval('(' + wdata + ')');
    var epoch = 0;
    var datestr;
    var timenow = Math.round(new Date().getTime() / 1000);
    $.each(wdatap.wdata, function (i, wd) {
         if (wd.ID == ID) {
            epoch = wd.timestamp;
            datestr = wd.datestr;
        }
    });
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

             return parseInt(timenow - firsthour);
        }
    } else {
        var wdata = localStorage.getItem("weatherdata");
        var wdatap = eval('(' + wdata + ')');
       
        var wdatac = localStorage.getItem(ID + "_weather_act");

        if ((wdatap == null) || (wdatac == null)) {
            return 50000002;
        } else {
           
           
            $.each(wdatap.wdata, function (i, wd) {
                if (wd.ID == ID) {
                    epoch = wd.timestamp;
                }
            });
             return parseInt(timenow - epoch);
        }
    }
}

function getFriendFirstname(frID) {
    var json = localStorage.getItem('frdata');
    var j2 = eval('(' + json + ')');
    var firstname;
    $.each(j2.people, function (i, wd) {

        if (wd.ID == frID) { //or parentID
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
               
                latlng = wd.latlng;
            }
        });
        return latlng;
    }
    else if (type == 'favs') {

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
        return name;
    }

    else if (type == 'kom') {
        var stravaID = localStorage.getItem("frID");
        var json = localStorage.getItem('komdata_' + stravaID);
        var j2 = eval('(' + json + ')');
        var name
         $.each(j2.segs, function (i, wd) {
            if (wd.ID == ID) { //or parentID
                name = wd.name;
            }
        });
        return name;
    }
}

function getParent(ID) {

    var json = localStorage.getItem('all_seg_efforts');
    var j2 = eval('(' + json + ')');

    var PID;
   $.each(j2.segs, function (i, wd) {
        if (wd.ID == ID) {
            lat = wd.lat;
            lng = wd.lng;
            latlng = lat + "," + lng;
        }
    });
    return PID;

}

function prettify(diff) {


    var str;
    var sec_num = parseInt(diff, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var days = Math.floor(hours / 24);
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
 
    return time;
}


function drawWeather(ID, type) {

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
    if (jsondata != null) {
        $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Refresh Weather</a>");
        var bdata = localStorage.getItem(bearing_store);
        var parsed_json = eval('(' + jsondata + ')');
         var cutoff = parseInt("16");
        var country = parsed_json['location']['country_name'];
        var location = parsed_json['location']['city'];
        var locstr = location + ", " + country

        $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather for " + location + ", " + country + "</div>");

        var posy = 4; //54;
        var posyt = 15; //65;
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

        var ni = 1;
        var done_dt = 0;
        var first_hour = -1;
        hour_bg_bk = "000";
        var totalsnow = 0;
         var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';
        ctx2d.strokeStyle = "#2fb4c8";
        ctx2d.save();


        $.each(parsed_json.hourly_forecast, function (i, zone) {
  
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
            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);
            ctx2d.fillText(day, 5, posyt + 20);
            ctx2d.fillText(mday + " " + mon, 5, posyt + 30);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(30, posy + 55);
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

            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(59, posy + 42, ws + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.fillText("kph", 80, posyt + 46);
            ctx2d.fillText(zone.wspd.metric, 62, posyt + 46);
            ctx2d.fillStyle = "#2fb4c8";

            ctx2d.fillText(cond, 59, posyt + 6);  //was cond

            ctx2d.font = '16px Arial';
            ctx2d.fillText(zone.temp.metric, (start), posyt + 27);//33
            ctx2d.fillText("°C", (start + 15), posyt + 27);//33


            dt_ct = dt_ct + 1;
            var brg = winddeg;
            var pval0f = getP_foll(brg);
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
            var windspeed = zone.wspd.metric;
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

            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2) + parseInt(brgf3) + parseInt(brgf4); //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);

            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
            var numstars = 0;
            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#f93";
            ctx2d.font = '13px Arial Bold';
            ctx2d.fillStyle = "#ffca4a";
            ctx2dr.fillStyle = "#ffca4a";

            if (starval <= 0) {
                drawStarsO(ctx2dr, 5, posy + 30, 9);
            } else {
                numstars = calcStars(starval);
                drawStarsF(ctx2dr, numstars, posy + 30, 9);
            }

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
            posy = posy + 76;
            posyt = posyt + 76;

        });
        var locupdate = localStorage.getItem("locupdate");
        if (locupdate == false) {
            saveSegment(null, ID, null, null, null, null, locstr);
            localStorage.setItem("locupdate", true);
        } else {

        }
        var maxPpg = getMax(starvals.stardata, "stars");
        var loc = location + ", " + country

        if (type == "act") {
            var priv = checkSegisAct(ID);
        } else {
            var priv = false;
        }
        var segName = getSegName(ID, type);
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
        if (devOnline) {

            $('#refreshBtnW').show();
            $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather not yet retrieved</div>");
            var latlng = getLatlng(ID, type);
            if (type != 'map') {
                $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Retrieve Weather</a>");
            } else {
                $('#refreshBtnW').html("<a class=\"btn btn-primary btn-sm\" href=\"#seg_weather\" onclick=\"getW('" + latlng + "'," + ID + ", '" + type + "')\">Retrieve Weather</a>");
            }
        } else {
            $('#refreshBtnW').hide();
            $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Device is offline.</div>");
        }
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

    var bearing_store = ID + "_array";

    var bdata = localStorage.getItem(bearing_store);

    var latlng = getLatlng(ID, "stars")
    var jsondata;
    if (type == 'map') {
        jsondata = localStorage.getItem(ID + "_weather_map");

        drawWindcanvas(null, 0, 5, 0);
    } else {
        jsondata = localStorage.getItem(ID + "_weather_act");
    }
    if (jsondata != null) {
        $('#winfo').html("Showing the best star ratings for the next 24 hours of retrieved weather");
        $('#winfo').fadeIn();
        var beststars;
        var parsed_json = eval('(' + jsondata + ')');
        var star_avg = 0;
        var stars_tot = 0;
        var diff = 3;
        var ct = 3;
        if (hrs == 24) {
            var start = 0;
            var end = 24;
            diff = 24;
            ct = 24;
        } else {
            hrs = parseInt(hrs);
            var start = parseInt(hrs - 3);
            var end = parseInt(hrs);
        }

        while (start < end) {
            var winddeg = parsed_json.hourly_forecast[start].wdir.degrees;
            var longtime = parsed_json.hourly_forecast[start].FCTTIME.pretty;

            var brg = winddeg;
            var pval0f = getP_foll(brg);
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
            var windspeed = parsed_json.hourly_forecast[start].wspd.metric;
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

            var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2) + parseInt(brgf3) + parseInt(brgf4); //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
            var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);

            var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));

            var numstars = 0;
            if (starval <= 0) {
             } else {
                numstars = calcStars(starval);

            }

            stars_tot = stars_tot + numstars;
            starvals.stardata.push({
                "stars": numstars,
                "hour": start,
                "wspd": windspeed,
                "SegID": ID,
                "timestamp": longtime

            });
             diff--;

            if (diff == 0) {
                star_avg = Math.round(stars_tot / ct);
                $('#location').append("Avg Stars for " + ID + "  " + star_avg + "</br>");
                 $('#stars_best_' + ID).hide();
                if (hrs == 24) {
                    var maxPpg = getMax(starvals.stardata, "stars");


                    $('#stars_best_' + ID).html("<div class=\"msg_sml\">" + maxPpg.timestamp + "</div>");
                    $('#stars_best_' + ID).fadeIn();
                    beststars = maxPpg.stars;
                    showStars(ID, maxPpg.stars);
                } else {
                    showStars(ID, star_avg);
                }

            }
            start++;
        }
        return beststars;
    } else {
        if (type == "stars") {

        }
        return "-1";
    }
  
}

function showStars(ID, numstars) {
  
    var starhtml = "";
    var starblankhtml = "";
    var i = numstars;
    var j;
    j = (5 - i);
    for (var x = i; x > 0; x--) {

        starhtml = starhtml + "<i class=\"fa fa-star\"></i>&nbsp;";

    }

    for (var x = j; x > 0; x--) {
        starblankhtml = starblankhtml + "<i class=\"fa fa-star-o\"></i>&nbsp;";
    }



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

    function revertText() {
        clearInterval(timer1); 
        drawWeather(ID, type);
        $('#refreshBtnW').fadeIn();
    }
    if (diff < 10800) { //10800
        var timer1 = setInterval(function () { revertText() }, 5000);
        $('#refreshBtnW').fadeOut();
        $('#wtitle').fadeOut('slow', function () {
            $('#wtitle').html("<div style=\"padding-left:8px\" class=\"msg_sml\">Weather data retrieved less than 3 hours ago.</br>Refresh not available</div>");
            $('#wtitle').fadeIn();
        });
    } else {

        var loc = latlng;
 
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

    var latx = lat - 0.05;
    var latxx = lat + 0.05;
    var lngx = lng - 0.05;
    var lngxx = lng + 0.05;
    var epoch = Math.round(new Date().getTime() / 1000);
    $.each(wdata_json.wdata, function (i, wd) {
        if ((wd.lat > latx && wd.lat < latxx) && (wd.lat > latx && wd.lat < latxx)) {
            var toID = ID;
            var fromID = wd.ID;
            var fromJsonAct = localStorage.getItem(fromID + "_weather_act");
            var fromJsonMap = localStorage.getItem(fromID + "_weather_map");
            if (epoch - wd.timestamp > 10800) {

                callW = true;
            } else {
 
                callW = false;
            }

        }
        ct--;
        if (ct <= 0) {


            if ((callW == true) || ((fromJsonAct == null) && (fromJsonMap == null))) { //no match

                callWeather(latlng, ID, type);
  
            } else {

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


}

function checkLocalW() {
    var ID = 0;
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    $.each(j2s.points, function (i, seg) {
        var wdata = localStorage.getItem(seg.PID + "_weather_map");

        if (wdata != null) {
            ID = seg.PID;

            return false;

        } else {
            ID = null;

        }

    });

    return ID;

}

function copyMapWeather(ID) {
   
    jsondata = localStorage.getItem(ID + "_weather_map");
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    $.each(j2s.points, function (i, seg) {     
        localStorage.setItem(seg.PID + '_weather_map', jsondata);
             
    });
   

}


function checkLocalW() {
    var ID = 0;
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    $.each(j2s.points, function (i, seg) {
        var wdata = localStorage.getItem(seg.PID + "_weather_map");

        if (wdata != null) {
            ID = seg.PID;

            return false;

        } else {
            ID = null;

        }

    });

    return ID;

}

function copyWeather(fromID, toID, lat, lng, type) {
    var jsondata;
    var zoom = localStorage.getItem("zoommap");
    if (type == "map") {
        jsondata = localStorage.getItem(fromID + "_weather_map");
        if (jsondata == null) {
            jsondata = localStorage.getItem(fromID + "_weather_act");
            localStorage.setItem(toID + '_weather_map', jsondata);

            calcStarsInline(toID, 24, type); 
            if (zoom >= 12) {
                copyMapWeather(fromID);
            }
            $('#refreshBtnW').show();
        } else {
            jsondata = localStorage.getItem(fromID + "_weather_map");
            localStorage.setItem(toID + '_weather_map', jsondata);

            if (zoom >= 12) {
                copyMapWeather(fromID);
            }
            calcStarsInline(toID, 24, type);
 
            $('#refreshBtnW').show();
        }
    } else {
        jsondata = localStorage.getItem(fromID + "_weather_act");
        localStorage.setItem(toID + '_weather_act', jsondata);

        calcStarsInline(toID, 24, type);
        drawWeather(toID, type);
        $('#refreshBtnW').show();


    }


    var epoch = Math.round(new Date().getTime() / 1000);
    var weather_deets = {
        wdata: []
    };

    var ct = localStorage.getItem('weatherdata_ct');
    if (ct == null) {
        ct = 0;
    }

    var ct2 = 0;
    var wdata = localStorage.getItem('weatherdata');

    var wdata_json = eval('(' + wdata + ')');

    $.each(wdata_json.wdata, function (i, wd) {

        weather_deets.wdata.push({
            "ID": wd.ID,
            "lat": wd.lat,
            "lng": wd.lng,
            "timestamp": wd.timestamp,
            "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
      
        });

        ct--;

        if (ct == 0) {
            weather_deets.wdata.push({
                "ID": toID,
                "lat": lat,
                "lng": lng,
                "timestamp": epoch,
                "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
            });
             var jsondeets = JSON.stringify(weather_deets);

            $('#location').append("Copied weather data " + toID + "</br>");
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
         if (localStorage.key(i).indexOf(str) > -1) {
            ct++;
        }
    }
    return ct;
}


function countFavs() {
    var ct = 0;
    var str = "_fav";
    for (var i = 0; i < localStorage.length; i++) {
  
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

    var weather_deets = {
        wdata: []
    };

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
             
                });
            }
                   ct--;
     
            if (ct == 0) {
                weather_deets.wdata.push({
                    "ID": ID,
                    "lat": lat,
                    "lng": lng, 
                    "timestamp": epoch,
                    "datestr": moment().format("MMM Do YYYY, h:mm:ss a")
                });
       
                var jsondeets = JSON.stringify(weather_deets);
                RealCallWeather(latlng,ID,type);
                $('#location').append("Writing Weather data 2 = " + ID + "</br>");
                localStorage.setItem('weatherdata', jsondeets);
                countWdata();
             } else {
            }         
         
        
        });  
    
    } else {
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
        countWdata();
    }

}   


function RealCallWeather(latlng, ID, type) {

    $.ajax({
        type: "GET",
        url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + latlng + ".json",

        timeout: 4000,
        dataType: "json",
        success: function (json) {
            delete json['location']['nearby_weather_stations'];
            delete json['location']['wuiurl'];
              delete json['response'];
            $.each(json.hourly_forecast, function (i, zone) {
                delete json['hourly_forecast'][i]['dewpoint'];
                delete json['hourly_forecast'][i]['windchill'];
                delete json['hourly_forecast'][i]['heatindex'];
                delete json['hourly_forecast'][i]['feelslike'];
                delete json['hourly_forecast'][i]['icon_url'];
                delete json['hourly_forecast'][i]['FCTTIME']['weekday_name_abbrev'];
                delete json['hourly_forecast'][i]['FCTTIME']['weekday_name_night'];
                delete json['hourly_forecast'][i]['FCTTIME']['weekday_name_unlang'];
                delete json['hourly_forecast'][i]['FCTTIME']['weekday_name_night_unlang'];
                delete json['hourly_forecast'][i]['qpf'];
                delete json['hourly_forecast'][i]['snow'];
                delete json['hourly_forecast'][i]['pop'];
                delete json['hourly_forecast'][i]['mslp'];
                delete json['hourly_forecast'][i]['wx'];
                delete json['hourly_forecast'][i]['sky'];
                delete json['hourly_forecast'][i]['humidity'];
                delete json['hourly_forecast'][i]['fctcode'];
                delete json['hourly_forecast'][i]['icon'];
            });
            var jsontext = JSON.stringify(json);
            var location = json['location']['city'];

            if (type == "map") {
                localStorage.setItem(ID + '_weather_map', jsontext);
                var zoom = localStorage.getItem("zoommap");
                if (zoom >= 12) {
                    copyMapWeather(ID);
                }
                  } else {
                localStorage.setItem(ID + '_weather_act', jsontext);
            }
            countWdata();
            var epoch = Math.round(new Date().getTime() / 1000)
            var timenow = new Date();
            var hour_now = timenow.getHours();
            var minute_now = timenow.getMinutes();
            var today = timenow.getDate();
      
            calcStarsInline(ID, 24, type);
            drawWeather(ID, type);
            $('#refreshBtnW').show();

        },
        error: function (xhr, error) {

            $("#winfomap").html("Weather data unavailable. Please try later");
            $("#winfo").html("Weather data unavailable. Please try later");
        },
        complete: function () {
 

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

  
    var flightPath = new google.maps.Polyline({
        path: poly,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);

}



