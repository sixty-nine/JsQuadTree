define(function (require) {
    'use strict';

    var DISPLAY_MULT = 40;

    var _ = require('underscore');

    function drawPoint(context, point) {
        context.beginPath();
        context.arc(DISPLAY_MULT * point.x, DISPLAY_MULT * point.y, 2, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    function drawBoundingBox(context, bb) {
        context.beginPath();
        context.rect(
            DISPLAY_MULT * (bb.x - bb.halfSize), DISPLAY_MULT * (bb.y - bb.halfSize),
            2 * DISPLAY_MULT * bb.halfSize, 2 * DISPLAY_MULT * bb.halfSize
        );
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function drawQuadTree(context, node) {

        drawBoundingBox(context, node.boundaries);

        _.each(node.children, function (child) {
            drawQuadTree(context, child);
        });

        _.each(node.points, function (point) {
            drawPoint(context, point);
        });
    }

    return function (context) {
        this.renderTree = function (root) {
            drawQuadTree(context, root);
        };
    };

});
