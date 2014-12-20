<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>JS Quadtree Demo</title>

    <link rel="shortcut icon" href="static_files/favicon.ico" type="image/x-icon" />

</head>
<body>

<h1>Quadtree Canvas Demo</h1>

<p>Visualization of 2500 random points inserted into a QuadTree.</p>
<p>
    <label>
        <input id="toggle-grid" type="checkbox" /> View tree
    </label>
</p>

<canvas id="myCanvas" width="1000" height="1000"></canvas>

<% if(target == 'development') { %>
<script data-main="<%- config.paths.root %>/js/bootstrap.js" src="<%- config.paths.root %>/bower_components/requirejs/require.js"></script>
<% } else { %>
<script src="js/build.min.js"></script>
<% } %>

</body>
</html>