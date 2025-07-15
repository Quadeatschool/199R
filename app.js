// Personality RPG - Vanilla JavaScript Version

// Initialize Lucide icons
lucide.createIcons();

// App State
let currentView = 'dashboard';
let userStats = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    level: 1,
    xp: 0,
    completedChallenges: []
};

let journalEntries = [];

// Challenge Data
const challenges = [
    // Existing challenges
    {
        id: 1,
        title: "The Tomato Experiment",
        description: "Mindfully eat a tomato and observe every sensation",
        trait: "openness",
        xp: 15,
        icon: "sun",
        completed: false
    },
    {
        id: 2,
        title: "Push-Up Challenge",
        description: "Do push-ups until failure and note your mental state",
        trait: "conscientiousness",
        xp: 20,
        icon: "target",
        completed: false
    },
    {
        id: 3,
        title: "Sunrise Warrior",
        description: "Wake up at sunrise and get sunlight in your eyes",
        trait: "conscientiousness",
        xp: 25,
        icon: "sun",
        completed: false
    },
    {
        id: 4,
        title: "Stranger's Smile",
        description: "Smile at a stranger and observe the interaction",
        trait: "extraversion",
        xp: 15,
        icon: "heart",
        completed: false
    },
    {
        id: 5,
        title: "Hydration Station",
        description: "Drink 3 cups of water and track how you feel",
        trait: "conscientiousness",
        xp: 10,
        icon: "zap",
        completed: false
    },
    {
        id: 6,
        title: "Primal Scream",
        description: "Go to the woods and scream as loud as you can",
        trait: "openness",
        xp: 30,
        icon: "sparkles",
        completed: false
    },
    {
        id: 7,
        title: "Breath & Void",
        description: "Close eyes, hold breath for 10 seconds, observe thoughts",
        trait: "neuroticism",
        xp: 15,
        icon: "brain",
        completed: false
    },
    // New challenges
    {
        id: 8,
        title: "Silent Walk",
        description: "Take a 20-minute walk without headphones or distractions. Just observe your surroundings.",
        trait: "openness",
        xp: 15,
        icon: "footprints",
        completed: false
    },
    {
        id: 9,
        title: "Learn Something Weird",
        description: "Watch a documentary or YouTube video on a topic you know nothing about.",
        trait: "openness",
        xp: 20,
        icon: "book-open",
        completed: false
    },
    {
        id: 10,
        title: "Inbox Zero",
        description: "Clean out your email inbox to zero.",
        trait: "conscientiousness",
        xp: 15,
        icon: "inbox",
        completed: false
    },
    {
        id: 11,
        title: "Daily Goal Streak",
        description: "Set one micro-goal each morning and complete it for 3 days in a row.",
        trait: "conscientiousness",
        xp: 25,
        icon: "target",
        completed: false
    },
    {
        id: 12,
        title: "Compliment a Stranger",
        description: "Give a sincere compliment to someone you don’t know.",
        trait: "extraversion",
        xp: 15,
        icon: "smile",
        completed: false
    },
    {
        id: 13,
        title: "Attend a Social Event",
        description: "Join a public class, workshop, or meetup you wouldn’t normally attend.",
        trait: "extraversion",
        xp: 25,
        icon: "users",
        completed: false
    },
    {
        id: 14,
        title: "Help Without Being Asked",
        description: "Offer help to a friend, family member, or coworker before they ask.",
        trait: "agreeableness",
        xp: 20,
        icon: "handshake",
        completed: false
    },
    {
        id: 15,
        title: "Gratitude Message",
        description: "Send an unexpected thank-you text to someone from your past.",
        trait: "agreeableness",
        xp: 15,
        icon: "message-circle",
        completed: false
    },
    {
        id: 16,
        title: "Cold Shower Challenge",
        description: "Take a 30-second cold shower and journal how it felt after.",
        trait: "neuroticism",
        xp: 20,
        icon: "snowflake",
        completed: false
    },
    {
        id: 17,
        title: "Unplug Hour",
        description: "Turn off your phone for one hour and spend that time entirely offline.",
        trait: "neuroticism",
        xp: 20,
        icon: "power",
        completed: false
    }
];

const traitColors = {
    openness: "bg-purple-500",
    conscientiousness: "bg-blue-500",
    extraversion: "bg-gold-400",
    agreeableness: "bg-green-500",
    neuroticism: "bg-red-500"
};

const traitNames = {
    openness: "Intelligence",
    conscientiousness: "Lawful",
    extraversion: "+Energy",
    agreeableness: "Karma",
    neuroticism: "-Energy"
};

// Load data from localStorage
function loadData() {
    const savedStats = localStorage.getItem('personalityRPG_stats');
    const savedJournal = localStorage.getItem('personalityRPG_journal');
    
    if (savedStats) {
        userStats = JSON.parse(savedStats);
    }
    
    if (savedJournal) {
        journalEntries = JSON.parse(savedJournal);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('personalityRPG_stats', JSON.stringify(userStats));
    localStorage.setItem('personalityRPG_journal', JSON.stringify(journalEntries));
}

// Navigation functions
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Show selected view
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`nav-${viewName}`).classList.add('active');
    
    currentView = viewName;
    
    // Update content based on view
    if (viewName === 'dashboard') {
        updateDashboard();
    } else if (viewName === 'challenges') {
        updateChallenges();
    } else if (viewName === 'journal') {
        updateJournal();
    }
}

