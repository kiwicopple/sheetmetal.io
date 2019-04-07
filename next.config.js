// next.config.js
const path = require('path')
const DOT_ENV_FILE =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '.env.prod')
    : path.join(__dirname, '.env')
require('dotenv').config({ path: DOT_ENV_FILE })

const nextSourceMaps = require('@zeit/next-source-maps')()
const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX(
  withSass(
    nextSourceMaps({
      pageExtensions: ['js', 'jsx', 'mdx'],
      webpack: (config, { isServer, buildId }) => {
        config.plugins = config.plugins || []
        config.plugins = [
          ...config.plugins,

          // Read the .env file
          new Dotenv({
            path: DOT_ENV_FILE,
            systemvars: true,
          }),
          new webpack.DefinePlugin({
            'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
          }),
        ]

        if (!isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        return config
      },
    })
  )
)
