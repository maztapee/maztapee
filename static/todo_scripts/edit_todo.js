const edit_buttons = document.querySelectorAll('.button2');
edit_buttons.forEach(edit_button => {
        edit_button.addEventListener('click', function handleClick(event) {

                showEditPopup(event);
        });

});

function RenameCat() {
        const targetList = document.getElementsByName('rename_cat');
        let a = targetList.length;
        for (let i = 0; i < a; i++) {
                targetList[i].addEventListener('change', function () {
                        if (targetList[i].value == "YES") {
                                const change = document.getElementById("rename_input");
                                change.style.visibility = "visible";
                        }
                        else {
                                const change = document.getElementById("rename_input");
                                change.style.visibility = "hidden";
                        }
                });
        };

};

function showEditPopup(e) {

        edit.classList.add("showEditPopup");
        button.style.visibility = "hidden";
        const edit_title = e.target.dataset['cat_name'];
        document.querySelector('#edit h3').innerHTML = `Edit ${edit_title} Category`;
        RenameCat();
};

const closeEditPopup = function () { // Close Edit PopUp
        edit.classList.remove("showEditPopup");
        button.style.visibility = "visible";
};

function clickEditEvent() {

        const edit_click = document.querySelectorAll('.button2');

        function handleButtonClick(event) {

                return event;
        }

        edit_click.forEach(edit_button => {

                edit_button.addEventListener('click', function (event) {

                        const clickedEvent = handleButtonClick(event);

                        returnClickEvent(clickedEvent);
                });
        });

        return handleButtonClick;
}

function returnClickEvent(event_click) {

        event_click = clickEditEvent();
        return event_click;
};

