define(function (require) {
    'use strict';

    var DISPLAY_MULT = 40;

    return function (context) {

        this.drawCircle = function (x, y, color, filled) {
            context.beginPath();
            context.arc(x, y, 2, 0, 2 * Math.PI, false);
            if (filled) {
                context.fillStyle = color;
                context.fill();
            }
            context.lineWidth = 1;
            context.strokeStyle = color;
            context.stroke();

        };

        this.drawRect = function (x1, y1, x2, y2, color, filled) {
            context.beginPath();
            context.rect(x1, y1, x2, y2);
            if (filled) {
                context.fillStyle = color;
                context.fill();
            }
            context.lineWidth = 1;
            context.strokeStyle = color;
            context.stroke();
        };

        this.drawPoint = function (p, color, filled) {
            this.drawCircle(DISPLAY_MULT * p.x, DISPLAY_MULT * p.y, color, filled);
        };

        this.drawBoundingBox = function (bb, color, filled) {
            this.drawRect(
                DISPLAY_MULT * (bb.x - bb.halfSize),
                DISPLAY_MULT * (bb.y - bb.halfSize),
                2 * DISPLAY_MULT * bb.halfSize,
                2 * DISPLAY_MULT * bb.halfSize,
                color,
                filled
            );
        };

    };

});
