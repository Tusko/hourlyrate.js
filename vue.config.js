const workboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isDevServer = process.argv.indexOf("serve") >= 0;
const isChromeBuild = process.argv.indexOf("chrome") >= 0;
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

if (isChromeBuild) {
  process.env.VUE_APP_IS_CHROME = true;
}

let defaultSettings = {
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    output: {
      filename: "[name].app.[hash].js",
      chunkFilename: "[name].[hash].js"
    }
  },
  publicPath: "",
  devServer: {
    https: true
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/components/__mixins";`
      }
    }
  }
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
      runtimeChunk: !isChromeBuild,
      minimize: true,
      splitChunks: isChromeBuild
        ? false
        : {
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
  defaultSettings.configureWebpack.plugins = [
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
    ),
    new ZipPlugin({
      filename: "chrome-hourlyrate.zip"
    })
  ];

  defaultSettings.filenameHashing = false;
}

module.exports = defaultSettings;
