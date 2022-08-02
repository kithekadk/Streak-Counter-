const imageContainer = document.querySelector<HTMLDivElement>(".imageContainer")
imageContainer.style.display="flex"
const imageContainer2 = document.querySelector<HTMLDivElement>(".imageContainer2")
imageContainer2.style.display="none"
const addbtn = document.querySelector<HTMLHeadingElement>(".addbtn");
const addbtn2 = document.querySelector<HTMLHeadingElement>(".addbtn2");
const imageDiv = document.querySelector<HTMLDivElement>(".imageDiv");
const welcome = document.querySelector<HTMLDivElement>(".welcome");


const allTasks = document.querySelector('.taskdisplay');
const titleOnTasks = document.querySelector(".titleOnTasks");
const titleText=document.createElement('p');

    if (allTasks.hasChildNodes()){
            titleText.textContent="You Don't have any Activity!!!";
        }
    titleOnTasks.appendChild(titleText);
        
// TOGGLE BETWEEN THE DISPLAYS ON CLICK
addbtn.addEventListener('click', ()=>{
    if(imageContainer.style.display === "flex"){
        imageContainer.style.display="none"
        imageContainer2.style.display="flex"

    }else{
        imageContainer.style.display="flex"
        imageContainer2.style.display="none"    
    }
}) 

addbtn2.addEventListener('click', ()=>{
    if(imageContainer.style.display === "flex"){
        imageContainer.style.display="none"
        imageContainer2.style.display="flex"

    }else{
        imageContainer.style.display="flex"
        imageContainer2.style.display="none"    
    }
}) // END OF TOGGLE

const addTaskform = document.querySelector<HTMLFormElement>(".addTaskform");
const txttask = document.querySelector<HTMLInputElement>(".txttask");
const txtimg = document.querySelector<HTMLInputElement>(".txtimg");
const txtdate = document.querySelector<HTMLInputElement>(".txtdate");

class Tasks{
    private TasksToDo: task[] = [];
    
    getArray(){
        return this.TasksToDo;
    }

    pushTask(){
        const newTask:task={
            task: txttask.value,
            image: txtimg.value,
            date: txtdate.value,
        } 

        this.TasksToDo.push(newTask);
        // console.log(this.TasksToDo)
        if(imageContainer.style.display === "none"){
            imageContainer.style.display="flex"
            imageContainer2.style.display="none"
        }
    }
}

class Streaklist {

}

// class taskStreak{

// }

const taskList = new Tasks();

addTaskform.addEventListener('submit', (e) => {
    e.preventDefault();

    let values = txttask.value !== "" && txtimg.value !== "" && txtdate.value !== "";
    if (!values){
        const disclaimer = document.getElementById("alertuser");
        disclaimer.textContent="Please fill in all fields";
        disclaimer.style.color="red"  
        const warning = setTimeout(() => {
        disclaimer.textContent=""
        }, (5000));
        
        

    }else{
        taskList.pushTask();

        resetForm()
        DisplayTasks()   
    }
})

function resetForm(){
    txttask.value="";
    txtimg.value="";
    txtdate.value="";
}


// DISPLAY TASKS==================================================
function DisplayTasks(){

    const taskItems = document.querySelector(".taskdisplay");
    
    while (taskItems.hasChildNodes()) {
    taskItems.removeChild(taskItems.firstChild);
    }

    let arrayAccessor = taskList.getArray();
    arrayAccessor.forEach(({task, image, date},index:number)=>{

        const Item = document.createElement("p");
        Item.textContent=task;

        const taskImg = document.createElement("p");
        taskImg.className = "iconimage"
        taskImg.innerHTML = `${image}`;

        const taskStartdate = document.createElement("p");
        taskStartdate.textContent = date;

        const taskHolder = document.createElement('div');
        taskHolder.className="taskbox";
        taskHolder.addEventListener("click",()=>{
            popup.style.visibility="visible"
            popTask(index);
        })
       
        //holds the task items//===================================
        taskHolder.appendChild(taskImg);
        taskHolder.appendChild(Item); 
        taskHolder.appendChild(taskStartdate);

        allTasks.appendChild(taskHolder)
        

        const titleOnTasks = document.querySelector(".titleOnTasks");
        const titleText2=document.createElement('p');
        titleOnTasks

        if (allTasks.hasChildNodes()){
            
            while (titleOnTasks.hasChildNodes()) {
                titleOnTasks.removeChild(titleOnTasks.firstChild);
                }
            titleText2.textContent="Activities";
        }
        titleOnTasks.appendChild(titleText2);   
    })
}


const popup = document.querySelector<HTMLDivElement>('.popup');

function popTask(index:number){

    const taskItems2 = document.querySelector(".popup");
    
    while (taskItems2.hasChildNodes()) {
    taskItems2.removeChild(taskItems2.firstChild);
    }
    let arrayAccessor = taskList.getArray();
    
    let itemtoPop = arrayAccessor[index]

        const Item2 = document.createElement("p");
        Item2.textContent=itemtoPop.task;

        const taskImg2 = document.createElement("p");
        taskImg2.className = "iconimage"
        taskImg2.innerHTML = `${itemtoPop.image}`;

        const taskStartdate2 = document.createElement("p");
        taskStartdate2.textContent = itemtoPop.date;

        const close = document.createElement('button');
        close.textContent= 'close'
        close.addEventListener("click",()=>{
            popup.style.visibility="hidden";
        })

        const deletestreak = document.createElement('button');
        deletestreak.textContent= 'delete'
        deletestreak.addEventListener("click",()=>{
            arrayAccessor.splice(index, 1)
            DisplayTasks();
            popup.removeChild(popItem);
            popup.style.visibility="hidden";
        })

        const streakTime = document.createElement('p');

        //streak days calculation======================================
        const now = new Date();
        const datethen= new Date(itemtoPop.date);
        const difference = now.getTime()-(Math.abs(datethen.getTime()));
        const theDays = (difference/(1000*60*60*24))

        function roundNumber(num:number, decimal_digit:number) {
            let powerOften = Math.pow( 10, decimal_digit );
            let result = Math.round( num * powerOften ) / powerOften;
            streakTime.textContent = (`${result} day(s)`)
         }
        roundNumber(theDays,1 )
        //=============end of calculation==============
        
        const popItem = document.createElement('div');
        popItem.appendChild(Item2);
        popItem.appendChild(taskImg2);
        popItem.appendChild(taskStartdate2);
        popItem.appendChild(streakTime);
        popItem.appendChild(close);
        popItem.appendChild(deletestreak);

        popup.appendChild(popItem);
   
 
}
