"use strict";


// Show All Available Todo Items
const itemsCount = document.querySelector("div.insert.list footer div p span");
function counting(){
    let listItems = document.querySelectorAll("div.insert.list > label");
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
const listFooter = document.querySelector("div.insert.list footer");
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
        let labelTag = document.createElement("label");
        // labelTag.classList.add("active");
        let listElements = `<input type=checkbox><div class=checkbox onclick=stats(this)><i class='fas fa-check'></i></div><input type=text value='${newTodo.value}' disabled><div class=tools><button onclick=changeTitle(this)><i class='fas fa-pen'></i></button><button onclick=removeTodo(this)><i class='fas fa-times'></i></button></div>`;
        labelTag.innerHTML = listElements;
        listFooter.before(labelTag);
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
        elem.parentNode.parentNode.remove();
        counting();
    } , 400);
}

// Edit Todo Title
function changeTitle(elem){
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
