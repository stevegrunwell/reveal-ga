/**
 * Add Google Universal Analytics tracking to your reveal.js presentation.
 *
 * @package reveal-ga
 * @author  Steve Grunwell <steve@stevegrunwell.com>
 */

;(function () {
	'use strict';

var _ = require('lodash');

	/**
	 * Send an event to Google Analytics.
	 *
	 * @param string category   The category for the event.
	 * @param string action     The action that occurred.
	 * @param object attributes {
	 *     Optional. Additional attributes to pass to Google Analytics. Default
	 *     is an empty object.
	 *
	 *     @type string eventCategory The category for this event. Default is
	 *                                "reveal-js".
	 *     @type string eventLabel    A label to attach to this event. Default is
	 *                                an empty string.
	 *     @type string eventValue    A value to attach to this event. Default is
	 *                                an empty string.
	 * }
	 */
	function addEvent(action, attributes) {
		var val = {
			eventAction: action,
			eventCategory: 'reveal-js',
			eventLabel: '',
			eventValue: ''
		};

		attributes = attributes || {};
		val        = _.assign(attributes, val);

		ga('send', 'event', val);
	}

	exports.revealGA = function () {
		if ('undefined' === typeof Reveal || 'undefined' === typeof ga) {
			return;
		}

		// Changing slides
		Reveal.addEventListener('slidechanged', function (ev) {
			addEvent('changeslide', {
				eventLabel: 'Change current slide',
				eventValue: ev.currentSlide.indexh + '.' + ev.currentSlide.indexv
			});
		});

		// Reveal overview
		Reveal.addEventListener('overviewshown', function (ev) {
			addEvent('overviewshown', { eventLabel: 'Slide overview shown' });
		});

		Reveal.addEventListener('overviewhidden', function (ev) {
			addEvent('overviewhidden', { eventLabel: 'Slide overview hidden' });
		});
	};

} (undefined));