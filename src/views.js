import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')

    // Setup the note title text
    note.title.length > 0 ? textEl.textContent = note.title : textEl.textContent = 'Unnamed note'
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    noteEl.appendChild(generateTimestamp(note))

    return noteEl
}

// Create timestamp

const generateTimestamp = (note) => {
    const statusEl = document.createElement('a')
    statusEl.textContent = `last updated: ${moment(note.updatedAt).fromNow()} // created: ${moment(note.createdAt).format('MMM D, YYYY')}`
    statusEl.setAttribute('href', `/edit.html#${note.id}`)
    statusEl.classList.add('list-item__subtitle')
    return statusEl
}

// create timestamp for edit window
const generateTimestampEdit = (note) => {
    const statusEl = document.createElement('span')
    statusEl.textContent = `last updated: ${moment(note.updatedAt).fromNow()} // created: ${moment(note.createdAt).format('MMM D, YYYY')}`
    statusEl.classList.add('list-item__subtitle')
    return statusEl
}

// Render application notes

const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteID) => {
    const titleEl = document.querySelector('#note-title')
    const bodyEl = document.querySelector('#note-body')
    // const removeEl = document.querySelector('#remove-note')
    // const saveEl = document.querySelector('#save-note')
    // const updatedAtEl = document.createElement('span')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteID)

    if (!note) {
        location.assign('/index.html')
    }

    titleEl.value = note.title
    bodyEl.value = note.body
}

export { generateTimestampEdit, generateNoteDOM, generateTimestamp, renderNotes, initializeEditPage }