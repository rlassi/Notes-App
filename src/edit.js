import { initializeEditPage, generateTimestampEdit } from './views'
import { updateNote , removeNote, saveNotes, getNotes } from './notes'
import moment from 'moment'

const titleEl = document.querySelector('#note-title')
const bodyEl = document.querySelector('#note-body')
const removeEl = document.querySelector('#remove-note')
const saveEl = document.querySelector('#save-note')
const noteID = location.hash.substring(1)

let note = updateNote(noteID, {})

const printStatus = () => {
    document.getElementById('notes').innerHTML = ''
    document.getElementById('notes').appendChild(generateTimestampEdit(note));
}

setInterval(printStatus, 1000);

printStatus()
initializeEditPage(noteID)


titleEl.addEventListener('input', (e) => {
    note = updateNote(noteID, {
        title: e.target.value
    })
    printStatus()
})

bodyEl.addEventListener('input', (e) => {
    note = updateNote(noteID, {
        body: e.target.value
    })
    printStatus()
})

removeEl.addEventListener('click', (e) => {
    removeNote(noteID)
    location.assign('/index.html')
})

saveEl.addEventListener('click', (e) => {
    saveNotes()
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        getNotes()
        initializeEditPage(noteID)
    }
})
