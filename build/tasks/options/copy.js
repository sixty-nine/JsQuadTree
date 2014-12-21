module.exports = {
    production: {
        files: [
            { expand: true, cwd : 'src/static_files/', src: ['**'], dest: 'dist/static_files/' }, // includes files in path and its subdirs
            { expand: true, cwd: 'src/bower_components/bootstrap/dist/css/', src: ['bootstrap.min.css', 'bootstrap.css.map'], dest: 'dist/css'},
        ]
    }
};