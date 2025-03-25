
let counter = 0;

const tags = {};

const saveFlushTags = function() {
    localStorage.setItem('tags', JSON.stringify(tags));
};

const createTag = function(tag) {
    const tagTpl = document.querySelector('#tagTemplate').content.cloneNode(true);
    console.log(tagTpl);
    const tagId = ++counter;
    tagTpl.querySelector('article').dataset.tagid = tagId;
    tagTpl.querySelector('.tag-title h2').innerText = tag.title;
    tagTpl.querySelector('.tag-color').innerText = tag.color;
    const li = document.createElement('li');
    li.appendChild(tagTpl);
    document.querySelector('.tags-list').insertAdjacentElement('afterbegin', li);
    document.querySelector(`.tag[data-tagid="${tagId}"]`).style.backgroundColor = tag.color;
    bindTagActions(tagId);
    tags[tagId] = tag;
    saveFlushTags();
};

const deleteTag = function(tagId) {
    document.querySelector(`.tag[data-tagid="${tagId}"]`).parentNode.remove();
    delete tags[tagId];
    saveFlushTags();
};

const bindTagActions = function(tagId) {
    document.querySelector(`.tag[data-tagid="${tagId}"] .delete-tag`).addEventListener('click', (e) => {
        deleteTag(tagId);
        e.preventDefault();
        return false;
    });

    document.querySelector(`.tag[data-tagid="${tagId}"] .edit-tag`).addEventListener('click', (e) => {
        displayEditTag(tagId);
        e.preventDefault();
        return false;
    });
};

const editTag = function(tag) {
    document.querySelector(`.tag[data-tagid="${tag.id}"] .tag-title h2`).innerText = tag.title;
    document.querySelector(`.tag[data-tagid="${tag.id}"] .tag-color`).innerText = tag.color;
    document.querySelector(`.tag[data-tagid="${tag.id}"]`).style.backgroundColor = tag.color;
    saveFlushTags();
};

const displayEditTag = function(tagId) {
    const tag = tags[tagId];
    document.querySelector('#createTagForm').classList.remove('hidden');
    document.querySelector('#createTagForm').dataset.tagid = tagId;
    document.querySelector('#createTagForm input[name="title"]').value = tag.title;
    document.querySelector('#createTagForm input[name="color"]').value = tag.color;
    document.querySelector('#createTagForm input[name="createTag"]').value = 'Modifier cette étiquette !';
};

const displayCreateTag = function() {
    document.querySelector('#createTagForm').classList.remove('hidden');
    document.querySelector('#createTagForm').dataset.tagid = '';
    document.querySelector('#createTagForm input[name="title"]').value = '';
    document.querySelector('#createTagForm input[name="color"]').value = '';
    document.querySelector('#createTagForm input[name="createTag"]').value = 'Créer cette étiquette !';
};

document.querySelector('#createTagForm').addEventListener('submit', (e) => {
    document.querySelector('#createTagForm').classList.add('hidden');
    const tag = {
        id: null,
        title: '',
        color: null
    };
    tag.title = document.querySelector('#createTagForm input[name="title"]').value;
    tag.color = document.querySelector('#createTagForm input[name="color"]').value;
    const tagId = document.querySelector('#createTagForm').dataset.tagid;
    if(tagId) {
        tag.id = tagId;
        editTag(tag);
    } else {
        createTag(tag);
    }
    e.preventDefault();
    return false;
});

document.querySelector('.no-tag').addEventListener('click', (e) => {
    displayCreateTag();
    e.preventDefault();
    return false;
});

document.querySelector('.cancel').addEventListener('click', (e) => {
    // si le formulaire n'est pas caché ! (normalement pas le cas.. ?)
    if (!document.querySelector('#createTagForm').classList.contains('hidden')) {
        document.querySelector('#createTagForm').classList.add('hidden');
    }
    e.preventDefault();
    return false;
});

document.addEventListener('DOMContentLoaded', () => {
    // load storage
    let storedTags = JSON.parse(localStorage.getItem('tags')?? false);
    if(storedTags) { // if storage is valid
        for(const k in storedTags) {
            createTag(storedTags[k]);
        }
    }
});
