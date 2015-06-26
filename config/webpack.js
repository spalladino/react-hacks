var path = require('path');

module.exports = {  
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};

