import { NextResponse } from 'next/server'
const posts = [
  { id:1, title:'نسب قبائل يافع وتاريخهم', date:'2019-06-08', author:'مستخدم1', body:'<p>محتوى...</p>' },
  { id:2, title:'رواية الشهيد يحيى السنوار…', date:'2024-10-22', author:'كاتب2', body:'<p>محتوى...</p>' }
]
export async function GET(req){
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const last = parts[parts.length-1];
  if(last && last !== 'posts'){
    const p = posts.find(x=>String(x.id)===String(last));
    if(!p) return NextResponse.json({error:'Not found'},{status:404});
    return NextResponse.json(p);
  }
  return NextResponse.json(posts);
}
