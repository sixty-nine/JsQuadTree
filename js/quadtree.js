/*global SixtyNine */
var SixtyNine = SixtyNine || {};

(function () {

    var DISPLAY_MULT = 20;
    var NODE_CAPACITY = 4;
    var MAX_DEPTH = Infinity;

    SixtyNine.Point = function (x, y) {
        this.x = x;
        this.y = y;

        this.draw = function (context) {
            context.beginPath();
            context.arc(DISPLAY_MULT * x, DISPLAY_MULT * y, 2, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        };
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

        this.draw = function (context) {
            context.beginPath();
            context.rect(DISPLAY_MULT * (x - halfSize), DISPLAY_MULT * (y - halfSize), 2 * DISPLAY_MULT * halfSize, 2 * DISPLAY_MULT * halfSize);
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        };
    };

    SixtyNine.QuadTree = function (boundaries) {

        this.boundaries = boundaries;
        this.isDivided = false;
        this.children = [];
        this.points = [];

        this.draw = function (context) {
            boundaries.draw(context);
            _.each(this.children, function (child) {
                child.draw(context);
            });
            _.each(this.points, function (point) {
                point.draw(context);
            });
        };

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
                bb1 = new SixtyNine.BoundingBox(centerX - halfHalfSize, centerY - halfHalfSize, halfHalfSize),
                bb2 = new SixtyNine.BoundingBox(centerX + halfHalfSize, centerY - halfHalfSize, halfHalfSize),
                bb3 = new SixtyNine.BoundingBox(centerX - halfHalfSize, centerY + halfHalfSize, halfHalfSize),
                bb4 = new SixtyNine.BoundingBox(centerX + halfHalfSize, centerY + halfHalfSize, halfHalfSize),
                t1 = new SixtyNine.QuadTree(bb1),
                t2 = new SixtyNine.QuadTree(bb2),
                t3 = new SixtyNine.QuadTree(bb3),
                t4 = new SixtyNine.QuadTree(bb4);

            this.children.push(t1);
            this.children.push(t2);
            this.children.push(t3);
            this.children.push(t4);

            while(point = this.points.pop()) {
                t1.insert(point, self.depth + 1)
                || t2.insert(point, self.depth + 1)
                || t3.insert(point, self.depth + 1)
                || t4.insert(point, self.depth + 1);
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

}());
