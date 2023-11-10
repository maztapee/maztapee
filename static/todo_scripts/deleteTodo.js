/*
Delete todo item function () ===> deleting tasks of a specified category 
*/

const deleteTodoTrigger = () => {
    
    const list_display = document.getElementById('list_display');

    // Add a single event listener to a higher-level container (e.g., todo_list)
    const todoList = document.getElementById('todo_list');
    todoList.addEventListener('click', async function (e) {
        const target = e.target;

        if (target.classList.contains('button4')) {
            if (confirm("You are about to delete a task in this category, please confirm to continue")) {
                const todo_id = target.dataset['removeid'];

                try {
                    const response = await fetch('/todos/'+ todo_id + '/delete', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        target.parentElement.parentElement.remove();

                        if (todoList.childElementCount === 0) {
                            setTimeout(function () {
                                list_display.style.display = 'block';
                                list_display.innerHTML = "Click on edit to add a task to this category";
                                list_display.classList.add("no_task");
                            }, 1500);
                        }
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        }
    });
};

deleteTodoTrigger();