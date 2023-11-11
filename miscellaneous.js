
if (cat_name){
    const cat_name = document.getElementById('cat_display');
    const comp_name = cat_name.getElementsByTagName('h2')[0].innerHTML;
    const sub_string = comp_name.split(" ");
    const sub_name = sub_string.slice(10).join(" ")

    console.log(sub_name);
    
    //------------------------------------------------------------------//
    //------------------------------------------------------------------//
    const storedEvent = null;
    function x (){
            const edit_button_click = document.querySelectorAll('.button2');
            edit_button_click.forEach(element => {
                    element.addEventListener('click', (event)=>{
                            console.log(event);
                            storedEvent = event;
                            });
                    });

            };
    x();
    if (storedEvent){
            console.log(storedEvent);
            };
    };

    
    alert(`${cat_name} has been edited`);































// function clickEditEvent() {
//     const edit_click = document.querySelectorAll('.button2');
    
//     // Define a function to handle the click event
//     function handleButtonClick(event) {
//         // You can process the event here if needed
//         // ...

//         // Then return the event object
//         return event;
//     }

//     // Add a click event listener to each element with the class 'button2'
//     edit_click.forEach(edit_button => {
//         edit_button.addEventListener('click', function(event) {
//             const clickedEvent = handleButtonClick(event);
//             // Now, you can pass the 'clickedEvent' to another function or do something with it
//             anotherFunction(clickedEvent);
//         });
//     });
// }

// // Define another function to receive the event
// function anotherFunction(event) {
//     // Handle the event here
//     console.log('Received event:', event);
// }

// // Call the 'clickEditEvent' function to set up the event listeners
// clickEditEvent();
