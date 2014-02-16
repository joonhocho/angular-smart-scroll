/* jshint node: true */
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-karma-coveralls');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		v: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			name: 'angular-smart-scroll',
			src: 'src',
			srcJs: '<%= v.src %>/**/*.js',
			dist: 'dist',
			distJs: '<%= v.dist %>/**/*.js',
			test: 'test',
			testJs: '<%= v.test %>/**/*.js',
			karmaConfig: 'karma.conf.js',
			coverage: 'coverage'
		},

		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			build: {
				src: ['<%= v.srcJs %>']
			},
			test: {
				src: ['<%= v.testJs %>']
			}
		},

		concat: {
			options: {
				banner: '<%= v.banner %>'
			},
			build: {
				src: ['<%= v.src %>/<%= v.name %>.js'],
				dest: '<%= v.dist %>/<%= v.name %>.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some'
			},
			build: {
				src: ['<%= concat.build.dest %>'],
				dest: '<%= v.dist %>/<%= v.name %>.min.js'
			}
		},

		coveralls: {
			options: {
				'coverage_dir': '<%= v.coverage %>/'
			}
		},

		karma: {
			options: {
				singleRun: true,
				configFile: '<%= v.test %>/<%= v.karmaConfig %>'
			},
			test: {
				// defaults
			},
			dev: {
				//browsers: ['PhantomJS', 'Chrome', 'Chrome'],
				reporters: ['progress', 'coverage'],
				singleRun: false
			},
			bdd: {
				reporters: ['story', 'coverage']
			},
			cobertura: {
				browsers: ['PhantomJS'],
				coverageReporter: {
					type: 'cobertura',
					dir: '<%= v.coverage %>/'
				}
			},
			travis: {
				browsers: ['PhantomJS'],
				coverageReporter: {
					type: 'lcov',
					dir: '<%= v.coverage %>/'
				}
			}
		},

		clean: {
			options: {
				force: true
			},
			build: ['<%= v.dist %>'],
			test: ['<%= v.coverage %>']
		},

		watch: {
			build: {
				files: ['<%= v.srcJs %>'],
				tasks: ['concat', 'uglify']
			},
			test: {
				files: ['<%= v.srcJs %>', '<%= v.testJs %>'],
				tasks: ['test']
			},
			livereload: {
				files: ['<%= v.distJs %>']
			}
		}
	});

	// Run default tasks
	grunt.registerTask('default', 'Run default tasks', ['build', 'test']);

	// Build files for production
	grunt.registerTask('build', 'Builds files for production', ['clean', 'jshint:build', 'concat', 'uglify']);

	// Run tests, single pass
	grunt.registerTask('test', 'Run unit tests', ['jshint', 'karma:test']);

	// Run tests continously for development mode
	grunt.registerTask('dev', 'Run unit tests in watch mode', ['karma:dev']);

	// Generate a coverage report in Cobertura format
	grunt.registerTask('cobertura', 'Generate Cobertura coverage report', ['karma:cobertura']);

	// Travis CI task
	grunt.registerTask('travis', 'Travis CI task', ['clean', 'jshint', 'concat', 'uglify', 'karma:travis', 'coveralls']);
};
