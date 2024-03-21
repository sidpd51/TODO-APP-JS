const form = document.getElementById('form');
let title = document.getElementById('validationCustom01');
let startDate = document.getElementById('validationCustom02');
let endDate = document.getElementById('validationCustom03');
let priorityLevel = document.getElementById('validationCustom04');
let category = document.getElementById('validationCustom05');
let desc = document.getElementById('validationCustom06');
let realMain = document.getElementById('real-main');
let dashboard = document.getElementById('dashboard');
let allTasks = document.getElementById('allTasks');
let completedTasks = document.getElementById('completedTasks');
let runningTasks = document.getElementById('runningTasks');
let mainInfo = document.getElementById('main-info');
let mainHeading = document.getElementById('main-heading');
let orderGroup = document.getElementById('order-group');
let list = document.getElementById('list');
let load = document.getElementById('load');
let dashboardCon = document.getElementById('dashboard-con');
let DashboardRunning = document.getElementById('dash-running');
let DashboardCompleted = document.getElementById('dash-completed');
let addTask = document.getElementById('addTasks');
let submitBtn = document.getElementById('submit-btn');

let titleMsg = document.querySelector('.titleMsg');
let endDateMsg = document.querySelector('.endDateMsg');
let descMsg = document.querySelector('.descMsg');

let visible = 6;

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    inputValidation();
});

const inputValidation = ()=>{
    let isValid = true;

    let currentDate = new Date().toJSON().slice(0,10);

    if(title.value.trim()==='') {
        isValid=false;
        console.log('title error');
        titleMsg.innerHTML='Please Enter a valid title!';
    }
    if(!endDate.value || currentDate>endDate.value) {
        isValid=false;
        console.log('enddate error');
        endDateMsg.innerHTML='Please Enter a valid end Date!'
    }
    if(!priorityLevel.value) {
        isValid=false;
        console.log('priority error')
    }
    if(!category.value) {
        isValid=false;
        console.log('category error')
    }
    if(!desc.value) {
        isValid=false;
        console.log('desc error')
        descMsg.innerHTML='Please Enter a valid description msg';
    }

    if(isValid){
        let val = submitBtn.getAttribute('data-action');
        let title = submitBtn.innerHTML;
        console.log(title)
        if(val==='update' && title==='Update to List') {
            console.log('inside update todo')
            updateTodoList();
        }
        else { 
            console.log('inside create todo')
            createTodo();
        };
    }else {
        console.log('invalid');
    }
}

let todos =[];
const setLocalStorage = (todos)=>{
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('todos')) || [];
}

// setLocalStorage(todos);

const createTodo = ()=> {
    let todo = {
        title: title.value,
        endDate: endDate.value,
        priorityLevel: priorityLevel.value,
        category: category.value,
        description: desc.value,
        completed: false
    }
    let todos = getLocalStorage();
    todos.push(todo);
    setLocalStorage(todos)
    alert('todo added successfully!');
    //reset the form after submission
    form.reset();
    //reset the errorMsgs 
    msgReset();
}

dashboard.addEventListener('click', () => {
    mainHeading.classList.add('display-none')
    mainInfo.classList.add('display-none');
    orderGroup.classList.add('display-none');
    realMain.classList.add('display-flex');
    dashboardCon.classList.add('display-flex');
    DashboardCompleted.innerHTML = `<h2 class="py-3 rounded-3 fw-bold mb-sm-4" style="background-color: #83C5BE; color:white;">Completed Task</h2>`;
    DashboardRunning.innerHTML = `<h2 class="py-3 rounded-3 fw-bold mb-sm-4" style="background-color: #83C5BE; color:white;">Running Task</h2>`;
    list.classList.add('display-none');
    load.classList.add('display-block');
    renderTodos();
})

allTasks.addEventListener('click', () =>{
        mainHeading.classList.remove('display-none')
    mainHeading.innerHTML='All Tasks';
    list.classList.remove('display-none')
    dashboardCon.classList.remove('display-flex')
    mainInfo.classList.add('display-none');
    orderGroup.classList.add('display-none');
    realMain.classList.add('display-flex');
    load.classList.add('display-block');

    renderAllTodos();
})

completedTasks.addEventListener('click', () => {
        mainHeading.classList.remove('display-none')
    mainHeading.innerHTML='Completed Tasks';
    list.classList.remove('display-none')
    dashboardCon.classList.remove('display-flex')
    mainInfo.classList.add('display-none');
    orderGroup.classList.add('display-none');
    realMain.classList.add('display-flex');
    load.classList.add('display-block');


    renderCompletedTodos();
})

