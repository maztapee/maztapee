var date = new Date();
var dateString = new Date (date.getTime()).toISOString().split("T");
console.log(dateString.toString().split(",")[0]);
var x = (date.toLocaleString()).split(",")[0];
console.log(x);



























































// const createRecord = function() {
//     const submit_button = document.getElementById('submit'); //listening for submit event on submit button with id=button_id on the form
//     submit_button.addEventListener('click', function(e){
//         e.preventDefault(); //with submit event triggered, prevented the default behaviour of the web browser
//         const cat_name = document.getElementById('cat_name').value;
//         const todo_task = document.getElementById('todo_task').value;
//         const deadline = document.getElementById('deadline').value;
//         const  time = new Date();

//             if(!cat_name || cat_name.length < 1 || !todo_task || todo_task.length < 1){//validation of category names: prevention of empty strings, other checks such as trim() will be implemented.
//                 //Need to validate for duplicate cat_name from database table of category names (todo_category under flaskr)
//                     alert("Oops! You have entered either an invalid category, todo task or deadline !")
//                     return;
//                 }
//                 fetch('/todos/create', {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         'category_name': cat_name,
//                         'todo_description': todo_task,
//                         'completed': deadline,
//                         'activity_time': time
//                         }),
//                     headers: {
//                         'Content-Type': 'application/json'
//                         }
//                     })
//                     .then(function(response){
//                         console.log(response);
//                         return response.json();
//                     })
//                     .then(function(jsonResponse){
//                         console.log (jsonResponse);
//                         const catList = document.createElement('UL');
//                         catList.setAttribute("id", "cat_list");
//                         const cat_list = document.createElement('LI');
//                         const cat_button = document.createElement('button');
//                         const cat_anchor = document.createElement('a');
//                         cat_list.setAttribute("classname", "list");
//                         cat_list.dataset.category_id=jsonResponse['id'];
//                         cat_button.setAttribute("classname", "button1");
//                         cat_button.dataset.category_id=jsonResponse['id'];
//                         cat_button.innerHTML= "&cross;";
//                         cat_anchor.href = '/categories/{{category.id}}';
//                         cat_anchor.innerHTML = jsonResponse['category_name'];
//                         cat_list.append(cat_button, cat_anchor);
//                         catList.appendChild(cat_list);
//                         const todo_list = document.createElement('UL');
//                         const todo_description = document.createElement('LI');
//                         const delete_button = document.createElement('button');
//                         const pTag_button = document.createElement('p');
//                         const pTag_todo = document.createElement('p');
//                         const pTag_checkbox = document.createElement('p');
//                         const todo_span = document.createElement('span');
//                         const input_check = document.createElement('input');
//                         delete_button.setAttribute("classname","button1");
//                         delete_button.dataset.removeid = jsonResponse['id']
//                         delete_button.innerHTML = "&cross;";
//                         pTag_button.innerHTML= delete_button;
//                         todo_list.setAttribute("id", "todo_list");
//                         todo_span.innerHTML = jsonResponse ['todo_description'];
//                         pTag_todo.innerHTML = todo_span;
//                         input_check.dataset.id = jsonResponse['id'];
//                         input_check.setAttribute("classname", "check");
//                         input_check.setAttribute("id", "check_status");
//                         pTag_checkbox.innerHTML = input_check;
//                         todo_description.append(pTag_button);
//                         todo_description.append(pTag_todo);
//                         todo_description.append(pTag_checkbox);
//                         todo_list.append(todo_description);
//                     })
//                     .catch(   
//                         error =>{                        
//                             // var err = document.getElementsByClassName('error')[0];
//                             // console.log(error, err.classList.add('show'));
//                             // err.setAttribute("classname", "show");
//                             alert("Encountered an error");
//                             console.log(error);
//                         } 
//                     )
//     });        
// }
// createRecord();