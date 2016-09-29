const path = require('path');

module.exports = {
  entry: './index.js',
  target: 'node',
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    root: path.resolve('../../lib')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
