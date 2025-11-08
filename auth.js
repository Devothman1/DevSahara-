// DevSahara Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('devsahara_users')) || [];
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupEventListeners();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Register form
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register();
        });
    }

    login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('devsahara_current_user', JSON.stringify(user));
            this.showNotification('Welcome back, ' + user.name + '!', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        } else {
            this.showNotification('Invalid email or password!', 'error');
        }
    }

    register() {
        const user = {
            id: this.generateId(),
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value,
            country: document.getElementById('register-country').value,
            skills: document.getElementById('register-skills').value.split(',').map(s => s.trim()),
            joined: new Date().toISOString(),
            avatar: this.generateAvatar(),
            bio: '',
            projects: [],
            connections: []
        };

        if (this.users.find(u => u.email === user.email)) {
            this.showNotification('User with this email already exists!', 'error');
            return;
        }

        this.users.push(user);
        this.currentUser = user;
        
        localStorage.setItem('devsahara_users', JSON.stringify(this.users));
        localStorage.setItem('devsahara_current_user', JSON.stringify(user));
        
        this.showNotification('Account created successfully! Welcome to DevSahara!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('devsahara_current_user');
        this.showNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('devsahara_current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    updateNavigation() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        if (this.currentUser) {
            // إذا كان المستخدم مسجل الدخول
            const userLinks = `
                <a href="profile.html">👤 Profile</a>
                <a href="community.html">👥 Community</a>
                <a href="#" onclick="auth.logout()">🚪 Logout</a>
            `;
            nav.innerHTML = nav.innerHTML.replace(/<a href="auth\.html".*?<\/a>/, userLinks);
        }
    }

    generateId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    generateAvatar() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.currentUser?.name || 'User')}&background=${color.replace('#', '')}&color=fff&size=200`;
    }

    showNotification(message, type = 'info') {
        // إنشاء إشعار
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.background = 'var(--accent-color)';
        } else {
            notification.style.background = 'var(--primary-color)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// دالات المساعدة للتبويب
function showTab(tabName) {
    // إخفاء جميع النماذج
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // إخفاء جميع ألسنة التبويب
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // إظهار النموذج المحدد
    document.getElementById(tabName + '-form').classList.add('active');
    event.target.classList.add('active');
}

// تهيئة نظام المصادقة
const auth = new AuthSystem();

// جعل النظام متاحاً globally
window.auth = auth;
