var matchdep = require('matchdep');

module.exports = function (grunt) {
	'use strict';

	matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		prj:{
			name: 'angular-seed-fe',
			build: 'build',
			vendor: 'bower_components',
			src: {
				app: 'client/app',
				styles: 'client/styles',
				assets: 'client/assets',
				i18n: 'client/i18n',
				build: {
					js: '<%= prj.build %>/app',
					css: '<%= prj.build %>/styles',
					assets: '<%= prj.build %>/assets'
				}
			}
		},

		clean: {
			build: '<%= prj.build %>'
		},

		copy: {
			js: {
				expand: true,
				cwd: '<%= prj.src.app %>',
				src: ['**/*.js'],
				dest: '<%= prj.src.build.js %>'
			},
			css: {
				expand: true,
				cwd: '<%= prj.src.styles %>',
				src: ['**/*.css'],
				dest: '<%= prj.src.build.css %>'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: ['<%= prj.src.app %>/**/*.js']
			}
		},

		includeSource: {
			options: {
				basePath: '<%= prj.build %>'
			},
			build: {
				src: ['<%= prj.src.app %>/index.html'],
				dest: '<%= prj.build %>/index.html'
			}
		},

		wiredep: {
			index: {
				src: ['<%= prj.build %>/index.html'],
				//ignorePath:  /\.\.\//
			}
		},

		preprocess : {
			options: {
				context : {
					DEBUG: true
				}
			},
			index: {
				src: ['<%= prj.build %>/index.html'],
				dest: '<%= prj.build %>/index.html'
			}
		},

		html2js: {
			partials: {
				options: {
					module: 'partials',
					rename: function (moduleName) {
						return moduleName.replace('../client/app/', '');
					}
				},
				src: ['<%= prj.src.app %>/**/*.html'],
				dest: '<%= prj.src.build.js %>/partials.js'
			}
		},

		nggettext_compile: {
			all: {
				src: ['<%= prj.src.i18n %>/*.po'],
				dest: '<%= prj.src.build.js %>/translations.js'
			},
		},

		less: {
			options: {
				compress: false,
				sourceMap: true
			},
			styles: {
				options: {
					sourceMapFilename: '<%= prj.build %>/<%= prj.name %>.css.map',
					sourceMapURL: '<%= prj.name %>.css.map'
				},
				src: ['<%= prj.src.styles %>/**/*.less'],
				dest: '<%= prj.build %>/<%= prj.name %>.css'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['<%= prj.src.app %>/**/*.js'],
				tasks: ['jshint:all', 'copy:js']
			},
			partials: {
				files: ['<%= prj.src.app %>/**/*.html'],
				tasks: ['html2js']
			},
		}
	});

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'nggettext_compile',
		'html2js',
		'less',
		'copy',
		'includeSource',
		'wiredep',
		'preprocess',
	]);

	grunt.registerTask('dev', [
		'openport:watch.options.livereload:35729',
		'build',
		'watch',
	]);
};
