import React from 'react'

const Filter = ({newFilter, handleNewFilter}) => {
    return(
        <div>
            Filter show with: <input 
                value={newFilter}
                onChange={handleNewFilter}
            />
        </div>
    )
}

export default Filter;