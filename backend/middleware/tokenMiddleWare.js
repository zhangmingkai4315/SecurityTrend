const jwt = require('jsonwebtoken');
const i18n = require('i18n');
const config = require('../config');
const utils = require('../utils');

const tokenMiddleWare=(req,res,next)=>{
  let token = '';
  try{
    token = (req.body && req.body.access_token) ||
      (req.query && req.query.access_token) ||
      req.headers['x-access-token'];
    if(token=='' || typeof token === 'undefined'){
      throw new Error(__('Token not exist'));
    }
  }catch(err){
    res.status(403).json(utils.forbiddenJsonObject(err.message));
    return;
  }
  try {
    let decoded = jwt.decode(token, config['secrect']);
    if (decoded.exp <= (Date.now()/1000)) {
      res.status(403).json(utils.forbiddenJsonObject(__('Token has expired')));
      return;
    }
    req.user = decoded.user;
    // handle token here
    return next();
  } catch (err) {
    res.status(500).json(utils.serverFailJsonObject(__('Token decode fail')));
    return;
  }
};
module.exports = tokenMiddleWare;