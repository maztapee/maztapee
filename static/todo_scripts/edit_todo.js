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
                console.log(editResponse['id'], editResponse['category_name'],editResponse['description'] );

        });
        closeEditPopup();

};