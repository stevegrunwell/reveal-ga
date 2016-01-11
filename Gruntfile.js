module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['src/*.js'],
      options: {
        jshintrc: true
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/reveal-ga.min.js': ['src/reveal-ga.js']
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */' + "\n"
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify']);
};