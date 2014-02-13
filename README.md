angular-infinite-scroll
=======================
Infinite scroll directive for Angular.js

[![Build Status][Build Status img]][Build Status]
[![Dependency Status][Dependency Status img]][Dependency Status]
<!-- [![Code Climate][Code Climate img]][Code Climate] -->
[![Coverage Status][Coverage Status img]][Coverage Status]


# Infinite Scroll for AngularJS
[View examples!][Examples]


## Getting Started

To get started, add `angular-infinite-scroll.js` to your webpage:

	<script type="text/javascript" src="path/to/angular-infinite-scroll.js"></script>

And add the module `jn.infiniteScroll` to your app's dependencies:


	angular.module('MyApp', ['jn.infiniteScroll']);


## Dependencies


### Required
* AngularJS ([https://github.com/angular/angular.js][Angular.js])
* jQuery ([https://github.com/jquery/jquery][jQuery])


### Optional
* For `_.throttle` support
  * Underscore ([https://github.com/jashkenas/underscore][Underscore])
  * or Lodash ([https://github.com/lodash/lodash][Lodash])


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

[Build Status]: https://travis-ci.org/joonho1101/angular-infinite-scroll
[Build Status img]: https://travis-ci.org/joonho1101/angular-infinite-scroll.png

[Dependency Status]: https://gemnasium.com/joonho1101/angular-infinite-scroll
[Dependency Status img]: https://gemnasium.com/joonho1101/angular-infinite-scroll.png

[Code Climate]: https://codeclimate.com/github/joonho1101/angular-infinite-scroll
[Code Climate img]: https://codeclimate.com/github/joonho1101/angular-infinite-scroll.png

[Coverage Status]: https://coveralls.io/r/joonho1101/angular-infinite-scroll
[Coverage Status img]: https://coveralls.io/repos/joonho1101/angular-infinite-scroll/badge.png

[Examples]: http://htmlpreview.github.io/?https://github.com/joonho1101/angular-infinite-scroll/blob/master/examples/index.html

[Angular.js]: https://github.com/angular/angular.js
[jQuery]: https://github.com/jquery/jquery
[Underscore]: https://github.com/jashkenas/underscore
[Lodash]: https://github.com/lodash/lodash
