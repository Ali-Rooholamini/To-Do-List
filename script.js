"use strict";

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

// add too list machine
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
        let listElements = `<input type=checkbox><div class=checkbox><i class='fas fa-check'></i></div><input type=text value='${newTodo.value}' disabled><div class=tools><button><i class='fas fa-pen'></i></button><button><i class='fas fa-times'></i></button></div>`;
        labelTag.innerHTML = listElements;
        listFooter.before(labelTag);
        newTodo.value = "";
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