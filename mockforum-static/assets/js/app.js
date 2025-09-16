// assets/js/app.js

// بيانات المشاركات
const postsData = [
    {
        id: 1,
        title: "الإبداع في زمن الرتابة",
        author: "أحمد محمد",
        content: "الإبداع ليس فقط عن إنتاج شيء جديد، بل أيضاً عن النظر للأشياء من زاوية مختلفة...",
        likes: 15,
        comments: [
            {
                id: 1,
                author: "سارة علي",
                content: "مقال رائع ومفيد جداً",
                date: "2024-01-16"
            }
        ]
    }
];

// عرض المشاركات
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'card';
        postElement.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${post.title}</h3>
                <span class="author">بقلم: ${post.author}</span>
            </div>
            <div class="card-content">
                <p>${post.content}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="viewPost(${post.id})">
                    قراءة المزيد
                </button>
                <button class="btn btn-outline" onclick="likePost(${post.id})">
                    إعجاب (${post.likes})
                </button>
                <button class="btn btn-success" onclick="showComments(${post.id})">
                    تعليقات (${post.comments.length})
                </button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// عرض التعليقات
function showComments(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
