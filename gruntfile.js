'use strict';

/* jshint node: true */
module.exports = function (grunt) {
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
			test: 'tests',
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
				configFile: '<%= v.test %>/<%= v.karmaConfig %>'
			},
			test: {
				singleRun: true
			},
			dev: {
				singleRun: false
			},
			bdd: {
				reporters: ['story', 'coverage']
			},
			cobertura: {
				reporters: ['dots', 'coverage'],
				browsers: ['PhantomJS'],
				coverageReporter: {
					type: 'cobertura',
					dir: '<%= v.coverage %>/'
				}
			},
			travis: {
				singleRun: true,
				reporters: ['dots', 'coverage'],
				browsers: ['PhantomJS'],
				preprocessors: {
					'<%= v.srcJs %>': 'coverage'
				},
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
			jshint: {
				options: {
					event: ['added', 'changed']
				},
				files: ['<%= v.srcJs %>', '<%= v.testJs %>'],
				tasks: ['jshint']
			},
			livereload: {
				files: ['<%= v.distJs %>']
			}
		}
	});

	// Run default tasks
	grunt.registerTask('default', 'Run default tasks', ['build', 'dev']);

	// Build files for production
	grunt.registerTask('build', 'Builds files for production', ['clean', 'jshint:build', 'concat', 'uglify']);

	// Run tests, single pass
	grunt.registerTask('test', 'Run unit tests', ['jshint', 'karma:test']);

	// Run tests continously for development mode
	grunt.registerTask('dev', 'Run unit tests in watch mode', ['karma:dev']);

	// Generate a coverage report in Cobertura format
	grunt.registerTask('cobertura', 'Generate Cobertura coverage report', ['karma:cobertura']);

	// Travis CI task
	grunt.registerTask('travis', 'Travis CI task', ['clean', 'jshint', 'karma:travis', 'coveralls']);
};
