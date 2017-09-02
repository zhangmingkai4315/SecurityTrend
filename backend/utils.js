exports.customJsonObject=(data,error,code)=>{
  return { data : data||'', error:error||'',code :code||200}
}

exports.dataJsonObject=(data)=>{
  return { data: data,code:200}
}
exports.postDataNotCorrectJsonObject = (message) => {
  return { error: message||'post data not correct',code:400}
}
exports.serverFailJsonObject = (message) =>{
  return { error: message||'server fail',code:500}
}

exports.notFoundJsonObject = (message) => {
  return { error: message||'not found', code: 404 }
}

exports.forbiddenJsonObject =(message) => {
  return { error: message||'resource forbidden', code: 403 }
}