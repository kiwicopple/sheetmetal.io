// next.config.js
require('custom-env').env(true)
const path = require('path')
const withPlugins = require('next-compose-plugins')

// Next Config
const nextConfig = {
  experimental: { publicDirectory: true },
  env: {
    BASE_URL: process.env.BASE_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
  },
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname, '')
    return config
  },
}

// SASS
const withSass = require('@zeit/next-sass')
const withSassConfig = {
  sassLoaderOptions: {
    includePaths: ['./', 'absolute/path/b'],
  },
}

// Export all config
module.exports = withPlugins([[withSass, withSassConfig]], nextConfig)

// const path = require('path')
// const DOT_ENV_FILE =
//   process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '.env.production')
//     : path.join(__dirname, '.env')

// const withSass = require('@zeit/next-sass')
// const Dotenv = require('dotenv-webpack')
// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
// })

// module.exports = withMDX(
//   withSass({
//     pageExtensions: ['js', 'jsx', 'mdx'],
//     webpack: (config, { isServer, buildId }) => {
//       config.plugins = config.plugins || []
//       config.plugins = [
//         ...config.plugins,

//         // Read the .env file
//         new Dotenv({
//           path: DOT_ENV_FILE,
//           systemvars: true,
//         }),
//       ]

//       return config
//     },
//   })
// )
