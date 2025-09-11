export default async function Home(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, { next:{ revalidate: 60 } });
  const posts = await res.json();
  return (
    <main className="container">
      <section className="recent">
        <h3>المشاركات الأخيرة</h3>
        <ul>{posts.slice(0,6).map(p=> <li key={p.id}><a href={`/posts/${p.id}`}>{p.title}</a> • {p.date}</li>)}</ul>
      </section>
    </main>
  )
}
