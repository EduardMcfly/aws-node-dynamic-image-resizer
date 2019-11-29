const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
  mode: 'development',
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    enforceExtension: false,
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [{ test: /\.ts(x?)$/, loader: 'ts-loader' }],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
};
