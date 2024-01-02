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

let clickEvent;

function clickEditEvent(event) {
        clickEvent = event;
        return event;

}


// function returnClickEvent(event_click) {

//         event_click = clickEditEvent();
//         return event_click;
// };

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
               
                //---------------------getting users' inputs from form------------------------------------------------
                const cat_name = newData.trim();
                const rename = document.getElementById('edit_cat').value;
                const cat_status = document.getElementById('category_status').value;
                const deadline_change = document.getElementById('edit_deadline').value;
                const new_task = document.getElementById('new_task').value;
                
                console.log("old category name: ", cat_name, "new category name: ", rename);
                const obj = {
                        'category_name': cat_name,
                        'newCategory_name': rename,
                        'category_status': cat_status,
                        'deadline': deadline_change,
                        'todo': new_task
                };


//--------------------------Form Rest function-----------------------------------------------------------------------//
                function addListener(){

                        const myForm = document.getElementById("edit");
                        console.log(myForm);
                        myForm.reset();
                }

//-----------------------End of Form Reset Function------------------------------------------------------------------//



//----------------------Form Refresh function-----------------------------------------------------------------------//

                // // Assuming you have a target container with an ID of 'targetContainer'
                // const targetContainer = document.getElementById('targetContainer');

                // // Fetch new content and update the container
                // function refreshContainer() {
                //         fetch('/categories/edit')
                //         .then(response => response.text())
                //         .then(data => {
                //                 return data;
                //         })
                // .catch(error => console.error('Error fetching data:', error));
                // }
//----------------------End of Form Refresh function---------------------------------------------------------------//




// ------------------------------------------------------------------------------------------------------------------------//
                /*
                Fetch Request Middleware for handling Task and Category Editing (working===11th December, 2023)
                */
// ------------------------------------------------------------------------------------------------------------------------//
                async  function postResource(obj){
                        return new Promise( async function(resolve, reject){
                                try {
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

//-------------------validation check for acceptable data input for edit() operation-----------------


//-------------------changing name of category, addition of todo tasks------------------------------------
//-------------------category name change requires only one field from form-------------------------------
//-------------------adding todo task requires no name change, but can happen with a name change----------
//-------------------acceptable data input tuples are (1) only category name change, (2) New todo task and date or (3) data from 1 and 2 together

//-------------------check for new task and date---------------------------------------------------------

//-------------------checking for missing data input for acceptable transaction at the back end-----------
                if ((!deadline_change.trim() && new_task.trim() && !rename.trim()) || (deadline_change.trim() && !new_task.trim() && !rename.trim()) || (!new_task.trim() && !deadline_change.trim() && !rename.trim())) {
                        console.log("no valid input inserted");
                        alert("You have failed to insert a valid input for a either a category name change, task description or task deadline");
                };
//-------------------------------------------working [11th December, 2023]--------------------------------



//------------------- validation check for changing name of category only----------------------------------
                if (rename.trim()) {
                        // console.log('only cat_name changed');
                        if (confirm("Do you want to edit " + `${cat_name}` + " task category")){
                                postResource(obj).then(function(editResponse){
                                        
                                        if (editResponse){
                                                console.log(editResponse, '194')
                                                var prev_sibling = clickEvent.previousElementSibling;
                                                prev_sibling.innerHTML = editResponse['category_name'];
                                                

                                        }
//-------------------------------------------working [11th December, 2023]---------------------------------



// ------------------------------------------------------------------------------------------------
// changing category name from edit response if there is any change in its initial name!
//--------------------------------------------------------------------------------------------------

                                
                                });
                        };
                }; //end of category rename check  

                
                if(new_task.trim() && deadline_change.trim()){
                        console.log("new task to add available");
                        postResource(obj).then(function(editResponse){
                                        
                                if (editResponse){
                                        console.log(editResponse);

                                        if (((!new_task && !deadline_change) || (new_task && deadline_change)) && (!rename.trim())) {
                                                if (confirm("Do you want to edit " + `${cat_name}` + " task category"));
                                        
                                                postResource(obj).then(function (editResponse) {
                                                        console.log(editResponse);
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
                                                                }

                                                        }

                                                });
                        
                                        }
                                };
                        });
                };
        } catch (error) {
                console.log("An error occurred", error.message);     
                } finally{
                        console.log("finally");
                        if(document.readyState==='loading'){
                                document.addEventListener('DOMContentLoaded', addListener);
                        }else{
                                addListener(); //requiring extra work to make edit form reset after each submit click for edit operation
                        }
                        console.log("closing popup");
                        //window.close();  //Closes Popup Window after adding Todo Item to Category List
                        // refreshContainer();
                        closeEditPopup();
                }
};