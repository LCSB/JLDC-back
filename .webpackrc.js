const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  proxy: {
    "/api/*": {
      target: "http://192.144.129.105/",
    },
  },
  alias: {
    'components': path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
