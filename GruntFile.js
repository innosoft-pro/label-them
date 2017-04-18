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
                src: ['front/js/app/*.js', 'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/Snap.svg/dist/snap.svg-min.js'],
                dest: 'build/app.js'
            }  ,
            css: {
                src: ['./bower_components/bootstrap/dist/css/bootstrap.min.css', 'front/css/styles.css'],
                dest: 'build/css/concat.css'
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
        },
        cssmin : {
            options: {
                keepSpecialComments: 0
            },
            minify : {
                expand : true,
                cwd : 'build/css',
                src : ['*.css', '!*.min.css'],
                dest : 'build/css',
                ext : '.min.css'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
