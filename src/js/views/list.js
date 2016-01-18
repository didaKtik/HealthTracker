/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for the list of foods
	// ------------------------------------------

	var ListView = Backbone.View.extend({

		el: '#list-view',

		theadHtml: 
			'<tr>' +
    			'<th>Food</th>' +
    			'<th>Restaurant</th>' +
    			'<th>Calories</th>' +
    			'<th></th>' +
  			'</tr>',

		render: function (collection) {
			this.$el.html('');
			this.$el.append(this.theadHtml);

			var View = collection === app.foods ? 'FoodView' : 'ResultView';
			collection.each(function (food) {
				var view = new app[View]({ model: food });
				this.$el.append(view.render().el);
			}, this);
		}

	});

	app.listView = new ListView();

})();