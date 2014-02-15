/* jshint node: true */
module.exports = function (config) {
	'use strict';

	config.set({
		// http://karma-runner.github.io/0.8/config/configuration-file.html

		singleRun: true,

		autoWatch: true,

		basePath: '../',

		frameworks: ['jasmine'],

		files: [
			'test/angular-smart-scroll.spec.css',
			'bower_components/jquery/dist/jquery.js',
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

		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS', 'Chrome', 'Safari', 'Firefox'],

		// logLevel: LOG_DEBUG,

		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots', 'coverage'],

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
