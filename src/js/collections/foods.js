/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	/* The collection of foods is backed by *localStorage* instead of a remote
	server. */ 
	var Foods = Backbone.Collection.extend({

		localStorage: new Backbone.LocalStorage('foods'),

		initialize: function () {
			// Foods are fetched from local storage
			this.fetch();
		},

		getCalories: function () {
			if (this.length) {
				return this.reduce(function (memo, food) {
					return memo + food.get('calories');
				}, 0);
			} else {
				return 0;
			}
		}
	});

	// Override create function to avoid duplicates
	// Derived from the following question: 
	// http://stackoverflow.com/questions/6416958/how-to-make-backbone-js-collection-items-unique
	Foods.prototype.create = function (food) {
	    var isDupe = this.any(function(_food) {
	    	var nameDupe = _food.get('name') === food.get('name');
	    	var restDupe = _food.get('restaurant') === food.get('restaurant');
	        return nameDupe && restDupe;
	    });

	    // *food.attributes* should be passed instead of the model itself (*food*),
	    // otherwise the local storage remains 'results' and the food item is not
	    // properly stored in 'foods'.
	    return isDupe ? false : Backbone.Collection.prototype.create.call(this, food.attributes);
	};

	app.foods = new Foods();
})();