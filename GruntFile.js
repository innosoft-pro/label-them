/**
 * Created by Hayk on 4/16/2017.
 */

module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({
        // Package
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: 'front/js/app/*.js',
                dest: 'build/app.js'
            }
        },
        // Uglify
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/app.js',
                dest: 'build/app.min.js',
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'uglify']);
};
