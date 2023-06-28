const checkboxes = document.querySelectorAll('.check');
        for(let i = 0; i < checkboxes.length; i++){
            const checkbox = checkboxes[i];
            checkbox.onchange = function (e){
                alert('Are you are changing the status of this task?')
                console.log('event', e);
                const newCompleted = e.target.checked;
                const todo_id = e.target.dataset['id'];
                fetch('/todos/'+todo_id+'/boxcheck', {
                    method: 'POST',
                    body: JSON.stringify({
                        'completed': newCompleted,
                        'todoId': todo_id
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then (function(checkResponse){
                    // successful get of json response body from server!
                    return checkResponse.json();   
                })
                .then(function(check){
                    // json response body {'completed' and 'todoId'} are accessible from here
                })
                .catch (function(){
                });
            };
        };