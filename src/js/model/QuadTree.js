define(function (require) {
    'use strict';

    var NODE_CAPACITY = 4;
    var MAX_DEPTH = Infinity;

    var BoundingBox = require('./BoundingBox'),
        QuadTree;

    var _ = require('underscore');

    QuadTree = function (boundaries) {

        this.boundaries = boundaries;
        this.isDivided = false;
        this.children = [];
        this.points = [];

        this.insert = function (point, depth) {

            var self = this;

            this.depth = depth || 0;

            if (!this.boundaries.contains(point)) {
                return false;
            }

            if (this.depth > MAX_DEPTH || (!this.isDivided && this.points.length < NODE_CAPACITY)) {
                this.points.push(point);
                return true;
            }

            if (!this.isDivided) {
                this.subdivide();
            }

            return !_.isUndefined(
                _.find(this.children, function (child) {
                    return child.insert(point, self.depth + 1);
                })
            );
        };

        this.subdivide = function () {

            var self = this,
                centerX = this.boundaries.x,
                centerY = this.boundaries.y,
                halfHalfSize = this.boundaries.halfSize / 2,
                bb1 = new BoundingBox(centerX - halfHalfSize, centerY - halfHalfSize, halfHalfSize),
                bb2 = new BoundingBox(centerX + halfHalfSize, centerY - halfHalfSize, halfHalfSize),
                bb3 = new BoundingBox(centerX - halfHalfSize, centerY + halfHalfSize, halfHalfSize),
                bb4 = new BoundingBox(centerX + halfHalfSize, centerY + halfHalfSize, halfHalfSize),
                t1 = new QuadTree(bb1),
                t2 = new QuadTree(bb2),
                t3 = new QuadTree(bb3),
                t4 = new QuadTree(bb4),
                point;

            this.children.push(t1);
            this.children.push(t2);
            this.children.push(t3);
            this.children.push(t4);

            point = this.points.pop();
            while (point) {
                t1.insert(point, self.depth + 1) ||
                    t2.insert(point, self.depth + 1) ||
                    t3.insert(point, self.depth + 1) ||
                    t4.insert(point, self.depth + 1);
                point = this.points.pop();
            }

            this.isDivided = true;

        };

        this.queryRange = function (bb) {
            /*
             TODO: implement

             Pseudo code from wikipedia
             ==========================

             // Prepare an array of results
             Array of XY pointsInRange;

             // Automatically abort if the range does not intersect this quad
             if (!boundary.intersectsAABB(range))
             return pointsInRange; // empty list

             // Check objects at this quad level
             for (int p := 0; p < points.size; p++)
             {
             if (range.containsPoint(points[p]))
             pointsInRange.append(points[p]);
             }

             // Terminate here, if there are no children
             if (northWest == null)
             return pointsInRange;

             // Otherwise, add the points from the children
             pointsInRange.appendArray(northWest->queryRange(range));
             pointsInRange.appendArray(northEast->queryRange(range));
             pointsInRange.appendArray(southWest->queryRange(range));
             pointsInRange.appendArray(southEast->queryRange(range));

             return pointsInRange;
             */
        };
    };

    return QuadTree;

});
