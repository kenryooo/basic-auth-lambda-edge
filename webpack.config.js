const path = require('path')
module.exports = {
  target: 'node',
  entry: ['./src/index.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dst'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js",".ts"]
  }
}