function editCategory(e) {
        try {
                     /*
        Function to perform edit operations on Todo Tasks and their Categories
        * Add new category
        * Delete existing category
        * Rename existing category
        * Add new todo to existing category
        * Delete existing todo from an existing category
        * Mark & Unmark todo as completed/uncompleted task
        */
        const currPage = document.querySelector("#list_display");
        const todo_list = document.createElement('UL');
        const todo_description = document.createElement('LI');
        const delete_button = document.createElement('button');
        const pTag_button = document.createElement('p');
        const pTag_todo = document.createElement('p');
        const pTag_checkbox = document.createElement('p');
        const todo_span = document.createElement('span');
        const input_check = document.createElement('input');

        // getting category name of category clicked
        let data = "";

        data = e.parentElement.parentElement.getElementsByTagName('h3')[0].innerHTML;
        
        const arrayOfData = data.split(' ');

        let newData = ''; //Available in the function scope

        for (let i = 0; i < arrayOfData.length; i++) {

                if (i === 0 || i === arrayOfData.length - 1) {
                        continue
                }

                newData += ` ${arrayOfData[i]}`;
        }
        // console.log('newData');
        // console.log(newData.trim());
        //---------------------getting users' inputs from form------------------------------------------------
        const cat_name = newData.trim();
        const rename = document.getElementById('edit_cat').value;
        const cat_status = document.getElementById('category_status').value;
        const deadline_change = document.getElementById('edit_deadline').value;
        const new_task = document.getElementById('new_task').value;
        
        const obj = {
                'category_name': cat_name,
                'newCategory_name': rename,
                'category_status': cat_status,
                'deadline': deadline_change,
                'todo': new_task
        };

        
        async  function postResource(obj){
                return new Promise( async function(resolve, reject){
                        try {
                                // console.log('fetching');
                                const result = await fetch('/categories/edit', {
                                        method: 'POST',
                                        body: JSON.stringify(obj),
                                        headers: {
                                                'Content-Type': 'application/json'
                                        }
                                });
                                result? resolve(result.json()): reject(new Error('no result'))
                        } catch (error) {
                             reject(new Error(error.message));   
                        }     
                });
                
        };

        // console.log('fetched');

        //-------------------validation check for logic implementation for acceptable data edit-----------------

        //-------------------checking for missing data input for acceptable transaction at the back end-----------
        //-------------------changing name of category, addition of todo tasks------------------------------------
        //-------------------category name change requires only one field from form-------------------------------
        //-------------------adding todo task requires no name change, but can happen with a name change----------
        //-------------------acceptable data input tuples are (1) only category name change, (2) New todo task and date or (3) data from 1 and 2 together

        //-------------------check for new task and date---------------------------------------------------------

        if ((!deadline_change.trim() && new_task.trim()) || (deadline_change.trim() && !new_task.trim()) || (!new_task.trim() && !deadline_change.trim() && !rename.trim())) {
                console.log("no valid input inserted");
                alert("You have failed to insert a valid input for a either a category name change, task description or task deadline");
        }

        if (rename.trim()) {
                // console.log('only cat_name changed');
                if (confirm("Do you want to edit " + `${cat_name}` + " task category")){
                        postResource(obj).then(function(editResponse){
                                
                                if (editResponse){

                                        console.log(editResponse);
                                }
                        // ------------------------------------------------------------------------------------------------
                        // changing category name from edit response if there is any change in its initial name!
                        //--------------------------------------------------------------------------------------------------
                                const category_list = document.querySelectorAll(".list");
                                for (let i = 0; i < category_list.length; i++) {
                                        if (category_list[i].dataset.category_id == editResponse.id) { //the if condition was not met
                                                const atagElement = category_list[i].children[1];
                                                atagElement.innerHTML = editResponse.category_name;
                                                console.log(rename);
                                                break;
                                                }
                                        };
                        
                        })
                };
        }
        //--------------------adding todo task must be accompanied by a future date, else....only category name edit permitted without date entry------
        else if (((!new_task && !deadline_change) || (new_task && deadline_change)) && (!rename.trim())) {
                if (confirm("Do you want to edit " + `${cat_name}` + " task category"));

                postResource(obj).then(function (editResponse) {
                        if (cat_name){
                                const catt_name = document.getElementById('cat_display');
                                const comp_name = catt_name.getElementsByTagName('h2')[0].innerHTML;
                                const sub_string = comp_name.split(" ");
                                const sub_name = sub_string.slice(10).join(" ");
                                /*
                                sub_name is name of category todo on display todo display column
                                cat_name is name of category retrieved through the edit button click event
                                */
                                if (sub_name.trim()===cat_name.trim()){
                                //comparison to stop DOM manipulation when edited category is not on display
                                //Investigate the unimplemented {else conditioning} 
                                        if (currPage.childElementCount == 0) {
                                                //if selected category to edit does not have any todo list item
                                                delete_button.setAttribute("classname", "button4");
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
                                                var list_display = document.getElementById('todo_list');
                                                list_display.innerHTML = " ";
                                                list_display.classList.remove("no_task");
                                                list_display.append(todo_list);
        
                                        }
                                        
                                        else {
                                                // adding todo items in a category on display with already existing todo list items
                                                // ---------------------------------------------------------------------------------
                                                
                                                delete_button.setAttribute("classname", "button4");
                                                delete_button.dataset.removeid = editResponse['todo_id'];
                                                delete_button.innerHTML = "&cross;";
                                                pTag_button.append(delete_button);
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
                                                const todoList = document.getElementById('todo_list')
                                                todoList.appendChild(todo_description);
                                                delete_button.onclick = async function(e){
                                                        if (confirm("You are deleting a newly created task, do you want to proceed?")){
                                                                // console.log(e);
                                                                const todo_id = editResponse['todo_id'];                                                        
                                                                try {
                                                                        const response = await fetch('/todos/'+ todo_id + '/delete', {
                                                                            method: 'DELETE',
                                                                            headers: {
                                                                                'Content-Type': 'application/json'
                                                                            }
                                                                        });
                                                                        if (response.ok) {
                                                                                console.log("gone past delete function");
                                                                                document.getElementById('todo_list').removeChild(todo_description);
                                                                        }
                                                                    } catch (error) {
                                                                        console.error('An error occurred:', error);
                                                                    }
                                                                
                                                        }
                                                        // remove by id from db
                                                };
        
                                                return;
                                        };
                                }

                        };
                });


        };
        
        closeEditPopup();   
        } catch (error) {
           console.log(error);     
        }
};

// editCategory(false);