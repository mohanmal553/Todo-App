// select some element
let add_note_button = document.getElementsByClassName("div-ch")[0];
let add_note_text = document.getElementsByClassName("add-note")[0];
let list_note = document.getElementsByClassName("div-note")[0];
let add_note_now = document.getElementById("submit");
let title = document.getElementById("title");
let description = document.getElementById("description");
let title_msg = "Empty title feild";
let dscr_msg = "Empty description feild";
let key, value, n, i;

// add element dynamically
let add_notes_html = (index) => {
    // create list container
    let div = document.createElement("div");
    // div.className = "div-list";
    div.className = `div-list ${localStorage.key(index).toLocaleLowerCase()}`;
    div.id = `notes${index}`;

    //create title 
    let span = document.createElement("span");
    span.class = "title-disp";
    span.id = `span${index}`;
    span.innerHTML = localStorage.key(index);

    // Create the view button
    let viewButton = document.createElement('button');
    viewButton.type = 'button';
    viewButton.className = 'btn btn-success';
    viewButton.id = `view-btn${index}`;
    viewButton.innerHTML = '<i class="fa-regular fa-eye"></i> View';


    // Create the edit button
    let editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-secondary';
    editButton.id = `edit-btn${index}`;
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';


    // Create the delete button
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.id = `delete-btn${index}`;
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';

    div.appendChild(span);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    div.appendChild(viewButton);
    list_note.appendChild(div);

    let span_key;
    //When click on viwe button
    document.getElementById(`view-btn${index}`).addEventListener('click', () => {
        span_key = document.getElementById(`span${index}`).innerHTML;
        let span_value = localStorage.getItem(span_key);
        document.getElementsByClassName("div-data-display-box")[0].style.display = "flex";
        document.getElementsByClassName("div-data-disp")[0].style.display = "flex";
        document.getElementById("e-title-msg").innerHTML = span_key;
        document.getElementById("e-dscr").value = span_value;
        document.getElementById("cancel-disp").addEventListener('click', () => {
            document.getElementsByClassName("div-data-display-box")[0].style.display = "none";
            document.getElementsByClassName("div-data-disp")[0].style.display = "none";
        })

    })

    //When click on edit button
    document.getElementById(`edit-btn${index}`).addEventListener('click', () => {
        span_key = document.getElementById(`span${index}`).innerHTML;
        let span_value = localStorage.getItem(span_key);
        add_note_text.style.display = "block";
        add_note_button.style.display = "none";
        add_note_now.innerHTML = "Update"
        document.getElementById("cancel-edit").style.display = "block";
        title.value = span_key;
        title.style.pointerEvents = "none";
        description.value = span_value;
    })

    //When click on delete button
    document.getElementById(`delete-btn${index}`).addEventListener('click', () => {
        document.getElementsByClassName("div-data-display-box")[0].style.display = "flex";
        document.getElementsByClassName("div-delete-alert")[0].style.display = "flex";

        // confirm to delete
        document.getElementById("confirm-btn").addEventListener('click', () => {
            span_key = document.getElementById(`span${index}`).innerHTML;

            document.getElementsByClassName("div-delete-alert")[0].style.display = "none";
            document.getElementsByClassName("div-successfull-alert")[0].style.display = "flex";
            setTimeout(() => {
                localStorage.removeItem(span_key);
                document.getElementsByClassName("div-successfull-alert")[0].style.display = "none";
                document.getElementsByClassName("div-data-display-box")[0].style.display = "none";
                // count_notes();    -> delete the multiple item in form of recursion
                location.reload();
            }, 1000)
        })

        // clncel to delete
        document.getElementById("cancel-btn").addEventListener('click', () => {
            document.getElementsByClassName("div-data-display-box")[0].style.display = "none";
            document.getElementsByClassName("div-delete-alert")[0].style.display = "none";
        })

    })
}


// each time count the whole data (notes- key:value)
let count_notes = () => {
    // first remove the old data
    list_note.innerHTML = "";
    n = localStorage.length;
    // if there is no notes then disable the search box
    if (n == 0) {
        document.getElementById("my-search").style.display = "none";
    }
    else {
        document.getElementById("my-search").style.display = "block";
    }

    for (i = 0; i < n; i++) {
        add_notes_html(i);
    }
    n = 0;
}
count_notes();


// when click on new note button
add_note_button.addEventListener('click', () => {
    add_note_text.style.display = "block";
    add_note_button.style.display = "none";
    document.getElementById("cancel-edit").style.display = "block";
})


// after fill the data submit the button then this block is running
add_note_now.addEventListener('click', (event) => {
    event.preventDefault();
    add_note_now.innerHTML = "Add now";
    title.style.pointerEvents = "all";
    if (title.value == "" && description.value == "") {
        title.style.color = "red";
        title.value = title_msg;
        description.style.color = "red";
        description.value = dscr_msg;
        setTimeout(() => {
            title.value = "";
            title.style.color = "#212529";
            description.value = "";
            description.style.color = "#212529";
        }, 1500)
    }
    else if (title.value == "") {
        title.style.color = "red";
        title.value = title_msg;
        setTimeout(() => {
            title.value = "";
            title.style.color = "#212529";
        }, 1500)
    }
    else if (description.value == "") {
        description.style.color = "red";
        description.value = dscr_msg;
        setTimeout(() => {
            description.value = "";
            description.style.color = "#212529";
        }, 1500)
    }

    else {
        key = title.value;
        value = description.value;
        localStorage.setItem(key, value);

        title.value = "";
        description.value = "";
        add_note_text.style.display = "none";
        add_note_button.style.display = "block";
        document.getElementById("cancel-edit").style.display = "none";
        document.getElementById("successfull_msg").style.display = "block";
        setTimeout(() => {
            count_notes();
            document.getElementById("successfull_msg").style.display = "none";
            add_note_button.style.display = "block";
        }, 1500)
    }
})
document.getElementById("cancel-edit").addEventListener('click', () => {
    add_note_text.style.display = "none";
})
      

// Now we perform the search operation
let search_box = document.getElementById("search");
let searct_button = document.getElementById("search-btn");

searct_button.addEventListener('click', () => {
    let user_search = search_box.value.toLowerCase();
    let obj = localStorage;
    let my_key = Object.keys(obj);
    let lowerCase_key = [];
    my_key.forEach((elem) => {
        lowerCase_key.push(elem.toLowerCase());
    })

    for (key of lowerCase_key) {
        if (key != user_search) {
            document.getElementsByClassName(key)[0].style.display = "none";
            setTimeout(() => {
                document.getElementById("search").value = user_search;
            }, 1500)
        }
        else {
            document.getElementById("search").value = user_search;
        }
    }
})

search_box.addEventListener('keyup',()=>{
    if(search_box.value != ""){
        document.getElementById("cross").style.display = "inline-block";
    }
    else{
        document.getElementById("cross").style.display = "none";
        location.reload();
    }
})

document.getElementById("cross").addEventListener('click',()=>{
    location.reload();
})