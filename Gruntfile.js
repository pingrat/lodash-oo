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

grunt.initConfig({
  concat: {
    dist: {
      options: {
        // Replace all 'use strict' statements in the code with a single one at the top
        banner: "'use strict';\n",
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        },
      },
      files: {
        'dist/built.js': ['src/project.js'],
      },
    },
  },
});
		concat: {
			dist: {
				options: {
					banner: '// lodash-oo'
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
				tasks: ['jshint:sources']
			},
			dist: {
				files: '<%= jshint.dist.src %>',
				tasks: ['jshint:dist']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
		}

	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', 'qunit']);

};
