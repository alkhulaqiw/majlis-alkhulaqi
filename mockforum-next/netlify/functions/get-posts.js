exports.handler = async function(event, context){
  const posts = [{id:1,title:'نسب قبائل يافع وتاريخهم',date:'2019-06-08'},{id:2,title:'رواية الشهيد يحيى السنوار…',date:'2024-10-22'}];
  return { statusCode:200, body: JSON.stringify(posts) };
}
