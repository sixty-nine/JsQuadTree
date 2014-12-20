define(function (require) {
    'use strict';

    var MAX_POINTS = 2500;

    var Point = require('./model/Point'),
        BoundingBox = require('./model/BoundingBox'),
        QuadTree = require('./model/QuadTree'),
        Renderer = require('./helpers/QuadTreeRenderer');

    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        renderer = new Renderer(context);

    var tree = new QuadTree(new BoundingBox(10, 10, 10)),
        points = [];

    for (var i = 0; i < MAX_POINTS; i++) {
        points[i] = new Point(Math.random() * 20, Math.random() * 20);
        tree.insert(points[i]);
    }

    var $ = require('jquery'),
        _ = require('underscore'),
        Canvas = require('./helpers/Canvas'),
        c = new Canvas(context),
        timer,
        viewGrid = false;

    function show() {

        var bb = new BoundingBox(Math.random() * 10 + 5, Math.random() * 10 + 5, Math.random() * 5);

        context.clearRect(0, 0, canvas.width, canvas.height);

        renderer.renderTree(tree, !viewGrid);

        c.drawBoundingBox(bb, 'red');

        _.each(tree.queryRange(bb), function (point) {
            c.drawPoint(point, 'red', true);
        });
    }

    $('#toggle-grid').change(function () {
        clearInterval(timer);
        viewGrid = !viewGrid;
        show();
        timer = setInterval(show, 1000);
    });

    show();
    timer = setInterval(show, 1000);

});
