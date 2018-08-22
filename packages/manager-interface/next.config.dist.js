require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

const path = require('path');

module.exports = {
  distDir: path.join('..', 'build'),
};
