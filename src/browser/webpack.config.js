/* eslint-env node */

const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
  mode: "development",
  entry: {
    index: [path.resolve(__dirname, "./ts/index.ts")],
  },
  output: {
    filename: "js/[name].js",
    chunkFilename: "[id].bundle.js",
    path: path.resolve(__dirname, "../../public/browser"),
    publicPath: "/",
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendors: false,
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json", ".scss", "sass", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "."),
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../../public/browser'),
    port: 9000
  }
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
}

module.exports = config;
