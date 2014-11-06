/*global myApp, angular*/
/*jslint node: true */

'use strict';

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
								object[key] = new Date(object[key]);
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