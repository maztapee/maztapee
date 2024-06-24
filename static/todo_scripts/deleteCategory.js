// Delete () ===> category delete event listener {To capture and pass the click object to deleteCategoryTrigger()}
document.addEventListener('DOMContentLoaded', function() {
    // Get all delete buttons with the class 'button1' in category_display.html after page is completely loaded.
    var deleteButtons = document.querySelectorAll('.button1');

    // Add click event listener to each 'edit-button' element
    deleteButtons.forEach(function(button) {
            button.addEventListener('click', deleteCategoryTrigger);
    });
});


// Function that gets triggered by the click of delete-buttons on task category
const deleteCategoryTrigger = (click_event) =>{
    console.log("Delete Function activated with this event: ",click_event);
    if(confirm("You are about to delete a category, please confirm to continue")){
        try {
            const cat_id = click_event.target.dataset['removeid'];            
            if(cat_id){
                fetch('/categories/'+cat_id+'/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    }).then(function(delete_data){
                        console.log(delete_data);
                        click_event.target.parentElement.remove();
                        showMessage("Category of task deleted successfully!", "success");
                        const first = delete_data.url.toLowerCase();
                        const second = (location.href + 'delete').toLowerCase();
                        const compared = first === second;
                        if (compared){
                            const showDisplay = document.getElementById('no_task');
                            const cat_display = document.getElementById('cat_display');
                            cat_display.style.display = 'none';
                            setTimeout(function (){
                                showDisplay.style.display = 'block';
                                cat_display.style.display = 'block';
                                cat_display.innerHTML = "Select any other category to view";
                                cat_display.classList.add("no_task");
                            }, 
                            3000);
                        };
                    });
            }else{
                showMessage("Category of task not deleted!", "error");
                throw new Error("Selected category does not exist");
            }
        } catch (error) {
            console.log(error.message, "Category ID not found")        
        }
    };
    

};
