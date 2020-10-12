const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: {
      app: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].js',
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        {
          test: /\.(png|jpe?g|gif|ico|mp3|mp4|woff|woff2|eot|ttf|otf|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    mode: 'development',
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        title: 'Incognito Wallet',
        filename: 'index.html',
        template: path.join(__dirname, 'manifest', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.ico'),
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      hot: true,
      contentBase: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'public'),
        path.join(__dirname, 'manifest'),
      ],
      host: 'localhost',
      port: 8080,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@routes': path.resolve(__dirname, 'src/routes/'),
        '@redux': path.resolve(__dirname, 'src/redux'),
      },
    },
    target: 'web',
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
