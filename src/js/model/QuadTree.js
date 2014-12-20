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
                t1 = new QuadTree(new BoundingBox(centerX - halfHalfSize, centerY - halfHalfSize, halfHalfSize)),
                t2 = new QuadTree(new BoundingBox(centerX + halfHalfSize, centerY - halfHalfSize, halfHalfSize)),
                t3 = new QuadTree(new BoundingBox(centerX - halfHalfSize, centerY + halfHalfSize, halfHalfSize)),
                t4 = new QuadTree(new BoundingBox(centerX + halfHalfSize, centerY + halfHalfSize, halfHalfSize)),
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

            var pointsInRange = [];

            if (this.boundaries.intersects(bb)) {

                for (var i = 0; i < this.points.length; i++) {
                    if (bb.contains(this.points[i])) {
                        pointsInRange.push(this.points[i]);
                    }
                }

                if (this.isDivided) {
                    _.each(this.children, function (child) {
                        pointsInRange = pointsInRange.concat(child.queryRange(bb));
                    });
                }
            }

            return pointsInRange;
        };
    };

    return QuadTree;

});
