const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const TerserPlugin = require('terser-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');




module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    ///optimization: {
    //    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    //},
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', "css-loader", "sass-loader"]
                //use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    },


    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),

        new CopyWebPackPlugin({
            patterns: [
              { from: path.resolve(__dirname, "src/images"),
                
                 to: path.resolve(__dirname, "dist/images")
              }],
          }),

        //new MiniCssExtractPlugin({ filename: "[name].css" }),

        
        
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
    }),
    
           
    ]
    
}
