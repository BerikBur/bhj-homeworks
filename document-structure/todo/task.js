const addTask = document.querySelector('.tasks__control');
const taskText = document.querySelector('.tasks__input');

const taskList = document.querySelector('.tasks__list');

addTask.addEventListener('submit', addTaskFunc);

document.addEventListener('DOMContentLoaded', loadTaskFunc)

function addTaskFunc(event) {
    event.preventDefault();

    const taskName = taskText.value;
    if(!taskName) {
        return;
    }
    createElementFunc(taskName);

    addToLocalStorage(taskName);

    taskText.value = '';
}

function createElementFunc(taskName) {
    
    const taskWrap = document.createElement('div');
    taskWrap.classList.add('task');

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task__title');
    taskTitle.textContent = taskName;

    const removeTask = document.createElement('a');
    removeTask.classList.add('task__remove');
    removeTask.href = '#';
    removeTask.innerHTML = '&times';
    removeTask.addEventListener('click', (event) => {
        event.preventDefault();
        taskWrap.remove();
        removeTaskFunc(taskName);
    });

    taskWrap.append(taskTitle, removeTask);
    taskList.appendChild(taskWrap);
};

function removeTaskFunc(taskName) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function addToLocalStorage(taskName) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadTaskFunc() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createElementFunc(task)); 
}