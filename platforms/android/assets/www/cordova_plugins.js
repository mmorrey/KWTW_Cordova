cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-plugin-payment-iap.iap",
    "file": "plugins/cordova-plugin-payment-iap/www/iap.js",
    "pluginId": "cordova-plugin-payment-iap",
    "clobbers": [
      "window.iap"
    ]
  },
  {
    "id": "cordova-plugin-customurlscheme.LaunchMyApp",
    "file": "plugins/cordova-plugin-customurlscheme/www/android/LaunchMyApp.js",
    "pluginId": "cordova-plugin-customurlscheme",
    "clobbers": [
      "window.plugins.launchmyapp"
    ]
  },
  {
    "id": "cordova-plugin-safariviewcontroller.SafariViewController",
    "file": "plugins/cordova-plugin-safariviewcontroller/www/SafariViewController.js",
    "pluginId": "cordova-plugin-safariviewcontroller",
    "clobbers": [
      "SafariViewController"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-inappbrowser": "1.3.0",
  "cordova-plugin-payment-iap": "2.0.52",
  "cordova-plugin-customurlscheme": "4.3.0",
  "cordova-plugin-safariviewcontroller": "1.5.2"
};
// BOTTOM OF METADATA
});