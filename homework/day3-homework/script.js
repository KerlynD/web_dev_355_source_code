// DOM elements needed for the webapp
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

// Side menu toggle
menuToggle.addEventListener('click', () => {
    // Check if the side menu is visible
    sideMenu.classList.toggle('visible');
    const isVisible = sideMenu.classList.contains('visible');
    // Change aria-expanded
    menuToggle.setAttribute('aria-expanded', isVisible);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sideMenu.classList.contains('visible')) {
        sideMenu.classList.remove('visible');
        menuToggle.setAttribute('aria-expanded', false);
    }
});

// To-Do List
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    
    if (taskText === '') return; // no empty tasks

    // new todo item
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    // checkbox event listener
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTodos();
    });

    // text node and append elements
    const textNode = document.createTextNode(taskText);
    li.appendChild(checkbox);
    li.appendChild(textNode);
    list.appendChild(li);
    
    // save and clear input
    input.value = '';
    saveTodos();
});