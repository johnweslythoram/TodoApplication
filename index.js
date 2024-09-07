let row=document.getElementById("row");
let row1=document.getElementById("row1");
let alertPlaceholder = document.getElementById('alertPlaceholder');
let save=document.getElementById("onSave");


let l=getTODO();

let Tc=getCOMPLETED();




function change(checkboxId ,labelId,todoId) {
    let checkbox=document.getElementById(checkboxId);
    let label=document.getElementById(labelId);
    let todoElement = document.getElementById(todoId);
    let delItem=l.findIndex(
        function(item){
            let itemId="todo"+item.unqNO;
            if(itemId===todoId){
                return true;
            }
        }
    )
    let DelItem=l.splice(delItem,1)
    DelItem[0].unqNO="T"+DelItem[0].unqNO
    Tc.push(DelItem[0]);
    CompletedTasks(DelItem[0])
    if(checkbox.checked===true){
        label.classList.add("checked");
        row.removeChild(todoElement);

    }
    else{
        label.classList.remove("checked");
    }
};


function onDeleteTodo1(todoId,checkboxId) {
    let todoElement = document.getElementById(todoId);
    let checkbox=document.getElementById(checkboxId);
    if(checkbox.checked!==true){
        row.removeChild(todoElement);
    }
    let del=l.findIndex(
        function(item){
            let itemId="todo"+item.unqNO;
            if(itemId===todoId){
                return true;
            }
        }
    )
    l.splice(del,1)
    
  }

function onDeleteTodo(todoId,checkboxId) {
    $('#firstModal').modal('show');
    Yes.onclick=function(){
        onDeleteTodo1(todoId,checkboxId)
    }
  }


function onDeleteTodo3(todoId) {
    let todoElement = document.getElementById(todoId);
    row1.removeChild(todoElement);
    let del1=Tc.findIndex(
        function(item){
            let itemId="todo"+item.unqNO;
            if(itemId===todoId){
                return true;
            }
        }
    )
    Tc.splice(del1,1)

  }

function onDeleteTodo2(todoId) {
    $('#firstModal1').modal('show');
    Yes1.onclick=function(){
        onDeleteTodo3(todoId)
    }
  }

function CreateTodo(element){
    let todoId="todo"+element.unqNO;
    let checkboxId="checkbox"+element.unqNO;
    let labelId="label"+element.unqNO;

    let todoElement=document.createElement("div");
    todoElement.id=todoId;
    todoElement.classList.add("col-12","col-md-4");
    row.appendChild(todoElement);

    let todoElements=document.createElement("div");
    todoElements.classList.add("d-flex","todo-inner-container");
    todoElement.appendChild(todoElements);

    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.onclick=function(){
        change(checkboxId,labelId,todoId)
    };
    inputElement.classList.add("todo-checkbox");
    todoElements.appendChild(inputElement);

    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex" ,"labelcontainer");
    todoElements.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("label-text");
    labelElement.textContent = element.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("labelicon");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon","icon");
    // <i class="fa-regular fa-square-check"></i>
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId,checkboxId);
      };
    deleteIconContainer.appendChild(deleteIcon);
};

function CompletedTasks(element){
    let todoId="todo"+element.unqNO;
    let checkboxId="checkbox"+element.unqNO;
    let labelId="label"+element.unqNO;

    let todoElement=document.createElement("div");
    todoElement.id=todoId;
    todoElement.classList.add("col-12","col-md-4");
    row1.appendChild(todoElement);

    let todoElements=document.createElement("div");
    todoElements.classList.add("d-flex","todo-inner-container");
    todoElement.appendChild(todoElements);
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex" ,"labelcontainer1");
    todoElements.appendChild(labelContainer);

    let deleteIcon1 = document.createElement("i");
    deleteIcon1.classList.add("fa-regular", "fa-square-check", "delete-icon","icon1");
    labelContainer.appendChild(deleteIcon1);

    let labelElement=document.createElement ("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("label-text1");
    labelElement.textContent = element.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("labelicon1");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon","icon1");
    // <i class="fa-regular fa-square-check"></i>
    deleteIcon.onclick = function () {
        onDeleteTodo2(todoId,checkboxId);
      };
    deleteIconContainer.appendChild(deleteIcon);
}


for(let element of l){
    CreateTodo(element);
}

for(let element of Tc){
    CompletedTasks(element);
}


const showAlert = (message) => {

    alertPlaceholder.innerHTML = `
        <p style="color:red;margin:0;">${message}</p>
    `;
  };

function onAdd(){
    let userInputElement = document.getElementById("todo-input");
    let userInputValue = userInputElement.value;
    if(userInputValue === ""){
        showAlert('* Please enter some data in the input field.');
        return;
      }
    else{
        alertPlaceholder.innerHTML='';
    }
    if(userInputValue.length>=31){
        showAlert('Maximum length should be 30 characters.');
        return;
    }
    let LENGTH=0;
    for(let i of l){
        if(LENGTH<i.unqNO){
            LENGTH=i.unqNO
        }
    }
    todoCount=LENGTH+1;
    let newTodo = {
        text: userInputValue,
        unqNO: todoCount
      };
    l.push(newTodo);
    CreateTodo(newTodo);
    userInputElement.value='';
}

save.onclick=function(){
    save.textContent="Saved";
    localStorage.setItem("TODO",JSON.stringify(l));
    localStorage.setItem("COMPLETED",JSON.stringify(Tc));
    setTimeout(() => {
        save.textContent = 'Save';
    }, 5000);
}

function getTODO(){
    let stringfylist=localStorage.getItem("TODO");
    let parsedlist=JSON.parse(stringfylist)
    if(parsedlist===null){
        return [];
    }
    else{
        return parsedlist;
    }
}

function getCOMPLETED(){
    let stringfylist1=localStorage.getItem("COMPLETED");
    let parsedlist1=JSON.parse(stringfylist1)
    if(parsedlist1===null){
        return [];
    }
    else{
        return parsedlist1;
    }
}
