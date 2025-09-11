export default function handler(req, res){
  const posts = [{id:1,title:'نسب قبائل يافع وتاريخهم',date:'2019-06-08'},{id:2,title:'رواية الشهيد يحيى السنوار…',date:'2024-10-22'}];
  res.status(200).json(posts);
}
