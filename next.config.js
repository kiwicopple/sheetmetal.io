// next.config.js
const path = require('path')
const DOT_ENV_FILE =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '.env.prod')
    : path.join(__dirname, '.env')

require('dotenv').config({ path: DOT_ENV_FILE })
const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')

module.exports = withSass({
  webpack: config => {
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
