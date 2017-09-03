const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json');
const config_env = _.assign({},config[env],config['base']);
config_env['env']=env;
module.exports = config_env;