export default async function Posts(){
  const res = await fetch('/api/posts', { next:{ revalidate: 60 } });
  const posts = await res.json();
  return (
    <main className="container">
      <h1>قائمة المشاركات</h1>
      <ul>{posts.map(p=> <li key={p.id}><a href={`/posts/${p.id}`}>{p.title}</a> • {p.date}</li>)}</ul>
    </main>
  )
}
