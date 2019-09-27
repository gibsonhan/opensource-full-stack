import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    const parts = props.parts.map(part => <Part key={part.id} part={part}/>)
    return (
        <div>
            {parts}
        </div>
    )
}

const Part = (props) => {
    const {name, exercises} = props.part;
    return(
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = (props) => {
    const e1 = props.parts[0].exercises;
    const e2 = props.parts[1].exercises;
    const e3 = props.parts[2].exercises;

    const [t1, t2, t3] = props.parts.map(val => val.exercises)
    return (
        <>
            <p>Number of exercises {e1 + e2 + e3}</p>
            <p>Numbr of exercises {t1 + t2 + t3}</p>
        </>
    )
}
const App = () => {
    const course = 'Half Stack Application developmentm'
    const parts = [
        {
            id: 1,
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            id: 2,
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            id: 3,
            name: 'State of a component',
            exercises: 14
        }
    ]
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));
