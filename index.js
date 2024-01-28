let notes = [
    {
        id: new Date(),
        title: 'Sample Note',
        body: 'This is a description for our sample note',
        bgColor: 'pink'
    }
]


const createElement = (tag, classes = []) =>  {
    const element = document.createElement(tag);
    classes.forEach(cl =>{ 
        element.classList.add(cl);
    })
    return element;
} 


const createNoteView = (note) =>{
    const noteDiv = createElement('div', ['note']); 
    noteDiv.id = note.id;
    const textDiv = createElement('div', ['text']);
    textDiv.style.background = note.bgColor;
    const titleP = createElement('b', ['title']);
    titleP.innerHTML = note.title;
    const bodyP = createElement('p', ['body']);
    bodyP.innerHTML = note.body;
    const editButton = createElement('button', ['edit']);
    editButton.innerHTML = 'Edit Note'; 
    const deleteButton = createElement('button', ['delete']);
    deleteButton.innerHTML = 'Delete Note'; 

    textDiv.append(titleP)
    textDiv.append(bodyP)
    noteDiv.append(textDiv)
    noteDiv.append(editButton)
    noteDiv.append(deleteButton)

    // Invoke the different methods
    // When edit button is clicked, it can be edited
    editButton.onclick = () =>editNote(noteDiv);

    deleteButton.onclick = () => deleteNote(noteDiv);
    return noteDiv;
}

// Function Cancel Edit
const cancelEdit = (noteDiv) =>{
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false; // Since we dont want to again right?

    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = false;

    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Edit Note';

    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Note';

    // We can now do a find on the notes, and Get the notes with this ID and 
    // change back the title and body to the  value before any edits
    const note = notes.find(note => note.id==noteDiv.id);
    // We change back the title and body to develop before any edits.
    titleP.innerHTML = note.title;
    bodyP.innerHTML = note.body;
    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);

}

// Function to edit note
const editNote = (noteDiv, EditSave = false) =>{
    // Lets get the title paragraph using query selector
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = true;
    titleP.focus();
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = true; 

    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Save Note';
    
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';

    deleteButton.onclick = () => cancelEdit(noteDiv);
    editButton.onclick = () => editNote(noteDiv, true);

    if(EditSave){
        // Find the notes whose ID is the same as that of the notes
    
        const note = notes.find(note =>note.id == noteDiv.id);
        note.title = titleP.innerText.trim();
        note.body = bodyP.innerText.trim();

        deleteButton.innerHTML = 'Delete Note';
        editButton.innerHTML = 'Edit Note';
        titleP.contentEditable = false;
        bodyP.contentEditable = false;

        // We change the Onclick method to the edit notes without EditSave and
        // deleteNotes for the deleteButton
        editButton.onclick = () => editNote(noteDiv);
        deleteButton.onclick = () => deleteNote(noteDiv);
    }
}

// Function to save note
const saveNote = () =>{
    const titleInput = document.querySelector('input#title');
    const bodyInput = document.querySelector('input#body');
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime();
    const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    const noteDiv = createNoteView(note);
    notesDiv.prepend(noteDiv);
    titleInput.value = '';
    bodyInput.value = '';
    bgColorInput.value = '';
} 

// Function to delete note
const deleteNote = (noteDiv) =>{
    noteDiv.remove();
    notes = notes.filter(note => note.id !=noteDiv.id)
}

document.querySelector('button.add').onclick = () => saveNote();

// lets now use document.query selector to get the div wrapper with the class of notesDiv
const notesDiv = document.querySelector('.notesDiv'); //notesDiv or noteDiv

notes.forEach(note =>{
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})