define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Point = require('model/Point'),
        BoundingBox = require('model/BoundingBox');

    describe('model/BoundingBox', function () {

        var bb1 = new BoundingBox(10, 15, 5);

        it('constructs properly', function () {

            expect(bb1.x).toBeDefined();
            expect(bb1.y).toBeDefined();
            expect(bb1.halfSize).toBeDefined();
            expect(bb1.edges).toBeDefined();
            expect(bb1.x).toBe(10);
            expect(bb1.y).toBe(15);
            expect(bb1.halfSize).toBe(5);

            expect(bb1.edges).toEqual(jasmine.any(Array));
            expect(bb1.edges.length).toEqual(4);
        });

        it('calculates its edges properly', function () {

            var edge;

            _.each(bb1.edges, function (edge) {
                expect(edge).toEqual(jasmine.any(Point));
            });

            edge = bb1.edges[0];
            expect(edge.x).toBe(5);
            expect(edge.y).toBe(10);

            edge = bb1.edges[1];
            expect(edge.x).toBe(15);
            expect(edge.y).toBe(10);

            edge = bb1.edges[2];
            expect(edge.x).toBe(5);
            expect(edge.y).toBe(20);

            edge = bb1.edges[3];
            expect(edge.x).toBe(15);
            expect(edge.y).toBe(20);
        });

        it('calculates whether a point is inside it or not', function () {

            var p1 = new Point(0, 0),
                p2 = new Point(8, 12),
                p3 = new Point(12, 19),
                p4 = new Point(20, 20);

            expect(bb1.contains(new Point(bb1.x, bb1.y))).toBe(true);

            expect(bb1.contains(p1)).toBe(false);
            expect(bb1.contains(p2)).toBe(true);
            expect(bb1.contains(p3)).toBe(true);
            expect(bb1.contains(p4)).toBe(false);
        });

        it('calculates if it intersects with another bounding box', function () {

            var boxes = [
                { input: new BoundingBox(2, 2, 5), expected: false },
                { input: new BoundingBox(5, 5, 5), expected: true },
                { input: new BoundingBox(10, 10, 2), expected: true },
                { input: new BoundingBox(30, 30, 2), expected: false },
                { input: new BoundingBox(30, 30, 30), expected: true }
            ];

            for (var i = 0; i < boxes.length; i++) {
                expect(bb1.intersects(boxes[i].input)).toBe(boxes[i].expected,
                    'Assertion ' + (i + 1) + ', ' + JSON.stringify(bb1) + ', ' + JSON.stringify(boxes[i].input)
                );
                expect(boxes[i].input.intersects(bb1)).toBe(boxes[i].expected,
                    'Assertion ' + (i + 1) + ', ' + JSON.stringify(boxes[i].input) + ', ' + JSON.stringify(bb1)
                );
            }
        });

    });

});