const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll(".task-item span");
    items.forEach(item => tasks.push(item.textContent));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
}

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; // limpiar input
    }
});

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(task => createTaskElement(task));
    }
}

// Cargar al iniciar
loadTasks();