runningTasks.addEventListener('click', ()=>{
        mainHeading.classList.remove('display-none')
    mainHeading.innerHTML='Running Tasks';
    list.classList.remove('display-none')
    dashboardCon.classList.remove('display-flex')
    mainInfo.classList.add('display-none');
    orderGroup.classList.add('display-none');
    realMain.classList.add('display-flex');
    load.classList.add('display-block');

    renderRunningTodos();
})

addTask.addEventListener('click', ()=> {
    mainHeading.innerHTML='Create your task';
    mainInfo.classList.remove('display-none');
    orderGroup.classList.remove('display-none');
    realMain.classList.remove('display-flex');
    load.classList.remove('display-block');
    submitBtn.innerHTML='Add to List';
    msgReset();
})

const updateTodo = (index)=> {

    addTask.click();
    mainHeading.innerHTML='Update your task';
    submitBtn.innerHTML='Update to List';
    let todos = getLocalStorage();
    let currentTodo = todos[index];

    if(currentTodo){
        title.value= currentTodo.title,
        endDate.value= currentTodo.endDate,
        priorityLevel.value= currentTodo.priorityLevel,
        category.value= currentTodo.category,
        desc.value= currentTodo.description
    }

    submitBtn.setAttribute('data-action', 'update');
    submitBtn.setAttribute('data-todo-index', index);
}

const updateTodoList = ()=> {
    let index = submitBtn.getAttribute('data-todo-index');
    if(index!=-1){
        let modifiedTodo = {
            title: title.value,
            endDate: endDate.value,
            priorityLevel: priorityLevel.value,
            category: category.value,
            description: desc.value
        }
        let todos = getLocalStorage();
        todos[index]=modifiedTodo;
        setLocalStorage(todos);
    }
    alert('todo updated successfully!');
    runningTasks.click();
}

const renderTodos = () => {
    let todos = getLocalStorage();
    DashboardRunning.innerHTML +=todos.slice(0,visible).map((todo,index) => {
        if(!todo.completed){
        return `
        <div class="todo-card mx-auto d-flex flex-column gap-3 p-4 rounded-3 my-3">
            <div class="todo-title-info d-flex align-items-center justify-content-between">
                <span class="todo-title fw-medium">${todo.title}</span>
                <i class="fa-solid fa-circle-info fa-lg" style="color: #FFDDD2;"></i>
            </div>
            <div class="todo-date-info d-flex align-items-center justify-content-between ">
                <span class="todo-date fw-medium">Start date: ${todo.endDate}</span>
                <i class="fa-solid fa-pen-to-square fa-lg" style="color: #FFDDD2;" onclick=updateTodo(${index})></i>
            </div>
            <div class="todo-delete-info d-flex align-items-center justify-content-between">
                <span class="mark-as-completed-${index} fw-medium" onclick=markAsCompleted(${index})><i class="fa-regular fa-pen-to-square fa-square fa-lg
                    me-2" style="color: #FFDDD2;"></i>Mark as completed</span>
                <i class="fa-regular fa-trash-can fa-lg" style="color: #FFDDD2;" onclick=deleteTodo(${index})></i>
            </div>
        </div>`
    }}).join(' ');

    DashboardCompleted.innerHTML += todos.slice(0,visible).map((todo,index) => {
        if(todo.completed){
        return `
        <div class="todo-card mx-auto d-flex flex-column gap-3 p-4 rounded-3 my-3">
            <div class="todo-title-info d-flex align-items-center justify-content-between">
                <span class="todo-title fw-medium">${todo.title}</span>
                <i class="fa-solid fa-circle-info fa-lg" style="color: #FFDDD2;"></i>
            </div>
            <div class="todo-date-info d-flex align-items-center justify-content-between ">
                <span class="todo-date fw-medium">Start date: ${todo.endDate}</span>
                <i class="fa-solid fa-pen-to-square fa-lg" style="color: #FFDDD2;" onclick=updateTodo(${index})></i>
            </div>
            <div class="todo-delete-info d-flex align-items-center justify-content-between">
                <span class="mark-as-completed-${index} fw-medium" onclick=markAsCompleted(${index})><i class="fa-regular fa-pen-to-square fa-square fa-lg
                    me-2" style="color: #FFDDD2;"></i>Mark as completed</span>
                <i class="fa-regular fa-trash-can fa-lg" style="color: #FFDDD2;" onclick=deleteTodo(${index})></i>
            </div>
        </div>`
    }}).join(' ');
}

