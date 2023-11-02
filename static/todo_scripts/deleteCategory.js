/*// Delete () ===> deleting a category of todo items implies deleting the relational items related in the database as well */
const deleteCategoryTrigger = () =>{ 
    const deleteButton = document.querySelectorAll('.button1');
    for(let i=0; i< deleteButton.length; i++){
    
        const deletion = deleteButton[i];
        deletion.onclick = function (e){
            if(confirm("You are about to delete a Category, please confirm to continue")) {
            console.log('event', e);
            const cat_id = e.target.dataset['removeid'];
            fetch('/categories/'+cat_id+'/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(function(deleteResponse){
                
                return deleteResponse.json();
            })
            .then(function(deleteData){
                const first = deleteData.url.toLowerCase();
                const second = (location.href + 'delete').toLowerCase();
                const compared = first === second;
                console.log(compared);

                if (compared){
                    const showDisplay = document.getElementById('no_task');
                    const cat_display = document.getElementById('cat_display');
                    cat_display.style.display = 'none';
                    setTimeout(function (){
                        showDisplay.style.display = 'block';
                        cat_display.style.display = 'block';
                        cat_display.innerHTML = "You have not selected any category to view";
                        cat_display.classList.add("no_task");
                    }, 
                    3000);
                };
                
            })
            .catch(error =>{
                console.log('Error:', error);
            });
            console.log(cat_id);
            deletion.parentElement.remove(); 
        };      
    };
};
};
deleteCategoryTrigger();
