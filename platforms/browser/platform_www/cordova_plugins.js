cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/src/browser/InAppBrowserProxy.js",
        "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
        "pluginId": "cordova-plugin-inappbrowser",
        "merges": [
            ""
        ]
    },
    {
        "file": "plugins/cordova-plugin-payment-iap/www/iap.js",
        "id": "cordova-plugin-payment-iap.iap",
        "pluginId": "cordova-plugin-payment-iap",
        "clobbers": [
            "window.iap"
        ]
    },
    {
        "file": "plugins/cordova-plugin-safariviewcontroller/www/SafariViewController.js",
        "id": "cordova-plugin-safariviewcontroller.SafariViewController",
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
}
// BOTTOM OF METADATA
});