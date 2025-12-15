// CodingNano - Main JavaScript File
// Interactive functionality for the coding learning platform

class CodingNano {
    constructor() {
        this.currentUser = this.loadUserData();
        this.challenges = this.initializeChallenges();
        this.lessons = this.initializeLessons();
        this.achievements = this.initializeAchievements();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.loadProgress();
        this.setupCodeEditor();
        this.initializeCharts();
    }

    // User Data Management
    loadUserData() {
        const defaultUser = {
            name: 'Code Learner',
            streak: 0,
            totalPoints: 0,
            completedChallenges: [],
            completedLessons: [],
            achievements: [],
            joinDate: new Date().toISOString(),
            preferences: {
                theme: 'light',
                language: 'javascript'
            }
        };
        
        const saved = localStorage.getItem('codingnano_user');
        return saved ? { ...defaultUser, ...JSON.parse(saved) } : defaultUser;
    }

    saveUserData() {
        localStorage.setItem('codingnano_user', JSON.stringify(this.currentUser));
    }

    // Challenge System
    initializeChallenges() {
        return [
            {
                id: 1,
                title: 'Hello World',
                difficulty: 'beginner',
                category: 'basics',
                description: 'Write a function that returns the string "Hello, World!"',
                starterCode: 'function helloWorld() {\n  // Your code here\n}',
                testCases: [
                    { input: 'helloWorld()', expected: 'Hello, World!' }
                ],
                hints: [
                    'Try using the return statement',
                    'Return the exact string "Hello, World!"'
                ],
                points: 10
            },
            {
                id: 2,
                title: 'Sum of Two Numbers',
                difficulty: 'beginner',
                category: 'math',
                description: 'Create a function that adds two numbers together',
                starterCode: 'function add(a, b) {\n  // Your code here\n}',
                testCases: [
                    { input: 'add(2, 3)', expected: 5 },
                    { input: 'add(-1, 1)', expected: 0 }
                ],
                hints: [
                    'Use the + operator to add the parameters',
                    'Return the result of the addition'
                ],
                points: 15
            },
            {
                id: 3,
                title: 'Array Sum',
                difficulty: 'intermediate',
                category: 'arrays',
                description: 'Calculate the sum of all numbers in an array',
                starterCode: 'function arraySum(arr) {\n  // Your code here\n}',
                testCases: [
                    { input: 'arraySum([1, 2, 3, 4])', expected: 10 },
                    { input: 'arraySum([])', expected: 0 }
                ],
                hints: [
                    'Consider using a loop or array method',
                    'Initialize a sum variable to 0'
                ],
                points: 25
            },
            {
                id: 4,
                title: 'Palindrome Checker',
                difficulty: 'intermediate',
                category: 'strings',
                description: 'Determine if a string reads the same forwards and backwards',
                starterCode: 'function isPalindrome(str) {\n  // Your code here\n}',
                testCases: [
                    { input: 'isPalindrome("racecar")', expected: true },
                    { input: 'isPalindrome("hello")', expected: false }
                ],
                hints: [
                    'Convert to lowercase and remove spaces',
                    'Compare the string to its reverse'
                ],
                points: 30
            },
            {
                id: 5,
                title: 'FizzBuzz',
                difficulty: 'intermediate',
                category: 'logic',
                description: 'Print numbers 1-100, but replace multiples of 3 with "Fizz" and multiples of 5 with "Buzz"',
                starterCode: 'function fizzBuzz() {\n  // Your code here\n}',
                testCases: [
                    { input: 'fizzBuzz()[14]', expected: 'FizzBuzz' },
                    { input: 'fizzBuzz()[2]', expected: 'Fizz' }
                ],
                hints: [
                    'Use modulo operator (%) to check divisibility',
                    'Handle the FizzBuzz case first'
                ],
                points: 35
            }
        ];
    }

