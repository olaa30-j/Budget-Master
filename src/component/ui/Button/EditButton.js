import React from 'react'
import { Pencil } from 'phosphor-react'
import './editButton.css'

const EditButton = ({ handleModalForm, defaultValue }) => {

    return (
        <button className={`edit-button ${defaultValue.type === 'expanse'?'expanse-edit':'income-edit'}`} onClick={() => { console.log(defaultValue); handleModalForm() }}>
            <Pencil size={28} />
        </button>
    )
}

export default EditButton
