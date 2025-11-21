// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const yearEl = document.getElementById('year');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            menu.classList.toggle('open');
        });

        // close menu when a link is clicked
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // simple scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowH = window.innerHeight;
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowH - 80) el.classList.add('active');
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});

/* --- Skills cycling (kept from original functionality) --- */
const skills = {
    programming: ["Python", "Powershell", "HTML & CSS"],
    languages: ["English", "German", "French", "Luxembourgish", "Portuguese", "Spanish"],
    tools: ["Git", "VS Code", "Linux"],
    softskills: ["Technical Writing", "Public Speaking", "Communication"]
};

let currentIndex = {programming:0,languages:0,tools:0,softskills:0};
let currentCategory = 'programming';

function cycleSkills() {
    const categorySkills = skills[currentCategory];
    const skillElement = document.getElementById(`${currentCategory}-skill`);
    if (!skillElement) return;

    skillElement.style.transition = "opacity 0.6s ease-in-out";
    skillElement.style.opacity = 0;

    setTimeout(() => {
        skillElement.innerText = categorySkills[currentIndex[currentCategory]];
        skillElement.style.opacity = 1;
        currentIndex[currentCategory]++;

        if (currentIndex[currentCategory] >= categorySkills.length) {
            setTimeout(() => {
                displayAllSkillsInCategory(currentCategory);
                currentIndex[currentCategory] = 0;
                moveToNextCategory();
            }, 1500);
        } else {
            setTimeout(cycleSkills, 1800);
        }
    }, 600);
}

function displayAllSkillsInCategory(category) {
    const skillElement = document.getElementById(`${category}-skill`);
    if (!skillElement) return;
    skillElement.innerHTML = skills[category].join('<br>');
}

function moveToNextCategory(){
    switch (currentCategory) {
        case 'programming': currentCategory = 'languages'; break;
        case 'languages': currentCategory = 'tools'; break;
        case 'tools': currentCategory = 'softskills'; break;
        case 'softskills': currentCategory = 'programming'; break;
    }
    setTimeout(cycleSkills, 900);
}

document.addEventListener("DOMContentLoaded", cycleSkills);