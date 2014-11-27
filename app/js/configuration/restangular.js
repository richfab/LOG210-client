/*global myApp, angular*/
/*jslint node: true */

'use strict';

function calcTime(date, offset) {
    console.log("PASSAAge");
    // create Date object for current location
    d = date;

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd

}

// Configuration of Restangular
myApp.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:5000');
	RestangularProvider.setDefaultHttpFields({withCredentials: true});
    RestangularProvider.setResponseExtractor(function (response, operation) {
        function convert_date_field(object) {
            // Find fields containing 'date' to convert in javascript Date object
			var key;
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    // Check if key contains 'date'
                    if (key.match(/date/g)) {
                        try {
                            if (object[key] != null) {
                                // console.log(object[key]);

                                var hour = object[key].substr(11, 2);
                                var min = object[key].substr(14, 2);
                                // console.log(hour + ":" + min);
                                object[key] = new Date(object[key].substr(0, 10) + "T" + hour + ":" + min);

							}
                        } catch (e) {
                            // Nothing here, if it can't do converting, it don't do converting
                        }
                    }
                }
            }
        }
        if (operation === 'getList') {
            response.forEach(function (object) { convert_date_field(object); });
        } else if (operation === 'post' || operation === 'get' || operation === 'put') {
            convert_date_field(response);
        }
        return response;
    });
});