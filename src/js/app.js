/*global $ */
var app = app || {};
var ENTER_KEY = 13;

$(function () {
	'use strict';

	/* The app architecture is the following: 
		- 1 collection for the foods the user choosed
		- 1 collection for the food results obtained after a query
		- 1 view for a food item 
		- 1 view for a result item 
		- 2 controllers for the two main functionalities of the app:
			* plus.js for searching and adding foods
			* store.js for displaying and destroying user foods
		  These controllers are named controllers but are also extending
		  Backbone.View
		- 3 views shared by the 2 controllers:
			* list.js the list view
			* bar.js for the input bar
			* transporter.js for moving the input bar vertically 

	   App philosophy:
	   To make the shared views easily reusable on not dependent on one 
	   controller/functionality, the shared views are emitting events regarding
	   their states. This way, all the logic related to one particular 
	   functionality can be gathered in the controllers. For instance when 
	   the user types a letter in the input bar, the plus controller should 
	   go in 'addMode' if it is active. This mode shift is not coded in bar.js
	   however. Instead, the bar view emits a 'nonEmpty' event and the plus
	   controller registers to it. 
	*/

	// Kick things off by instantiating the two controllers
	app.storeController = new app.StoreController();
	app.plusController = new app.PlusController();
});