/*global Backbone, _ */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for a single result item
	// ---------------------------------------------

	app.ResultView = Backbone.View.extend({

		tagName: 'tr',

		className: 'result',

		template: _.template($('#result-template').html()),

		events: {
			'click': 'broadcastClick'
		},

		render: function () {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		},

		broadcastClick: function () {
			Backbone.trigger('resultClick', this.model);
		}

	});

})();