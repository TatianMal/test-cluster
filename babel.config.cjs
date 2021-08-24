module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };
  /* TODO: разобраться, почему работает только cjs
  https://stackoverflow.com/questions/61146112/error-while-loading-config-you-appear-to-be-using-a-native-ecmascript-module-c
  https://jestjs.io/ru/docs/configuration
  */