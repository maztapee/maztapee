const deleteTodoTrigger = () => {
    const listDisplay = document.getElementById('list_display');
    const currentPage = document.querySelector("#todo_list");
  
    const observer = new MutationObserver ((mutations) => {
        mutations.forEach((mutation) =>{
            if (mutation.type === 'childList' && currentPage.childElementCount === 0){
                const cat_display = document.getElementById('cat_display');
                
                cat_display.append('<h2> Here is the list of your')
                // listDisplay.style.display = 'block';
                // listDisplay.innerHTML = "Click on EDIT to add tasks to this category";
                // listDisplay.classList.add("no_task");
            } 
            else  { 
                if(mutation.type ==='childlist' && currentPage.childElementCount > 0){
                  listDisplay.innerHTML = currentPage;
                  listDisplay.classList.remove("no_task");
                };
            };
        });
    });
  
    observer.observe(currentPage, {childList: true});
  };





























































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