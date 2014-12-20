define(function (require) {
    'use strict';

    var Point = require('model/Point');

    describe('model/Point', function () {

        it('constructs properly', function () {

            var p = new Point(123, 321);
            expect(p.hasOwnProperty('x')).toBe(true);
            expect(p.hasOwnProperty('y')).toBe(true);
            expect(p.x).toBe(123);
            expect(p.y).toBe(321);
        });

    });

});