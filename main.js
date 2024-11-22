const inputBox = document.getElementById('inputBox');
const addButton = document.getElementById('add');
const toDoContainer = document.getElementById('toDoContainer');
const doneNotes = document.getElementById('done-notes')

let noteId = parseInt(localStorage.getItem('noteId'));
if (!noteId) {
    noteId = 0;
}

addButton.addEventListener('click', addNote);

function addNote() {
    const noteText = inputBox.value.trim(); 

    if (noteText === '') {
        window.alert('Please enter a note!');
        return;
    }

    noteId++; 
    const noteData = noteId + ": " + noteText + ":false"; // Format: Id:Text:Checked-State

    let notes = localStorage.getItem('notes');
    if (!notes) {
        notes = noteData; 
    } else {
        notes = notes + ', ' + noteData;    
    }

    localStorage.setItem('notes', notes);
    localStorage.setItem('noteId', noteId);

    displayNote(noteId, noteText, false); // function to display the saved notes with all the changes made

    inputBox.value = '';
}

function displayNote(id, text, checked) {
    const noteLi = document.createElement('li');
    // h1 = document.getElementById('h1');
    noteLi.textContent = text;
    noteLi.setAttribute('data-id', id); 

    if (checked) {
        noteLi.style.textDecoration = 'line-through';
    }

    //delete option
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×';
    noteLi.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
    deleteNote(noteLi, id);
    });

    toDoContainer.appendChild(noteLi);

   
    noteLi.addEventListener('click', function() {
        checkNote(noteLi, id);
    });
}

function deleteNote(noteElement, noteId) {
    noteElement.remove();

    let notes = localStorage.getItem('notes');
    let notesArray = notes.split(',');

    // delete the note with the same id
    let newNotesArray = [];
    for (let i = 0; i < notesArray.length; i++) {
        let noteParts = notesArray[i].split(':');
        if (noteParts[0] != noteId) {   //[0] is id, [1] is text, [2] is checked status
            newNotesArray.push(notesArray[i]);
        }
    }

    localStorage.setItem('notes', newNotesArray.join(',')); // Save updated notes array to localStorage
}


function checkNote(noteElement, noteId) {
    const isChecked = noteElement.style.textDecoration === 'line-through';
    if (!isChecked) {
        noteElement.style.textDecoration = 'line-through';
    } else {
        noteElement.style.textDecoration = 'none';
    }
    
    // Update localStorage
    let notes = localStorage.getItem('notes');
    let notesArray = notes.split(',');
    // Update checked in the array
    for (let i = 0; i < notesArray.length; i++) {
        let noteParts = notesArray[i].split(':');
        if (noteParts[0] == noteId) {
            notesArray[i] = notesArray[i] = noteParts[0] + ':' + noteParts[1] + ':' + !isChecked;
            break;
        }
    }

    
    // Save the updated notes to localStorage
    localStorage.setItem('notes', notesArray.join(','));
}


// Load and display saved notes from localStorage on page load
window.addEventListener('DOMContentLoaded', loadNotes);

function loadNotes() {
    const notes = localStorage.getItem('notes');
    if (!notes) return;

    const notesArray = notes.split(',');

    // Display each saved note
    for (let i = 0; i < notesArray.length; i++) {
        const noteParts = notesArray[i].split(':');
        const noteId = noteParts[0];
        const noteText = noteParts[1];
        const isChecked = noteParts[2] === 'true'; // Convert to boolean

        // Display each note (pass checked state to style text)
        displayNote(noteId, noteText, isChecked);
    }
}
