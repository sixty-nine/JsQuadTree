define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Point = require('model/Point'),
        BoundingBox = require('model/BoundingBox'),
        QuadTree = require('model/QuadTree');

    describe('model/QuadTree', function () {

        it('can be queried properly', function () {

            var tree = new QuadTree(new BoundingBox(5, 5, 5)),
                range, i;

            for (i = 1; i < 10; i++) {
                tree.insert(new Point(i, i));
            }

            range = tree.queryRange(new BoundingBox(5, 5, 1));
            expect(range).toEqual(jasmine.any(Array));
            expect(range.length).toBe(3);
            _.each(range, function (point) {
                expect(point).toEqual(jasmine.any(Point));
            });
            expect(range[0].x).toBe(4);
            expect(range[0].y).toBe(4);
            expect(range[1].x).toBe(5);
            expect(range[1].y).toBe(5);
            expect(range[2].x).toBe(6);
            expect(range[2].y).toBe(6);

            range = tree.queryRange(new BoundingBox(10, 10, 1));
            expect(range).toEqual(jasmine.any(Array));
            expect(range.length).toBe(1);
            _.each(range, function (point) {
                expect(point).toEqual(jasmine.any(Point));
            });
            expect(range[0].x).toBe(9);
            expect(range[0].y).toBe(9);

            range = tree.queryRange(new BoundingBox(20, 20, 1));
            expect(range).toEqual(jasmine.any(Array));
            expect(range.length).toBe(0);
        });

    });

});