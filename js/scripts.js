//elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");
const searchForm = document.querySelector("#search-form");

let oldInputValue;
let currentFilter = 'all';

//funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
    applyFilterAndSearch();
}

const searchTodos = (searchTerm) => {
    const todos = document.querySelectorAll(".todo");
    const searchTermLower = searchTerm.toLowerCase().trim();

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        if (searchTerm === '' || todoTitle.includes(searchTermLower)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterType) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const isCompleted = todo.classList.contains("done");

        switch (filterType) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = isCompleted ? "flex" : "none";
                break;
            case "pending":
                todo.style.display = !isCompleted ? "flex" : "none";
                break;
        }
    });
};

const applyFilterAndSearch = () => {
    const searchTerm = searchInput.value;
    const filterType = filterSelect.value;

    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        const isCompleted = todo.classList.contains("done");
        let shouldShow = true;

        switch (filterType) {
            case "all":
                shouldShow = true;
                break;
            case "completed":
                shouldShow = isCompleted;
                break;
            case "pending":
                shouldShow = !isCompleted;
                break;
        }

        if (shouldShow && searchTerm) {
            const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
            shouldShow = todoTitle.includes(searchTerm.toLowerCase().trim());
        }

        todo.style.display = shouldShow ? "flex" : "none";
    });
};

const clearSearch = () => {
    searchInput.value = '';
    applyFilterAndSearch();
};

//eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue);
        todoInput.value = "";
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");

    if (!parentEl) return;

    const todoTitle = parentEl.querySelector("h3").innerText;

    if (targetEl.classList.contains("finish-todo") || targetEl.closest(".finish-todo")) {
        parentEl.classList.toggle("done");
        applyFilterAndSearch();
    }

    if (targetEl.classList.contains("delete-todo") || targetEl.closest(".delete-todo")) {
        parentEl.remove();
        applyFilterAndSearch();
    }

    if (targetEl.classList.contains("edit-todo") || targetEl.closest(".edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("input", (e) => {
    applyFilterAndSearch();
});

eraseButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearSearch();
});

filterSelect.addEventListener("change", (e) => {
    currentFilter = e.target.value;
    applyFilterAndSearch();
});