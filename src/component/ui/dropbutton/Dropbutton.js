import React from 'react'
import './dropbutton.css'

const Dropbutton = ({options, onSelected}) => {
    return (
        <select className='dropdown' onChange={(e)=> onSelected(e.target.value)}>
            {options.map((option) => (
                <option
                    className='dropdown-option'
                    key={option.id !== null ? option.id : 'defaultKey'}
                    value={option.id}
                >
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default Dropbutton