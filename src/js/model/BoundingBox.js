define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Point = require('./Point');

    return function (x, y, halfSize) {

        this.x = x;
        this.y = y;
        this.halfSize = halfSize;

        this.edges = [
            new Point(x - halfSize, y - halfSize),
            new Point(x + halfSize, y - halfSize),
            new Point(x - halfSize, y + halfSize),
            new Point(x + halfSize, y + halfSize)
        ];

        this.contains = function(point) {
            return point.x >= x - halfSize &&
                point.x <= x + halfSize &&
                point.y >= y - halfSize &&
                point.y <= y + halfSize;
        };

        this.intersects = function (bb) {
            var self = this;
            return !_.isUndefined(
                _.find(bb.edges, function (point) {
                    return self.contains(point);
                })
            );
        };

    };
});
