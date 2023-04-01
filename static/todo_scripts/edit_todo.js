const editList = document.getElementsByClassName('button2');
const cat_list = editList.length;

const showEditPopup = function (){
   
        edit.classList.add("showEditPopup");
        button.style.visibility="hidden";
};

function closeEditPopup (){

        button.style.visibility = "visible";
        edit.classList.remove("showEditPopup") 
};