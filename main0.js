// Accessing DOM elements
const addTask = document.getElementById('addTask');
const popUp = document.getElementById('popup');
const addButton = document.getElementById('addButton');
const inputBox = document.getElementById('inputBox');
const todoContainer = document.getElementById('todo-container');
const inProgressContainer = document.getElementById('inprogress-container');
const doneContainer = document.getElementById('Done-container');
const toDoStats = document.getElementById('todo-stats');
const doingStats = document.getElementById('doing-stats');
const doneStats = document.getElementById('done-stats');

// Functions for localStorage management
function getNotes() {
    return JSON.parse(localStorage.getItem('toDoNotes')) || [];
}

function saveNotes(notes) {
    localStorage.setItem('toDoNotes', JSON.stringify(notes));
}

// Function to update counters
function updateCounters() {
    const notes = getNotes();
    toDoStats.textContent = notes.filter(note => note.status === 0).length;
    doingStats.textContent = notes.filter(note => note.status === 1).length;
    doneStats.textContent = notes.filter(note => note.status === 2).length;
}

// Function to display notes
function displayNotes() {
    // Clear existing lists
    todoContainer.innerHTML = '';
    inProgressContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    const notes = getNotes();

    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = note.text;

        // Create action buttons
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        const inProgressButton = document.createElement('button');
        inProgressButton.textContent = 'In Progress';
        inProgressButton.classList.add('in-progress-btn');

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('done-btn');

        // Append buttons based on the note's status
        if (note.status === 0) {
            listItem.appendChild(inProgressButton);
            listItem.appendChild(doneButton);
            todoContainer.appendChild(listItem);
        } else if (note.status === 1) {
            listItem.appendChild(doneButton);
            inProgressContainer.appendChild(listItem);
        } else if (note.status === 2) {
            doneContainer.appendChild(listItem);
        }

        listItem.appendChild(deleteButton);

        // Event listeners for buttons
        deleteButton.addEventListener('click', () => {
            const notes = getNotes();
            notes.splice(index, 1);
            saveNotes(notes);
            displayNotes();
            updateCounters();
        });

        inProgressButton.addEventListener('click', () => {
            const notes = getNotes();
            notes[index].status = 1; // Move to in-progress
            saveNotes(notes);
            displayNotes();
            updateCounters();
        });

        doneButton.addEventListener('click', () => {
            const notes = getNotes();
            notes[index].status = 2; // Move to done
            saveNotes(notes);
            displayNotes();
            updateCounters();
        });
    });

    updateCounters();
}

// Event listener for opening the add task popup
addTask.addEventListener('click', () => {
    popUp.classList.toggle('hidden');
});

// Event listener for adding a new task
addButton.addEventListener('click', () => {
    const inputText = inputBox.value.trim();

    if (!inputText) {
        alert('Please enter a note!');
        return;
    }

    const notes = getNotes();
    notes.push({ text: inputText, status: 0 }); // Default status is 0 (To Do)
    saveNotes(notes);
    inputBox.value = ''; // Clear input field
    popUp.classList.add('hidden'); // Close popup
    displayNotes();
});

displayNotes();
