const form = document.getElementById("form");
const button = document.querySelector(".stick");
let form_catName = document.getElementById('cat_name');
let form_todoDescription = document.getElementById('todo_task');
let form_boxCheck = document.getElementById('box-check');
let form_deadline = document.getElementById('deadline');

function openFormPopup() {
    form.classList.add("showFormPopup");
    button.style.visibility="hidden";
};


function closeFormPopup() {

    form.classList.remove("showFormPopup");
    button.style.visibility="visible";
    form.reset();
};

function createCategory() {
    try {
        const cat_name = form_catName.value;
        const todo_description = form_todoDescription.value;
        const todo_status = form_boxCheck.value;
        const deadline = form_deadline.value;

        if(!cat_name || !todo_description || !deadline){

            throw new Error("You need to fill all required fields!");

        }else{
            fetch('/todos/create', {
                method: 'POST',
                body: JSON.stringify({
                    'category_name': cat_name,
                    'todo_description': todo_description,
                    'completed': deadline
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
                    const cat_list = document.createElement('LI');
                    const cat_button = document.createElement('button');
                    const cat_anchor = document.createElement('a');
                    const del_button = document.createElement('button');
                    cat_list.setAttribute("class", "list");
                    cat_list.dataset.category_id=jsonResponse['id'];
                    cat_button.dataset.removeid=jsonResponse['id'];
                    cat_button.setAttribute("class", "button1");
                    cat_button.innerHTML= "&cross;";
                    del_button.dataset.editid=jsonResponse['id'];
                    del_button.setAttribute("class", "button2");
                    del_button.innerHTML = "Edit";
                    cat_anchor.href = `/categories/${jsonResponse.id}`;
                    cat_anchor.innerHTML = jsonResponse['category_name'];
                    cat_list.append(cat_button, cat_anchor, del_button);
                    document.getElementById('cat_list').appendChild(cat_list);
                    location.href=`/categories/${jsonResponse.id}`;

                })
        }      
    } catch (error) {

        alert(error.message);
        
    } finally{
        closeFormPopup();
    };
    
};

/*
    TODO:
        1. Optimize this script
        2. Insert appropriate documentary comments for maintainability
        3. Add disappearing messages for both successful and erroneous category addition
        4. Add Category doesn't work in the homepage
*/


