/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// The controller responsible for the add functionality
	// ----------------------------------------------------

	app.PlusController = Backbone.View.extend({

		el: '#plus-controller',

		active: false,

		addMode: false,

		events: {
			'touchstart': 'onMousedown',
			'mousedown': 'onMousedown'
		},

		initialize: function () {
			this.$plus = this.$('.bars');
			this.$text = this.$('.text');

			this.listenTo(Backbone, 'resetAll', this.reset);
			this.listenTo(app.barView, 'nonEmpty', this.setAddMode);
			this.listenTo(app.barView, 'empty', this.unsetAddMode);
			this.listenTo(app.results, 'reset', this.renderResults);
			this.listenTo(app.results, 'noResults', this.onNoResults);
			this.listenTo(Backbone, 'resultClick', this.onResultClick);
		},

		onMousedown: function (e) {
			e.preventDefault();
			if (!this.active) {
				// Not active
				if (app.storeController.active) {
					app.reset();
					this.activate();
				} else {
					this.activate();
				}
			} else if (!this.addMode) {
				// active but not addMode
				app.reset();
			} else {
				// active and addMode
				this.searchResults();
			}
		},

		activate: function () {
			this.active = true;
			app.barView.focus();
			var placeholder = app.transporterView.isUp() ? 'Make a new search' : 'Search for a food';
			app.barView.setPlaceholder(placeholder);
		},

		reset: function () {
			this.unsetAddMode();
			this.active = false;
		},

		setAddMode: function () {
			if (this.active) {
				this.addMode = true;
				this.$plus.hide();
				this.$text.show();
				this.listenTo(app.barView, 'enterKey', this.searchResults);
			}
		},

		unsetAddMode: function () {
			if (this.active) {
				this.addMode = false;
				this.$text.hide();
				this.$plus.show();
				this.stopListening(app.barView, 'enterKey');
			}
		},

		searchResults: function () {
			app.results.query(app.results);
			this.reset();
			app.barView.message('...');
		},

		onNoResults: function () {
			app.reset();
			app.barView.warn('No results found !');
		},

		renderResults: function (results) {
			app.transporterView.up();
			app.listView.render(results);
			app.barView.message('Do you eat one of these ?');
		},

		onResultClick: function (result) {
			var created = app.foods.create(result);
			app.reset();
			if (created) {
				app.barView.warn('Food stored !');
			} else {
				app.barView.warn('You already eat this one !');
			}
		}

	});

})();