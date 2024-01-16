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

//(2)-->Edit Button Click Handler{For handling and returning the click event of the edit button that was clicked}
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
                        // //console.log(categoryName, rename, cat_status, deadline_change, new_task);

                        if((!new_task && deadline_change) || (new_task && !deadline_change)){
                                alert("To add a task to a category, you must enter a task and expected date of completion");
                                throw new Error("Missing or Invalid Values for Task Description or Task Reminder Date");
                        };
                //--------------------------------------------------------------------------------------------------

                //--------------------------------------------------------------------------------------------------
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
//----------------------------------PostData Function works as expected-------------------------------------------


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
                        clickedButton.target.dataset['cat_name'] = name;
                        break;
                        }
                        else{
                                // TODO: what if the IF considtion is not met?????
                        }
                };
                console.log(clickedButton);
                
        };
//(9)--> Add Todo Task Function { for adding new task to the DOM when each category editing receives new todo task to add}
        const addTodoTask = function(newTask, taskID){
                //TODO: Use server response to extract new task added to a specific category to display on the DOM
                // 1. Use click event to get category that was edited. 
                // 2. Is the current URL same with that of the URL of the category that was clicked
                // 2a. {if YES}>>>>>Add to the DOM with AJAX
                // 2b. {if NO}>>>>>>Do nothing to the DOM
                // 3. {if 2a}>>>>>>Determine if Category that was edited has any existing todo tasks displayed on the DOM
                // 3a. If no todo task displayed, implement with appending an element to an existing element
                // 3b. Else, implement by appending task to the existing LIST ELEMENT holding the list of tasks 
                // console.log(`Received new todo task: ${newTask} >>>>> with task id${taskID}`);

               //DOM Elements created to add new subtask to a specific Category..................................
               const display_list = document.createElement('ul')
               const todo_list = document.createElement('li');
               const delete_button = document.createElement('button');
               const pTag_button = document.createElement('p');
               const pTag_todo = document.createElement('p');
               const pTag_checkbox = document.createElement('p');
               const todo_span = document.createElement('span');
               const input_check = document.createElement('input');
               const task_list = document.getElementById("todo_list");//List housing todo task
               const list_display = document.getElementById('list_display');//Unorder List housing todo_list
               //---------------------For Adding subtasks to a specific category---------------------------------

                let catIdFromURL = window.location.pathname;
                let currURL = clickedButton.target.previousSibling.pathname;
                let curr_URL = currURL + '/';
                if(catIdFromURL==curr_URL){
                        // console.log(`Both current URL ${curr_URL} and ${catIdFromURL} are the same`);
                        //--> CurrPage>>>> To help determine current number of subtasks loaded and displayed by a category!
                        //--> CurrPage is the div created to house todo list
                        const currPage = document.querySelector("#list_display");
                        if(currPage.children.length > 0){
                                if(newTask.trim()){
                                        console.log(currPage.children);
                                        delete_button.setAttribute("classname","button4");
                                        delete_button.dataset.removeid = taskID;
                                        delete_button.innerHTML = "&cross;";
                                        pTag_button.append(delete_button);
                                        todo_list.setAttribute("id", "todo_list");
                                        todo_span.innerHTML = newTask;
                                        pTag_todo.append(todo_span);
                                        input_check.dataset.id = taskID;
                                        input_check.setAttribute("classname", "check");
                                        input_check.setAttribute("id", "check_status");
                                        input_check.setAttribute("type", "checkbox");
                                        pTag_checkbox.append(input_check);
                                        todo_list.append(pTag_button);
                                        todo_list.append(pTag_todo);
                                        todo_list.append(pTag_checkbox);
                                        task_list.appendChild(todo_list);
                                        showMessage(`New Tasks Have Been Added Successfully!`, "success");
                                }
                        }else{
                                delete_button.setAttribute("classname","button4");
                                delete_button.dataset.removeid = taskID;
                                delete_button.innerHTML = "&cross;";
                                pTag_button.append(delete_button);
                                todo_list.setAttribute("id", "todo_list");
                                todo_span.innerHTML = newTask;
                                pTag_todo.append(todo_span);
                                input_check.dataset.id = taskID;
                                input_check.setAttribute("classname", "check");
                                input_check.setAttribute("id", "check_status");
                                input_check.setAttribute("type", "checkbox");
                                pTag_checkbox.append(input_check);
                                todo_list.append(pTag_button);
                                todo_list.append(pTag_todo);
                                todo_list.append(pTag_checkbox);
                                display_list.setAttribute("id", "todo_list");
                                display_list.appendChild(todo_list);
                                list_display.innerHTML = " ";
                                list_display.classList.remove("no_task");
                                list_display.appendChild(display_list);
                                alert(`New Tasks Have Been Created Successfully!`)
                        }
                }else{
                        //--> Todo List already loaded on the DOM
                        const todo_list1 = document.getElementById("todo_list");
                        console.log(`Both current URL ${curr_URL} and ${catIdFromURL} are NOT the same`);
                };
        };

//(10)--> Submit Edit PopUp Function{ For submitting input fields to the server, closing and resetting form}
                async function submitButton (event){
                        event.preventDefault();
                        try {
                                const response = await postData();
                                const new_cat_name = response['category_name'];
                                const category_id = response['category_id'];
                                const new_task = response['description'];
                                const task_id = response['todo_id'];
                                categoryNameChange(new_cat_name, category_id);
                                addTodoTask(new_task, task_id);
                                //TODO--> Implement DOM Manipulation in the category name change function  categoryNameChange()
                        } catch (error) {
                                return ("This error has occurred: " + error.message);
                        }   
                };
//---------------------------------Resetting the variable holding the click event to null---------------------                
                if (clickedButton){
                        clickedButton = null;
                };


/*TODO:
                1. Implement self disappearing messages for successfully completing the following edit operations:
                        a. Category Delete
                        b. Category Status Update
                        c. Category Creation(***)
                        d. Task Delete
                        e. Task Status Update
                        f. Task Addition to a Category
                2. Add Category Name/Todo Task Validator to block same name in Category Creation and Change and Todo Task Creation
                3. Delete immediately added todo tasks
*/