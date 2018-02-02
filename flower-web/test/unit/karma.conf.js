// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function(config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        // browsers: ['Chrome', 'PhantomJS'],
        browsers: ['Chrome_Beta_Headless'],
        customLaunchers: {
                Chrome_Beta_Headless: {
                base: 'Chrome',
                flags: [
                        '--headless',
                        '--disable-gpu',
                        '--remote-debugging-port=9222'
                ]
            }
        },
        browserConsoleLogOptions: {
                level: 'log',
                terminal: true
        },
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: [
            // '../../node_modules/es6-promise/dist/es6-promise.auto.js',
            '../../node_modules/babel-polyfill/dist/polyfill.js',            
            './index.js'
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}