module.exports = {
  mode: 'development',
    entry: './index.js',
    output: {
      path: __dirname,
      filename: './bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        }
      ]
    }
  }