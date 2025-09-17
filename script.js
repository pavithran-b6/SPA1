let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskId = Number(localStorage.getItem("taskIdCounter")) || 0;

function generateId() {
    localStorage.setItem("taskIdCounter", ++taskId);
    return taskId;
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function savetask() {
    const taskInput = document.getElementById("addtask");
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const newTask = {
        id: generateId(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveToLocalStorage();
    taskInput.value = "";
    updateAll();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveToLocalStorage();
    updateAll();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    updateAll();
}

function updateAll() {
    const allList = document.getElementById("listoftasks");
    const todoList = document.getElementById("listtodo");
    const completedList = document.getElementById("listcompleted");
    allList.innerHTML = "";
    todoList.innerHTML = "";
    completedList.innerHTML = "";
    tasks.sort((a,b) => (a[2],b[2]));
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
        taskItem.innerHTML = `
            <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
            <div>
                <button class="btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'} me-2"
                    onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        allList.appendChild(taskItem);
        if (task.completed) {
            completedList.appendChild(taskItem.cloneNode(true));
            completedList.lastChild.querySelector("button").setAttribute("onclick", `toggleTask(${task.id})`);
            completedList.lastChild.querySelectorAll("button")[1].setAttribute("onclick", `deleteTask(${task.id})`);
        } else {
            todoList.appendChild(taskItem.cloneNode(true));
            todoList.lastChild.querySelector("button").setAttribute("onclick", `toggleTask(${task.id})`);
            todoList.lastChild.querySelectorAll("button")[1].setAttribute("onclick", `deleteTask(${task.id})`);
        }
    });
}

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("d-none"));
    document.getElementById(sectionId).classList.remove("d-none");
}
document.getElementById("brand").addEventListener('click', ()=> showSection("taskadd"));
document.getElementById("linktoadd").addEventListener("click", () => showSection("taskadd"));
document.getElementById("linktoall").addEventListener("click", () => showSection("all"));
document.getElementById("linktodo").addEventListener("click", () => showSection("todo"));
document.getElementById("linktocomplete").addEventListener("click", () => showSection("completed"));

updateAll();
showSection("taskadd");
