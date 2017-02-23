## Update to 2.0.0 (v1.2)
- There's a breaking change in ionic 2.0.0 with the Ionicons.
	- We had to change the import for ionicons in theme/variables.scss file from `@import "ionicons";` to `@import "ionic.ionicons";`

- Some users where experiencing an issue with Google Maps typings getting the following error: `Cannot find namespace 'google'`. We solved this by adding `"typings/**/*.ts"` in tsconfig.json include array.



## Update to RC-5 (v1.1)
- There's a breaking change in ionic rc-5 with the `<ion-slides>` (for more details see the ionic [CHANGELOG](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#slides))

	- We had to remove the `[options]` attribute and change the `(ionDidChange)` event with `ionSlideDidChange` in the walkthrough.html file

- Ionic introduced [CSS content property](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) to improve performance. This caused some weird behavior

	- Added `contain: style layout;` to `.horizontal-categories .scroll-content` in the `listing.scss` file

	- Added `contain: style layout;` to `.post-example-view .upload-image-button` in the `form-layout.scss` file

- Add css styles for tab button icon in `tabs-navigation.scss` file

- Ionic (rc-4) changed the way the toolbar border works (for more details see the ionic [CHANGELOG](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#toolbar))

	- We had to add an `!important` value to force no border on the `.toolbar-background` element in header.scss file

- Ionic added fixed height to some components (including list items avatars). This caused some weird behavior with our custom components `preload-image`

	- We added `height: inherit !important;` to our `preload-image img` elements in preload-image.scss file
