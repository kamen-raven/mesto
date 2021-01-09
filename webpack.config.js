const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагина работы с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин отчистки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = { // module.exports — это синтаксис экспорта в Node.js
  entry: {
    main: './src/pages/index.js'
  }, // указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: 'main.js',
    publicPath: ''
  }, // указали в какой файл будет собираться весь js и дали ему имя
  mode: 'development', // добавили режим разработчика
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
        // регулярное выражение, которое ищет все файлы с такими расширениями
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        }
      },
      // добавьте правило к CSS-файлам
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // добавьте объект options
          options: { importLoaders: 1 }
        },
          // Добавьте postcss-loader
        'postcss-loader']
      }
    ]
  },
  devtool: "source-map",
  plugins: [  // добавьте массив
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
};


