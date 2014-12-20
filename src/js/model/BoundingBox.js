    define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Point = require('./Point'),
        BoundingBox;

    BoundingBox = function (x, y, halfSize) {

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
            if (x + halfSize < bb.x - bb.halfSize || bb.x + bb.halfSize < x - halfSize ||
                y + halfSize < bb.y - bb.halfSize || bb.y + bb.halfSize < y - halfSize) {
                return false;
            }
            return true;
        };
    };

    BoundingBox.prototype.toJSON = function () {
        var res = _.reduce(this.edges, function (memo, edge) {
            return memo === null ? edge.toJSON() : memo +', ' + edge.toJSON();
        }, null);
        return '[' + res + ']';
    }

    return BoundingBox;
});
