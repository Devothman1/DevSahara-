// DevSahara Advanced AI Assistant
class AdvancedAIAssistant {
    constructor() {
        this.conversationHistory = [];
        this.userPreferences = {};
        this.codeExamples = {};
        this.init();
    }

    init() {
        this.loadConversationHistory();
        this.loadUserPreferences();
        this.loadCodeExamples();
        this.setupAdvancedFeatures();
    }

    loadConversationHistory() {
        this.conversationHistory = JSON.parse(localStorage.getItem('devsahara_ai_conversations')) || [];
    }

    loadUserPreferences() {
        this.userPreferences = JSON.parse(localStorage.getItem('devsahara_ai_preferences')) || {
            language: 'english',
            skillLevel: 'intermediate',
            preferredTech: ['JavaScript', 'Python'],
            learningGoals: ['web development', 'mobile apps']
        };
    }

    loadCodeExamples() {
        this.codeExamples = {
            javascript: {
                'array methods': `// JavaScript Array Methods
const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbers.map(n => n * 2);

// Filter - keep elements that pass test
const even = numbers.filter(n => n % 2 === 0);

// Reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log({ doubled, even, sum });`,

                'async await': `// Async/Await in JavaScript
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}`,

                'react component': `// React Functional Component
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData(userId).then(userData => {
            setUser(userData);
            setLoading(false);
        });
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}`
            },
            python: {
                'list comprehension': `# Python List Comprehension
numbers = [1, 2, 3, 4, 5]

# Square each number
squared = [n**2 for n in numbers]

# Filter even numbers
evens = [n for n in numbers if n % 2 == 0]

# Create dictionary
squares_dict = {n: n**2 for n in numbers}

print(squared, evens, squares_dict)`,

                'api request': `# Python API Request with requests library
import requests

def get_weather(city):
    try:
        response = requests.get(
            f"https://api.weatherapi.com/v1/current.json",
            params={
                'key': 'YOUR_API_KEY',
                'q': city
            }
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather: {e}")
        return None`
            }
        };
    }

    setupAdvancedFeatures() {
        // إضافة تحليل المشاعر والتوصيات الذكية
        this.sentimentAnalysis = this.analyzeSentiment.bind(this);
        this.smartRecommendations = this.provideRecommendations.bind(this);
    }

