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
              'Route': './src/route',
              'Query': './src/query'
            }
          }
        ]
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
                // eslint-disable-next-line max-len
                additionalData: '@import "./src/style/main.scss"; @import "react-notifications/lib/notifications.css"; @import "react-tooltip/dist/react-tooltip.css";'
              }
            }
          ]
        }
    )
);
