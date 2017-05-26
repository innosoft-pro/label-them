/**
 * Created by Hayk on 4/16/2017.
 */

module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({
        // Package
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            js: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/bootstrap/dist/js/bootstrap.js",
                    "front/js/app/*.js",
                    "front/js/app/tools/*.js",
                    "front/js/toloka.js",
                    ],
                dest: "build/app.js"
            },
            jsLocal: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/bootstrap/dist/js/bootstrap.js",
                    "front/js/app/tools/*.js",
                    "front/js/app/*.js",
                ],
                dest: "build/app-local.js"
            },
            css: {
                src: ["./bower_components/bootstrap/dist/css/bootstrap.min.css", "front/css/styles.css"],
                dest: "build/css/concat.css"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: "build/css",
                src: ["*.css", "!*.min.css"],
                dest: "build/css",
                ext: ".min.css"
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "cssmin"]);
};
