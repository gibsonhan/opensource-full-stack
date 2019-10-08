import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Note from './component/Note'
import noteService from './services/notes'


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true);
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
                    alert(`the note ${note.content} was already delted from server`, err)
                    setNotes(notes.filter(n => n.id !== id))
                })
    }
    //console.log('render', notes.length, 'notes')
    return (
        <div>
            <h1>Notes</h1>
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
        </div>
    )
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);