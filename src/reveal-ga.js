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

(function() {
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
      if (!arguments[i]) {
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
      event = new CustomEvent(ev, { detail: data });
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
   *   Optional. Additional attributes to pass to Google Analytics. Default
   *   is an empty object.
   *
   *   @type string eventCategory The category for this event. Default is
   *                              "reveal-js".
   *   @type string eventLabel    A label to attach to this event. Default is
   *                              an empty string.
   *   @type integer eventValue    A value to attach to this event. Default is
   *                              null
   * }
   */
  function addEvent(action, attributes) {
    var eventObj = {
      hitType: 'event',
      eventCategory: 'reveal-js',
      eventAction: action,
      eventLabel: ''
    };

    attributes = attributes || {};
    // Make sure eventValue is an integer, or GA won't register the event
    if ('eventValue' in attributes) {
      attributes.eventValue = parseInt(attributes.eventValue);
    }
    eventObj = extend(eventObj, attributes);

    ga('send', eventObj);
    triggerEvent(window, 'reveal-ga', eventObj);
  }

  /**
   * Send a PageView command for every new slide visited.
   * @param string title   The title for current slide.
   * @param string page    Current slide's URL.
   *
   */
  function addPageView(title, page) {
    var eventObj = {
      hitType: 'pageview',
      page: page,
      title: title || document.title
    };

    ga('send', eventObj);
  }

  function pad(n, width) {
    n = n + '';
    return n.length >= width ?
      n : new Array(width - n.length + 1).join('0') + n;
  }

  function getSlideLabel(ev) {
    return '(' + ev.indexh + '-' + ev.indexv + ')';
  }

  /**
   * Register the appropriate event listeners for Reveal.js.
   */
  function addEventListeners() {
    // Track the changing of slides
    Reveal.addEventListener('slidechanged', function(ev) {
      addEvent('changeslide', {
        eventLabel: 'Change current slide ' + getSlideLabel(ev)
      });
      // We need to "wait" so URL is changed
      setTimeout(function() {
        var title = ev.currentSlide.querySelector('h1,h2,h3').innerText || '';
        var page = location.pathname + location.hash;
        addPageView(title, page);
      }, 0);
    });

    // Reveal overview mode
    Reveal.addEventListener('overviewshown', function(ev) {
      addEvent('overviewshown', {
        eventLabel: 'Slide overview shown ' + getSlideLabel(ev)
      });
    });

    Reveal.addEventListener('overviewhidden', function(ev) {
      addEvent('overviewhidden', {
        eventLabel: 'Slide overview hidden ' + getSlideLabel(ev)
      });
    });
  }

  // Verify that Reveal has loaded and we have a gaPropertyID variable
  if ('undefined' === typeof Reveal || 'undefined' === typeof gaPropertyID) {
    console.warn(
      'Unable to register custom Google Analytics events. Please ' +
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
})(undefined);
