const defaults = require('../../jest.config.js');

module.exports = Object.assign({}, defaults, {
  testEnvironment: 'jsdom',
});
