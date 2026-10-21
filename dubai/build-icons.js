const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a simple webpack config for building the icons
const webpackConfig = `
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
`;

// Write webpack config
fs.writeFileSync('webpack.config.js', webpackConfig);

// Install webpack and babel
console.log('Installing webpack and babel...');
execSync('npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react', { stdio: 'inherit' });

// Build the icons
console.log('Building icons...');
execSync('npx webpack', { stdio: 'inherit' });

// Clean up
fs.unlinkSync('webpack.config.js');

console.log('Icons built successfully!');
