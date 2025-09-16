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
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    modal.innerHTML = `
        <div class="card" style="width: 90%; max-width: 600px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3>التعليقات على: ${post.title}</h3>
                <button class="btn btn-danger" onclick="this.parentElement.parentElement.parentElement.remove()">
                    ×
                </button>
            </div>
            
            <div id="comments-list-${postId}">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <div class="comment-header">
                            <span class="comment-author">${comment.author}</span>
                            <span class="comment-date">${formatDate(comment.date)}</span>
                        </div>
                        <div class="comment-content">${comment.content}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="comment-form">
                <h4>أضف تعليقك</h4>
                <div class="form-group">
                    <input type="text" id="comment-author-${postId}" placeholder="اسمك" class="form-input">
                </div>
                <div class="form-group">
                    <textarea id="comment-content-${postId}" placeholder="تعليقك..." class="form-textarea"></textarea>
                </div>
                <button class="btn btn-primary" onclick="addComment(${postId})">إرسال التعليق</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// إضافة تعليق
function addComment(postId) {
    const authorInput = document.getElementById(`comment-author-${postId}`);
    const contentInput = document.getElementById(`comment-content-${postId}`);
    
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!author || !content) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    
    const newComment = {
        id: Date.now(),
        author: author,
        content: content,
        date: new Date().toISOString().split('T')[0]
    };
    
    post.comments.push(newComment);
    
    // تحديث العرض
    const commentsList = document.getElementById(`comments-list-${postId}`);
    if (commentsList) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${newComment.author}</span>
                <span class="comment-date">${formatDate(newComment.date)}</span>
            </div>
            <div class="comment-content">${newComment.content}</div>
        `;
        commentsList.appendChild(commentElement);
    }
    
    // مسح الحقول
    authorInput.value = '';
    contentInput.value = '';
}

// إعجاب بالمنشور
function likePost(postId) {
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.likes = (post.likes || 0) + 1;
        
        // تحديث الزر
        const likeButton = event.target;
        likeButton.textContent = `إعجاب (${post.likes})`;
        likeButton.classList.add('pulse');
        
        setTimeout(() => {
            likeButton.classList.remove('pulse');
        }, 1000);
    }
}

// تنسيق التاريخ
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
}

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayPosts(postsData);
});
