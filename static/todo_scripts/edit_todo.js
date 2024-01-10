/*
To use the specific click event that initiates the edit_form pop up to target associated DOM elements
for MANIPULATION
*/
//-----------------------------------Global Variables Declarations-------------------------------------------------
        let clickedButton;
        let newData = '';
        let categoryName;
        let error = false;
//-----------------------------------Global Middlewares Definitions:-----------------------------------------------

//(1)-->Event Listener Function { For adding event listener to all edit buttons of all category names}
        document.addEventListener('DOMContentLoaded', function() {
                // Get all elements with the class 'edit-button' after page is completely loaded.
                var editButtons = document.querySelectorAll('.button2');

                // Add click event listener to each 'edit-button' element
                editButtons.forEach(function(button) {
                        button.addEventListener('click', editClickEvent);
                });
        });
//----------------------------------click event listener works as expected-------------------------------------

//(2)-->Edit Button Click Handler{For handling and return edit button click event}
        function editClickEvent(event){
                if(event){
                        openEditForm(event);
                        clickedButton = event;
                        return clickedButton;   
                        //Successfully passed this specific event to submitButton() function                    
                }else{
                        //TODO-----handle the error for non-availability of click event
                }

        };
//----------------------------------editClickEvent function works as expected-----------------------------------

//(3)-->Open Edit PopUp Function { For showing the Edit Form for todo task/category editing}
        const openEditForm = function (event){
                const editPopUp = document.querySelector('.editPopup');
                editPopUp.classList.add("showEditPopup");
                //TODO change editForm for each edit_button click
                const edit_title = event.target.dataset['cat_name'];
                document.querySelector('#edit h3').innerHTML = `Edit ${edit_title} Category`;
                RenameCat();
                };
//----------------------------------OpenEditForm function works as expected---------------------------------------

//(4)--> RenameCat Function for listening and showing form input text-field for accepting category name change input data string
        function RenameCat(){
                const targetList = document.getElementsByName('rename_cat');
                let a = targetList.length;
                for (let i=0; i<a; i++){
                        targetList[i].addEventListener('change', function (){
                                if (targetList[i].value =="YES"){
                                        const change = document.getElementById("rename_input");
                                        change.style.visibility = "visible";
                                }
                                else {
                                        const change = document.getElementById("rename_input");
                                        change.style.visibility= "hidden";
                                }
                        });
                };

        };
//----------------------------------RenameCat Function works as expected------------------------------------------

//(5)--> Category Edit Fetch Function for posting data to effect category name changes and addition of todo tasks
        async function postData() {
                try {
                //----------------------------Grabbing text input values from the form------------------------------
                        const category_id = clickedButton.target.dataset['editid'];
                        const cat_name = clickedButton.target.previousSibling.innerHTML
                        const categoryName = cat_name.trimLeft();
                        const rename = document.getElementById('edit_cat').value;
                        const cat_status = document.getElementById('category_status').value;
                        const deadline_change = document.getElementById('edit_deadline').value;
                        const new_task = document.getElementById('new_task').value;
                        console.log(categoryName, rename, cat_status, deadline_change, new_task);
                        // Perform the fetch operation
                        const response = await fetch('/categories/edit', {
                                method: 'POST',
                                body: JSON.stringify({
                                'category_id': category_id,
                                'category_name': categoryName,
                                'newCategory_name': rename,
                                'category_status': cat_status,
                                'deadline': deadline_change,
                                'todo': new_task
                                }),
                                headers: {
                                'Content-Type': 'application/json'
                                }
                        })
                        const responseData = await response.json();
                        return responseData;
                        
                } catch (error) {
                        // Handle errors here
                        if(error){
                                console.error('Error:', error.message);
                                console.log(error);
                                error = true;
                        }else{
                                error = false;
                        }
                        
                }finally{
                        closeEditPopup();
                        setTimeout(function() {
                                if(!error){
                                        console.log('Form submitted successfully!');
                                }else{
                                        console.log('Form not submitted successfully!');
                                }
                                // Reset the form to its initial state
                                document.getElementById('edit').reset();
                                }, 1500); 
                };
        };

//(6)--> Form OnReset Event Handler Function {To restore all form values to default whenever any edit button is clicked}

        function formReset(){
                //resetting all fields in edit category forms back to their default values
                let rename_input = document.getElementById('rename_input');
                rename_input.style.visibility ="hidden";
                console.log("form has been reset");
        };

//----------------------------------Form OnReset Function works as expected-----------------------------------

//(7)-->Close Edit PopUp Function { For hiding any open edit forms}
        const closeEditPopup = function(){
                edit.classList.remove("showEditPopup");
                button.style.visibility="visible";
                var myForm = document.getElementById('edit');
                myForm.reset();
        };
//----------------------------------close edit popup works as expected----------------------------------------


//(8)-->Category Name change Function{ For detecting if category name and changing respective DOM element}
        const categoryNameChange=function (name,id) {
                //Manipulate the DOM elements holding Category Elements Display
                /*TODO:
                1. Determine what aspect of todo task user is edit 
                        (a) Category Name change only {Addition of Category is in another module}
                        (b) Completion Status****{To be implemented later}
                        (c) Category Name and Addition of Sub-tasks (todos) {No name change for sub-tasks}
                */

                const category_list = document.querySelectorAll(".list");
                for (let i=0; i<category_list.length; i++){
                        if (category_list[i].dataset.category_id == id){ 
                        const atagElement = category_list[i].children[1];
                        atagElement.innerHTML = name;
                        break;
                        }
                        else{
                                // TODO: what if the IF considtion is not met?????
                        }
                };
                
        };
//(9)--> Add Todo Task Function { for adding new task to the DOM when each category editing receives new todo task to add}
        const addTodoTask = function(newTask, taskID){
                //TODO: Use server response to extract new task added to a specific category to display on the DOM
                // 1. Use click event to get category that was edited. 
                // 2. Determine if Category that was edited has any existing todo tasks displayed on the DOM
                // 2a. If no todo task displayed, implement with appending an element to an existing element
                // 2b. Else, implement by appending task to the existing LIST ELEMENT holding the list of tasks 
                console.log(`Received new todo task: ${newTask} >>>>> with task id${taskID}`);

               //--> CurrPage>>>> To help determine current number of subtasks displayed by a category!
               const currPage = document.querySelector("#list_display");

               //-->todo_list1>>>>
               const todo_list1 = document.getElementById("todo_list");

               //DOM Elements created to add new subtask to a specific Category.
               const todo_description1 = document.createElement('LI');
               const delete_button1 = document.createElement('button');
               const pTag_button1 = document.createElement('p');
               const pTag_todo1 = document.createElement('p');
               const pTag_checkbox1 = document.createElement('p');
               const todo_span1 = document.createElement('span');
               const input_check1 = document.createElement('input');
               //---------------------For Adding subtasks to a specific category---------------------------
        };

//(?)--> Submit Edit PopUp Function{ For submitting input fields to the server, closing and resetting form}
                async function submitButton (event){
                        event.preventDefault();
                        
                        const response = await postData();
                        const new_cat_name = response['category_name'];
                        const category_id = response['category_id'];
                        const new_task = response['description'];
                        const task_id = response['todo_id'];
                        categoryNameChange(new_cat_name, category_id);
                        addTodoTask(new_task, task_id);
                        //TODO--> Implement DOM Manipulation in the category name change function  categoryNameChange()   
                };
                if (clickedButton){
                        clickedButton = null;
                };
//TODO grab edit field values
//TODO validate field values 
//TODO send data to database for CRUD of todo_list