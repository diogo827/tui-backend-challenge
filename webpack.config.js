const path = require('path');
const nodeExternals = require('webpack-node-externals');
const exec = require('child_process').exec;

const {
    NODE_ENV = 'production',
} = process.env;
module.exports = {
    watch: NODE_ENV === 'development',
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('npm run run:dev', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ],
    entry: './src/server.ts',
    externals: [nodeExternals()],
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            Controllers: path.resolve(__dirname, 'src/controllers'),
            Exceptions: path.resolve(__dirname, 'src/exceptions'),
            Interfaces: path.resolve(__dirname, 'src/interfaces'),
            Middleware: path.resolve(__dirname, 'src/middleware'),
            Models: path.resolve(__dirname, 'src/models'),
            Services: path.resolve(__dirname, 'src/services'),
            Utils: path.resolve(__dirname, 'src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    }
}