// Update dashboard
function updateDashboard() {
    // Update level and XP
    document.getElementById('user-level').textContent = userStats.level;
    document.getElementById('current-xp').textContent = userStats.xp % 100;
    document.getElementById('xp-progress').style.width = `${(userStats.xp % 100)}%`;
    
    // Update stats grid
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = '';
    
    Object.entries(traitNames).forEach(([trait, name]) => {
        const statCard = document.createElement('div');
        statCard.className = 'stats-card';
        statCard.innerHTML = `
            <div class="stat-value ${traitColors[trait]}">${userStats[trait]}</div>
            <p class="text-sm font-medium text-gray-700">${name}</p>
        `;
        statsGrid.appendChild(statCard);
    });
    
    // Update achievements
    const achievementsList = document.getElementById('achievements-list');
    if (userStats.completedChallenges.length === 0) {
        achievementsList.innerHTML = '<p class="text-gray-500 text-sm">Complete your first challenge to unlock achievements!</p>';
    } else {
        achievementsList.innerHTML = '';
        userStats.completedChallenges.slice(-3).forEach(challengeId => {
            const challenge = challenges.find(c => c.id === challengeId);
            if (challenge) {
                const achievement = document.createElement('div');
                achievement.className = 'flex items-center gap-2 text-sm';
                achievement.innerHTML = `
                    <i data-lucide="award" class="w-4 h-4 text-yellow-500"></i>
                    <span>Completed: ${challenge.title}</span>
                `;
                achievementsList.appendChild(achievement);
            }
        });
        lucide.createIcons();
    }
}

// Update challenges view
function updateChallenges() {
    const challengesGrid = document.getElementById('challenges-grid');
    challengesGrid.innerHTML = '';
    
    challenges.forEach(challenge => {
        const isCompleted = userStats.completedChallenges.includes(challenge.id);
        const challengeCard = document.createElement('div');
        challengeCard.className = `challenge-card ${isCompleted ? 'completed' : ''}`;
        
        challengeCard.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="icon-container ${traitColors[challenge.trait]}">
                    <i data-lucide="${challenge.icon}" class="w-5 h-5 text-white"></i>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="font-semibold text-gray-800">${challenge.title}</h3>
                        <span class="trait-badge ${traitColors[challenge.trait]}">${traitNames[challenge.trait]}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">${challenge.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">+${challenge.xp} XP</span>
                        ${isCompleted ? 
                            '<span class="text-green-600 font-medium">✓ Completed</span>' :
                            `<button class="start-challenge-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" data-challenge-id="${challenge.id}">Start Challenge</button>`
                        }
                    </div>
                </div>
            </div>
            ${!isCompleted ? `
                <div class="reflection-section hidden" id="reflection-${challenge.id}">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        How did this challenge make you feel? What did you learn?
                    </label>
                    <textarea class="reflection-textarea" placeholder="Reflect on your experience..."></textarea>
                    <button class="complete-btn" data-challenge-id="${challenge.id}" disabled>
                        Complete & Reflect
                    </button>
                </div>
            ` : ''}
        `;
        
        challengesGrid.appendChild(challengeCard);
    });
    
    lucide.createIcons();
    
    // Add event listeners for challenge buttons
    document.querySelectorAll('.start-challenge-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const challengeId = parseInt(e.target.dataset.challengeId);
            const reflectionSection = document.getElementById(`reflection-${challengeId}`);
            reflectionSection.classList.remove('hidden');
            e.target.style.display = 'none';
        });
    });
    
    document.querySelectorAll('.reflection-textarea').forEach(textarea => {
        textarea.addEventListener('input', (e) => {
            const challengeId = parseInt(e.target.closest('.reflection-section').dataset.challengeId || 
                               e.target.closest('.reflection-section').id.replace('reflection-', ''));
            const completeBtn = e.target.parentElement.querySelector('.complete-btn');
            completeBtn.disabled = !e.target.value.trim();
        });
    });
    
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const challengeId = parseInt(e.target.dataset.challengeId);
            const reflectionSection = e.target.closest('.reflection-section');
            const reflection = reflectionSection.querySelector('.reflection-textarea').value;
            
            if (reflection.trim()) {
                completeChallenge(challengeId, reflection);
                updateChallenges();
                updateDashboard();
            }
        });
    });
}

// Update journal view
function updateJournal() {
    const journalEntriesContainer = document.getElementById('journal-entries');
    
    if (journalEntries.length === 0) {
        journalEntriesContainer.innerHTML = `
            <div class="text-center py-8">
                <i data-lucide="book-open" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                <p class="text-gray-500">Complete challenges to start building your reflection journal!</p>
            </div>
        `;
    } else {
        journalEntriesContainer.innerHTML = '';
        journalEntries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'journal-entry';
            entryElement.innerHTML = `
                <div class="entry-header">
                    <span class="trait-badge ${traitColors[entry.trait]}">${traitNames[entry.trait]}</span>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">${entry.challengeTitle}</h3>
                <p class="text-gray-600">${entry.reflection}</p>
            `;
            journalEntriesContainer.appendChild(entryElement);
        });
    }
    
    lucide.createIcons();
}

// Complete challenge function
function completeChallenge(challengeId, reflection) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !userStats.completedChallenges.includes(challengeId)) {
        userStats[challenge.trait]++;
        userStats.xp += challenge.xp;
        userStats.level = Math.floor(userStats.xp / 100) + 1;
        userStats.completedChallenges.push(challengeId);
        
        // Add journal entry
        const entry = {
            id: Date.now(),
            challengeTitle: challenge.title,
            reflection,
            date: new Date().toLocaleDateString(),
            trait: challenge.trait
        };
        journalEntries.unshift(entry);
        
        saveData();
    }
}

// Initialize app
function initApp() {
    loadData();
    
    // Set up navigation event listeners
    document.getElementById('nav-dashboard').addEventListener('click', () => showView('dashboard'));
    document.getElementById('nav-challenges').addEventListener('click', () => showView('challenges'));
    document.getElementById('nav-journal').addEventListener('click', () => showView('journal'));
    
    // Show initial view
    showView('dashboard');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 