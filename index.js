const addTaskForm = document.querySelector("#addTaskForm")
const taskInput = document.querySelector("#taskInput")
const taskList = document.querySelector("#taskList")
const completeAllTask = document.querySelector("#completeAllTask")
const removeAllTask = document.querySelector("#removeAllTask")


const createTaskItem = (task) => `
   <li>
     <input type="checkbox" name="task" id='${task}'
      onChange="toggleTaskCompletion(event)"
     >
       <label for="task">
          ${task}
       </label>
       <button type="button" onClick="removeTask(event)">
         X
       </button>
       
    </li>
`

savedTodos = JSON.parse(localStorage.getItem("tasks")) || []

const renderTasks = () => {
    savedTodos.forEach((task) => {
        taskList.insertAdjacentHTML(
           'beforeend',
           createTaskItem(task)
        )
    })
}

window.onload = renderTasks

const addNewTask = (event) => {
    event.preventDefault()

   const task = taskInput.value
   const newTask = createTaskItem(task)
   taskList.insertAdjacentHTML(
    'beforeend',
     newTask
   )

   savedTodos.push(task)
   localStorage.setItem(
    'tasks',
    JSON.stringify(savedTodos)
   )

   addTaskForm.reset()
   
}

addTaskForm.addEventListener("submit", addNewTask)


const toggleTaskCompletion = (event) => {
    const listItem = event.target.parentElement
    const task = listItem.querySelector("label")

    if(event.target.checked){
        task.style.textDecoration = "line-through"
    } else {
        task.style.textDecoration =  "none"
    }
}

const removeTask = (event) => {
    const listItem = event.target.parentElement
    const task = listItem.querySelector("label").input
    const indexOfTask = savedTodos.indexOf(task)

    savedTodos.splice(indexOfTask, 1)
    localStorage.setItem(
        'tasks',
        JSON.stringify(savedTodos)
    )

    listItem.remove(task)
}


removeAllTask.addEventListener('click', () => {
    savedTodos.splice(0) 
    localStorage.removeItem("tasks")
    taskList.remove(0)
    alert("all Todos has been removed, refresh to add new Todos")
})
 