module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: {
        options: {
          reporter: 'Spec'
        }
      },
      ci: {
        options: {
        }
      },
      options: {
        run: true,
        urls: ['http://localhost:8000/index.html'],
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: "(function (window, document) {\n'use strict';\n",
        footer: '}).call(null, window, document);'
      },
      dist: {
        src: [
          'src/polyfills.js',
          'src/liteajax.js',
          'src/method.js',
          'src/confirm.js',
          'src/csrf.js',
        ],
        dest: 'vanilla-ujs.js'
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: 'vanilla-ujs.map.js'
        },
        files: {
          'vanilla-ujs.min.js': 'vanilla-ujs.js'
        }
      }
    },
    express: {
      test: {
        options: {
          port: 8000,
          hostname: 'localhost',
          server: 'test/helpers/serv.js',
          bases: ['src/', 'test/']
        }
      }
    },
    watch: {
      tests: {
        files: ["src/**/*.js", "test/**/*.spec.js"],
        tasks: ["test"],
      },
    }
  });

  grunt.registerTask('test', ['express:test', 'mocha:all']);
  grunt.registerTask('webtest', ['express:test', 'express-keepalive']);
  grunt.registerTask('ci', ['express:test', 'mocha:ci']);

  grunt.registerTask('dist', ['concat', 'uglify:dist']);
  grunt.registerTask('default', ['test']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha');
};
