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
        const rename = document.getElementById('edit_cat').value;
        const cat_status = document.getElementById('category_status').value;
        const deadline_change = document.getElementById('edit_deadline').value;
        const new_task = document.getElementById('new_task').value;

        const data = e.parentElement.parentElement.getElementsByTagName('h3')[0].innerHTML

        const arrayOfData = data.split(' ');

        let newData = '';

        for(let i =0; i < arrayOfData.length; i++){
           
                if(i === 0 || i === arrayOfData.length - 1){
                        continue
                }

                newData += ` ${arrayOfData[i]}`;                
        }

        const cat_name = newData.trim();
        
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
                const todo_list = document.getElementById("todo_list");
                const todo_description = document.createElement('LI');
                const delete_button = document.createElement('button');
                const pTag_button = document.createElement('p');
                const pTag_todo = document.createElement('p');
                const pTag_checkbox = document.createElement('p');
                const todo_span = document.createElement('span');
                const input_check = document.createElement('input');
                delete_button.setAttribute("classname","button4");
                delete_button.dataset.removeid = editResponse['id']
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

        });
        closeEditPopup();

};