angular-smart-scroll
=======================
Smart infinite scroll directive for Angular.js that is customizable to support nested, horizontal, vertical, and/or bidirectional scrolls

[![Build Status][Build Status img]][Build Status]
[![Dependency Status][Dependency Status img]][Dependency Status]
[![Coverage Status][Coverage Status img]][Coverage Status]
[![githalytics.com alpha][Git Anlytics img]][Git Anlytics]
<!-- [![Code Climate][Code Climate img]][Code Climate] -->


## Smart Infinite Scroll for AngularJS
[View examples!][Examples]


## Getting Started

To get started, add `angular-smart-scroll.js` to your webpage:

	<script type="text/javascript" src="path/to/angular-smart-scroll.js"></script>

And add the module `jun.smartScroll` to your app's dependencies:


	angular.module('MyApp', ['jun.smartScroll']);


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

[Build Status]: https://travis-ci.org/joonhocho/angular-smart-scroll
[Build Status img]: https://travis-ci.org/joonhocho/angular-smart-scroll.png

[Dependency Status]: https://gemnasium.com/joonhocho/angular-smart-scroll
[Dependency Status img]: https://gemnasium.com/joonhocho/angular-smart-scroll.png

[Code Climate]: https://codeclimate.com/github/joonhocho/angular-smart-scroll
[Code Climate img]: https://codeclimate.com/github/joonhocho/angular-smart-scroll.png

[Coverage Status]: https://coveralls.io/r/joonhocho/angular-smart-scroll
[Coverage Status img]: https://coveralls.io/repos/joonhocho/angular-smart-scroll/badge.png

[Git Anlytics]: http://githalytics.com/joonhocho/angular-smart-scroll
[Git Anlytics img]: https://cruel-carlota.pagodabox.com/032c21f7bd79ea2b4615d1b688fd71ab

[Examples]: http://htmlpreview.github.io/?https://github.com/joonhocho/angular-smart-scroll/blob/master/examples/index.html

[Angular.js]: https://github.com/angular/angular.js
[jQuery]: https://github.com/jquery/jquery
[Underscore]: https://github.com/jashkenas/underscore
[Lodash]: https://github.com/lodash/lodash