const renderAllTodos = () => {
    let todos = getLocalStorage();
    list.innerHTML=todos.slice(0,visible).map((todo,index) => {
        return `<div class="col col-sm-6 ">
        <div class="todo-card mx-auto d-flex flex-column gap-3 p-4 rounded-3">
            <div class="todo-title-info d-flex align-items-center justify-content-between">
                <span class="todo-title fw-medium">${todo.title}</span>
                <i class="fa-solid fa-circle-info fa-lg" style="color: #FFDDD2;"></i>
            </div>
            <div class="todo-date-info d-flex align-items-center justify-content-between ">
                <span class="todo-date fw-medium">Start date: ${todo.endDate}</span>
                <i class="fa-solid fa-pen-to-square fa-lg" style="color: #FFDDD2;" onclick=updateTodo(${index})></i>
            </div>
            <div class="todo-delete-info d-flex align-items-center justify-content-between">
                <span class="mark-as-completed-${index} fw-medium" onclick=markAsCompleted(${index})><i class="fa-regular fa-pen-to-square fa-square fa-lg
                    me-2" style="color: #FFDDD2;"></i>Mark as completed</span>
                <i class="fa-regular fa-trash-can fa-lg" style="color: #FFDDD2;" onclick=deleteTodo(${index})></i>
            </div>
        </div>
      </div>`
    }).join(' ');
}

const renderRunningTodos = () => {
    let todos = getLocalStorage();
    list.innerHTML=todos.slice(0,visible).map((todo,index) => {
        if(!todo.completed){
        return `<div class="col col-sm-6 ">
        <div class="todo-card mx-auto d-flex flex-column gap-3 p-4 rounded-3">
            <div class="todo-title-info d-flex align-items-center justify-content-between">
                <span class="todo-title fw-medium">${todo.title}</span>
                <i class="fa-solid fa-circle-info fa-lg" style="color: #FFDDD2;"></i>
            </div>
            <div class="todo-date-info d-flex align-items-center justify-content-between ">
                <span class="todo-date fw-medium">Start date: ${todo.endDate}</span>
                <i class="fa-solid fa-pen-to-square fa-lg" style="color: #FFDDD2;" onclick=updateTodo(${index})></i>
            </div>
            <div class="todo-delete-info d-flex align-items-center justify-content-between">
                <span class="mark-as-completed-${index} fw-medium" onclick=markAsCompleted(${index})><i class="fa-regular fa-pen-to-square fa-square fa-lg
                    me-2" style="color: #FFDDD2;"></i>Mark as completed</span>
                <i class="fa-regular fa-trash-can fa-lg" style="color: #FFDDD2;" onclick=deleteTodo(${index})></i>
            </div>
        </div>
      </div>`
    }}).join(' ');
}

const renderCompletedTodos = () => {
    let todos = getLocalStorage();
    list.innerHTML=todos.slice(0,visible).map((todo,index) => {
        if(todo.completed){
        return `<div class="col col-sm-6 ">
        <div class="todo-card mx-auto d-flex flex-column gap-3 p-4 rounded-3">
            <div class="todo-title-info d-flex align-items-center justify-content-between">
                <span class="todo-title fw-medium">${todo.title}</span>
                <i class="fa-solid fa-circle-info fa-lg" style="color: #FFDDD2;"></i>
            </div>
            <div class="todo-date-info d-flex align-items-center justify-content-between ">
                <span class="todo-date fw-medium">Start date: ${todo.endDate}</span>
                <i class="fa-solid fa-pen-to-square fa-lg" style="color: #FFDDD2;" onclick=updateTodo(${index})></i>
            </div>
            <div class="todo-delete-info d-flex align-items-center justify-content-between">
                <span class="mark-as-completed-${index} fw-medium" onclick=markAsCompleted(${index})><i class="fa-regular fa-pen-to-square fa-square fa-lg
                    me-2" style="color: #FFDDD2;"></i>Mark as completed</span>
                <i class="fa-regular fa-trash-can fa-lg" style="color: #FFDDD2;" onclick=deleteTodo(${index})></i>
            </div>
        </div>
      </div>`
    }}).join(' ');
}

const msgReset = ()=> {
    titleMsg.innerHTML='';
    endDateMsg.innerHTML='';
    descMsg.innerHTML='';
    submitBtn.setAttribute('data-action', 'add');
    submitBtn.removeAttribute('data-todo-index');
} 

const deleteTodo = (index)=> {
    let result =confirm('Are you sure, you want to delete?')
    let todos = getLocalStorage();
    if(result) todos.splice(index,1);
    setLocalStorage(todos);
    renderTodos();
    renderCompletedTodos();
    renderRunningTodos();
    renderAllTodos();
}

const markAsCompleted = (index) => {
    // const elem = document.querySelector(`.mark-as-completed-${index}`);
    let todos = getLocalStorage()
    if(todos[index].completed) {
        alert('Mark As uncompleted');
        todos[index].completed = false;
        setLocalStorage(todos);
        renderCompletedTodos();
    }
    else {
        alert('Mark As completed');
        todos[index].completed = true;
        setLocalStorage(todos);
        renderRunningTodos();
    }
}

const loadMore = () => {
    visible+=4;
    renderTodos();
}