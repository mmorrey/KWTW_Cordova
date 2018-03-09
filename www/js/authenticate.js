// Request URL:https://www.strava.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fvv-api-cwtcmdmuvi.now.sh%2Fauth%2Fstrava%2Fcallback&client_id=22753
// https://www.strava.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fvv-api-oynfjqbhhl.now.sh%2Fauth%2Fstrava%2Fcallback&client_id=22753

// MM New Authentication Connector - see https://medium.com/@jlchereau/stop-using-inappbrowser-for-your-cordova-phonegap-oauth-flow-a806b61a2dc5
function authenticateWithSVC() {
    
    var authorizeURL ='https://www.strava.com/oauth/authorize?response_type=code&'
    + 'redirect_uri=https%3A%2F%2F' 
    + 'vv-api-mcexkvrskh.now.sh' // host
    + '%2f'+'fw' //path to callback (/fw)
    + '&client_id=22753';

    SafariViewController.isAvailable(function (available) {
        if (available) {
          SafariViewController.show(
            {
              url: authorizeURL
            },
            function (result) {
                console.log('SVC loading URL: '+ authorizeURL);
            },
            function (error) {
                console.log('SVC failed to load URL: ' + authorizeURL);
            }
          );
        }
      });
}

var handleOpenURL = function (url) {
    /*
    setTimeout(function() {
        alert("received url: " + url); // wrapped alert in a timeout in iOS see https://github.com/EddyVerbruggen/Custom-URL-scheme#3-usage
      }, 0);
      */
    SafariViewController.hide();

    if (url.startsWith('komwiththewind://token')) { // traling # removed to allow for search/query string option

        var token = /code=([^&]+)/.exec(url); // "access_token" replaced with "code"
        console.log('SVC success, returned token: ' + token[0] + ',' + token[1]);

        //ToDo validate token before next steps....

        localStorage.setItem('stravaAuthToken',token[1]);
        // works to here

        // get the user data
        if (typeof window.stravaClient === 'undefined') { 
            console.log('No "stravaClient" object, initialising....');
            initialiseStravaClient(token[1],getAthlete); // auth_token, callback function

        } else {
            console.log('"stravaClient" object found');
            getAthlete();
        }
        
    }
};


function getAthlete() {  // passing callback function to request athlete data
    console.log('"getAthlete" called');
    stravaClient.athlete.getLoggedInAthlete({responseContentType: 'application/json'}, function(data) {
        console.log(JSON.stringify(data.obj));
        // setUpUser(data);
    });
}

