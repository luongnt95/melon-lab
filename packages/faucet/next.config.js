require('dotenv-extended').config();

const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const withTypeScript = require('@zeit/next-typescript');
const withLinkedDependencies = require('./config/withLinkedDependencies');

const withComposedConfig = R.compose(withLinkedDependencies, withTypeScript);

module.exports = withComposedConfig({
  linkedDependencies: [['@melonproject/melon.js', 'lib']],
  distDir: '../dist',
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
