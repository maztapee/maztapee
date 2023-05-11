// populating todo tasks category on the view
                                // --------------------------------------------------------------------------------------------
                                const cat_list = document.createElement('li');
                                const del_button = document.createElement('button');
                                const aTag_cat = document.createElement('a');
                                const edit_button = document.createElement('button');
                                cat_list.setAttribute("classname", "list");
                                del_button.setAttribute("classname", "button1");
                                del_button.dataset.removeid = editResponse['id'];
                                del_button.innerHTML = "&cross;";
                                aTag_cat.href = `/categories/${editResponse.id}`;
                                aTag_cat.append(editResponse.category_name); //check for aTag_cat.append call in the event of failure
                                edit_button.setAttribute("classname", "button2");
                                edit_button.dataset.editid = editResponse.id; //check for editResponse.id in the event of failure
                                edit_button.innerHTML = "Edit";
                                edit_button.dataset.cat_name = editResponse.category_name; //check for editResponse.category_name in the event of failure
                                cat_list.append(del_button,aTag_cat,edit_button);
                                const category_list = document.getElementById('cat_list');
                                category_list.appendChild(cat_list);