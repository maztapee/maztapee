// Delete todo item function () ===> deleting tasks of a specified category


const deleteTodoTrigger = () =>{
    //--------------------global variable declaration---------------------------------------------------------------------------------------
        const deleteButton = document.querySelectorAll('.button4');
        const list_display = document.getElementById('list_display');
        const cat_display = document.getElementById('cat_display');
    
        for(let i=0; i< deleteButton.length; i++){
            const deletion = deleteButton[i];
            deletion.onclick = function (e){
                if(confirm("You are about to delete a task in this category, please confirm to continue")) {
                    
                    const todo_id = e.target.dataset['removeid'];
                    fetch('/todos/'+todo_id+'/delete', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                        })
                        
                    deletion.parentElement.parentElement.remove();
                    console.log(deletion.parentElement.parentElement.parentElement);

                    const currentPage = document.querySelector("#todo_list");
                    if (currentPage.childElementCount === 0){
                                        
                                        setTimeout(function(){
                                                list_display.style.display = 'block';
                                                list_display.innerHTML = "Click on edit to add task to this category";
                                                list_display.classList.add("no_task");
                                                },1500);                                         
                                        }
                    }
                };
          };
      };
    deleteTodoTrigger();


//----------------------trying to create a callable function to execute in other context whenever, front end renders no todo task--------------------------------
    // function no_task(){
    //     const curPage = document.querySelector("#todo_list");
    //     if (curPage.childElementCount == 0){
    //         const showDisplay = document.getElementById('no_task');
    //         const cat_display = document.getElementById('cat_display');
    //         cat_display.style.display = 'none';
    //         setTimeout(function(){
    //         showDisplay.style.display = 'block';
    //         cat_display.style.display = 'block';
    //         cat_display.innerHTML = "You have not selected any category to view";
    //         cat_display.classList.add("no_task");
    //         }, 
    //         3000);                                                
    //     }
    // };
    // no_task();