const customJsonObject=(data,error,code)=>{
  return { data : data||'', error:error||'',code :code||200};
};

const dataJsonObject=(data)=>{
  return { data: data,code:200};
};
const postDataNotCorrectJsonObject = (message) => {
  return { error: message||'post data not correct',code:400};
};
const serverFailJsonObject = (message) =>{
  return { error: message||'server fail',code:500};
};

const notFoundJsonObject = (message) => {
  return { error: message||'not found', code: 404 };
};

const forbiddenJsonObject =(message) => {
  return { error: message||'resource forbidden', code: 403 };
};

const errorSelector = (error,res)=>{
  switch(error.name){
  case 'create':
    res.status(201).json(customJsonObject(error.data || 'success',null,201));
    break;
  case 'noerror':
    res.status(200).json(dataJsonObject(error.data||'success'));
    break;
  case 'SequelizeUniqueConstraintError':
    res.status(400).json(postDataNotCorrectJsonObject(error.message));
    break;
  case 'SequelizeValidationError':
    res.status(400).json(postDataNotCorrectJsonObject(error.message));
    break;
  default:
    res.status(500).json(serverFailJsonObject(error.message||'api request fail'));
  }
};

module.exports = {
  postDataNotCorrectJsonObject,
  customJsonObject,
  dataJsonObject,
  notFoundJsonObject,
  forbiddenJsonObject,
  errorSelector
};