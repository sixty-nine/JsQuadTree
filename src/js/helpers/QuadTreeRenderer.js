define(function (require) {
    'use strict';

    var DISPLAY_MULT = 40;

    var _ = require('underscore'),
        Canvas = require('./Canvas');

    function drawQuadTree(context, node, hideGrid) {

        var canvas = new Canvas(context);

        if (hideGrid !== true) {
            canvas.drawBoundingBox(node.boundaries, 'black');
        }

        _.each(node.children, function (child) {
            drawQuadTree(context, child, hideGrid);
        });

        _.each(node.points, function (point) {
            canvas.drawPoint(point, 'blue');
        });
    }

    return function (context) {
        this.renderTree = function (root, hideGrid) {
            drawQuadTree(context, root, hideGrid);
        };
    };

});
