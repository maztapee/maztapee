const edit_buttons = document.querySelectorAll('.button2');
edit_buttons.forEach(edit_button=>{
        edit_button.addEventListener('click', function handleClick(event){
                console.log(event, "hello");
                showEditPopup(event);
        })
})

function showEditPopup (e){
        edit.classList.add("showEditPopup");
        button.style.visibility="hidden";
        const edit_title = e.target.dataset['cat_name'];
        console.log(edit_title);
        document.querySelector('#edit h3').innerHTML = `Edit ${edit_title} Category`;
        
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
        
        fetch ('/categories/edit', {
                method: 'POST',
                body: JSON.stringify({
                        'category_name': rename,
                        'category_status': cat_status,
                        'deadline': deadline_change,
                        'todo': new_task
                }),
                headers: {
                        'Content-Type': 'application/json'
                }
        })
        .then(function(response){
                console.log(response);
                return response;
        })
};