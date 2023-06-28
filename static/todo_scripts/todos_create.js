const todo_task = document.getElementById('todo_task').value;
fetch('/todos/create', {
    method: 'POST',
    body: JSON.stringify({
        'todo_description': todo_task
        }),
    headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(jsonResponse){
        console.log (jsonResponse);
        const todo_list = document.createElement('UL');
        const todo_description = document.createElement('LI');
        const delete_button = document.createElement('button');
        const pTag_button = document.createElement('p');
        const pTag_todo = document.createElement('p');
        const pTag_checkbox = document.createElement('p');
        const todo_span = document.createElement('span');
        const input_check = document.createElement('input');
        delete_button.setAttribute("classname","button1");
        delete_button.dataset.removeid = jsonResponse['id']
        delete_button.innerHTML = "&cross;";
        pTag_button.innerHTML= delete_button;
        todo_list.setAttribute("id", "todo_list");
        todo_span.innerHTML = jsonResponse ['todo_description'];
        pTag_todo.innerHTML = todo_span;
        input_check.dataset.id = jsonResponse['id'];
        input_check.setAttribute("classname", "check");
        input_check.setAttribute("id", "check_status");
        pTag_checkbox.innerHTML = input_check;
        todo_description.append(pTag_button);
        todo_description.append(pTag_todo);
        todo_description.append(pTag_checkbox);
        todo_list.append(todo_description);
    })
    .catch(   
        error =>{
            alert("Encountered an error");
            console.log(error);
        } 
    );