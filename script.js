document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(task => {
            createTaskElement(task, false);
        });
    }

    // Function to create a task element
    function createTaskElement(taskText, saveToStorage = true) {
        // Create new list item
        const listItem = document.createElement('li');
        
        // Create task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            updateLocalStorage();
        };

        // Append elements
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (saveToStorage) {
            updateLocalStorage();
        }
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(taskElement => {
            tasks.push(taskElement.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText);
        
        // Clear input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});