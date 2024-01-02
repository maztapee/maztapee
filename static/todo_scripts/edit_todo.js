/*
To use the specific click event that initiates the edit_form pop up to target associated DOM elements
for MANIPULATION
*/
//-----------------------------------Global Variables Declarations-------------------------------------------------
        var myForm = document.getElementById('edit');
//-----------------------------------Global Middlewares Definitions:-----------------------------------------------

//--> RenameCat Function for listening and showing form input for accepting category name change input data string
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
//----------------------------------RenameCat Function works as expected---------------------------------


//(1)-->Edit Button Click Handler{For handling and return edit button click event}
        function editClickEvent(event){
                console.log(event, "Received  Clicked Button");
                if(event){
                        openEditForm(event);                        
                }else{
                        //TODO-----handle the error for non-availability of click event
                }
                
        };
//----------------------------------editClickEvent function works as expected----------------------------


//(2)-->Event Listener Function { For adding event listener to all edit buttons of all category names}
        document.addEventListener('DOMContentLoaded', function() {
                // Get all elements with the class 'edit-button' after page is completely loaded.
                var editButtons = document.querySelectorAll('.button2');

                // Add click event listener to each 'edit-button' element
                editButtons.forEach(function(button) {
                        button.addEventListener('click', editClickEvent);
                });
        });
//----------------------------------click event listener works as expected-------------------------------------


//(3)-->Close Edit PopUp Function { For hiding any open edit forms}
        const closeEditPopup = function(){
                edit.classList.remove("showEditPopup");
                button.style.visibility="visible";
                myForm.reset();
        };
//----------------------------------close edit popup works as expected----------------------------------------


//(4)-->Open Edit PopUp Function { For showing the Edit Form for todo task/category editing}
        const openEditForm = function (event){
                var button = event.target; //>>>>>>>>>>>>> getting the button that was clicked
                console.log(button);
                const editPopUp = document.querySelector('.editPopup');
                editPopUp.classList.add("showEditPopup");
                //TODO change editForm for each edit_button click
                const edit_title = event.target.dataset['cat_name'];
                document.querySelector('#edit h3').innerHTML = `Edit ${edit_title} Category`;
                RenameCat();
                };

        openEditForm();
//TODO grab edit field values
//TODO validate field values 
//TODO send data to database for CRUD of todo_list