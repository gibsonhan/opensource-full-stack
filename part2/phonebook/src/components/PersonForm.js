import React from 'react'

const PersonForm = ({submit, nameValue, nameChange, phoneValue, phoneChange}) => {
    return (
        <>
        <h2> Add Contanct </h2>
        <form onSubmit={submit}>
                <div>
                    name: <input
                            value={nameValue}
                            onChange={nameChange}
                                />
                </div>
                <div>
                    phone:<input
                            value={phoneValue}
                            onChange={phoneChange}
                            />
                </div>
                <div>
                    <button type="submit"> add </button>
                </div>
            </form>
        </>
    )
}

export default PersonForm