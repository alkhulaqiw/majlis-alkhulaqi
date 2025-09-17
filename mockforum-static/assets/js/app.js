sts(postsData);
});// ================================
// مجلس الخلاقي - app.js معدّل بالكامل
// ================================

console.log('مجلس الخلاقي: النظام التفاعلي قيد التشغيل ✅');

// ================================
// 1. تحميل وعرض المنشورات
// ================================

function loadPosts() {
    const container = document.getElementById('posts-container');
    if (!container) {
        console.warn('لم يتم العثور على عنصر #posts-container');
        return;
    }

    // عرض رسالة تحميل
    container.innerHTML = `
        <div class="loading" style="text-align: center; padding: 2rem; font-family: system-ui;">
            🌙 جاري تحميل المنشورات...
        </div>
    `;

    fetch('api/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل تحميل المنشورات — تأكد من تشغيل الخادم المحلي');
            }
            return response.json();
        })
        .then(posts => {
            if (!Array.isArray(posts) || posts.length === 0) {
                throw new Error('لا توجد منشورات في الملف');
            }

            container.innerHTML = posts.map(post => `
                <div class="post-card" style="
                    background: var(--card-bg, #ffffff);
                    border: 1px solid var(--border-color, #e1e1e1);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin: 1rem 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                ">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--text-color, #333);">${post.title}</h3>
                    <p style="color: var(--text-secondary, #666); line-height: 1.6;">
                        ${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}
                    </p>
                    <div class="post-meta" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 1rem;
                        font-size: 0.9rem;
                        color: var(--text-secondary, #888);
                    ">
                        <span>👤 ${post.author || 'مجهول'}</span>
                        <span>📅 ${post.date || 'تاريخ غير محدد'}</span>
                        <button class="like-btn" data-id="${post.id}" style="
                            background: var(--accent-color, #007bff);
                            color: white;
                            border: none;
                            padding: 0.4rem 1rem;
                            border-radius: 20px;
                            cursor: pointer;
                            font-weight: bold;
                        ">👍 ${post.likes || 0}</button>
                    </div>
                </div>
            `).join('');

            // ربط أزرار الإعجاب
            document.querySelectorAll('.like-btn').forEach(button => {
                button.addEventListener('click', function() {
                    let count = parseInt(this.textContent.split(' ')[1]) || 0;
                    count++;
                    this.textContent = `👍 ${count}`;
                    this.style.background = '#28a745';

                    // تخزين مؤقت في localStorage (تجريبي — لا يحفظ على الخادم)
                    const postId = this.getAttribute('data-id');
                    localStorage.setItem(`post_like_${postId}`, count);
                });
            });

        })
        .catch(error => {
            console.error('❌ خطأ:', error);
            container.innerHTML = `
                <div class="error-message" style="
                    padding: 2rem;
                    background: #fff3f3;
                    border: 2px dashed #ff6b6b;
                    color: #d63031;
                    border-radius: 12px;
                    text-align: center;
                    font-family: system-ui;
                    line-height: 1.6;
                ">
                    <h3 style="margin: 0 0 1rem 0;">⚠️ عذرًا، لا يمكن تحميل المنشورات</h3>
                    <p><strong>السبب:</strong> ${error.message}</p>
                    <p><strong>الحل المقترح:</strong></p>
                    <ul style="text-align: left; display: inline-block; margin: 1rem auto;">
                        <li>شغّل الخادم المحلي باستخدام: <code>python -m http.server 8000</code></li>
                        <li>افتح الموقع عبر: <a href="http://localhost:8000" style="color: #007bff;">http://localhost:8000</a></li>
                        <li>تأكد من وجود ملف <code>api/posts.json</code></li>
                    </ul>
                </div>
            `;
        });
}

// ================================
// 2. تبديل الوضع الليلي/النهاري
// ================================

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);

    // تحديث المتغيرات اللونية
    if (isDark) {
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#aaaaaa');
        document.documentElement.style.setProperty('--card-bg', '#1e1e1e');
        document.documentElement.style.setProperty('--border-color', '#333333');
        document.documentElement.style.setProperty('--accent-color', '#0d6efd');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#333333');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#e1e1e1');
        document.documentElement.style.setProperty('--accent-color', '#007bff');
    }
}

// استعادة الوضع المحفوظ
function restoreDarkMode() {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
        document.body.classList.add('dark-mode');
        toggleDarkMode(); // لتشغيل التحديث اللوني
    }
}

// ================================
// 3. بدء التشغيل عند تحميل الصفحة
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ بدء تهيئة واجهة مجلس الخلاقي');

    // تحميل المنشورات
    loadPosts();

    // استعادة الوضع الليلي إن وُجد
    restoreDarkMode();

    // ربط زر تبديل الوضع (إن وُجد)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // إذا لم يكن هناك زر، يمكن إنشاء واحد تلقائيًا (اختياري)
    if (!darkModeToggle && !document.querySelector('.dark-mode-toggle-auto')) {
        const autoToggle = document.createElement('button');
        autoToggle.textContent = '🌙/☀️';
        autoToggle.className = 'dark-mode-toggle-auto';
        autoToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: var(--accent-color, #007bff);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        autoToggle.addEventListener('click', toggleDarkMode);
        document.body.appendChild(autoToggle);
    }
});

// ================================
// ✅ النظام جاهز للعمل!
// ================================
