
const path = require('path');

module.exports = {
  entry: './assets/js/icons.js',
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'icons.bundle.js',
    library: 'Icons',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  mode: 'production'
};
