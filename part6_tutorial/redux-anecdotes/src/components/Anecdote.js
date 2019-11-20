import { React } from 'react'

const Anecdote = ({id, content, votes, handleVote}) => {

    return (
        <div key={id}>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote
