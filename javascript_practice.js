function editCategory(e){
    const currPage = document.querySelector("#list_display");
    const todo_list1 = document.getElementById("todo_list");
    const todo_description1 = document.createElement('LI');
    const delete_button1 = document.createElement('button');
    const pTag_button1 = document.createElement('p');
    const pTag_todo1 = document.createElement('p');
    const pTag_checkbox1 = document.createElement('p');
    const todo_span1 = document.createElement('span');
    const input_check1 = document.createElement('input');

    const todo_list = document.createElement('UL');
    const todo_description = document.createElement('LI');
    const delete_button = document.createElement('button');
    const pTag_button = document.createElement('p');
    const pTag_todo = document.createElement('p');
    const pTag_checkbox = document.createElement('p');
    const todo_span = document.createElement('span');
    const input_check = document.createElement('input');

// getting category name of category clicked
    const data = e.parentElement.parentElement.getElementsByTagName('h3')[0].innerHTML
    const arrayOfData = data.split(' ');
    let newData = '';
    for(let i =0; i < arrayOfData.length; i++){
               
            if(i === 0 || i === arrayOfData.length - 1){
                    continue
                    }
    
            newData += ` ${arrayOfData[i]}`;                
    }

    //---------------------getting users' inputs from form------------------------------------------------

    const cat_name = newData.trim();
    const rename = document.getElementById('edit_cat').value;
    const cat_status = document.getElementById('category_status').value;
    const deadline_change = document.getElementById('edit_deadline').value;
    const new_task = document.getElementById('new_task').value;

    //-------------------validation check for logic implementation for acceptable data edit-----------------

    //-------------------checking for missing data input for acceptable transaction at the back end-----------
    //-------------------changing name of category, addition of todo tasks------------------------------------
    //-------------------category name change requires only one field from form-------------------------------
    //-------------------adding todo task requires no name change, but can happen with a name change----------
    //-------------------acceptable data input tuples are (1) only category name change, (2) New todo task and date or (3) data from 1 and 2 together

    //-------------------check for new task and date---------------------------------------------------------

    if ((!deadline_change.trim() && new_task.trim()) || (deadline_change.trim() && !new_task.trim())){
            alert("You have failed to insert either a valid deadline or task description");
    }
    //--------------------adding todo task must be accompanied by a future date, else....only category name edit permitted without date entry------
    else if ((!new_task && !deadline_change) || (new_task && deadline_change)){
            if(confirm("Do you want to edit "+ `${cat_name}`+" task category"));

            fetch ('/categories/edit', {
                    method: 'POST',
                    body: JSON.stringify({
                            'category_name': cat_name,
                            'newCategory_name': rename,
                            'category_status': cat_status,
                            'deadline': deadline_change,
                            'todo': new_task
                    }),
                    headers: {
                            'Content-Type': 'application/json'
                    }
            })
            .then(function(response){

                    return response.json();
            }).then(function(editResponse){
                if (currPage.childElementCount == 0){

                    delete_button.setAttribute("classname","button4");
                    delete_button.dataset.removeid = editResponse['id'];
                    delete_button.innerHTML = "&cross;";
                    pTag_button.append(delete_button);
                    todo_list.setAttribute("id", "todo_list");
                    todo_span.innerHTML = new_task;
                    pTag_todo.append(todo_span);
                    input_check.dataset.id = editResponse['id'];
                    input_check.setAttribute("classname", "check");
                    input_check.setAttribute("id", "check_status");
                    input_check.setAttribute("type", "checkbox");
                    pTag_checkbox.append(input_check);
                    todo_description.append(pTag_button);
                    todo_description.append(pTag_todo);
                    todo_description.append(pTag_checkbox);
                    todo_list.appendChild(todo_description);
                    var list_display = document.getElementById('list_display');
                    list_display.innerHTML = " ";
                    list_display.classList.remove("no_task");
                    list_display.append(todo_list);

                }
                else{
                    // populating todo tasks list on the view
                    // ---------------------------------------------------------------------------------------------
                    
                    delete_button.setAttribute("classname","button4");
                    delete_button.dataset.removeid = editResponse['id'];
                    delete_button.innerHTML = "&cross;";
                    pTag_button.append(delete_button);
                    todo_list.setAttribute("id", "todo_list");
                    todo_span.innerHTML = editResponse['description'];
                    pTag_todo.append(todo_span);
                    input_check.dataset.id = editResponse['id'];
                    input_check.setAttribute("classname", "check");
                    input_check.setAttribute("id", "check_status");
                    input_check.setAttribute("type", "checkbox");
                    pTag_checkbox.append(input_check);
                    todo_description.append(pTag_button);
                    todo_description.append(pTag_todo);
                    todo_description.append(pTag_checkbox);
                    todo_list.appendChild(todo_description);
                    // ------------------------------------------------------------------------------------------------
                    // changing category name from edit response if there is any change in its initial name!
                    //--------------------------------------------------------------------------------------------------
                    const category_list = document.querySelectorAll(".list");
                    for (let i=0; i<category_list.length; i++){
                            if (category_list[i].dataset.category_id == editResponse.id){ //the if condition was not met.......
                            const atagElement = category_list[i].children[1];
                            atagElement.innerHTML = editResponse.category_name;
                            break;
                            }
                    };
                    
                    return;       
                };
            });

            
    };
    closeEditPopup();
};

deleteTodoTrigger();






































































































































































































// const deleteTodoTrigger = () => {
//     const listDisplay = document.getElementById('list_display');
//     const currentPage = document.querySelector("#todo_list");
  
//     const observer = new MutationObserver ((mutations) => {
//         mutations.forEach((mutation) =>{
//             if (mutation.type === 'childList' && currentPage.childElementCount === 0){
//                 const cat_display = document.getElementById('cat_display');
                
//                 cat_display.append('<h2> Here is the list of your')
//                 // listDisplay.style.display = 'block';
//                 // listDisplay.innerHTML = "Click on EDIT to add tasks to this category";
//                 // listDisplay.classList.add("no_task");
//             } 
//             else  { 
//                 if(mutation.type ==='childlist' && currentPage.childElementCount > 0){
//                   listDisplay.innerHTML = currentPage;
//                   listDisplay.classList.remove("no_task");
//                 };
//             };
//         });
//     });
  
//     observer.observe(currentPage, {childList: true});
//   };





























































// const deleteTodoTrigger = () => {
//   const deleteButtons = document.querySelectorAll('.button4');
//   const listDisplay = document.getElementById('list_display');
//   const currentPage = document.querySelector("#todo_list");

//   const observer = new MutationObserver ((mutations) => {
//       mutations.forEach((mutation) =>{
//           if (mutation.type === 'childList' && currentPage.childElementCount === 0){
//               listDisplay.style.display = 'block';
//               listDisplay.innerHTML = "Click on EDIT to add tasks to this category";
//               listDisplay.classList.add("no_task");
//           } 
//           else  { 
//               if(mutation.type ==='childlist' && currentPage.childElementCount > 0){
//                 listDisplay.innerHTML = currentPage;
//                 listDisplay.classList.remove("no_task");
//               };
//           };
//       });
//   });

//   deleteButtons.forEach((button)=>{
//       button.addEventListener('click', async (event) =>{
//           if (!confirm ("You are about to delete a task, please confirm to continue")){
//               return;
//           }

//           const todoId = event.target.dataset.removeid;

//           try{
//               const response = await fetch(`/todos/${todoId}/delete`, {
//                   method: 'DELETE',
//                   headers: {
//                       'Content-Type': 'application/json'
//                   }
//               });
//               if (!response.ok){
//                   throw new Error('Failed to delete a task');
//               }
//               event.target.parentElement.parentElement.remove();
//           }
//           catch (error){
//               console.error(error);
//           }
//       });  
//   });
//   observer.observe(currentPage, {childList: true});
// };
deleteTodoTrigger();

// const deleteTodoTrigger = () =>{
//   const deleteButton = document.querySelectorAll('.button4');
//   for(let i=0; i< deleteButton.length; i++){
//       const deletion = deleteButton[i];
//       deletion.onclick = function (e){
//           if(confirm("You are about to delete a Category, please confirm to continue")) {
//           console.log('event', e);
//           const todo_id = e.target.dataset['removeid'];
//           fetch('/todos/'+todo_id+'/delete', {
//               method: 'DELETE',
//               headers: {
//                   'Content-Type': 'application/json'
//               }
//               })
//           console.log(todo_id);
//           deletion.parentElement.parentElement.remove();
//           const currentPage = document.querySelector("#todo_list");
//           if (currentPage.childElementCount == 0){
//               const list_display = document.getElementById('list_display');
//               setTimeout(function(){
//                       list_display.style.display = 'block';
//                       list_display.innerHTML = "Click on edit to add task to this category";
//                       list_display.classList.add("no_task");
//                       },1500);                                         
//               }
          
//           };
//       };
//   };
// };

// deleteTodoTrigger();