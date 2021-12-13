"use strict";

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