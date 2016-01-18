/*global Backbone, $ */
var app = app || {};

(function () {
	'use strict';

	/* The collection of foods is backed by *localStorage* instead of
	a remote server. When a query is made, two events can be triggered:
	'noResults' in case of failure and 'reset' in case of success. These
	events are listened to by the plus controller */
	var Results = Backbone.Collection.extend({

		// A local storage is given only to avoid Backbone exceptions,
		// the results are never fetched again
		localStorage: new Backbone.LocalStorage('results'),

		query: function () {
			// Keys obtained after registering to Nutritionix API
			var appId = '3f4d31c4',
				appKey = '1db700e86d98a9f42590869fd586e09b',
				query = app.barView.getText(),
				url = 'https://api.nutritionix.com/v1_1/search/';

			// The data field must be a JSON string
			var data = JSON.stringify({
				'appId': appId,
				'appKey': appKey,
				'query': query,
				'fields': ['item_name', 'nf_calories', 'brand_name'],
				'filters': {
					'item_type': 1
				}
			});

			$.post({
				url: url,
				data: data,
				contentType: 'application/json'
			}).done(this.onSuccess.bind(this))
			.fail(this.onError.bind(this));
		},

		onSuccess: function (response) {
			var results = this.treat(response);
			if (results.length) {
				this.reset(results);
			} else {
				this.trigger('noResults');
			}
		},

		treat: function (response) {
			// The desired information are extracted from the 
			// json response
			return response.hits.map(function (hit) {
				var fields = hit.fields;
				return {
					name: fields.item_name,
					restaurant: fields.brand_name,
					calories: fields.nf_calories
				};
			});
		},

		onError: function (response) {
			this.trigger('queryError');
		}
	});

	app.results = new Results();
})();