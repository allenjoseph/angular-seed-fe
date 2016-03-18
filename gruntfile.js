var matchdep = require('matchdep');
var LIVERELOAD_PORT = 35729;

module.exports = function (grunt) {
	'use strict';

	matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		prj:{
			name: 'angular-seed-fe',
			build: 'build',
			release: 'release',
			src: {
				app: 'client/app',
				styles: 'client/styles',
				assets: 'client/assets',
				i18n: 'client/i18n',
				build: {
					js: '<%= prj.build %>/app',
					css: '<%= prj.build %>/styles',
					assets: '<%= prj.build %>/assets',
					vendor: '<%= prj.build %>/bower_components'
				}
			}
		},

		clean: {
			build: '<%= prj.build %>',
			release: '<%= prj.release %>',
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
			},
			fonts_release: {
				expand: true,
				cwd: '<%= prj.build %>',
				src: ['**/*.eot','**/*.svg','**/*.ttf','**/*.woff','**/*.woff2'],
				dest: '<%= prj.release %>/fonts',
				flatten: true
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
			dev: {
				src: ['<%= prj.src.app %>/index.html'],
				dest: '<%= prj.build %>/index.html'
			},
			release: {
				src: ['<%= prj.release %>/index.html'],
				dest: '<%= prj.release %>/index.html'
			}
		},

		wiredep: {
			index: {
				src: ['<%= prj.build %>/index.html'],
				ignorePath:  /\.\.\//
			}
		},

		preprocess : {
			dev: {
				options: {
					context : {
						debug: true,
						livereloadPort: LIVERELOAD_PORT
					}
				},
				src: ['<%= prj.build %>/index.html'],
				dest: '<%= prj.build %>/index.html'
			},
			release: {
				options: {
					context : {
						release: true
					}
				},
				src: ['<%= prj.src.app %>/index.html'],
				dest: '<%= prj.release %>/index.html'
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

		nggettext_extract: {
			pot: {
				files: {
					'<%= prj.src.i18n %>/template.pot': [
						'<%= prj.src.app %>/**/*.html',
						'<%= prj.src.app %>/**/*.js'
					]
				}
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

		bower_main: {
			copy: {
				options: {
					dest: '<%= prj.src.build.vendor %>'
				}
			}
		},

		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: '<%= prj.build %>'
				}
			},
			release: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: '<%= prj.release %>'
				}
			}
		},

		jscs: {
			src: '<%= prj.src.app %>/**/*.js',
			options: {
				config: ".jscsrc",
				esnext: false, // If you use ES6
				verbose: true, // If you need output with rule names
				fix: false // Autofix code style violations when possible.
			}
		},

		watch: {
			options: {
				livereload: LIVERELOAD_PORT
			},
			scripts: {
				files: ['<%= prj.src.app %>/**/*.js'],
				tasks: ['jshint:all', 'jscs', 'copy:js']
			},
			partials: {
				files: ['<%= prj.src.app %>/**/*.html'],
				tasks: ['html2js']
			},
		},

		cssmin: {
			css: {
				files: [{
					src: [
						'<%= prj.build %>/**/*.css',
						'!*.min.css'
					],
					dest: '<%= prj.release %>/<%= pkg.name %>-<%= pkg.version %>.min.css',
				}]
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: [{
					src: [
						'<%= prj.src.build.vendor %>/angular/*.js',
						'<%= prj.src.build.vendor %>/**/*.js',
						'<%= prj.src.build.js %>/*.js',
						'<%= prj.src.build.js %>/**/*.js'
					],
					dest: '<%= prj.release %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
				}]
			}
		}
	});

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'jscs',
		'nggettext_compile',
		'html2js',
		'less',
		'copy',
		'includeSource:dev',
		'wiredep',
		'preprocess:dev',
		'bower_main',
	]);

	grunt.registerTask('release', [
		'build',
		'cssmin',
		'copy:fonts_release',
		'uglify',
		'preprocess:release',
		'includeSource:release',
	]);

	grunt.registerTask('dev', [
		'openport:watch.options.livereload:'+LIVERELOAD_PORT,
		'build',
		'connect:dev',
		'watch',
	]);
};
