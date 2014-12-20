<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>JS Quadtree Demo</title>

    <link rel="shortcut icon" href="static_files/favicon.ico" type="image/x-icon" />
    <link href="<%- config.paths.root %>/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Quadtree Canvas Demo</h1>
            <p>Visualization of 2500 random points inserted into a QuadTree.</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-10">
            <canvas id="myCanvas" width="1000" height="1000"></canvas>
        </div>
        <div class="col-md-2">
            <h2>Options</h2>
            <label>
                <input id="toggle-grid" type="checkbox" /> View tree
            </label>
        </div>
    </div>
</div>

<% if(target == 'development') { %>
<script data-main="<%- config.paths.root %>/js/bootstrap.js" src="<%- config.paths.root %>/bower_components/requirejs/require.js"></script>
<% } else { %>
<script src="js/build.min.js"></script>
<% } %>

</body>
</html>