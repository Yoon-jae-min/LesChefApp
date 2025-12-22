module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias:{
          '@styles': './src/styles',
          '@utils': './src/utils',
        }
      }
    ],'react-native-reanimated/plugin'
  ],
};
