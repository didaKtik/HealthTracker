/*global Backbone, _ */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for a single food item
	// -------------------------------------------

	app.FoodView = Backbone.View.extend({

		tagName: 'tr',

		className: 'food',

		template: _.template($('#food-template').html()),

		events: {
			'mousedown .destroy button' : 'destroy',
			'touchstart .destroy button' : 'destroy'
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		},

		destroy: function () {
			this.model.destroy();
		}

	});
})();