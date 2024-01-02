// The else instruction for line 147 in edit_todo.js

//--------------------adding todo task must be accompanied by a future date, else....only category name edit permitted without date entry------
//     else if (((!new_task && !deadline_change) || (new_task && deadline_change)) && (!rename.trim())) {
//         if (confirm("Do you want to edit " + `${cat_name}` + " task category"));

//                 postResource(obj).then(function (editResponse) {
//                 console.log(editResponse);
//                         if (cat_name){
//                                 const catt_name = document.getElementById('cat_display');
//                                 const comp_name = catt_name.getElementsByTagName('h2')[0].innerHTML;
//                                 const sub_string = comp_name.split(" ");
//                                 const sub_name = sub_string.slice(10).join(" ");
//                         /*
//                         sub_name is name of category todo on display todo display column
//                         cat_name is name of category retrieved through the edit button click event
//                         */
//                                 if (sub_name.trim()===cat_name.trim()){
//                                 //comparison to stop DOM manipulation when edited category is not on display
//                                 //Investigate the unimplemented {else conditioning} 
//                                         if (currPage.childElementCount == 0) {
//                                                 //if selected category to edit does not have any todo list item
//                                                 delete_button.setAttribute("classname", "button4");
//                                                 delete_button.dataset.removeid = editResponse['id'];
//                                                 delete_button.innerHTML = "&cross;";
//                                                 pTag_button.append(delete_button);
//                                                 todo_list.setAttribute("id", "todo_list");
//                                                 todo_span.innerHTML = new_task;
//                                                 pTag_todo.append(todo_span);
//                                                 input_check.dataset.id = editResponse['id'];
//                                                 input_check.setAttribute("classname", "check");
//                                                 input_check.setAttribute("id", "check_status");
//                                                 input_check.setAttribute("type", "checkbox");
//                                                 pTag_checkbox.append(input_check);
//                                                 todo_description.append(pTag_button);
//                                                 todo_description.append(pTag_todo);
//                                                 todo_description.append(pTag_checkbox);
//                                                 todo_list.appendChild(todo_description);
//                                                 var list_display = document.getElementById('todo_list');
//                                                 list_display.innerHTML = " ";
//                                                 list_display.classList.remove("no_task");
//                                                 list_display.append(todo_list);
        
//                                         }
                                
//                                 else {
//                                         // adding todo items in a category on display with already existing todo list items
//                                         // ---------------------------------------------------------------------------------
                                        
//                                         delete_button.setAttribute("classname", "button4");
//                                         delete_button.dataset.removeid = editResponse['todo_id'];
//                                         delete_button.innerHTML = "&cross;";
//                                         pTag_button.append(delete_button);
//                                         todo_span.innerHTML = editResponse['description'];
//                                         pTag_todo.append(todo_span);
//                                         input_check.dataset.id = editResponse['id'];
//                                         input_check.setAttribute("classname", "check");
//                                         input_check.setAttribute("id", "check_status");
//                                         input_check.setAttribute("type", "checkbox");
//                                         pTag_checkbox.append(input_check);
//                                         todo_description.append(pTag_button);
//                                         todo_description.append(pTag_todo);
//                                         todo_description.append(pTag_checkbox);
//                                         const todoList = document.getElementById('todo_list')
//                                         todoList.appendChild(todo_description);
//                                         delete_button.onclick = async function(e){
//                                                 if (confirm("You are deleting a newly created task, do you want to proceed?")){
//                                                         // console.log(e);
//                                                         const todo_id = editResponse['todo_id'];                                                        
//                                                         try {
//                                                                 const response = await fetch('/todos/'+ todo_id + '/delete', {
//                                                                 method: 'DELETE',
//                                                                 headers: {
//                                                                         'Content-Type': 'application/json'
//                                                                 }
//                                                                 });
//                                                                 if (response.ok) {
//                                                                         console.log("gone past delete function");
//                                                                         document.getElementById('todo_list').removeChild(todo_description);
//                                                                 }
//                                                         } catch (error) {
//                                                                 console.error('An error occurred:', error);
//                                                         }
                                                        
//                                                 }
//                                                 // remove by id from db
//                                         };

//                                         return;
//                                 };
//                         }

//                 };
//         });


// };



/*
line break-------------------------------------------------------------------------------
*/

// const category_list = document.querySelectorAll(".list");
// for (let i = 0; i < category_list.length; i++) {
//         if (category_list[i].dataset.category_id == editResponse.id) { //the if condition was not met
//                 const atagElement = category_list[i].children[1];
//                 atagElement.innerHTML = editResponse.category_name;
//                 console.log(rename);
//                 break;
//                 }
//         };
































