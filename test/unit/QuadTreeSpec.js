define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Point = require('model/Point'),
        BoundingBox = require('model/BoundingBox'),
        QuadTree = require('model/QuadTree');

    describe('model/QuadTree', function () {

        it('constructs and fills properly', function () {

            var p1 = new Point(1, 1),
                p2 = new Point(9, 1),
                p3 = new Point(9, 9),
                p4 = new Point(1, 9),
                bb = new BoundingBox(5, 5, 5),
                tree = new QuadTree(bb);

            expect(tree.boundaries).toBeDefined();
            expect(tree.isDivided).toBeDefined();
            expect(tree.children).toBeDefined();
            expect(tree.points).toBeDefined();

            expect(tree.boundaries).toBe(bb);
            expect(tree.isDivided).toBe(false);
            expect(tree.children).toEqual([]);
            expect(tree.points).toEqual([]);

            tree.insert(p1);
            expect(tree.isDivided).toBe(false);
            expect(tree.points).toEqual([p1]);

            tree.insert(p2);
            expect(tree.isDivided).toBe(false);
            expect(tree.points).toEqual([p1, p2]);

            tree.insert(p3);
            expect(tree.isDivided).toBe(false);
            expect(tree.points).toEqual([p1, p2, p3]);

            tree.insert(p4);
            expect(tree.isDivided).toBe(false);
            expect(tree.points).toEqual([p1, p2, p3, p4]);

            // -- After the 5th point the tree splits
            tree.insert(p1);
            expect(tree.isDivided).toBe(true);
            expect(tree.points).toEqual([]);
            expect(tree.children).toEqual(jasmine.any(Array));
            expect(tree.children.length).toBe(4);
            _.each(tree.children, function (subtree) {
                expect(subtree).toEqual(jasmine.any(QuadTree));
                expect(subtree.isDivided).toBe(false);
            });
            expect(tree.children[0].points).toEqual([p1, p1]);
        });

        it('will not split indefinitely when the same point is inserted 5 times', function () {

            function getMaxDepth(tree) {
                var depth = 0,
                    maxDepth = 0;

                function walk(node) {
                    maxDepth = Math.max(maxDepth, depth);
                    depth++;
                    _.each(node.children, walk);
                    depth--;
                }
                walk(tree);
                return maxDepth;
            };

            var p = new Point(1, 1),
                bb = new BoundingBox(5, 5, 5),
                tree = new QuadTree(bb);

            tree.insert(p);
            tree.insert(p);
            tree.insert(p);
            tree.insert(p);
            tree.insert(p);

            expect(getMaxDepth(tree)).toBe(50);
        });

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