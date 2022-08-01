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
            titleText.textContent="No Activities";
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
        console.log(this.TasksToDo)
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

//this host the task,image and date
// DISPLAY TASKS
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

        const close = document.createElement('button');
        close.textContent= 'close'
        close.style.display='none'

        const deletestreak = document.createElement('button');
        deletestreak.textContent= 'delete'
        deletestreak.style.display='none'

        const taskHolder = document.createElement('div');
        // taskHolder.className="taskholder"
        taskHolder.style.width="15vw";
        taskHolder.style.minHeight="10vw";
        taskHolder.style.border="solid rgb(252, 122, 74) 1px";
        taskHolder.style.padding="10px";
       
        taskHolder.appendChild(taskImg);
        taskHolder.appendChild(Item); 
        taskHolder.appendChild(taskStartdate);
        taskHolder.appendChild(close);
        taskHolder.appendChild(deletestreak);
        
        allTasks.appendChild(taskHolder)

        const titleOnTasks = document.querySelector(".titleOnTasks");
        const titleText2=document.createElement('p');

        if (allTasks.hasChildNodes()){
            
            while (titleOnTasks.hasChildNodes()) {
                titleOnTasks.removeChild(titleOnTasks.firstChild);
                }
            titleText2.textContent="Activities";
        }
        titleOnTasks.appendChild(titleText2);
        
    })
}
