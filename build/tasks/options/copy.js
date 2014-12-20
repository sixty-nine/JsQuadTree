// TODO: properly configure
module.exports = {
    production: {
        files: [
            { expand: true, cwd : 'src/static_files/', src: ['**'], dest: 'dist/static_files/' }, // includes files in path and its subdirs
        ]
    }
};