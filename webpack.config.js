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
  devtool: 'source-map'
};