    // Lesson System
    initializeLessons() {
        return [
            {
                id: 1,
                title: 'JavaScript Basics',
                description: 'Learn the fundamentals of JavaScript programming',
                duration: '10 min',
                difficulty: 'beginner',
                category: 'javascript',
                topics: ['Variables', 'Functions', 'Data Types'],
                completed: false
            },
            {
                id: 2,
                title: 'Python Fundamentals',
                description: 'Master Python syntax and basic concepts',
                duration: '15 min',
                difficulty: 'beginner',
                category: 'python',
                topics: ['Syntax', 'Lists', 'Dictionaries'],
                completed: false
            },
            {
                id: 3,
                title: 'HTML & CSS',
                description: 'Build beautiful web pages with HTML and CSS',
                duration: '12 min',
                difficulty: 'beginner',
                category: 'web',
                topics: ['Elements', 'Styling', 'Layout'],
                completed: false
            },
            {
                id: 4,
                title: 'Data Structures',
                description: 'Understand arrays, objects, and more',
                duration: '20 min',
                difficulty: 'intermediate',
                category: 'algorithms',
                topics: ['Arrays', 'Objects', 'Sets'],
                completed: false
            },
            {
                id: 5,
                title: 'React Components',
                description: 'Build modern UIs with React',
                duration: '18 min',
                difficulty: 'intermediate',
                category: 'javascript',
                topics: ['Components', 'State', 'Props'],
                completed: false
            }
        ];
    }

    // Achievement System
    initializeAchievements() {
        return [
            { id: 'first_challenge', name: 'First Steps', description: 'Complete your first challenge', icon: '🎯', unlocked: false },
            { id: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false },
            { id: 'points_100', name: 'Century Club', description: 'Earn 100 points', icon: '💯', unlocked: false },
            { id: 'challenge_master', name: 'Challenge Master', description: 'Complete 10 challenges', icon: '👑', unlocked: false },
            { id: 'speed_coder', name: 'Speed Coder', description: 'Complete a challenge in under 2 minutes', icon: '⚡', unlocked: false }
        ];
    }

