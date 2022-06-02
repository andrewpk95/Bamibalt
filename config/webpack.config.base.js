const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: ['web', 'es5'],
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    alias: {
      src: path.join(__dirname, '../src'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(wav|ogg|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'sounds/[name].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 2 * 1024 * 1024,
    maxAssetSize: 2 * 1024 * 1024,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  ],
  devServer: {
    static: './dist',
  },
};
