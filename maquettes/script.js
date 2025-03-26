
document.querySelector('#createNoteForm').addEventListener('submit', (e) => {
    document.querySelector('#createNoteForm').classList.add('hidden');
    const createdNote = {
        title: '',
        content: '',
        color: null
    };
    createdNote.title = document.querySelector('#createNoteForm input[name="title"]').value;
    createdNote.content = document.querySelector('#createNoteForm textarea[name="content"]').value;
    createdNote.color = document.querySelector('#createNoteForm input[name="color"]').value;
    console.log(createdNote);
    if (window.confirm('Note bien créée !')) {
        setTimeout(1000, () => {
            window.location.replace('./home-notes.html');
        });
    }
    e.preventDefault();
    return false;
});

document.querySelector('.no-note').addEventListener('click', () => {
    document.querySelector('#createNoteForm').classList.remove('hidden');
    return false;
});

document.querySelector('.cancel').addEventListener('click', () => {
    // si le formulaire n'est pas caché ! (normalement pas le cas.. ?)
    if (!document.querySelector('#createNoteForm').classList.contains('hidden')) {
        document.querySelector('#createNoteForm').classList.add('hidden');
    }
    return false;
});
