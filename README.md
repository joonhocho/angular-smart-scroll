angular-infinite-scroll
=======================
Infinite scroll directive for Angular.js

[![Build Status](https://travis-ci.org/joonho1101/angular-infinite-scroll.png)](https://travis-ci.org/joonho1101/angular-infinite-scroll)
[![Dependency Status](https://gemnasium.com/joonho1101/angular-infinite-scroll.png)](https://gemnasium.com/joonho1101/angular-infinite-scroll)
[![Coverage Status](https://coveralls.io/repos/joonho1101/angular-infinite-scroll/badge.png)](https://coveralls.io/r/joonho1101/angular-infinite-scroll)


# Infinite Scroll for AngularJS
[View examples!](http://htmlpreview.github.io/?https://github.com/joonho1101/angular-infinite-scroll/blob/master/examples/index.html)


## Getting Started

To get started, add `angular-infinite-scroll.js` to your webpage:

	<script type="text/javascript" src="path/to/angular-infinite-scroll.js"></script>

And add the module `jn.infiniteScroll` to your app's dependencies:


	angular.module('MyApp', ['jn.infiniteScroll']);


## Dependencies


### Required
* AngularJS ([https://github.com/angular/angular.js](https://github.com/angular/angular.js))
* jQuery ([https://github.com/jquery/jquery](https://github.com/jquery/jquery))


### Optional
* For `_.throttle` support
  * Underscore ([https://github.com/jashkenas/underscore](https://github.com/jashkenas/underscore))
  * or Lodash ([https://github.com/lodash/lodash](https://github.com/lodash/lodash))


## Development
To set up the development environment, run these commands once:


## Installation
First, install global dependencies (grunt and bower) if you have not already.

	$ npm install -g grunt-cli bower

Then install local dependencies

	$ npm install


## Running tests
After installing global and local dependencies, run the tests:

	$ grunt test

To run tests automatically on every file change:

	$ grunt dev


## Building Production Files

	$ grunt build


## Contributing

Feel free to create a pull request with unit tests with 100% code coverage!

## License

(The MIT License)

Copyright (c) 2014 Joon Ho Cho
