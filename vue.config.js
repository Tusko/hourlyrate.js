const workboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isDevServer = process.argv.indexOf("serve") >= 0;
const isChromeBuild = process.argv.indexOf("chrome") >= 0;
const CopyPlugin = require("copy-webpack-plugin");

let defaultSettings = {
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    output: {
      filename: "[name].app.[hash].js",
      chunkFilename: "[name].[hash].js"
    }
  },
  publicPath: ""
};

if (!isDevServer) {
  defaultSettings.configureWebpack = {
    plugins: [
      new workboxPlugin.GenerateSW({
        swDest: "sw.js",
        clientsClaim: true,
        skipWaiting: true
      })
    ],
    optimization: {
      runtimeChunk: true,
      minimize: true,
      splitChunks: {
        chunks: "all",
        minSize: 120000
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            extractComments: false,
            parallel: true,
            output: {
              comments: false
            },
            ecma: 6
          }
        })
      ]
    }
  };
}

if (isChromeBuild) {
  defaultSettings.outputDir = "./dist_chrome/";
  defaultSettings.configureWebpack.plugins.push(
    new CopyPlugin(
      [
        {
          from: "./src-chrome",
          force: true
        }
      ],
      {
        logLevel: "debug"
      }
    )
  );

  defaultSettings.filenameHashing = false;
}

module.exports = defaultSettings;
