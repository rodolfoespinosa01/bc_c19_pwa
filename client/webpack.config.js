// Importing necessary dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Environment Configuration: Check if NODE_ENV is set to "production"
const is_prod = process.env.NODE_ENV.trim() === "production";

// Array to hold webpack plugins
const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
  }),
];

// If in production, add additional plugins for PWA and service worker
if (is_prod) {
  plugins.push(
    ...[
      // WebpackPwaManifest configuration for PWA manifest
      new WebpackPwaManifest({
        name: "Text Editor",
        short_name: "Txt Ed",
        description: "A text editor PWA that can work both online and offline",
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

// Add Workbox InjectManifest plugin for service worker
plugins.push(
  new InjectManifest({
    swSrc: "./src-sw.js", // Path to the service worker source file
    swDest: "service-worker.js", // Output filename for the service worker
  })
);

// Webpack configuration export
module.exports = () => {
  return {
    mode: is_prod ? "production" : "development", // Set mode based on environment
    entry: {
      main: "./src/js/index.js", // Entry point for the main bundle
      install: "./src/js/install.js", // Entry point for the install bundle
    },
    output: {
      filename: "[name].bundle.js", // Output filename with [name] placeholder
      path: path.resolve(__dirname, "dist"), // Output directory path
    },
    plugins: plugins, // Include the plugins array in the configuration
    module: {
      rules: [
        // Webpack module rules for processing different file types can be added here
        {
          test: /\.js$/, // Process JavaScript files
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", // Use Babel for JavaScript transpilation
            options: {
              presets: ["@babel/preset-env"], // Babel preset for environment compatibility
            },
          },
        },
        {
          test: /\.css$/, // Process CSS files
          use: ["style-loader", "css-loader"], // Use style-loader and css-loader
        },
      ],
    },
  };
};
