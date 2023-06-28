const edit_buttons = document.querySelectorAll('.button2');
edit_buttons.forEach(edit_button=>{
        edit_button.addEventListener('click', function handleClick(event){

                showEditPopup(event);
        });
        
});

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

function showEditPopup (e){
        console.log(edit, typeof edit);
        edit.classList.add("showEditPopup");
        button.style.visibility="hidden";
        const edit_title = e.target.dataset['cat_name'];
        document.querySelector('#edit h3').innerHTML = `Edit ${edit_title} Category`;
        RenameCat();
};

const closeEditPopup = function(){
        
        edit.classList.remove("showEditPopup");
        button.style.visibility="visible";
};

function editCategory(e){
        console.log(edit);
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
                
                if (currPage.childElementCount == 0){
                        console.log(currPage.childElementCount);

                        delete_button.setAttribute("classname","button4");
                        //delete_button.dataset.removeid = editResponse['id'];
                        delete_button.innerHTML = "&cross;";
                        pTag_button.append(delete_button);
                        todo_list.setAttribute("id", "todo_list");
                        todo_span.innerHTML = new_task;
                        pTag_todo.append(todo_span);
                        //input_check.dataset.id = editResponse['id'];
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
                        console.log("hello world");
                
        
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
                        })
                        .then(function(editResponse){
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

                        });
                };
                        // const currPage = document.querySelector("#todo_list");
                        // if (currPage.childElementCount === 0){

                        //                     }
        
        
        };
        closeEditPopup();
};