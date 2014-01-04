module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/**/*.html'],
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
          'src/method.js',
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
    }
  });

  grunt.registerTask('test', ['concat', 'mocha:all']);
  grunt.registerTask('dist', ['concat', 'uglify:dist']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
};
