module.exports = {
  "roots": ["<rootDir>/src", "<rootDir>/tests"],
  "testEnvironment": "node",
  "moduleNameMapper": {
    "^.+\\.s?css$": "identity-obj-proxy",
    "^~/design/(.*)$": "@melonproject/manager-components/src/design/$1",
    "^~/blocks/(.*)$": "@melonproject/manager-components/src/blocks/$1",
    "^~/components/(.*)$": "@melonproject/manager-components/src/components/$1",
    "^~/containers/(.*)$": "@melonproject/manager-components/src/containers/$1",
    "^~/utils/(.*)$": "@melonproject/manager-components/src/utils/$1",
    "^@melonproject/melon\\.js$": "@melonproject/melon.js/lib"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFiles": [
    require.resolve("./jest.setup"),
  ],
  "transform": {
    "^.+\\.(jsx?|tsx?)$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!@melonproject/)"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json",
      "useBabelrc": true
    }
  }
};
