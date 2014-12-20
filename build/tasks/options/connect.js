module.exports = {
    server: {
        options: {
            port: 9001,
            middleware: function (connect) {
                'use strict';

                var modRewrite = require('connect-modrewrite');
                var dir = 'src';

                var target = require('grunt').config('target');
                if (target !== 'development') {
                    dir = 'build/dist';
                }

                return [
                    modRewrite([
                        '^[^\\.]*$ /index.html [L]'
                    ]),
                    connect.static(dir),
                    connect.directory(dir)
                ];
            }
        }
    }
};