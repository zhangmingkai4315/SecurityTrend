const customJsonObject=(data,error,code)=>{
  return { data : data||'', error:error||'',code :code||200};
};

const dataJsonObject=(data)=>{
  return { data: data,code:200};
};
const postDataNotCorrectJsonObject = (message) => {
  return { error: message||__('Post data not correct'),code:400};
};
const serverFailJsonObject = (message) =>{
  return { error: message||__('Server fail'),code:500};
};

const notFoundJsonObject = (message) => {
  return { error: message||__('Not found'), code: 404 };
};

const forbiddenJsonObject =(message) => {
  return { error: message||__('Resource access forbidden'), code: 403 };
};

const errorSelector = (error,res)=>{
  switch(error.name){
  case 'create':
    res.status(201).json(customJsonObject(error.data ||__('Create data success'),null,201));
    break;
  case 'noerror':
    res.status(200).json(dataJsonObject(error.data||__('Api request success')));
    break;
  case 'SequelizeUniqueConstraintError':
    res.status(400).json(postDataNotCorrectJsonObject(__('Unique validation error')));
    break;
  case 'SequelizeValidationError':
    res.status(400).json(postDataNotCorrectJsonObject(__('Data validation error')));
    break;
  default:
    res.status(500).json(serverFailJsonObject(error.message||__('Api request fail')));
  }
};

module.exports = {
  postDataNotCorrectJsonObject,
  customJsonObject,
  dataJsonObject,
  serverFailJsonObject,
  notFoundJsonObject,
  forbiddenJsonObject,
  errorSelector
};