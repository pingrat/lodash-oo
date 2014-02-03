'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// package.json
		pkg: grunt.file.readJSON('package.json'),

		// QUnit
		qunit: {
			all: {
				files: ['test/**/test_*.js']
			}
		},

		// JSHint
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			sources: {
				src: ['index.js', 'src/**/*.js']
			},
			dist: {
				src: ['dist/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			},
		},

		concat: {
			options: {

			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/lodash-oo.js'
			}
		},

		jsbeautifier: {
			files: ['dist/**/*.js'],
			options: {
				//banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				js: {
					braceStyle: 'collapse',
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentWithTabs: true,
					jslintHappy: false,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 2,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0
				}
			}
		},

		// watch
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			sources: {
				files: '<%= jshint.sources.src %>',
				tasks: ['jshint:sources','concat:dist' ,'jsbeautifier' , 'jshint:dist']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'jsbeautifier']);

};
