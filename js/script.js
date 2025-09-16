document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    loadTodos();

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo(todoInput.value.trim());
        todoInput.value = '';
    });

    function addTodo(text) {
        if (text === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-btn">Delete</button>
        `;

        const span = li.querySelector('span');
        const deleteBtn = li.querySelector('.delete-btn');

        span.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTodos();
        });

        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTodos();
        });

        todoList.appendChild(li);
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            if (todo.completed) {
                li.classList.add('completed');
            }

            const span = li.querySelector('span');
            const deleteBtn = li.querySelector('.delete-btn');

            span.addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTodos();
            });

            deleteBtn.addEventListener('click', function() {
                li.remove();
                saveTodos();
            });

            todoList.appendChild(li);
        });
    }
});
