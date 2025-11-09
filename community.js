// DevSahara Advanced Community System
class CommunitySystem {
    constructor() {
        this.activeUsers = [];
        this.chatMessages = [];
        this.discussions = [];
        this.studyGroups = [];
        this.liveActivities = [];
        this.init();
    }

    init() {
        this.loadActiveUsers();
        this.loadChatMessages();
        this.loadDiscussions();
        this.loadStudyGroups();
        this.setupEventListeners();
        this.simulateRealTimeActivity();
        this.setupAdvancedFeatures();
    }

    // الحفاظ على الوظائف الحالية
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
        if (!container) return;
        
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
        if (!container) return;
        
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
            { 
                id: 1, 
                title: "Best practices for mobile apps in low-bandwidth areas", 
                replies: 24, 
                likes: 45, 
                user: "Samuel Nigeria",
                tags: ["mobile", "performance", "africa"],
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                liked: false
            },
            { 
                id: 2, 
                title: "How to handle multiple currencies in African e-commerce?", 
                replies: 18, 
                likes: 32, 
                user: "Wei China",
                tags: ["ecommerce", "payments", "currency"],
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                liked: false
            },
            { 
                id: 3, 
                title: "AI opportunities in healthcare for rural areas", 
                replies: 31, 
                likes: 67, 
                user: "Priya India",
                tags: ["ai", "healthcare", "innovation"],
                timestamp: new Date(Date.now() - 10800000).toISOString(),
                liked: false
            }
        ];

        this.renderDiscussions();
    }

    renderDiscussions() {
        const container = document.getElementById('discussions-list');
        if (!container) return;
        
        container.innerHTML = this.discussions.map(discussion => `
            <div class="discussion-card">
                <div class="discussion-header">
                    <h4>${discussion.title}</h4>
                    <span class="discussion-stats">
                        <span class="likes">❤️ ${discussion.likes}</span>
                        <span class="replies">💬 ${discussion.replies}</span>
                        <span class="views">👁️ ${Math.floor(discussion.likes * 2.5)}</span>
                    </span>
                </div>
                <div class="discussion-meta">
                    <span>By ${discussion.user}</span>
                    <span>•</span>
                    <span>${this.formatTime(discussion.timestamp)}</span>
                </div>
                <div class="discussion-tags">
                    ${discussion.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn" onclick="community.joinDiscussion(${discussion.id})">
                        <span>Join Discussion</span>
                    </button>
                    <button class="btn btn-secondary like-discussion" data-discussion-id="${discussion.id}">
                        <span>${discussion.liked ? '❤️ Liked' : '🤍 Like'}</span>
                    </button>
                </div>
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

            // تسجيل نشاط المجتمع للمكافآت
            this.recordCommunityActivity();
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

                // مكافأة نقاط للتواصل
                if (typeof gamification !== 'undefined') {
                    gamification.awardPoints(10, 'Community Connection');
                }
            } else {
                alert('Please login to connect with other developers!');
            }
        }
    }

    joinDiscussion(discussionId) {
        const discussion = this.discussions.find(d => d.id === discussionId);
        if (discussion) {
            auth.showNotification(`Joining discussion: ${discussion.title}`, 'success');
            
            // مكافأة نقاط للمشاركة
            if (typeof gamification !== 'undefined') {
                gamification.awardPoints(15, 'Discussion Participation');
            }
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

    // ========== الميزات الجديدة ==========

    setupAdvancedFeatures() {
        this.setupRealTimeUpdates();
        this.setupStudyGroups();
        this.setupDiscussionLikes();
    }

    setupRealTimeUpdates() {
        // تحديثات حية كل 30 ثانية
        setInterval(() => {
            this.updateLiveActivity();
        }, 30000);
    }

    setupStudyGroups() {
        this.loadStudyGroups();
        this.renderStudyGroups();
    }

    loadStudyGroups() {
        this.studyGroups = [
            {
                id: 1,
                name: 'React Masters',
                topic: 'Advanced React Patterns',
                members: 12,
                maxMembers: 20,
                level: 'intermediate',
                nextSession: new Date(Date.now() + 86400000).toISOString(),
                skills: ['React', 'JavaScript', 'Frontend']
            },
            {
                id: 2,
                name: 'Python Beginners',
                topic: 'Python Fundamentals',
                members: 8,
                maxMembers: 15,
                level: 'beginner',
                nextSession: new Date(Date.now() + 172800000).toISOString(),
                skills: ['Python', 'Programming', 'Algorithms']
            },
            {
                id: 3,
                name: 'Mobile Dev Africa',
                topic: 'Cross-platform Mobile Development',
                members: 15,
                maxMembers: 25,
                level: 'intermediate',
                nextSession: new Date(Date.now() + 259200000).toISOString(),
                skills: ['Flutter', 'React Native', 'Mobile']
            }
        ];
    }

    renderStudyGroups() {
        const container = document.getElementById('study-groups-list');
        if (!container) return;

        container.innerHTML = this.studyGroups.map(group => `
            <div class="study-group-card">
                <div class="group-header">
                    <h4>${group.name}</h4>
                    <span class="members-count">${group.members}/${group.maxMembers} 👥</span>
                </div>
                <p class="group-topic">${group.topic}</p>
                <div class="group-skills">
                    ${group.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="group-info">
                    <span class="level-badge">${group.level}</span>
                    <span class="next-session">Next: ${this.formatTime(group.nextSession)}</span>
                </div>
                <button class="btn join-study-group" data-group-id="${group.id}"
                        ${group.members >= group.maxMembers ? 'disabled' : ''}>
                    ${group.members >= group.maxMembers ? 'Full' : 'Join Group'}
                </button>
            </div>
        `).join('');
    }

    setupDiscussionLikes() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-discussion')) {
                const button = e.target.closest('.like-discussion');
                const discussionId = button.dataset.discussionId;
                this.likeDiscussion(discussionId);
            }
            
            if (e.target.closest('.join-study-group')) {
                const button = e.target.closest('.join-study-group');
                const groupId = button.dataset.groupId;
                this.joinStudyGroup(groupId);
            }
        });
    }

    likeDiscussion(discussionId) {
        const discussion = this.discussions.find(d => d.id == discussionId);
        if (discussion && !discussion.liked) {
            discussion.likes++;
            discussion.liked = true;
            this.renderDiscussions();
            
            // مكافأة نقاط للإعجاب
            if (typeof gamification !== 'undefined') {
                gamification.awardPoints(5, 'Discussion Like');
            }
        }
    }

    joinStudyGroup(groupId) {
        const group = this.studyGroups.find(g => g.id == groupId);
        if (group && group.members < group.maxMembers) {
            group.members++;
            auth.showNotification(`Joined ${group.name} study group!`, 'success');
            this.renderStudyGroups();

            // مكافأة نقاط للانضمام للمجموعة
            if (typeof gamification !== 'undefined') {
                gamification.awardPoints(20, 'Study Group Joined');
            }
        }
    }

    createNewDiscussion(title, content, tags) {
        if (!auth.currentUser) {
            alert('Please login to create a discussion!');
            return;
        }

        const newDiscussion = {
            id: Date.now(),
            title,
            content,
            user: auth.currentUser.name,
            replies: 0,
            likes: 0,
            tags: tags || ['general'],
            timestamp: new Date().toISOString(),
            liked: false
        };

        this.discussions.unshift(newDiscussion);
        this.renderDiscussions();
        
        auth.showNotification('Discussion created successfully!', 'success');

        // مكافأة نقاط لإنشاء مناقشة
        if (typeof gamification !== 'undefined') {
            gamification.awardPoints(25, 'New Discussion Created');
        }

        return newDiscussion;
    }

    createStudyGroup(name, topic, maxMembers, level, skills) {
        if (!auth.currentUser) {
            alert('Please login to create a study group!');
            return;
        }

        const newGroup = {
            id: Date.now(),
            name,
            topic,
            members: 1,
            maxMembers: parseInt(maxMembers),
            level,
            skills: skills || [],
            createdBy: auth.currentUser.name,
            nextSession: new Date(Date.now() + 86400000).toISOString()
        };

        this.studyGroups.push(newGroup);
        this.renderStudyGroups();
        
        auth.showNotification(`Study group "${name}" created!`, 'success');

        // مكافأة نقاط لإنشاء مجموعة دراسة
        if (typeof gamification !== 'undefined') {
            gamification.awardPoints(50, 'Study Group Created');
        }

        return newGroup;
    }

    updateLiveActivity() {
        const activities = [
            '👨‍💻 New developer just joined the community!',
            '💬 Discussion trending: "Mobile Development in Africa"',
            '🎯 Study group session starting in 15 minutes',
            '🚀 Project collaboration request posted',
            '🏆 Achievement unlocked: Community Helper'
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.displayLiveActivity(randomActivity);
    }

    displayLiveActivity(activity) {
        const container = document.getElementById('live-activities');
        if (!container) return;

        const activityElement = document.createElement('div');
        activityElement.className = 'live-activity';
        activityElement.innerHTML = `
            <span class="activity-dot"></span>
            <span>${activity}</span>
        `;

        container.appendChild(activityElement);
        
        // إزالة النشاط بعد 10 ثواني
        setTimeout(() => {
            if (activityElement.parentNode) {
                activityElement.remove();
            }
        }, 10000);
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
            { type: 'project_update', message: "A project just reached 10 contributors!" },
            { type: 'study_group', message: "New study group formed for React developers" }
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        auth.showNotification(activity.user || activity.title || activity.message, 'info');
    }

    recordCommunityActivity() {
        // تسجيل نشاط المجتمع للمكافآت
        if (typeof gamification !== 'undefined') {
            gamification.updateQuestProgress('community_engagement');
        }
    }

    findStudyPartners(skills, level) {
        return this.activeUsers.filter(user => 
            user.online &&
            user.skills.some(skill => skills.includes(skill)) &&
            this.getUserLevel(user) === level
        );
    }

    getUserLevel(user) {
        // محاكاة تحديد مستوى المستخدم بناءً على مهاراته
        const skillCount = user.skills.length;
        if (skillCount >= 5) return 'advanced';
        if (skillCount >= 3) return 'intermediate';
        return 'beginner';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    }

    setupEventListeners() {
        document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendCommunityMessage();
            }
        });

        // إضافة مستمعين للأزرار الجديدة
        document.getElementById('create-discussion-btn')?.addEventListener('click', () => {
            this.showCreateDiscussionModal();
        });

        document.getElementById('create-group-btn')?.addEventListener('click', () => {
            this.showCreateGroupModal();
        });
    }

    showCreateDiscussionModal() {
        const title = prompt('Enter discussion title:');
        if (title) {
            const tags = prompt('Enter tags (comma separated):', 'web, javascript, help');
            this.createNewDiscussion(title, '', tags ? tags.split(',').map(t => t.trim()) : []);
        }
    }

    showCreateGroupModal() {
        const name = prompt('Enter study group name:');
        if (name) {
            const topic = prompt('Enter group topic:');
            const maxMembers = prompt('Enter maximum members:', '15');
            const level = prompt('Enter required level (beginner/intermediate/advanced):', 'intermediate');
            this.createStudyGroup(name, topic, maxMembers, level);
        }
    }

    // دالة للحصول على إحصائيات المجتمع
    getCommunityStats() {
        return {
            totalUsers: this.activeUsers.length,
            onlineUsers: this.activeUsers.filter(u => u.online).length,
            totalDiscussions: this.discussions.length,
            totalStudyGroups: this.studyGroups.length,
            activeDiscussions: this.discussions.filter(d => d.replies > 0).length
        };
    }
}

// تهيئة نظام المجتمع
const community = new CommunitySystem();

// دوال عالمية للاستخدام في HTML
function sendCommunityMessage() {
    community.sendCommunityMessage();
}

function createNewDiscussion() {
    community.showCreateDiscussionModal();
}

function createStudyGroup() {
    community.showCreateGroupModal();
}

function joinStudyGroup(groupId) {
    community.joinStudyGroup(groupId);
                        }
