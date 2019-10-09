import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Note from './component/Note'
import Notification from './component/Notification'

import noteService from './services/notes'

import './index.css'

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error occurred')

    const notesToShow = showAll
         ? notes 
         : notes.filter(note => note.important === true)

    const rows = () => notesToShow.map(note => 
            <Note
                key={note.id}
                note={note}
                toggleImportance={()=> toggleImportanceOf(note.id)} 
            />)
    
    const addNote = (e) => {
        e.preventDefault()
        
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            }).catch(err => {
                console.log('add note promise rejected', err)
            })
    }

    const handleNoteChange = (e) => {
        console.log(e.target.value)
        setNewNote(e.target.value)
    }


    useEffect(() => {
        noteService
            .getAll()
            .then(initalNotes => {
                setNotes(initalNotes)
            }).catch(err => {
                console.log('promise rejected', err)
            })
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changeNote = { ...note, important: !note.important }

        noteService
            .update(id, changeNote)
                .then(returnedNoted => {
                    setNotes(notes.map(note => note.id !== id ? note: returnedNoted))
                })
                .catch(err => {
                    setErrorMessage(
                        `Note ${note.content} was already removed from the server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setNotes(notes.filter(n=> n.id !== id))
                })
    }
    
    const Footer = () => {
        const footerSytle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16
        }
        return (
            <div style={footerSytle}>
                <br/>
                <em>Note app, Deaprt of Computer Science, Uniersity of Helsinki 2019</em>
            </div>
        )
    }

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important': 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={handleNoteChange}    
                    />
                <button type="submit"> save</button>
            </form>
            <Footer />
        </div>
    )
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);