const deleteReq = async function (todo_id){
    
    fetch('/todos/'+todo_id+'/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        })
};
const deleteTodoTrigger = () =>{
    //--------------------global variable declaration---------------------------------------------------------------------------------------
        const deleteButton = document.querySelectorAll('.button4');
        const list_display = document.getElementById('list_display');
        // const cat_display = document.getElementById('cat_display');
    
        for(let i=0; i< deleteButton.length; i++){
            const deletion = deleteButton[i];
            deletion.onclick = function (e){
                if(confirm("You are about to delete a task in this category, please confirm to continue")) {
                    
                    const todo_id = e.target.dataset['removeid'];
                    const todo_delete = deleteReq(todo_id);
                    todo_delete.then(function (){
                        deletion.parentElement.parentElement.remove();
                        showMessage("Task has been deleted successfully!", "success");

                        const currentPage = document.querySelector("#todo_list");
                        if (currentPage.childElementCount === 0){
                                        
                                        setTimeout(function(){
                                                list_display.style.display = 'block';
                                                list_display.innerHTML = "Click on edit to add task to this category";
                                                list_display.classList.add("no_task");
                                                },1500);                                         
                                        }
                                    });
                    }
                };
          };
      };
    deleteTodoTrigger();