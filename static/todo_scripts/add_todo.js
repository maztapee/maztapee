const form = document.getElementById("form");
const button = document.querySelector(".stick");

function openFormPopup() {
    
    form.classList.add("showFormPopup");
    button.style.visibility="hidden";
};


function closeFormPopup() {

    form.classList.remove("showFormPopup");
    button.style.visibility="visible";
};


  //must invoke this createCategory function
const createRecord = function() {
    const submit_button = document.getElementById('submit'); //listening for submit event on submit button with id=button_id on the form
    submit_button.addEventListener('click', function(e){
        e.preventDefault(); //with submit event triggered, prevented the default behaviour of the web browser

        //global variable declaration in function "createRecord"
        const cat_name = document.getElementById('cat_name').value;
        const todo_task = document.getElementById('todo_task').value;
        const deadline = document.getElementById('deadline').value;
        const  time = new Date();
        const selectedDate = new Date(deadline);

            //Validation of values from user
            if(!cat_name || cat_name.length < 1 || !todo_task || todo_task.length < 1 || !deadline || selectedDate < time){//validation of category names: prevention of empty strings, other checks such as trim() will be implemented.
                //Need to validate for duplicate cat_name from database table of category names (todo_category under flaskr)
                    alert("Oops! You have entered either an invalid category, todo task or deadline !")
                    return;
                }
                fetch('/todos/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        'category_name': cat_name,
                        'todo_description': todo_task,
                        'completed': deadline
                        }),
                    headers: {
                        'Content-Type': 'application/json'
                        }
                    })
                    .then(function(response){
                        console.log(response);
                        return response.json();
                    })
                    .then(function(jsonResponse){
                        //
                        //AJAX Category Display
                        const cat_list = document.createElement('LI');
                        const cat_button = document.createElement('button');
                        const cat_anchor = document.createElement('a');
                        const del_button = document.createElement('button');
                        cat_list.setAttribute("class", "list");
                        cat_list.dataset.category_id=jsonResponse['id'];
                        cat_button.dataset.removeid=jsonResponse['id'];
                        cat_button.setAttribute("class", "button1");
                        cat_button.innerHTML= "&cross;";
                        del_button.dataset.editid=jsonResponse['id'];
                        del_button.setAttribute("class", "button2");
                        del_button.innerHTML = "Edit";
                        cat_anchor.href = `/categories/${jsonResponse.id}`;
                        cat_anchor.innerHTML = jsonResponse['category_name'];
                        cat_list.append(cat_button, cat_anchor, del_button);
                        document.getElementById('cat_list').appendChild(cat_list);
                        location.href=`/categories/${jsonResponse.id}`;
                        //
                        // AJAX Recent todo display
                        // const todo_list = document.createElement('UL');
 
                    })
                    .catch(   
                        error =>{                        
                            // var err = document.getElementsByClassName('error')[0];
                            // console.log(error, err.classList.add('show'));
                            // err.setAttribute("classname", "show");
                            alert("Encountered an error");
                            console.log(error);
                        } 
                    )
    });        
}
createRecord();
