const { override, addBabelPlugin, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    addBabelPlugin(
        [
          'module-resolver',
          {
            'root': ['./'],
            'alias': {
              'Component': './src/component',
              'Store': './src/store',
              'Style': './src/style',
              'Type': './src/type',
              'Util': './src/util',
            },
          },
        ],
    ),
    addWebpackModuleRule(
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "./src/style/main.scss";',
              },
            },
          ],
        },
    ),
);
