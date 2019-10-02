import React,{useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
    const randNumber = () => {
        let min = 0
        let max = anecdotes.length
        return Math.floor(Math.random()* (max - min) + min)
    }

    const getMax = () => {
        let max = 0;

        for(let a in vote) {
            if(vote[a] >= max) {
                max = a
            }
        }

        return max
    }
    const setNumber = () => {
        setSelected(randNumber())
    }
    const [selected, setSelected] = useState(randNumber())
    const [vote, setVotes] = useState(props.votes)

    const [maxVoteIndex, setMaxVoteIndex] = useState(getMax())
    const updateVotes = (index) => {
        vote[index] = vote[index] + 1
        setVotes({...vote})
        reRender(index, vote[index])
    }

    const reRender = (index, val) => {
        if(index !== maxVoteIndex && val >= vote[maxVoteIndex]) {
                setMaxVoteIndex(index)
        }
    }

    return (
        <div>
            <h1>Ancedotes of the Day</h1>
            <Display quote={props.anecdotes[selected]} points={vote[selected]} />
            <button onClick={()=>{updateVotes(selected)}}>Vote</button>
            <button onClick={()=>{setNumber()}}> Next Ancedotes </button>
            <h1>Ancdeote with the most vote</h1>
            <Display quote={props.anecdotes[maxVoteIndex]} points={vote[maxVoteIndex]} />
        </div>
    )
}

const Display = ({quote, points}) => {
    return (
        <>
            <p>{quote}</p>
            <p>has {points} votes</p>
        </>
    )
}


const points = [1, 2, 3, 4, 5, 6]


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} votes={points}/>,
    document.getElementById('root')
);