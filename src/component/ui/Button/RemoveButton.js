import React from 'react'
import { Trash } from 'phosphor-react'
import './removeButton.css'

const RemoveButton = ({handleDeleteButton}) => {
  return (
    <>
      <button className='remove-button' onClick={handleDeleteButton}>
          <Trash size={24} />
      </button>
    </>
  )
}

export default RemoveButton