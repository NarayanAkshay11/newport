const mario = document.getElementById('mario');
const ground = document.getElementById('ground');
const sky = document.getElementById('sky');
const projectsContainer = document.getElementById('projects-container');
const modal = document.getElementById('project-modal');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const projectLink = document.getElementById('project-link');
const closeModal = document.getElementById('close-modal');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const clouds = document.getElementById('clouds');

let marioPos = 50;
let gameLoop;

const projects = [
    { title: "Project 1", description: "A web application for task management", link: "https://example.com/project1" },
    { title: "Project 2", description: "An e-commerce platform", link: "https://example.com/project2" },
    { title: "Project 3", description: "A machine learning model for image recognition", link: "https://example.com/project3" },
    { title: "Project 4", description: "A mobile app for fitness tracking", link: "https://example.com/project4" },
    { title: "Project 5", description: "A blockchain-based voting system", link: "https://example.com/project5" },
    { title: "Project 6", description: "An IoT smart home solution", link: "https://example.com/project6" },
    { title: "Project 7", description: "A real-time chat application", link: "https://example.com/project7" },
    { title: "Project 8", description: "A data visualization dashboard", link: "https://example.com/project8" },
    { title: "Project 9", description: "An augmented reality game", link: "https://example.com/project9" },
    { title: "Project 10", description: "A natural language processing API", link: "https://example.com/project10" }
];

function createClouds() {
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.top = `${Math.random() * 50}px`;
        clouds.appendChild(cloud);
    }
}

function createProjects() {
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.style.left = `${(index + 1) * 500}px`;
        projectElement.style.bottom = '30%';
        projectElement.textContent = '?';
        projectElement.dataset.index = index;
        projectsContainer.appendChild(projectElement);
    });
}

function showProjectDetails(project) {
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectLink.href = project.link;
    modal.style.display = 'block';
}

closeModal.onclick = () => {
    modal.style.display = 'none';
};

function moveMario(direction) {
    if (direction === 'left' && marioPos > 0) {
        marioPos -= 5;
        mario.style.transform = 'scaleX(-1)';
    } else if (direction === 'right' && marioPos < 10000) {
        marioPos += 5;
        mario.style.transform = 'scaleX(1)';
    }
    mario.style.left = `${marioPos}px`;

    // Move the frame with Mario
    if (marioPos > window.innerWidth / 2 && marioPos < 10000 - window.innerWidth / 2) {
        ground.style.transform = `translateX(-${marioPos - window.innerWidth / 2}px)`;
        sky.style.transform = `translateX(-${(marioPos - window.innerWidth / 2) * 0.5}px)`;
        projectsContainer.style.transform = `translateX(-${marioPos - window.innerWidth / 2}px)`;
    }

    checkCollision();
}

function checkCollision() {
    const projects = document.querySelectorAll('.project');
    projects.forEach((project) => {
        const projectRect = project.getBoundingClientRect();
        const marioRect = mario.getBoundingClientRect();

        if (
            marioRect.left < projectRect.right &&
            marioRect.right > projectRect.left &&
            marioRect.top < projectRect.bottom &&
            marioRect.bottom > projectRect.top
        ) {
            const projectIndex = parseInt(project.dataset.index);
            showProjectDetails(projects[projectIndex]);
            project.style.visibility = 'hidden';
        }
    });
}

leftBtn.addEventListener('mousedown', () => {
    gameLoop = setInterval(() => moveMario('left'), 20);
});

rightBtn.addEventListener('mousedown', () => {
    gameLoop = setInterval(() => moveMario('right'), 20);
});

leftBtn.addEventListener('mouseup', () => clearInterval(gameLoop));
rightBtn.addEventListener('mouseup', () => clearInterval(gameLoop));

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveMario('left');
    if (e.key === 'ArrowRight') moveMario('right');
});

createClouds();
createProjects();
