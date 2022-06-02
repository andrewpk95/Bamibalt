const env = process.env.NODE_ENV;

// eslint-disable-next-line
module.exports = require(`./webpack.config.${env}`)
