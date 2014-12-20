define(function (require) {
    'use strict';

    var MAX_POINTS = 300;

    var Point = require('./model/Point'),
        BoundingBox = require('./model/BoundingBox'),
        QuadTree = require('./model/QuadTree'),
        Renderer = require('./helpers/QuadTreeRenderer');

    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        renderer = new Renderer(context);

    var boundaries = new BoundingBox(10, 10, 10),
        tree = new QuadTree(boundaries);

    for (var i = 0; i < MAX_POINTS; i++) {
        tree.insert(new Point(
            Math.random() * 20,
            Math.random() * 20
        ));
    }

    renderer.renderTree(tree);

});
