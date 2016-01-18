/*global Backbone, ENTER_KEY */
var app = app || {};

(function () {
	'use strict';

	// The view responsible for the input bar
	// --------------------------------------

	var BarView = Backbone.View.extend({

		el: '#bar-view',

		events: {
			'keypress': 'triggerOnEnter',
			'input': 'onTextChange',
			'mousedown': 'preventWhenMessaging'
		},

		text: '',

		messaging: true,

		initialize: function () {
			this.listenTo(Backbone, 'resetAll', this.reset);
			this.reset();
		},

		reset: function () {
			this.text = '';
			var calories = app.foods.getCalories();
			this.message('You eat ' + calories + ' calories!');
		},

		focus: function () {
			this.messaging = false;
			this.$el.focus();
			this.$el.removeClass('messaging');
			this.setText('');
		},

		setPlaceholder: function (text) {
			this.$el.attr('placeholder', text);
		},

		getText: function () {
			return this.$el.val().trim();
		},

		setText: function (text) {
			this.$el.val(text);
			this.text = text;
		},

		onTextChange: function (e) {
			var currentText = this.getText(),
				text = this.text;
			if (currentText === '' && text !== '') {
				// User emptied field
				this.trigger('empty');
			}
			if (currentText !== '' && text === '') {
				// User typed first character
				this.trigger('nonEmpty');
			}
			// Update text attribute
			this.text = currentText;
		},

		triggerOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.trigger('enterKey');
			}
		},

		message: function (text) {
			this.messaging = true;
			this.$el.blur();
			this.$el.addClass('messaging');
			this.setText(text);
		},

		preventWhenMessaging: function (e) {
			// Disabling has to be done on mousedown (physical event),
			// not on click (abstract event)
			if (this.messaging || this.warning) {
				e.preventDefault();
			}
		},

		// warn is given memory so that at the end of a warning the bar
		// returns to the state it add before the warning begins
		warn: function (text, duration) {
			var defaultDuration = 1500;
			var duration = duration || defaultDuration;

			var state = this.getState();

			this.message(text);
			this.$el.removeClass('messaging');
			this.$el.addClass('warning');
			
			setTimeout(function () {
				this.$el.removeClass('warning');
				this.setState(state);
			}.bind(this), duration);
		},

		getState: function () {
			var state = {};
			state.messaging = this.messaging;
			state.text = this.getText();
			return state;
		},

		setState: function (state) {
			if (state.messaging) {
				this.message(state.text);
			} else {
				this.focus();
				this.setText(state.text);
			}
		}

	});

	app.barView = new BarView();

})();