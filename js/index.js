"use strict";
const imageContainer = document.querySelector(".imageContainer");
imageContainer.style.display = "flex";
const imageContainer2 = document.querySelector(".imageContainer2");
imageContainer2.style.display = "none";
const addbtn = document.querySelector(".addbtn");
const addbtn2 = document.querySelector(".addbtn2");
const imageDiv = document.querySelector(".imageDiv");
const welcome = document.querySelector(".welcome");
const allTasks = document.querySelector('.taskdisplay');
const titleOnTasks = document.querySelector(".titleOnTasks");
const titleText = document.createElement('p');
if (allTasks.hasChildNodes()) {
    titleText.textContent = "You Don't have any Activity!!!";
}
titleOnTasks.appendChild(titleText);
// TOGGLE BETWEEN THE DISPLAYS ON CLICK
addbtn.addEventListener('click', () => {
    if (imageContainer.style.display === "flex") {
        imageContainer.style.display = "none";
        imageContainer2.style.display = "flex";
    }
    else {
        imageContainer.style.display = "flex";
        imageContainer2.style.display = "none";
    }
});
addbtn2.addEventListener('click', () => {
    if (imageContainer.style.display === "flex") {
        imageContainer.style.display = "none";
        imageContainer2.style.display = "flex";
    }
    else {
        imageContainer.style.display = "flex";
        imageContainer2.style.display = "none";
    }
}); // END OF TOGGLE
const addTaskform = document.querySelector(".addTaskform");
const txttask = document.querySelector(".txttask");
const txtimg = document.querySelector(".txtimg");
const txtdate = document.querySelector(".txtdate");
class Tasks {
    constructor() {
        this.TasksToDo = [];
        this.Timing = [];
    }
    getArray() {
        return this.TasksToDo;
    }
    pushTask() {
        const newTask = {
            task: txttask.value,
            image: txtimg.value,
            date: txtdate.value,
        };
        this.TasksToDo.push(newTask);
        // console.log(this.TasksToDo)
        if (imageContainer.style.display === "none") {
            imageContainer.style.display = "flex";
            imageContainer2.style.display = "none";
        }
    }
}
const taskList = new Tasks();
//=========CALCULATES THE STREAK RUN DAYS======================
const streakTime = document.createElement('p');
class Streaklist extends Tasks {
    constructor() {
        super();
    }
    ;
    calculateStreak(index) {
        // access the date from array in class Tasks=====
        let myArray = taskList.getArray();
        let myTask = myArray[index];
        //streak days calculation========================
        const now = new Date();
        const datethen = new Date(myTask.date);
        const difference = now.getTime() - (Math.abs(datethen.getTime()));
        const theDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        streakTime.textContent = (`${theDays} day(s)`);
        //best streak
        let arrBest = this.Timing = [];
        let largest = arrBest[0];
        this.Timing.push(theDays);
        let bestdifference = bestStreak.Start(this.Timing).getBestTime();
        largest = arrBest.sort((a, b) => a - b)[arrBest.length - 1];
        console.log(largest);
        const bestDiffdisplay = document.createElement('h3');
        bestDiffdisplay.textContent = (`${largest}Day(s) is your longest streak`);
        const bestitem = document.querySelector('.bestitem');
        while (bestitem.hasChildNodes()) {
            bestitem.removeChild(bestitem.firstChild);
        }
        bestitem.appendChild(bestDiffdisplay);
        //=============end of calculation================
    }
}
class bestStreak {
    constructor(Overaltime) {
        this.time = [];
        this.time = Overaltime;
    }
    static Start(arr) {
        return new bestStreak(arr);
    }
    getBestTime() {
        const maximum = this.time.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        return maximum;
    }
}
// form validation===================
addTaskform.addEventListener('submit', (e) => {
    e.preventDefault();
    let values = txttask.value !== "" && txtimg.value !== "" && txtdate.value !== "";
    if (!values) {
        const disclaimer = document.getElementById("alertuser");
        disclaimer.textContent = "Please fill in all fields";
        disclaimer.style.color = "red";
        setTimeout(() => {
            disclaimer.textContent = "";
        }, (5000));
    }
    else {
        taskList.pushTask();
        resetForm();
        DisplayTasks();
    }
});
function resetForm() {
    txttask.value = "";
    txtimg.value = "";
    txtdate.value = "";
}
// DISPLAY TASKS==================================================
function DisplayTasks() {
    const taskItems = document.querySelector(".taskdisplay");
    while (taskItems.hasChildNodes()) {
        taskItems.removeChild(taskItems.firstChild);
    }
    let arrayAccessor = taskList.getArray();
    arrayAccessor.forEach(({ task, image, date }, index) => {
        const Item = document.createElement("p");
        Item.textContent = task;
        const taskImg = document.createElement("p");
        taskImg.className = "iconimage";
        taskImg.innerHTML = `${image}`;
        const taskStartdate = document.createElement("p");
        taskStartdate.textContent = date;
        const taskHolder = document.createElement('div');
        taskHolder.className = "taskbox";
        taskHolder.addEventListener("click", () => {
            popup.style.visibility = "visible";
            const StreaklistInstance = new Streaklist;
            StreaklistInstance.calculateStreak(index);
            popTask(index);
        });
        //holds the task items//===================================
        taskHolder.appendChild(taskImg);
        taskHolder.appendChild(Item);
        taskHolder.appendChild(taskStartdate);
        allTasks.appendChild(taskHolder);
        const titleOnTasks = document.querySelector(".titleOnTasks");
        const titleText2 = document.createElement('p');
        if (allTasks.hasChildNodes()) {
            while (titleOnTasks.hasChildNodes()) {
                titleOnTasks.removeChild(titleOnTasks.firstChild);
            }
            titleText2.textContent = "Activities";
        }
        titleOnTasks.appendChild(titleText2);
    });
}
const popup = document.querySelector('.popup');
function popTask(index) {
    const taskItems2 = document.querySelector(".popup");
    while (taskItems2.hasChildNodes()) {
        taskItems2.removeChild(taskItems2.firstChild);
    }
    let arrayAccessor = taskList.getArray();
    let itemtoPop = arrayAccessor[index];
    const Item2 = document.createElement("p");
    Item2.textContent = itemtoPop.task;
    const taskImg2 = document.createElement("p");
    taskImg2.className = "iconimage";
    taskImg2.innerHTML = `${itemtoPop.image}`;
    const taskStartdate2 = document.createElement("p");
    taskStartdate2.textContent = itemtoPop.date;
    const close = document.createElement('button');
    close.textContent = 'close';
    close.style.padding = "10px";
    close.style.background = "red";
    close.style.border = "none";
    close.style.margin = "10px 30px 0px 0px";
    close.addEventListener("click", () => {
        popup.style.visibility = "hidden";
    });
    const deletestreak = document.createElement('button');
    deletestreak.textContent = 'delete';
    deletestreak.style.padding = "10px";
    deletestreak.style.border = "none";
    deletestreak.style.background = "grey";
    deletestreak.addEventListener("click", () => {
        arrayAccessor.splice(index, 1);
        DisplayTasks();
        popup.removeChild(popItem);
        popup.style.visibility = "hidden";
    });
    const popItem = document.createElement('div');
    popItem.appendChild(Item2);
    popItem.appendChild(taskImg2);
    popItem.appendChild(taskStartdate2);
    popItem.appendChild(streakTime);
    popItem.appendChild(close);
    popItem.appendChild(deletestreak);
    popup.appendChild(popItem);
}
