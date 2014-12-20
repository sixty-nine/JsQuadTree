module.exports = {
    scripts: {
        files: ['build/index.html.tpl', 'build/bootstrap.js.tpl', 'build/requirejs.json.tpl', 'build/config/config.json', 'build/config/development.json',  'build/config/production.json'],
        tasks: ['build'],
        options: {
            spawn: false
        }
    },
    tests: {
        files: ['build/test-main.js.tpl', 'build/requirejs.json.tpl'],
        tasks: ['buildTest'],
        options: {
            spawn: false
        }
    }
};