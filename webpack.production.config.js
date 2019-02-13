/** 这是用于开发环境的webpack配置文件 **/

const path = require('path'); // 获取绝对路径用
const webpack = require('webpack'); // webpack核心
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次打包前清除旧的build文件夹
const TerserPlugin = require('terser-webpack-plugin'); // 优化js
module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'src', 'index')], // 项目入口
  output: {
    path: path.resolve(__dirname, './dist'), // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    filename: '[name].js', //编译后的文件名字
    publicPath: '/dist/',
    library: 'react-flip',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          output: {
            comments: false, // 不保留注释
          },
        },
      }),
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, 'src'),
        use: ['file-loader?name=assets/[name].[ext]'],
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif|svg)(\?|$)/,
        include: path.resolve(__dirname, 'src'),
        use: ['url-loader?limit=8192&name=assets/[name].[ext]'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //用来保证编译过程不出错
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.less', '.css'], //后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
