const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// check if process.env.NODE_ENV exist first
// const is_prod = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production";

const is_prod = process.env.NODE_ENV.trim() === "production";

const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
  }),
];

if (is_prod) {
  plugins.push(
    ...[
      new WebpackPwaManifest({
        name: "Text Editor",
        short_name: "Txt Ed",
        description:
          "A text editor PWA (progressive web app) that can work both online and offline",
        background_color: "#ffffff",
        theme_color: "#000",
        publicPath: "/",
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ]
  );
}

plugins.push(
  new InjectManifest({
    swSrc: "./src-sw.js",
    swDest: "service-worker.js",
  })
);

module.exports = () => {
  return {
    mode: is_prod ? "production" : "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
