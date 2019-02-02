# reveal-ga

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to add Google Universal Analytics tracking to your presentations.

Reveal.js provides a number of events that we can listen for, and this package will send those events to Google Analytics for tracking.


## Installation

1. Install the plugin via [`npm`](https://npmjs.org):

		$ npm install --save reveal-ga

2. Obtain a Profile ID from [Google Analytics](https://analytics.google.com/analytics/web); this should look something like `UA-XXXXXXXX-X`.

3. Define a `gaPropertyID` variable in your presentation file **before** `Reveal.initialize()`:

		<script>
			var gaPropertyID = 'UA-XXXXXXXX-X';
			Reveal.initialize({
				// ...
			});
		</script>

4. Add the following inside `Reveal.initialize`'s `dependencies` array to load the plugin:

		dependencies: [
			// other dependencies/plugins
			{ src: 'node_modules/reveal-ga/dist/reveal-ga.min.js' }
		]


## Reveal.js events that can be tracked

After setting up the package according to the instructions above, Google Analytics should pick up on the following actions:

* Any time the active slide is changed
* Slide overview (triggered by the <kbd>ESC</kbd> key) shown or hidden


### Debugging events

If you want to see what information is being sent, drop the following somewhere in your presentation to get debug statements output to the console:

```js
window.addEventListener('reveal-ga', function (ev) {
  console.log('New Reveal GA event:', ev.detail);
});
```

Every time a new event is sent to Google Analytics a corresponding custom `reveal-ga` event is also sent to the `window` object.


## Troubleshooting

Here are common errors found with reveal-ga and potential solutions:

### Received an "Unable to register custom Google Analytics events" warning in the console.

This warning occurs when either the `Reveal` object or the `gaPropertyID` variable is undefined. Please be sure that reveal-ga is being loaded via [Reveal.js' `dependencies` property](https://github.com/hakimel/reveal.js/#dependencies) as described in the instructions above, and that `gaPropertyID` is declared before calling `Reveal.initialize()`.
