define(function (require) {
    'use strict';

    var Point = require('./Point'),
        Rect;

    Rect = function (x, y, w, h) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.topLeft = new Point(x, y);
        this.bottomRight = new Point(x + w, y + h);
    };

    Rect.prototype.toJSON = function(){
        return 'Rect(' + this.topLeft.toJSON() + ' - ' + this.bottomRight.toJSON() + ')';
    };

    return Rect;
});
