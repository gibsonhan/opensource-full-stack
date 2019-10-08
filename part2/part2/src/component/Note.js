import React from 'react'

const Note = ({note, toggleImportance }) => {
    const label = note.important
        ? 'unset as important'
        : 'set as important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note