import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const App = () => {

   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)

   const updateGood = (val) => ()=> {
       setGood(val)
   }

   const updateNeutral = (val) => () => {
       setNeutral(val)
   }

   const updateBad = (val) => () => {
       setBad(val)
   }

    return  (
        <div className='container'>
            <h1>Give FeedBack</h1>
            <Button
                onClick={updateGood(good + 1)}
                text="Good"
            />
            <Button
                onClick={updateNeutral(neutral + 1)}
                text="Neutral"
            />
            <Button
                onClick={updateBad(bad + 1)}
                text="Bad"
            />
            <Statistics good={good} neutral={neutral} bad={bad} />
            
        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0) {
        return(
            <p>No Feedback given</p>
        )
    }
    return(
        <table>
            <thead>
                <tr>
                    <td>
                        <h2>Stats</h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                <Statistic
                    text="Good"
                    value={good}
                /> 
                <Statistic
                    text="Neutral"
                    value={neutral}
                />
                <Statistic 
                    text="Bad"
                    value={bad}
                />
                <Statistic
                    text='All'
                    value={good + neutral + bad} 
                />
                <Statistic 
                    text='Average'
                    value={(good-bad)/(good+neutral+bad)}
                />
                <Statistic
                    text='Positive'
                    value={(good)/(good+neutral+bad) *100}
                />
            </tbody>
        </table>
    )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => {
    if(text === 'Positive') {
        return (
            <tr>
                <td>{text}</td>
                <td>  </td>
                <td>{value} %</td>
            </tr>   
        )
    }
    return (
        <tr>
            <td>{text}</td>
            <td>  </td>
            <td>{value}</td>
        </tr>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));