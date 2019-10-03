import React from 'react'
import Display from './Display'

const Content = ({contents}) => {

    const display = () => {
        return contents.map(content => <Display key={content.id} text={content.name} num={content.exercises} />)
    }

    const total = () => {
        return contents.reduce((sum, course) => {
            return sum += course.exercises
        }, 0)
    }
  
    return (
        <>
            {display()}
            <b>total of {total()} exercises</b>
        </>
    )
}

export default Content