module.exports = function (grunt) {
    'use strict';

    var buildRequirejsConfig = function () {
        var requirejsTemplate = grunt.file.read('build/requirejs.json.tpl');
        return grunt.template.process(requirejsTemplate, { data : { path : '../' }});
    };

    grunt.registerTask('buildTest', function () {

        var testMainTemplate = grunt.file.read('build/test-main.js.tpl');

        var data = {
            requirejs : buildRequirejsConfig()
        };

        var processedIndex = grunt.template.process(testMainTemplate, { data : data });
        grunt.file.write('test/unit/test-main.js', processedIndex);
    });

};