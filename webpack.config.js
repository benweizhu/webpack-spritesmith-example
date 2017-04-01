//webpack.config.js
var path = require('path');

var SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.css');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: extractCSS.extract(['css-loader?minimize&modules&importLoaders=2&localIdentName=[name]__[local]', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.png$/, loaders: [
        'file-loader?name=i/[hash].[ext]'
      ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/ico'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.scss')
      },
      apiOptions: {
        cssImageRef: "../spritesmith-generated/sprite.png"
      }
    })
  ]
};
