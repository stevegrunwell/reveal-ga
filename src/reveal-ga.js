/**
 * Add Google Universal Analytics tracking to your reveal.js presentation.
 *
 * @package reveal-ga
 * @author  Steve Grunwell <steve@stevegrunwell.com>
 */

/* jshint ignore:start */
;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* jshint ignore:end */

(function () {
  'use strict';

  /**
   * Replacement for jQuery's $.extend() method.
   *
   * @link http://youmightnotneedjquery.com/#extend
   *
   * @param object out One or more objects to be merged.
   * @return object The merged object.
   */
  function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (! arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  }

  /**
   * Convenience function to replicate jQuery's $.trigger() method.
   *
   * @param object el The element on which to trigger the event.
   * @param string ev The event to trigger.
   * @param object data Additional data to pass to the event.
   */
  function triggerEvent(el, ev, data) {
    var event;

    data = data || {};

    if (window.CustomEvent) {
      event = new CustomEvent(ev, {detail: data});
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(ev, true, true, data);
    }

    el.dispatchEvent(event);
  }

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
    var eventObj = {
      eventAction: action,
      eventCategory: 'reveal-js',
      eventLabel: '',
      eventValue: ''
    };

    attributes = attributes || {};
    eventObj   = extend(eventObj, attributes);

    ga('send', 'event', eventObj);
    triggerEvent(window, 'reveal-ga', eventObj);
  }

  /**
   * Register the appropriate event listeners for Reveal.js.
   */
  function addEventListeners() {
    // Track the changing of slides
    Reveal.addEventListener('slidechanged', function (ev) {
      addEvent('changeslide', {
        eventLabel: 'Change current slide',
        eventValue: ev.indexh + '.' + ev.indexv
      });
    });

    // Reveal overview mode
    Reveal.addEventListener('overviewshown', function (ev) {
      addEvent('overviewshown', { eventLabel: 'Slide overview shown' });
    });

    Reveal.addEventListener('overviewhidden', function (ev) {
      addEvent('overviewhidden', { eventLabel: 'Slide overview hidden' });
    });
  }

  // Verify that Reveal has loaded and we have a gaPropertyID variable
  if ('undefined' === typeof Reveal || 'undefined' === typeof gaPropertyID) {
    console.warn('Unable to register custom Google Analytics events. Please ' +
      'see https://github.com/stevegrunwell/reveal-ga for more information.'
    );
    return;
  }

  ga('create', gaPropertyID, 'auto');
  ga('send', 'pageview');

  if (Reveal.isReady()) {
    addEventListeners();
  } else {
    Reveal.addEventListener('ready', addEventListeners);
  }

}) (undefined);
