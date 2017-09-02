const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json');

config_env = _.assign({},config[env],config['base'])
module.exports = config_env;