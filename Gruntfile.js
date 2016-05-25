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
        footer: '}).call(void(0), window, document);'
      },
      dist: {
        src: [
          'lib/assets/javascripts/vanilla-ujs/polyfills.js',
          'lib/assets/javascripts/vanilla-ujs/liteajax.js',
          'lib/assets/javascripts/vanilla-ujs/method.js',
          'lib/assets/javascripts/vanilla-ujs/confirm.js',
          'lib/assets/javascripts/vanilla-ujs/disable.js',
          'lib/assets/javascripts/vanilla-ujs/csrf.js',
          'lib/assets/javascripts/vanilla-ujs/form.js',
        ],
        dest: 'lib/assets/javascripts/vanilla-ujs.js'
      }
    },
    express: {
      test: {
        options: {
          port: 8000,
          hostname: 'localhost',
          server: 'test/helpers/serv.js',
          bases: ['./lib/', './test/']
        }
      }
    },
    watch: {
      tests: {
        files: ["lib/**/*.js", "test/**/*.spec.js"],
        tasks: ["test"],
      },
    }
  });

  grunt.registerTask('test', ['express:test', 'mocha:all']);
  grunt.registerTask('webtest', ['express:test', 'express-keepalive']);
  grunt.registerTask('ci', ['express:test', 'mocha:ci']);

  grunt.registerTask('dist', ['concat']);
  grunt.registerTask('default', ['test']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha');
};
