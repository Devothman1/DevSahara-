// DevSahara Community System
class CommunitySystem {
    constructor() {
        this.activeUsers = [];
        this.chatMessages = [];
        this.discussions = [];
        this.init();
    }

    init() {
        this.loadActiveUsers();
        this.loadChatMessages();
        this.loadDiscussions();
        this.setupEventListeners();
        this.simulateRealTimeActivity();
    }

    loadActiveUsers() {
        // بيانات نموذجية للأعضاء النشطين
        this.activeUsers = [
            { id: 1, name: "Ahmed Morocco", country: "ma", skills: ["JavaScript", "React", "Node.js"], online: true, avatar: "👨‍💻" },
            { id: 2, name: "Fatima Algeria", country: "dz", skills: ["Python", "Django", "AI/ML"], online: true, avatar: "👩‍💻" },
            { id: 3, name: "John Kenya", country: "ke", skills: ["Java", "Spring", "Android"], online: true, avatar: "👨‍💻" },
            { id: 4, name: "Wei China", country: "cn", skills: ["Python", "TensorFlow", "Data Science"], online: false, avatar: "👩‍💻" },
            { id: 5, name: "Priya India", country: "in", skills: ["React", "Vue", "Frontend"], online: true, avatar: "👩‍💻" },
            { id: 6, name: "Samuel Nigeria", country: "ng", skills: ["PHP", "Laravel", "Backend"], online: true, avatar: "👨‍💻" }
        ];

        this.renderActiveUsers();
    }

    renderActiveUsers() {
        const container = document.getElementById('active-users');
        container.innerHTML = this.activeUsers.map(user => `
            <div class="user-card">
                ${user.online ? '<div class="user-online"></div>' : ''}
                <div class="user-avatar">${user.avatar}</div>
                <h4>${user.name}</h4>
                <p>${this.getCountryName(user.country)}</p>
                <div style="margin: 0.5rem 0;">
                    ${user.skills.slice(0, 2).map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
                <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;" 
                        onclick="community.connectWithUser(${user.id})">
                    <span>Connect</span>
                </button>
            </div>
        `).join('');
    }

    loadChatMessages() {
        // رسائل دردشة نموذجية
        this.chatMessages = [
            { id: 1, user: "Ahmed Morocco", message: "Anyone working on fintech projects? Need some advice!", time: "2 min ago" },
            { id: 2, user: "Fatima Algeria", message: "I'm building a payment integration for African markets. Happy to help!", time: "1 min ago" },
            { id: 3, user: "John Kenya", message: "Has anyone used Flutter for cross-platform apps in Africa?", time: "Just now" }
        ];

        this.renderChatMessages();
    }

    renderChatMessages() {
        const container = document.getElementById('chat-messages');
        container.innerHTML = this.chatMessages.map(msg => `
            <div class="message ${msg.user.includes('Ahmed') ? 'own' : 'other'}">
                <strong>${msg.user}</strong>
                <p>${msg.message}</p>
                <small>${msg.time}</small>
            </div>
        `).join('');

        // التمرير للأسفل
        container.scrollTop = container.scrollHeight;
    }

    loadDiscussions() {
        // مناقشات نشطة
        this.discussions = [
            { id: 1, title: "Best practices for mobile apps in low-bandwidth areas", replies: 24, likes: 45, user: "Samuel Nigeria" },
            { id: 2, title: "How to handle multiple currencies in African e-commerce?", replies: 18, likes: 32, user: "Wei China" },
            { id: 3, title: "AI opportunities in healthcare for rural areas", replies: 31, likes: 67, user: "Priya India" }
        ];

        this.renderDiscussions();
    }

