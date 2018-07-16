require('dotenv-extended').config();

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const withTypeScript = require('@zeit/next-typescript');
const withQueryFiles = require('./config/withQueryFiles');
const withLinkedDependencies = require('./config/withLinkedDependencies');

const withComposedConfig = R.compose(
  withLinkedDependencies,
  withQueryFiles,
  withTypeScript,
);

const ownPkg = require('./package.json');
const melonJsPkg = require('@melonproject/melon.js/package.json');
const smartContractsPkg = require('@melonproject/smart-contracts/package.json');

const managerComponents = path.resolve(
  path.dirname(require.resolve('../manager-components/package.json')),
);

const isElectron = JSON.parse(process.env.ELECTRON || 'false');

module.exports = withComposedConfig({
  typescriptLoaderOptions: {
    // We have to specify this explicitly so the ts-loader does
    // not incorrectly use one of the linked package's tsconfig.json
    // when only compiling individual file e.g. during
    // hot-module-replacement.
    configFile: path.resolve(__dirname, 'tsconfig.json'),
  },
  linkedDependencies: [
    ['@melonproject/melon.js', 'lib'],
    ['@melonproject/graphql-schema', 'src'],
    ['@melonproject/manager-components', 'src'],
    ['@melonproject/exchange-aggregator', 'src'],
  ],
  distDir: path.join('..', 'build', isElectron ? 'app' : 'web', 'bundle'),
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: (config, options) => {
    const src = path.resolve(__dirname, 'src');
    const transport = isElectron
      ? './withApollo.ipc.ts'
      : './withApollo.remote.ts';

    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      '~/apollo': path.join(src, 'shared', 'wrappers', transport),
      '~/blocks': path.join(managerComponents, 'src', 'blocks'),
      '~/components': path.join(managerComponents, 'src', 'components'),
      '~/design': path.join(managerComponents, 'src', 'design'),
      '~/legacy': path.join(src, 'legacy'),
      '~/shared': path.join(src, 'shared'),
    });

    // Make process.env.DEBUG accessible so we can use the debug package
    // to print debug messages even in a web worker which does not have
    // access to the default lookup strategy of the debug package (local storage).
    config.plugins.push(new webpack.EnvironmentPlugin(['DEBUG']));

    config.plugins.push(
      new webpack.DefinePlugin({
        __MANAGER_INTERFACE_VERSION__: JSON.stringify(ownPkg.version),
        __MELON_JS_VERSION__: JSON.stringify(melonJsPkg.version),
        __SMART_CONTRACTS_VERSION__: JSON.stringify(smartContractsPkg.version),
      }),
    );

    if (!options.isServer) {
      config.plugins.push(
        new CopyWebpackPlugin([
          {
            context: path.join(__dirname, '../manager-components/public/static/'),
            from: '**/*',
            to: path.join(__dirname, 'src/static/')
          },
        ]),
      );
    }

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext].js',
          },
        },
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              ['styled-jsx/babel', { plugins: ['styled-jsx-plugin-postcss'] }],
            ],
          },
        },
        'styled-jsx-css-loader',
      ],
    });

    if (isElectron) {
      // Code splitting doesn't make much sense in an electron app.
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      );
    }

    return config;
  },
  assetPrefix: './',
});
