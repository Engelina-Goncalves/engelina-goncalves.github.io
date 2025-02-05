const skills = {
    programming: ["Python", "Powershell", "HTML & CSS"],
    languages: ["English", "German", "French", "Luxembourgish", "Portuguese", "Spanish"],
    tools: ["Git", "VS Code", "Linux"],
    softskills: ["Technical Writing", "Public Speaking", "Communication"]
};

let currentIndex = {
    programming: 0,
    languages: 0,
    tools: 0,
    softskills: 0
};

let currentCategory = 'programming';

function cycleSkills() {
    const categorySkills = skills[currentCategory];
    const skillElement = document.getElementById(`${currentCategory}-skill`);
    skillElement.style.opacity = 0;
    setTimeout(() => {
        skillElement.innerText =categorySkills[currentIndex[currentCategory]];
        skillElement.style.opacity = 1;
        currentIndex[currentCategory]++;
        if (currentIndex[currentCategory] >= categorySkills.length) {
            currentIndex[currentCategory] = 0
            moveToNextCategory();
        }
    }, 1000);
}

function moveToNextCategory(){
    switch (currentCategory) {
        case 'programming':
            currentCategory = 'languages';
            break
        case 'languages':
            currentCategory = 'tools';
            break
        case 'tools':
            currentCategory = 'softskills';
            break
        case 'softskills':
            currentCategory = 'programming';
            return;
    }
    setTimeout(cycleSkills, 3000);
}

cycleSkills();