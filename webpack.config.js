const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const DIST_FOLDER = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 4000;

const devConfig = {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: DIST_FOLDER,
    port: PORT,
    proxy: {
      '/api': 'http://localhost:8765',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
};

module.exports = webpackMerge(isDev ? devConfig : prodConfig, {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_FOLDER,
  },
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src')],
        use: ['cache-loader', 'babel-loader'],
      },
      // svg
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          mimetype: 'image/svg+xml',
          publicPath: '/',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      // Copy index.html in output folder
      {
        from: path.join(__dirname, 'src', 'index.html'),
      },
    ]),
  ],
});
