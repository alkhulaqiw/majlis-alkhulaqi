export default async function PostPage({ params }){
  const id = params.id;
  const res = await fetch(`/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) return <div>تعذر تحميل الموضوع</div>;
  const post = await res.json();
  return (
    <main className="container">
      <a href="/posts">◀ رجوع</a>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </main>
  )
}
