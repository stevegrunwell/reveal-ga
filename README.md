# reveal-ga

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to add Google Universal Analytics tracking to your presentations.

Reveal.js provides a number of events that we can listen for, and this package will send those events to Google Analytics for tracking.


## Installation

1. Copy the `reveal-ga.min.js` file to the plugins folder of the reveal.js folder. Add it to `Reveal.initialize`'s `dependencies` array to load the plugin:

		Reveal.initialize({
				// ...
			dependencies: [
				// other dependencies/plugins
				{ src: 'assets/js/revealjs/plugin/reveal-ga.min.js' }
			]
		});

	Note that this example has an "assets" and "js" folder for resources. Just make sure the references are correct.

2. Obtain a Tracking ID from [Google Analytics](https://analytics.google.com/analytics/web); this should look something like `UA-XXXXXXXX-X`.

3. In your revealga options inside `Reveal.initialize()`, set the `id` to your Tracking ID:

		Reveal.initialize({
			// ...
			revealga: {
				// Enter the Tracking ID here:
				id: 'UA-XXXXX-X'
			},
			dependencies: [
			// ... 
			]
		});


## Reveal.js events that can be tracked

After setting up the package according to the instructions above, Google Analytics should pick up on the following actions:

* Any time the active slide is changed
* Slide overview (triggered by the <kbd>ESC</kbd> key) shown or hidden


### Debugging events

If you want to see what information is being sent, set `debug: true` in your revealga options to get debug statements output to the console:

```javascript
Reveal.initialize({
	// ...
	revealga: {
		id: 'UA-XXXXX-X',
		debug: true
	},
	dependencies: [
	// ... 
	]
});
```


## Troubleshooting

Here are common errors found with reveal-ga and potential solutions:

### Received a "Please change the fake Google Analytics ID to your own Google Analytics ID" warning in the console.

This warning occurs when the Tracking ID is still set to the placeholder ID. Change the ID in the options of revealga as described above in Installation, point 3.