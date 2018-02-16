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

// index.js NOT USED, IGNORE

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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        alert("ready");
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


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


function stConn2() {
    $('#status_msgs').html("connecting ...")
    var strava_deets = {
        deets: []
    };

    //   $('#status_msgs').show();
    //  $('#status_msgs').append("</br > Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)

        localStorage.removeItem('userdata');
        result.me().done(function (data) {
            // do something with `data`, e.g. print data.name

            strava_deets.deets.push({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "city": data.city,
                "state": data.state


            });

            var jsondeets = JSON.stringify(strava_deets);
            localStorage.setItem('userdata', jsondeets);

            $('#status_msgs').append("</br > " + data.lastname);
            showLocal();
            //   $('#AuthApp').show();
            //    $('#UnAuthApp').hide();
            //    stAct();
            // do some stuff with result
        });

    });
}

function showLocal() {
    $('#status_msgs').show();

    var str = "efforts";
    var str2 = "weather";
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        // if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i) + " data: " + localStorage.getItem(localStorage.key(i)));
        // }
        //   }

        //     if (localStorage.key(i).indexOf(str2) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i))// + " data: " + localStorage.getItem(localStorage.key(i)));
        // }
        //      }
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
