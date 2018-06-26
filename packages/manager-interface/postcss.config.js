const postcssPresetEnv = require('postcss-preset-env');
const variables = require('../manager-components/src/design/variables');
const medias = require('../manager-components/src/design/medias');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
          variables: variables
        },
        'custom-media-queries': {
          extensions: medias
        }
      },
    }),
  ],
};
