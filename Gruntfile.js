//module.exports = function(grunt) {
//    'use strict';
//
//    // Project configuration.
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
////        uglify: {
////            options: {
////                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
////            },
////            build: {
////                src: 'src/js/<%= pkg.name %>.js',
////                dest: 'build/<%= pkg.name %>.min.js'
////            }
////        },
//        jshint: {
//            all    : ['src/**/*.js'],
//            options: {
//                jshintrc : '.jshintrc'
//            }
//        }
//    });
//
//    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//
//    // Default task(s).
//    grunt.registerTask('default', ['jshint']);
//
//
//};



module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash');

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }

    var config = _.extend({}, {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env
    }, loadConfig('./build/tasks/options/'));

    grunt.initConfig(config);
    grunt.loadTasks('build/tasks');
    require('load-grunt-tasks')(grunt);
//    grunt.loadNpmTasks('grunt-karma');

    /**
     * Serves the application from localhost:9001
     */
    grunt.registerTask('serve', [ 'jshint', 'build', 'connect', 'watch']);

//    /**
//     * Runs the tests
//     */
//    grunt.registerTask('test', [ 'buildTest', 'karma:unit' ]);
//
//    /**
//     * Runs the tests in a continuous environemnt (CI server)
//     */
//    grunt.registerTask('test:continuous', [ 'buildTest', 'karma:continuous' ]);
//

};