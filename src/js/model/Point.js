define(function (require) {
    'use strict';

    var Point = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Point.prototype.toJSON = function(){
        return '(' + this.x + ', ' + this.y + ')';
    }

    return Point;
});
