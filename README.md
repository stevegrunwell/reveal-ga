# reveal-ga

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to add Google Universal Analytics tracking to your presentations.

Reveal.js provides a number of events that we can listen for, and this package will send those events to Google Analytics for tracking.


## Installation

1. Install the plugin via [`npm`](https://npmjs.org):
	```bash
$ npm install --save reveal-ga
```

2. Obtain a Profile ID from [Google Analytics](https://analytics.google.com/analytics/web); this should look something like `UA-XXXXXXXX-X`.
3. Define a `gaPropertyID` variable in your presentation file **before** `Reveal.initialize()`:

	```js
<script>
	var gaPropertyID = 'UA-XXXXXXXX-X';
	Reveal.initialize({
		// ...
	});
</script>
```


## What is tracked?

After setting up the package according to the instructions above, Google Analytics should pick up on the following actions:

* Any time the active slide is changed
* Slide overview (triggered by the <kbd>ESC</kbd> key) shown or hidden

## Debugging

If you want to see what information is being sent, drop the following somewhere in your presentation to get debug statements output to the console:

```js
window.addEventListener('reveal-ga', function (ev) {
  console.log('New Reveal GA event:', ev.detail);
});
```

Every time a new event is sent to Google Analytics a corresponding custom event is also sent to the `window` object as `reveal-ga`.
