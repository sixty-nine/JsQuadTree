(function () {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /Spec\.js$/;

    var pathToModule = function (path) {
        return path.replace(/^\/base\/frontend\/app\//, '');
    };

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });

    var requirejsConfig = <%= requirejs %>;

    requirejsConfig.baseUrl = '/base/frontend/app';
    requirejsConfig.deps =  allTestFiles; // dynamically load all test files
    requirejsConfig.callback = window.__karma__.start;

    require.config(requirejsConfig);

})();