const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');

module.exports = (env ={}) => {

  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';


  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Hello World',
        buildTime: new Date().toISOString(),
        template: 'public/index.html'
      })
    ];
    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      );
    }
    return plugins;
  }

  return {
    mode: isProd ? 'production' : isDev && 'development',

    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined
    },

    module: {
      rules : [
        //Loading babel for js
        //полная запись use
        // {
        //   test: /\.js$/, exclude: /node_modules/,
        //   use: [ { loader: 'babel-loader' }  ]
        // },
        //краткая запись use
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Loading css
        {
          test:/\.css$/,
          use: getStyleLoaders()
          //use: [ MiniCssExtractPlugin.loader, 'css-loader']
        },
        // Loading scss/sass
        {
          test:/\.s[ca]ss$/,
          //полная запись use
          use: [
            //полная запись use
            // { loader: 'style-loader' },
            //MiniCssExtractPlugin.loader заменяет
            // { loader: 'css-loader' },
            // { loader: 'sass-loader' }
            //краткая запись use
            ...getStyleLoaders () ,
            'sass-loader'
            // можно комбинировать
            //use: [
            //  'style-loader' ,'css-loader' ,
            //   { loader: 'sass-loader', options: {...} }
            //]
          ]
        },
        // Loading images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },
        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     title: 'HELLO Sand',
    //     buildTime: new Date().toISOString(),
    //     template: 'public/index.html'
    //   }),
    //   new MiniCssExtractPlugin({
    //     filename: 'main-[hash:8].css'
    //   })
    // ],
    plugins: getPlugins(),

    devServer: {
      open: true
    }
  }
};
