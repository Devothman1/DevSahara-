// DevSahara Advanced Gamification System
class GamificationSystem {
    constructor() {
        this.levels = {};
        this.achievements = {};
        this.leaderboard = [];
        this.quests = [];
        this.init();
    }

    async init() {
        await this.loadGameData();
        this.setupDailyQuests();
        this.setupEventListeners();
    }

    async loadGameData() {
        this.levels = {
            1: { name: 'Code Novice', points: 0, badge: '🟢' },
            2: { name: 'Script Kiddie', points: 100, badge: '🔵' },
            3: { name: 'Junior Developer', points: 300, badge: '🟣' },
            4: { name: 'Full Stack', points: 600, badge: '🟠' },
            5: { name: 'Tech Lead', points: 1000, badge: '🔴' }
        };

        this.achievements = {
            'first_code': {
                name: 'First Steps',
                description: 'Run your first code snippet',
                icon: '👣',
                points: 50,
                rarity: 'common'
            },
            'quick_learner': {
                name: 'Quick Learner',
                description: 'Complete 5 lessons in one day',
                icon: '⚡',
                points: 100,
                rarity: 'rare'
            },
            'community_helper': {
                name: 'Community Helper',
                description: 'Help 10 other developers',
                icon: '🤝',
                points: 200,
                rarity: 'epic'
            }
        };

        this.quests = this.generateDailyQuests();
    }

    generateDailyQuests() {
        return [
            {
                id: 'daily_lesson',
                title: 'Complete One Lesson',
                description: 'Finish any learning lesson',
                reward: 25,
                type: 'learning',
                progress: 0,
                target: 1
            },
            {
                id: 'daily_challenge',
                title: 'Solve Daily Challenge',
                description: 'Complete the daily coding challenge',
                reward: 50,
                type: 'challenge',
                progress: 0,
                target: 1
            },
            {
                id: 'community_engagement',
                title: 'Community Participation',
                description: 'Post or reply in community discussions',
                reward: 30,
                type: 'community',
                progress: 0,
                target: 3
            }
        ];
    }

    awardPoints(points, reason) {
        const userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {};
        userStats.points = (userStats.points || 0) + points;
        
        localStorage.setItem('devsahara_user_stats', JSON.stringify(userStats));
        
        this.showPointsNotification(points, reason);
        this.checkLevelUp(userStats.points);
        this.updateLeaderboard();
    }

    showPointsNotification(points, reason) {
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        notification.innerHTML = `
            <div class="points-popup">
                <span class="points-icon">⭐</span>
                <div>
                    <strong>+${points} Points!</strong>
                    <p>${reason}</p>
                </div>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    checkLevelUp(currentPoints) {
        const currentLevel = this.getCurrentLevel(currentPoints);
        const userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {};
        
        if (currentLevel > (userStats.level || 1)) {
            this.unlockLevel(currentLevel);
        }
    }

    getCurrentLevel(points) {
        let level = 1;
        Object.keys(this.levels).forEach(levelNum => {
            if (points >= this.levels[levelNum].points) {
                level = parseInt(levelNum);
            }
        });
        return level;
    }

    unlockLevel(level) {
        const levelInfo = this.levels[level];
        
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-popup">
                <div class="level-badge">${levelInfo.badge}</div>
                <div>
                    <h3>Level Up! 🎉</h3>
                    <p>You've reached ${levelInfo.name}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // تحديث مستوى المستخدم
        const userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {};
        userStats.level = level;
        userStats.levelName = levelInfo.name;
        localStorage.setItem('devsahara_user_stats', JSON.stringify(userStats));

        setTimeout(() => notification.remove(), 5000);
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;

        const userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {};
        userStats.achievements = userStats.achievements || [];
        
        if (!userStats.achievements.find(a => a.id === achievementId)) {
            userStats.achievements.push({
                id: achievementId,
                ...achievement,
                unlockedAt: new Date().toISOString()
            });

            localStorage.setItem('devsahara_user_stats', JSON.stringify(userStats));
            this.awardPoints(achievement.points, `Achievement: ${achievement.name}`);
            this.showAchievementNotification(achievement);
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-icon">${achievement.icon}</div>
                <div>
                    <h4>Achievement Unlocked! 🏆</h4>
                    <p><strong>${achievement.name}</strong></p>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 5000);
    }

    updateQuestProgress(questId, progress = 1) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest) {
            quest.progress += progress;
            
            if (quest.progress >= quest.target) {
                this.completeQuest(questId);
            }
        }
    }

    completeQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest && !quest.completed) {
            quest.completed = true;
            this.awardPoints(quest.reward, `Quest Completed: ${quest.title}`);
        }
    }

    updateLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem('devsahara_leaderboard')) || [];
        const user = auth.currentUser;
        
        if (!user) return;

        const userEntry = leaderboard.find(entry => entry.username === user.username);
        const userStats = JSON.parse(localStorage.getItem('devsahara_user_stats')) || {};

        if (userEntry) {
            userEntry.points = userStats.points || 0;
            userEntry.level = userStats.level || 1;
        } else {
            leaderboard.push({
                username: user.username,
                points: userStats.points || 0,
                level: userStats.level || 1,
                joinDate: new Date().toISOString()
            });
        }

        leaderboard.sort((a, b) => b.points - a.points);
        localStorage.setItem('devsahara_leaderboard', JSON.stringify(leaderboard));
        
        this.leaderboard = leaderboard;
    }

    getWeeklyLeaderboard() {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return this.leaderboard.filter(entry => 
            new Date(entry.joinDate) > oneWeekAgo
        ).slice(0, 10);
    }

    setupDailyQuests() {
        // إعادة تعيين المهام اليومية
        const lastReset = localStorage.getItem('devsahara_quests_reset');
        const today = new Date().toDateString();
        
        if (lastReset !== today) {
            this.quests = this.generateDailyQuests();
            localStorage.setItem('devsahara_quests', JSON.stringify(this.quests));
            localStorage.setItem('devsahara_quests_reset', today);
        }
    }

    setupEventListeners() {
        // استماع لأحداث التعلم والإنجازات
        document.addEventListener('lessonCompleted', (e) => {
            this.awardPoints(10, 'Lesson Completed');
            this.updateQuestProgress('daily_lesson');
        });

        document.addEventListener('challengeCompleted', (e) => {
            this.awardPoints(25, 'Challenge Completed');
            this.updateQuestProgress('daily_challenge');
        });

        document.addEventListener('communityActivity', (e) => {
            this.awardPoints(5, 'Community Participation');
            this.updateQuestProgress('community_engagement');
        });
    }
}

const gamification = new GamificationSystem();
