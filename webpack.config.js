const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/index.html',
  filename: './index.html'
});

module.exports = {
  entry: {
    app: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ // Order matters (right to left), need to resolve CSS files before adding to DOM
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { // Allows same name of CSS but different styles in different components
              modules: true, // Enables css modules
              importLoaders: 1, // How many loaders before css-loader should be applied
              localIdentName: '[name]_[local]_[hash:base64]', // Name of component, name of class/id, randomly generated hash 
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};