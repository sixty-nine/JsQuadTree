// TODO: properly configure
module.exports = {
    unit: {
        configFile: 'karma.conf.js'
    },
    continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }
};