    async sendAdvancedMessage(message, context) {
        // حفظ في السجل
        this.addToHistory('user', message);
        
        // تحليل النية
        const intent = this.analyzeIntent(message);
        
        // توليد رد ذكي
        const response = await this.generateSmartResponse(message, intent, context);
        
        // حفظ الرد
        this.addToHistory('assistant', response);
        
        return response;
    }

    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('how to') || lowerMessage.includes('tutorial')) {
            return 'tutorial';
        } else if (lowerMessage.includes('error') || lowerMessage.includes('fix')) {
            return 'debugging';
        } else if (lowerMessage.includes('example') || lowerMessage.includes('code')) {
            return 'code_example';
        } else if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
            return 'explanation';
        } else if (lowerMessage.includes('project') || lowerMessage.includes('idea')) {
            return 'project_idea';
        } else {
            return 'general';
        }
    }

    async generateSmartResponse(message, intent, context) {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 1000));

        switch(intent) {
            case 'tutorial':
                return this.generateTutorialResponse(message);
            case 'debugging':
                return this.generateDebuggingResponse(message);
            case 'code_example':
                return this.generateCodeExample(message);
            case 'explanation':
                return this.generateExplanation(message);
            case 'project_idea':
                return this.generateProjectIdea(message);
            default:
                return this.generateGeneralResponse(message);
        }
    }

    generateTutorialResponse(message) {
        const tutorials = {
            'javascript': `🎯 **JavaScript Tutorial Plan:**

1. **Variables & Data Types** (30min)
   - let, const, var differences
   - Primitive vs Reference types

2. **Functions** (45min)
   - Function declarations vs expressions
   - Arrow functions
   - Higher-order functions

3. **DOM Manipulation** (60min)
   - Selecting elements
   - Event handling
   - Dynamic content

**Practice Project**: Build a interactive todo list!`,

            'react': `⚛️ **React Learning Path:**

**Week 1: Fundamentals**
- JSX syntax
- Components & Props
- State with useState

**Week 2: Advanced Concepts**
- useEffect for side effects
- Context API
- Custom hooks

**Week 3: Real Project**
- Build a weather app
- API integration
- Deployment

Want me to elaborate on any topic?`,

            'python': `🐍 **Python Mastery Plan:**

**Phase 1: Basics** (2 weeks)
- Syntax & data structures
- Functions & modules
- File handling

**Phase 2: Intermediate** (3 weeks)  
- OOP concepts
- Error handling
- Working with APIs

**Phase 3: Specialization** (4 weeks)
- Web development (Django/Flask)
- Data analysis (Pandas)
- Automation scripts

Which area interests you most?`
        };

        // تحديد التكنولوجيا من الرسالة
        const tech = this.extractTechnology(message);
        return tutorials[tech] || `I'd love to create a tutorial for you! What specific technology or concept would you like to learn? (JavaScript, Python, React, etc.)`;
    }

    generateDebuggingResponse(message) {
        const commonSolutions = {
            'undefined': `🔍 **Fixing "undefined" errors:**

Common causes:
1. **Variable not initialized**
   \`\`\`javascript
   let name; // undefined
   console.log(name); // Fix: initialize variable
   \`\`\`

2. **Function without return**
   \`\`\`javascript
   function getName() { /* no return */ }
   console.log(getName()); // undefined
   \`\`\`

3. **Object property doesn't exist**
   \`\`\`javascript
   const user = { name: "John" };
   console.log(user.age); // undefined
   // Fix: user.age || "Not specified"
   \`\`\`

Can you share your specific code?`,

            'syntax error': `🐛 **Solving Syntax Errors:**

Quick checklist:
✅ Check all brackets \`({[]})\` are balanced
✅ Verify quotes \`'' "" \`\`\` are properly closed  
✅ Look for missing commas in objects/arrays
✅ Ensure semicolons are correctly placed

**Example Fix:**
\`\`\`javascript
// Wrong:
const obj = { name: "John" age: 30 }

// Correct:  
const obj = { name: "John", age: 30 };
\`\`\`

What's the exact error message?`,

            'api error': `🌐 **API Error Solutions:**

Common issues & fixes:

1. **CORS Errors**
   - Check if API supports CORS
   - Use proxy if needed

2. **404 Not Found**
   - Verify endpoint URL
   - Check API documentation

3. **Authentication Errors**
   - Ensure API key is valid
   - Check authorization headers

**Example fetch with error handling:**
\`\`\`javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('API response error');
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}
\`\`\``
        };

        // تحديد نوع الخطأ من الرسالة
        const errorType = this.extractErrorType(message);
        return commonSolutions[errorType] || `I can help debug that! Could you share:\n1. The exact error message\n2. Your relevant code\n3. What you expected to happen?`;
    }

    generateCodeExample(message) {
        const tech = this.extractTechnology(message);
        const concept = this.extractConcept(message);
        
        if (tech && this.codeExamples[tech] && this.codeExamples[tech][concept]) {
            return `**${concept.toUpperCase()} Example in ${tech.toUpperCase()}:**\n\n\`\`\`${tech}\n${this.codeExamples[tech][concept]}\n\`\`\`\n\nNeed explanation or variations?`;
        }
        
        return `I have code examples for:\n• JavaScript: array methods, async/await, React components\n• Python: list comprehension, API requests, file handling\n\nWhat specific concept would you like an example of?`;
    }

    extractTechnology(message) {
        if (message.toLowerCase().includes('javascript') || message.toLowerCase().includes('js')) return 'javascript';
        if (message.toLowerCase().includes('python') || message.toLowerCase().includes('py')) return 'python';
        if (message.toLowerCase().includes('react')) return 'react';
        return null;
    }

    extractConcept(message) {
        const concepts = ['array', 'function', 'component', 'api', 'async', 'loop', 'object'];
        return concepts.find(concept => message.toLowerCase().includes(concept)) || 'general';
    }

    extractErrorType(message) {
        if (message.toLowerCase().includes('undefined')) return 'undefined';
        if (message.toLowerCase().includes('syntax')) return 'syntax error';
        if (message.toLowerCase().includes('api')) return 'api error';
        return 'general';
    }

    addToHistory(role, content) {
        this.conversationHistory.push({
            role,
            content,
            timestamp: new Date().toISOString()
        });
        
        // حفظ فقط آخر 50 رسالة
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
        
        localStorage.setItem('devsahara_ai_conversations', JSON.stringify(this.conversationHistory));
    }

    getConversationSummary() {
        const today = new Date().toISOString().split('T')[0];
        const todayMessages = this.conversationHistory.filter(msg => 
            msg.timestamp.startsWith(today)
        );
        
        return {
            totalMessages: this.conversationHistory.length,
            todayMessages: todayMessages.length,
            lastTopic: this.conversationHistory[this.conversationHistory.length - 1]?.content
        };
    }

    // تحليل المشاعر الأساسي
    analyzeSentiment(message) {
        const positiveWords = ['great', 'awesome', 'thanks', 'helpful', 'good', 'perfect', 'excellent'];
        const negativeWords = ['bad', 'terrible', 'useless', 'wrong', 'error', 'broken', 'fix'];
        
        const words = message.toLowerCase().split(' ');
        const positive = words.filter(word => positiveWords.includes(word)).length;
        const negative = words.filter(word => negativeWords.includes(word)).length;
        
        if (positive > negative) return 'positive';
        if (negative > positive) return 'negative';
        return 'neutral';
    }

    // توصيات ذكية بناءً على السجل
    provideRecommendations() {
        const recentTech = this.getRecentTechnologies();
        const userLevel = this.assessUserLevel();
        
        const recommendations = [];
        
        if (recentTech.includes('javascript') && userLevel === 'beginner') {
            recommendations.push('Try our JavaScript fundamentals course');
        }
        
        if (recentTech.includes('react')) {
            recommendations.push('Check out the React projects in our community');
        }
        
        return recommendations.length > 0 ? recommendations : ['Explore our learning paths to discover new technologies!'];
    }

    getRecentTechnologies() {
        const techs = [];
        this.conversationHistory.forEach(msg => {
            if (msg.content.toLowerCase().includes('javascript')) techs.push('javascript');
            if (msg.content.toLowerCase().includes('python')) techs.push('python');
            if (msg.content.toLowerCase().includes('react')) techs.push('react');
        });
        return [...new Set(techs)]; // إزالة التكرارات
    }

    assessUserLevel() {
        const technicalTerms = this.conversationHistory.filter(msg => 
            msg.role === 'user' && 
            (msg.content.includes('function') || msg.content.includes('api') || msg.content.includes('component'))
        ).length;
        
        return technicalTerms > 10 ? 'intermediate' : 'beginner';
    }
}

