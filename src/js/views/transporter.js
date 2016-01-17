/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for moving the menu vertically
	// ---------------------------------------------------

	var TransporterView = Backbone.View.extend({

		el: '#transporter-view',

		initialize: function () {
			this.listenTo(Backbone, 'resetAll', this.middle);
		},

		up: function () {
			this.$el.removeClass('middle');
			this.$el.addClass('up');
		},

		middle: function () {
			this.$el.removeClass('up');
			this.$el.addClass('middle');
		},

		isUp: function () {
			return this.$el.hasClass('up');
		}

	});

	app.transporterView = new TransporterView();

})();