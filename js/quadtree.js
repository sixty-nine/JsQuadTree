/*global SixtyNine */
var SixtyNine = SixtyNine || {};

(function () {


    var NODE_CAPACITY = 4;
    var MAX_DEPTH = Infinity;

    SixtyNine.Point = function (x, y) {
        this.x = x;
        this.y = y;
    };

    SixtyNine.BoundingBox = function (x, y, halfSize) {

        this.x = x;
        this.y = y;
        this.halfSize = halfSize;

        this.edges = [
            new SixtyNine.Point(x - halfSize, y - halfSize),
            new SixtyNine.Point(x + halfSize, y - halfSize),
            new SixtyNine.Point(x - halfSize, y + halfSize),
            new SixtyNine.Point(x + halfSize, y + halfSize)
        ];

        this.contains = function(point) {
            return point.x >= x - halfSize
                && point.x <= x + halfSize
                && point.y >= y - halfSize
                && point.y <= y + halfSize;
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

    SixtyNine.QuadTree = function (boundaries) {

        this.boundaries = boundaries;
        this.isDivided = false;
        this.children = [];
        this.points = [];

        this.insert = function (point, depth) {

            depth = depth || 0;

            if (!this.boundaries.contains(point)) {
                return false;
            }

            if (depth > MAX_DEPTH || this.points.length < NODE_CAPACITY) {
                this.points.push(point);
                return true;
            }

            if (!this.isDivided) {
                this.subdivide();
            }

            return !_.isUndefined(
                _.find(this.children, function (child) {
                    return child.insert(point, depth + 1);
                })
            );
        };

        this.subdivide = function () {
            this.isDivided = true;
        };

        this.queryRange = function (bb) {
/*
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

}());