// دمج النظام المتقدم مع النظام الحالي
const advancedAI = new AdvancedAIAssistant();

// تحديث الدوال الحالية لاستخدام النظام المتقدم
async function sendAdvancedMessage(message) {
    const response = await advancedAI.sendAdvancedMessage(message, {
        user: auth.currentUser,
        page: window.location.pathname
    });
    return response;
            }        const messagesDiv = document.getElementById('chat-messages');
        if (!messagesDiv) return;
        
        const lastMessage = messagesDiv.lastElementChild;
        if (lastMessage) {
            messagesDiv.removeChild(lastMessage);
        }
    }

    clearChat() {
        const messagesDiv = document.getElementById('chat-messages');
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        this.conversationHistory = [];
    }
}

// Global functions for HTML onclick events
let aiAssistant = null;

function openFeature(feature) {
    if (!aiAssistant) {
        aiAssistant = new DevSaharaAI();
        aiAssistant.init();
    }
    aiAssistant.openFeature(feature);
}

function sendMessage() {
    if (aiAssistant) {
        aiAssistant.sendMessage();
    } else {
        // Initialize if not already done
        aiAssistant = new DevSaharaAI();
        aiAssistant.init();
        aiAssistant.sendMessage();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    aiAssistant = new DevSaharaAI();
    aiAssistant.init();
    
    // Check if there's a stored help request from projects page
    const helpRequest = localStorage.getItem('aiHelpRequest');
    if (helpRequest) {
        openFeature('code-helper');
        setTimeout(() => {
            const input = document.getElementById('user-input');
            if (input) {
                input.value = helpRequest;
                sendMessage();
            }
            localStorage.removeItem('aiHelpRequest');
        }, 500);
    }
});
