(function () {
    'use strict';

    var requirejsConfig = <%= requirejs %>;

    requirejsConfig.baseUrl = '/js';

    require.config(requirejsConfig);

    require(['app'], function (app) {

    });

})();
