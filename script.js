const player = document.getElementById('player');
const background = document.getElementById('background');
const ground = document.getElementById('ground');
const projectsContainer = document.getElementById('projects-container');
const modal = document.getElementById('project-modal');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const projectLink = document.getElementById('project-link');
const closeModal = document.getElementById('close-modal');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const jumpBtn = document.getElementById('jump-btn');

let playerPos = 50;
let isJumping = false;
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

function createProjects() {
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.style.left = `${(index + 1) * 800}px`;
        projectElement.style.bottom = '150px';
        projectElement.onclick = () => showProjectDetails(project);
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

function movePlayer(direction) {
    if (direction === 'left' && playerPos > 0) {
        playerPos -= 10;
    } else if (direction === 'right' && playerPos < 9950) {
        playerPos += 10;
    }
    player.style.left = `${playerPos}px`;
    background.style.transform = `translateX(-${playerPos * 0.5}px)`;
    ground.style.transform = `translateX(-${playerPos}px)`;
    projectsContainer.style.transform = `translateX(-${playerPos}px)`;
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight < 100 && !isJumping) {
                jumpHeight += 5;
                player.style.bottom = `${100 + jumpHeight}px`;
            } else if (jumpHeight >= 100 || isJumping) {
                jumpHeight -= 5;
                player.style.bottom = `${100 + jumpHeight}px`;
                if (jumpHeight <= 0) {
                    clearInterval(jumpInterval);
                    isJumping = false;
                    player.style.bottom = '100px';
                }
            }
        }, 20);
    }
}

leftBtn.addEventListener('mousedown', () => {
    gameLoop = setInterval(() => movePlayer('left'), 50);
});

rightBtn.addEventListener('mousedown', () => {
    gameLoop = setInterval(() => movePlayer('right'), 50);
});

leftBtn.addEventListener('mouseup', () => clearInterval(gameLoop));
rightBtn.addEventListener('mouseup', () => clearInterval(gameLoop));
jumpBtn.addEventListener('click', jump);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === 'ArrowUp') jump();
});

createProjects();
