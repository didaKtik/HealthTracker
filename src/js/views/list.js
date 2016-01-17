/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for the list of foods
	// ------------------------------------------

	var ListView = Backbone.View.extend({

		el: '#list-view',

		render: function (collection) {
			this.$el.html('');

			var View = collection === app.foods ? 'FoodView' : 'ResultView';
			collection.each(function (food) {
				var view = new app[View]({ model: food });
				this.$el.append(view.render().el);
			}, this);
		}

	});

	app.listView = new ListView();

})();