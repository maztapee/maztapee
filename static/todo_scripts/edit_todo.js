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

//--> RenameCat Function for listening and showing form input text-field for accepting category name change input data string
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

//--> Category Edit Fetch Function for posting data to effect category name changes and addition of todo tasks
        async function postData() {
                try {
                //----------------------------Grabbing text input values from the form------------------------------
                        const categoryName = clickedButton.target.previousSibling.innerHTML
                        const rename = document.getElementById('edit_cat').value;
                        const cat_status = document.getElementById('category_status').value;
                        const deadline_change = document.getElementById('edit_deadline').value;
                        const new_task = document.getElementById('new_task').value;
                        console.log(categoryName, rename, cat_status, deadline_change, new_task);
                        // Perform the fetch operation
                        const response = await fetch('/categories/edit', {
                                method: 'POST',
                                body: JSON.stringify({
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
                        console.log('Response data:', responseData);
                        
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




//--> Form OnReset Event Handler Function {To restore all form values to default whenever any edit button is clicked}

        function formReset(){
                //resetting all fields in edit category forms back to their default values
                let rename_input = document.getElementById('rename_input');
                rename_input.style.visibility ="hidden";
                console.log("form has been reset");
        };

//----------------------------------Form OnReset Function works as expected------------------------------







//(3)-->Close Edit PopUp Function { For hiding any open edit forms}
        const closeEditPopup = function(){
                edit.classList.remove("showEditPopup");
                button.style.visibility="visible";
                var myForm = document.getElementById('edit');
                myForm.reset();
        };
//----------------------------------close edit popup works as expected----------------------------------------




//(5)--> Submit Edit PopUp Function{ For submitting input fields to the server, closing and resetting form}
                async function submitButton (event){
                        event.preventDefault();
                        
                        postData();
                        
                };
                if (clickedButton){
                        clickedButton = null;
                };
//TODO grab edit field values
//TODO validate field values 
//TODO send data to database for CRUD of todo_list