const inputBox = document.getElementById('inputBox');
const addButton = document.getElementById('add');
const toDoContainer = document.getElementById('toDoContainer');

//add a new note into a new line
let noteId = parseInt(localStorage.getItem('noteId')) || 0;

addButton.addEventListener('click', addNote);

function addNote() {
    const noteText = inputBox.value.trim(); //trim: delete empty spaces at the start and end of text

    if (noteText === '') { 
        window.alert('Please enter a note!');
        return;
    }

    noteId++;

    let notes = localStorage.getItem('notes') || ''; 

    // Add the new note (format: "noteId:noteText")
    if (notes) {
        notes += ',' + noteId + ':' + noteText + ':false';
    } else {
        notes = noteId + ':' + noteText + ':false';
    }

    localStorage.setItem('notes', notes); // Save the updated notes to localStorage
    localStorage.setItem('noteId', noteId); // Save the updated noteId


    // Display the new note
    const noteP = document.createElement('li');
    noteP.textContent = noteText;
    noteP.setAttribute('data-key', noteId); // Store the unique key in the data attribute
    toDoContainer.appendChild(noteP);

    // Checked notes
    noteP.addEventListener('click', check);
    function check (event){
        noteP.style.textDecoration = "line-through";
    }

    // Create the delete button (×)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×';
    noteP.appendChild(deleteButton);

    deleteButton.addEventListener('click', deleteNote);

    function deleteNote(event) {
        const note = event.target.parentElement;
        const keyname = note.getAttribute('data-key');
        
        // Remove the note from localStorage
        let notes = localStorage.getItem('notes'); // Get current notes from localStorage
        let notesArray = notes.split(','); // Split notes into an array of "noteId:text"
        
        // Remove the note by filtering out the note with the matching key
        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i].split(':')[0] == keyname) {
                notesArray.splice(i, 1); // Remove the note from the array
                break;
            }
        }        
        // Save the updated notes back to localStorage
        localStorage.setItem('notes', notesArray.join(','));

        // Remove the note from the DOM (parent container)
        note.remove();
    }
    inputBox.value = ' ';
};

// load saved notes from local storage
window.addEventListener('DOMContentLoaded', loadNotes);

function loadNotes() {
    const notes = localStorage.getItem('notes');
    if (!notes) return;

    const notesArray = notes.split(',');

    // Display notes
    for (let i = 0; i < notesArray.length; i++) {
        const [noteId, noteText] = notesArray[i].split(':'); // Get noteId and noteText

        const noteP = document.createElement('li');
        noteP.textContent = noteText;

        noteP.setAttribute('data-key', noteId); //  Use noteId as the unique key
        toDoContainer.appendChild(noteP);

         // Checked notes
        noteP.addEventListener('click', check);
        function check (event){
        noteP.style.textDecoration = "line-through";
        }

        // Create the delete button (×)
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        noteP.appendChild(deleteButton);

        deleteButton.addEventListener('click', deleteNote);
        
        function deleteNote(event) {
    
            const note = event.target.parentElement;
            const keyname = note.getAttribute('data-key'); // Get the unique key

            // Remove the note from localStorage
            let notes = localStorage.getItem('notes'); // Get current notes from localStorage
            let notesArray = notes.split(','); // Split notes into an array of "noteId:text"

            // Remove the note by filtering out the note with the matching key
            for (let i = 0; i < notesArray.length; i++) {
                if (notesArray[i].split(':')[0] == keyname) {
                    notesArray.splice(i, 1); // Remove the note from the array
                    break;
                }
            }
            // Save the updated notes back to localStorage
            localStorage.setItem('notes', notesArray.join(','));
            
            // Save the updated notes back to localStorage
            localStorage.setItem('notes', notesArray.join(','));

            // Remove the note from the DOM
            note.remove();
        }
    
    }
};