    renderDiscussions() {
        const container = document.getElementById('discussions-list');
        container.innerHTML = this.discussions.map(discussion => `
            <div class="project-card">
                <h4>${discussion.title}</h4>
                <div class="project-stats">
                    <span>💬 ${discussion.replies} replies</span>
                    <span>❤️ ${discussion.likes} likes</span>
                    <span>👤 ${discussion.user}</span>
                </div>
                <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;" 
                        onclick="community.joinDiscussion(${discussion.id})">
                    <span>Join Discussion</span>
                </button>
            </div>
        `).join('');
    }

    sendCommunityMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message && auth.currentUser) {
            const newMessage = {
                id: this.chatMessages.length + 1,
                user: auth.currentUser.name,
                message: message,
                time: "Just now"
            };
            
            this.chatMessages.push(newMessage);
            this.renderChatMessages();
            input.value = '';
            
            // محاكاة ردود المجتمع
            setTimeout(() => {
                this.simulateCommunityResponse(message);
            }, 2000);
        } else if (!auth.currentUser) {
            alert('Please login to send messages!');
        }
    }

    simulateCommunityResponse(userMessage) {
        const responses = [
            "That's a great question! I've worked on something similar.",
            "In my experience, the best approach is...",
            "Has anyone tried this with different frameworks?",
            "I can share some resources that might help.",
            "Let me connect you with someone who knows more about this."
        ];
        
        const randomUser = this.activeUsers[Math.floor(Math.random() * this.activeUsers.length)];
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const newMessage = {
            id: this.chatMessages.length + 1,
            user: randomUser.name,
            message: response,
            time: "Just now"
        };
        
        this.chatMessages.push(newMessage);
        this.renderChatMessages();
    }

    connectWithUser(userId) {
        const user = this.activeUsers.find(u => u.id === userId);
        if (user) {
            if (auth.currentUser) {
                auth.showNotification(`Connection request sent to ${user.name}!`, 'success');
                
                // إضافة إلى قائمة الاتصالات
                if (!auth.currentUser.connections) {
                    auth.currentUser.connections = [];
                }
                auth.currentUser.connections.push(userId);
                auth.updateUser(auth.currentUser);
            } else {
                alert('Please login to connect with other developers!');
            }
        }
    }

    joinDiscussion(discussionId) {
        const discussion = this.discussions.find(d => d.id === discussionId);
        if (discussion) {
            auth.showNotification(`Joining discussion: ${discussion.title}`, 'success');
            // يمكن توجيه المستخدم لصفحة المناقشة التفصيلية
        }
    }

    getCountryName(code) {
        const countries = {
            'ma': 'Morocco 🇲🇦', 'dz': 'Algeria 🇩🇿', 'tn': 'Tunisia 🇹🇳', 'eg': 'Egypt 🇪🇬',
            'ng': 'Nigeria 🇳🇬', 'ke': 'Kenya 🇰🇪', 'za': 'South Africa 🇿🇦', 'sn': 'Senegal 🇸🇳',
            'in': 'India 🇮🇳', 'pk': 'Pakistan 🇵🇰', 'cn': 'China 🇨🇳', 'jp': 'Japan 🇯🇵',
            'kr': 'Korea 🇰🇷', 'sa': 'Saudi Arabia 🇸🇦', 'ae': 'UAE 🇦🇪'
        };
        return countries[code] || 'Unknown Country';
    }

    simulateRealTimeActivity() {
        // محاكاة النشاط في الوقت الحقيقي
        setInterval(() => {
            this.addRandomActivity();
        }, 30000); // كل 30 ثانية
    }

    addRandomActivity() {
        const activities = [
            { type: 'user_online', user: "New developer joined the community!" },
            { type: 'new_discussion', title: "New discussion started about blockchain in Africa" },
            { type: 'project_update', message: "A project just reached 10 contributors!" }
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        auth.showNotification(activity.user || activity.title || activity.message, 'info');
    }

    setupEventListeners() {
        document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendCommunityMessage();
            }
        });
    }
}

// تهيئة نظام المجتمع
const community = new CommunitySystem();

// دالة عالمية للدردشة
function sendCommunityMessage() {
    community.sendCommunityMessage();
  }
