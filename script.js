"use strict";

//variable
const listFooter = document.querySelector("ul.insert.list footer"); 

// page Reload Event Listener
document.addEventListener("DOMContentLoaded" , getLocalStorage);

// Show All Available Todo Items
const itemsCount = document.querySelector("ul.insert.list footer div p span");
function counting(){
    let listItems = document.querySelectorAll("ul.insert.list > li.active");
    itemsCount.textContent = listItems.length;
}

// Switch between Dark/Light Mode
const nightMode = document.getElementById("nightmode");
const checkMode = document.getElementById("darkmode");
const nightModeIcon = document.querySelector(".title label span i");

function changeMode(){
    if(checkMode.hasAttribute("checked")){
        checkMode.removeAttribute("checked");
        nightMode.removeAttribute("href" , "nightmode.css");
        nightModeIcon.classList.replace("fa-sun","fa-moon");
    }else{
        checkMode.setAttribute("checked" , "");
        nightMode.setAttribute("href" , "nightmode.css");
        nightModeIcon.classList.replace("fa-moon","fa-sun");
    }
}

// add too list 
const newTodo = document.querySelector("div.insert input");
const notify = document.getElementById("notify");
let notifyFlag = true;

newTodo.addEventListener("keypress" , function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        addTodo();
    }
});

function addTodo() {
    if(newTodo.value){
        let liTag = document.createElement("li");
        liTag.classList.add("active");
        let listElements = `<label><input type="checkbox"><div class="checkbox" onclick=stats(this)><i class="fas fa-check"></i></div></label><input type=text value='${newTodo.value}' class='' disabled><div class=tools><button onclick=changeTitle(this)><i class='fas fa-pen'></i></button><button onclick=removeTodo(this)><i class='fas fa-times'></i></button></div>`;
        liTag.innerHTML = listElements;
        listFooter.before(liTag);
        saveLocalStorage(newTodo.value);
        newTodo.value = "";
        counting();
    }else{
        if(notifyFlag){
            notifyFlag = false;
            notify.classList.add("notifying");
            setTimeout(function(){
                notify.classList.add("notified");
            }, 3200);
            setTimeout(function(){
                notify.classList.remove("notified" , "notifying");
                notifyFlag = true;
            } , 4200);
        }
    }
}

// Remove Todo Items
function removeTodo(elem){
    let parent = elem.parentNode.parentNode;
    parent.style.transition = "250ms ease-in";
    parent.style.opacity = ".1";
    setTimeout(function(){
        removeFromLocalStorage(elem.parentNode.previousElementSibling);
        elem.parentNode.parentNode.remove();
        counting();
    } , 400);
}

// Edit Todo Title
function changeTitle(elem){
    if(elem.parentNode.parentNode.classList.contains("completed")){
        return;
    }
    let editInput = elem.parentNode.previousElementSibling;

    editInput.addEventListener("keypress" , function(event){
        if(event.keyCode === 13){
            if(editInput.value == ""){
                return removeTodo(elem);
            }
            editInput.setAttribute("disabled" , "");
        }
    });

    if(editInput.hasAttribute("disabled")){
        editInput.removeAttribute("disabled");
        editInput.select();
    }else{
        if(editInput.value == ""){
            return removeTodo(elem);
        }
        editInput.setAttribute("disabled" , "");
    }
}

// Active and completed items
function stats(elem){
    let todoTitle = elem.parentNode.nextSibling;
    todoTitle.classList.toggle("finishedTask");
    let mainParentTag = elem.parentNode.parentNode;
    if(mainParentTag.classList.contains("active")){
        mainParentTag.classList.replace("active" , "completed");
        return counting();
    }
    mainParentTag.classList.replace("completed" , "active");
    counting();
}
function formatAll(){
    let allTask = document.querySelectorAll("ul.insert.list li");
    allTask.forEach(function(element){
        element.style.display = "flex";
    });
}
function formatActives(){
    let allTask = document.querySelectorAll("ul.insert.list li.completed");
    formatAll();
    allTask.forEach(function(element){
        element.style.display = "none";
    });
}
function formatCompleted(){
    let allTask = document.querySelectorAll("ul.insert.list li.active");
    formatAll();
    allTask.forEach(function(element){
        element.style.display = "none";
    });
}
function clearAllCompleted(){
    let allTask = document.querySelectorAll("ul.insert.list li.completed");
    allTask.forEach(function(element){
        element.remove();
    });
}

// LocalStorage
function saveLocalStorage(todo){
    let savedTodoItems = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    savedTodoItems.push(todo);
    localStorage.setItem("todoList" , JSON.stringify(savedTodoItems));
}
function getLocalStorage(){
    let savedTodoItems = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    savedTodoItems.forEach(function(element){
        let liTag = document.createElement("li");
        liTag.classList.add("active");
        let listElements = `<label><input type="checkbox"><div class="checkbox" onclick=stats(this)><i class="fas fa-check"></i></div></label><input type=text value='${element}' class='' disabled><div class=tools><button onclick=changeTitle(this)><i class='fas fa-pen'></i></button><button onclick=removeTodo(this)><i class='fas fa-times'></i></button></div>`;
        liTag.innerHTML = listElements;
        listFooter.before(liTag);
    });
    counting();
}
function removeFromLocalStorage(todo){
    let savedTodoItems = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    let itemsList = savedTodoItems.filter(function(value){
        return value !== todo.value;
    });
    localStorage.setItem("todoList" , JSON.stringify(itemsList));
}