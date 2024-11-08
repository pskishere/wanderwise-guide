import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'taro-app',
  date: '2024-3-14',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024
        }
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
})