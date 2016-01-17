/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// The controller responsible for the add functionality
	// ----------------------------------------------------

	app.StoreController = Backbone.View.extend({

		el: '#store-controller',

		active: false,

		events: {
			'touchstart': 'onMousedown',
			'mousedown': 'onMousedown'
		},

		onMousedown: function (e) {
			e.preventDefault();
			if (!this.active) {
				if (app.plusController.active) {
					app.reset();
					this.activate();
				} else {
					this.activate();
				}
			} else {
				app.reset();
			}
		},

		initialize: function () {
			this.listenTo(Backbone, 'resetAll', this.reset);
			this.listenTo(app.foods, 'remove', this.resetIfEmpty);
		},

		activate: function () {
			if (app.foods.length) {
				this.active = true;
				this.renderFoods();
			} else {
				app.barView.warn('You have no foods yet !');
			}
		},

		renderFoods: function () {
			app.listView.render(app.foods);
			app.barView.message('Here are your foods');
			app.transporterView.up();
		},

		reset: function () {
			this.active = false;
		},

		resetIfEmpty: function () {
			if (!app.foods.length) {
				app.reset();
				app.barView.warn('No more foods !');
			}
		}

	});

})();