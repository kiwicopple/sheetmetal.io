// next.config.js
require('custom-env').env(true)
const path = require('path')
const DOT_ENV_FILE =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '.env.production')
    : path.join(__dirname, '.env')

const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX(
  withSass({
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
      ]

      return config
    },
  })
)
