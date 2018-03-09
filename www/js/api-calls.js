

// API calls

// var stravaClient = new SwaggerClient('https://developers.strava.com/swagger/swagger.json');


function initialiseStravaClient(authToken,callback) {
    //const authToken = localStorage.getItem('stravaAuthToken');
    window.stravaClient = new SwaggerClient({
        url: "https://developers.strava.com/swagger/swagger.json",
        authorizations: {
            //my_oauth2_token: { token: { access_token: authToken } }
            "Bearer": { token: { access_token: authToken } }
        },
        success: function() {
            console.log('Swagger client "stravaClient" configured for Strava API;');
            callback();
        }
    });
}


/*
Swagger('http://petstore.swagger.io/v2/swagger.json', {
  authorizations: {
    // Type of auth, is inferred from the specification provided 
    my_oauth2_token: { token: { access_token: 'authToken' } }
  }
}).then( client => ... )
*/

/*
const request = {
    url
    ,query
    ,method
    ,body
    ,headers
    ,requestInterceptor
    ,responseInterceptor
    ,userFetch
    ,authorizations: {
        // https://github.com/swagger-api/swagger-js/blob/master/docs/MIGRATION_2_X.md
        my_oauth2_token: { token: { access_token: 'authToken' } }
    }
}
*/


/*const requestAthlete = {
    'https://www.strava.com/api/v3/athlete',
    'GET',
    authorizations: {
        my_oauth2_token: { token: { access_token: authToken } }
    }
}*/

// upon connect, fetch a pet and set contents to element "mydata"

/*  
  Swagger.http(request)
    .then((res) => {
      res.statusCode // status code
      res.statusText // status text, ie: "Not Found"
      res.body       // JSON object or undefined
      res.obj        // same as above, legacy
      res.text       // textual body, or Blob
      res.headers    // header hash
    })
    .catch((err) => {
      err            // instanceof Error
      err.response   // response or null
    }
    */