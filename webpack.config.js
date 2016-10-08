var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'inline-source-map',
  resolve: {
    root: path.resolve('./src')
  },
  entry: {
    'build': './src/index'
  },
  output: {
    path: path.resolve('./public/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: path.resolve('./src')
      },
      {
        test: /\.css/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: path.resolve('./src')
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};


module.exports = config;