    // Code Editor Setup
    setupCodeEditor() {
        if (typeof monaco !== 'undefined') {
            this.editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: '// Welcome to CodingNano!\n// Start coding here...',
                language: 'javascript',
                theme: 'vs-dark',
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false
            });
        }
    }

    // Challenge Execution
    runChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        const userCode = this.editor ? this.editor.getValue() : '';
        
        try {
            // Simple test execution (in a real app, this would be sandboxed)
            const testFunction = new Function(userCode + '; return ' + challenge.testCases[0].input);
            const result = testFunction();
            
            const passed = result === challenge.testCases[0].expected;
            
            if (passed) {
                this.completeChallenge(challengeId);
                this.showSuccess('Challenge completed! Great job!');
            } else {
                this.showError(`Expected ${challenge.testCases[0].expected}, got ${result}`);
            }
        } catch (error) {
            this.showError('Error in your code: ' + error.message);
        }
    }

    completeChallenge(challengeId) {
        if (!this.currentUser.completedChallenges.includes(challengeId)) {
            this.currentUser.completedChallenges.push(challengeId);
            const challenge = this.challenges.find(c => c.id === challengeId);
            this.currentUser.totalPoints += challenge.points;
            this.saveUserData();
            this.updateProgress();
            this.checkAchievements();
        }
    }

    // Lesson Management
    completeLesson(lessonId) {
        if (!this.currentUser.completedLessons.includes(lessonId)) {
            this.currentUser.completedLessons.push(lessonId);
            this.currentUser.totalPoints += 5;
            this.saveUserData();
            this.updateProgress();
            this.checkAchievements();
        }
    }

    // Achievement System
    checkAchievements() {
        const achievements = this.achievements;
        
        // First challenge
        if (this.currentUser.completedChallenges.length >= 1 && !achievements.find(a => a.id === 'first_challenge').unlocked) {
            this.unlockAchievement('first_challenge');
        }
        
        // 7-day streak (simulated)
        if (this.currentUser.streak >= 7 && !achievements.find(a => a.id === 'streak_7').unlocked) {
            this.unlockAchievement('streak_7');
        }
        
        // 100 points
        if (this.currentUser.totalPoints >= 100 && !achievements.find(a => a.id === 'points_100').unlocked) {
            this.unlockAchievement('points_100');
        }
        
        // 10 challenges
        if (this.currentUser.completedChallenges.length >= 10 && !achievements.find(a => a.id === 'challenge_master').unlocked) {
            this.unlockAchievement('challenge_master');
        }
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement) {
            achievement.unlocked = true;
            this.currentUser.achievements.push(achievementId);
            this.saveUserData();
            this.showAchievementNotification(achievement);
        }
    }

    // UI Updates
    updateProgress() {
        // Update progress bars and counters
        const progressElements = document.querySelectorAll('[data-progress]');
        progressElements.forEach(element => {
            const type = element.dataset.progress;
            switch (type) {
                case 'challenges':
                    element.textContent = this.currentUser.completedChallenges.length;
                    break;
                case 'lessons':
                    element.textContent = this.currentUser.completedLessons.length;
                    break;
                case 'points':
                    element.textContent = this.currentUser.totalPoints;
                    break;
                case 'streak':
                    element.textContent = this.currentUser.streak;
                    break;
            }
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                const action = e.target.dataset.action;
                this.handleAction(action, e.target);
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const action = form.dataset.action;
            this.handleFormSubmit(action, form);
        });
    }

    handleAction(action, element) {
        switch (action) {
            case 'run-code':
                const challengeId = parseInt(element.dataset.challengeId);
                this.runChallenge(challengeId);
                break;
            case 'hint':
                this.showHint(parseInt(element.dataset.challengeId));
                break;
            case 'complete-lesson':
                this.completeLesson(parseInt(element.dataset.lessonId));
                break;
            case 'filter-lessons':
                this.filterLessons(element.dataset.filter);
                break;
        }
    }

    // Animations
    initializeAnimations() {
        // Initialize Anime.js animations
        if (typeof anime !== 'undefined') {
            // Fade in elements on page load
            anime({
                targets: '.fade-in',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                delay: anime.stagger(100)
            });

            // Pulse animation for important elements
            anime({
                targets: '.pulse',
                scale: [1, 1.05, 1],
                duration: 2000,
                loop: true,
                easing: 'easeInOutSine'
            });
        }

        // Typewriter effect
        this.initializeTypewriter();
    }

    initializeTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        });
    }

    // Charts and Visualizations
    initializeCharts() {
        if (typeof echarts !== 'undefined') {
            this.createProgressChart();
            this.createActivityChart();
        }
    }

    createProgressChart() {
        const chartElement = document.getElementById('progress-chart');
        if (!chartElement) return;

        const chart = echarts.init(chartElement);
        const option = {
            title: {
                text: 'Learning Progress',
                textStyle: { color: '#1e293b', fontSize: 18 }
            },
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie',
                radius: '70%',
                data: [
                    { value: this.currentUser.completedChallenges.length, name: 'Completed' },
                    { value: this.challenges.length - this.currentUser.completedChallenges.length, name: 'Remaining' }
                ],
                itemStyle: {
                    color: function(params) {
                        return params.dataIndex === 0 ? '#10b981' : '#e5e7eb';
                    }
                }
            }]
        };
        chart.setOption(option);
    }

    createActivityChart() {
        const chartElement = document.getElementById('activity-chart');
        if (!chartElement) return;

        const chart = echarts.init(chartElement);
        const option = {
            title: {
                text: 'Weekly Activity',
                textStyle: { color: '#1e293b', fontSize: 18 }
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: { type: 'value' },
            series: [{
                data: [2, 3, 1, 4, 2, 1, 3],
                type: 'bar',
                itemStyle: { color: '#f59e0b' }
            }]
        };
        chart.setOption(option);
    }

    // Notifications
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: notification,
                translateX: [300, 0],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
        
        setTimeout(() => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: notification,
                    translateX: [0, 300],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInCubic',
                    complete: () => notification.remove()
                });
            } else {
                notification.remove();
            }
        }, 3000);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-xl shadow-2xl z-50 text-center';
        notification.innerHTML = `
            <div class="text-6xl mb-4">${achievement.icon}</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Achievement Unlocked!</h3>
            <p class="text-gray-600">${achievement.name}</p>
            <p class="text-sm text-gray-500 mt-2">${achievement.description}</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    // Progress tracking
    loadProgress() {
        this.updateProgress();
    }

    // Filter lessons
    filterLessons(filter) {
        const lessons = document.querySelectorAll('.lesson-card');
        lessons.forEach(lesson => {
            const category = lesson.dataset.category;
            if (filter === 'all' || category === filter) {
                lesson.style.display = 'block';
            } else {
                lesson.style.display = 'none';
            }
        });
    }

    // Show hint
    showHint(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge && challenge.hints.length > 0) {
            const randomHint = challenge.hints[Math.floor(Math.random() * challenge.hints.length)];
            this.showNotification(`Hint: ${randomHint}`, 'success');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.codingNano = new CodingNano();
});

// Utility functions for common operations
function updateStreak() {
    const user = window.codingNano?.currentUser;
    if (user) {
        user.streak += 1;
        window.codingNano.saveUserData();
        window.codingNano.updateProgress();
    }
}

function getRandomChallenge() {
    const challenges = window.codingNano?.challenges;
    if (challenges) {
        return challenges[Math.floor(Math.random() * challenges.length)];
    }
    return null;
}

function formatTime(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodingNano;
}