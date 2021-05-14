printNotes();

let addBtn = document.getElementById('noteBtn');

//on click btn add value into local storage
addBtn.addEventListener('click', function(){
    let titleValue = document.getElementById('noteTitle');
    let textValue = document.getElementById('noteText');
    let noteValue = localStorage.getItem('notes');
    if (noteValue == null){
        //create notes array
        noteArry = [];
    } else {
        noteArry = JSON.parse(noteValue);
    }

    let title = "No Title";
    if (titleValue.value == null || titleValue.value == "") {
        titleValue.value = title;
    } else {
        title = titleValue.value;
    }

    let noteObj = {
        'title' : title,
        'description' : textValue.value
    }

    noteArry.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(noteArry));
    textValue.value = "";
    titleValue.value = "";
    printNotes();
});



//function to show element from local storage
function printNotes() {
    let html = "";
    let noteData = localStorage.getItem('notes');
    if(noteData == null){
        noteArry = [];
    } else {
        noteArry = JSON.parse(noteData);
    }

    for(i = 0; i < noteArry.length; i++){
        let noteVal = noteArry[i];        
        html += `<div class="col-12 col-md-4 mb-4 notebox" id="notebox">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">${noteVal.title}</h5>
              <p class="card-text">${noteVal.description}</p>
              <a id="${i}" onClick="deleteNote(this.id)" class="btn btn-info">Delete</a>
            </div>
          </div>
      </div> `
    }

    if (noteArry.length >= 1) {
        document.getElementById('notes').innerHTML = html;
    } else {
        document.getElementById('no_notes').innerHTML = "You do not add anything.";
    }
}

function deleteNote(index) {
    let noteValue = localStorage.getItem('notes');
    if (noteValue == null){
        //create notes array
        noteArry = [];
    } else {
        noteArry = JSON.parse(noteValue);
    }
    
    noteArry.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteArry));   
    printNotes();
}

let search = document.getElementById('search_box');

search.addEventListener('input', function(){
    let input = search.value.toLowerCase();
    let cardbox = document.getElementsByClassName('notebox');
    Array.from(cardbox).forEach(function(element){
        let cardTxt = element.getElementsByClassName('card-body')[0].innerText.toLowerCase();
        if(cardTxt.includes(input)){
            element.style.display = "block";
        } else{
            element.style.display = "none";
        }
    });
})