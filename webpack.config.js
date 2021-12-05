const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    bundle: ['./src/index.js']
  },
  output: {
    library: 'Editor',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: __dirname + '/public',
    filename: 'vendor/editor.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: '**/*', to: 'vendor', context: 'node_modules/diagram-js/assets' }
    ]),

    new Dotenv(),
  ],
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 80,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
