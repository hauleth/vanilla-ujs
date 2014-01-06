module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: {
        options: {
          urls: ['http://localhost:8000/index.html']
        }
      },
      options: {
        run: true,
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: "(function (window, document, undefined) {\n",
        footer: '}).call(null, window, document);'
      },
      dist: {
        src: [
          'src/global.js',
          'src/method.js',
          'src/confirm.js',
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
          server: 'test/helpers/serv.js',
          bases: ['src/', 'test/']
        }
      }
    }
  });

  grunt.registerTask('test', ['express:test', 'mocha']);
  grunt.registerTask('webtest', ['express:test', 'express-keepalive']);
  grunt.registerTask('dist', ['concat', 'uglify:dist']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha');
};
