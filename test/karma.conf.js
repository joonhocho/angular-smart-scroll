/* jshint node: true */
module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../',

		frameworks: ['jasmine'],

		files: [
			'test/angular-smart-scroll.spec.css',
			'bower_components/jquery/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'src/**/*.js',
			'test/**/**.js'
		],

		exclude: [
			'test/karma.conf.js'
		],

		preprocessors: {
			'src/**/*.js': ['coverage']
		},

		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots', 'coverage'],

		autoWatch: true,

		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],

		singleRun: true,

		/*
		plugins: [
			// Launchers
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-safari-launcher',

			// Reporters
			'karma-coverage',
			'karma-junit-reporter',
			'karma-story-reporter'
		],
		*/

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}
	});
};
