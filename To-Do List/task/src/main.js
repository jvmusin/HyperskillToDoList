function createTask(done, name) {
    const task = document.createElement("li")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    if (done) checkbox.checked = true

    const span = document.createElement("span")
    span.classList.add("task")
    span.appendChild(document.createTextNode(name))

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.appendChild(document.createTextNode("X"))

    deleteBtn.addEventListener("click", function (evt) {
        const listItem = evt.target.parentNode
        const list = listItem.parentNode
        list.removeChild(listItem)
    })

    task.append(checkbox, span, deleteBtn)
    return task
}

function newTask(name) {
    return createTask(false, name)
}

function taskToModel(taskListItem) {
    const nodes = taskListItem.children
    const completed = nodes[0].checked
    const name = nodes[1].textContent
    console.log([completed, name])
    return {completed: completed, name: name}
}

function saveTasks() {
    const taskList = document.getElementById("task-list")
    const tasks = []
    for (const task of taskList.children) tasks.push(taskToModel(task))
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    const taskList = document.getElementById("task-list")
    taskList.innerHTML = ""
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    for (let task of tasks) taskList.appendChild(createTask(task.completed, task.name))
}

document.getElementById("add-task-button").addEventListener("click", function () {
    const inputField = document.getElementById("input-task")
    const taskName = inputField.value

    if (taskName === "") return

    const taskList = document.getElementById("task-list")
    const task = newTask(taskName);
    taskList.appendChild(task)

    inputField.value = ""

    saveTasks()
})

loadTasks()