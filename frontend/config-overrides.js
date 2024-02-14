const { override, addBabelPlugin, addWebpackModuleRule, addWebpackPlugin } = require('customize-cra');
const CircularDependencyPlugin = require('circular-dependency-plugin');

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
    ),
    addWebpackPlugin(
        new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
          exclude: /a\.js|node_modules/,
          // include specific files based on a RegExp
          include: /dir/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // allow import cycles that include an asyncronous import,
          // e.g. via import(/* webpackMode: "weak" */ './file.js')
          allowAsyncCycles: false,
          // set the current working directory for displaying module paths
          cwd: process.cwd()
        })
    )
);
