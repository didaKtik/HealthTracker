/*global Backbone, $ */
var app = app || {};

(function () {
	'use strict';

	app.isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

	// Using 'touchstart' instead of 'mousedown' yields performance
	// benefits on mobile
	app.touchEvent = app.isMobile ? 'touchstart' : 'mousedown';

	// All views of the app register to 'resetAll' and bind a function
	// responsible for reseting the view
	app.reset = function () {
		// Backbone is used as a global event channel
		Backbone.trigger('resetAll');
	};

	$('body').on(app.touchEvent, function (e) {
		if (e.target === this) {
			e.preventDefault();
			app.reset();
		}
	});
})();