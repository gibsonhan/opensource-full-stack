import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    const {part1, part2, part3} = props;
    return (
        <div>
            <Part part={part1} />
            <Part part={part2} />
            <Part part={part3} />
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    const {name, exercises} = props.part;
    return(
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
    )
}
const App = () => {
    const course = 'Half Stack Application developmentm'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3= {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises} />
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));
