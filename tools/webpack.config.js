// import webpack from 'webpack';
import path from 'path';

const config = {
  target: 'node',
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'myEthWallet-bot.js',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) && !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

export default config;
