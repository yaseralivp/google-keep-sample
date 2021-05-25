function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}
function storeData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function createNote(key, value) {
    return {
        id: + new Date(),
        text: value,
        title: key,
        bgColor: 'transparent'
    }
}

function addNotes(key, value) {
    var temp = getData('notes');
    var note = createNote(key, value);

    if (temp) {
        temp.push(note);
        storeData('notes', temp);
    }
    else {
        var temp = [];
        temp.push(note);
        storeData('notes', temp);
    }
    displayNote(note);
}

function displayNote(note) {
    var div = document.getElementById('notes');
    noteElement = document.createElement('div');
    noteElement.id = note.id;
    noteElement.className = "note";
    noteElement.style.cssText = "background-color: " + note.bgColor + ";";


    noteTitle = document.createElement('h3');
    noteTitleContent = document.createTextNode(note.title);
    noteTitle.appendChild(noteTitleContent);

    noteText = document.createTextNode(note.text);
    deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete';
    deleteText = document.createTextNode('delete');

    colorIcon = document.createElement('span');
    colorIcon.className = 'color';
    colorIcon.id = 'color' + note.id;
    colorIcon.onmouseover = function () {
        updateColor(this);
    };
    colorText = document.createTextNode('color');
    colorIcon.appendChild(colorText);
    deleteIcon.appendChild(deleteText);
    deleteIcon.onclick = function () {
        deleteNote(this);
    };
    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteText);
    noteElement.appendChild(deleteIcon);
    noteElement.appendChild(colorIcon);
    div.insertBefore(noteElement, div.firstChild);
}


function removeColorWrap(e) {
    var div = document.getElementById(e.id);
    var child = document.getElementById(e.parentElement.id + 'color');
}


function updateColor(e) {
    var colors = ["transparent", "red", "orange", "yellow", "green", "teal", "blue", "darkblue", "purple", "pink", "brown", "grey"];
    var div = document.getElementById(e.id);
    if (!document.getElementById(e.parentElement.id + 'color')) {
        colorElement = document.createElement('div');
        colorElement.id = e.parentElement.id + 'color';
        colorElement.className = "color-wrap";
        div.appendChild(colorElement);
        for (var i = 0; i < colors.length; i++) {
            displayColor(colors[i], e.parentElement.id + 'color');
        }
    }
};

function displayColor(color, id) {
    var div = document.getElementById(id);
    colorIcon = document.createElement('div');
    colorIcon.id = color;
    colorIcon.style.cssText = "background-color: " + color + ";";
    colorIcon.onclick = function () {
        setBgColor(this);
    };
    div.appendChild(colorIcon);
}

function setBgColor(e) {
    var div = document.getElementById(e.parentElement.parentElement.parentElement.id);
    div.style.cssText = "background-color: " + e.id + ";";
    var temp = getData('notes');
    var index = findItemIndex(parseInt(e.parentElement.parentElement.parentElement.id), temp);
    temp[index].bgColor = e.id;
    storeData('notes', temp);
}

function findItemIndex(id, array) {
    var i;
    if (array) {
        for (i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return i;
            }
        }
    }
    else {
        return false;
    }
}

function deleteNote(e) {
    var a = document.getElementById(e.parentElement.id);
    a.remove();
    var temp = getData('notes');
    var index = findItemIndex(e.parentElement.id, temp);
    temp.splice(index, 1);
    storeData('notes', temp);
}

function renderNotes() {
    var notes = getData('notes');
    if (notes) {
        for (var i = 0; i < notes.length; i++) {
            displayNote(notes[i]);
        }
    }
}

function handleBlur() {
    var title = document.getElementById('title').value;
    var text = document.getElementById('text').value;
    if (title || text) {
        addNotes(title, text);
        document.getElementById('title').value = "";
        document.getElementById('text').value = "";
    }
    else {

    }
}