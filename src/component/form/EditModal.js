import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';
import { CategoriesContext } from '../../services/context/buget/categoriesContext';

const EditForm = ({ children, show, handleCloseForm, defaultValue, handleUpdateForm}) => {
    const { data: categories } = useContext(CategoriesContext);
    const showHideClassName = !show ? 'modal-none' : 'modal-block';

    let initialBudget = {
        title: '',
        amount: '',
        type: '',
        category: '',
        date: '',
    };

    if(defaultValue){
        initialBudget = { ...defaultValue};
    }

    const [data, setData] = useState(initialBudget);
    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value) => {
        const errorsCopy = { ...errors };
        switch (fieldName) {
            case 'title':
                if (!value.trim()) {
                    errorsCopy.title = 'Title is required';
                } else {
                    delete errorsCopy.title;
                }
                break;
            case 'amount':
                if (!value || isNaN(value) || parseFloat(value) <= 0) {
                    errorsCopy.amount = 'Amount must be a positive number';
                } else {
                    delete errorsCopy.amount;
                }
                break;
            default:
                break;
        }

        setErrors(errorsCopy);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        validateField(name, value);
    };

    const handleSaveData = () => {
        for (const key in data) {
            validateField(key, data[key]);
        }

        // Check if there are any validation errors or empty fields
        const hasErrors = Object.keys(errors).length > 0;
        const hasEmptyFields = Object.values(data).some((value) => !value);

        if (!hasErrors && !hasEmptyFields) {
            handleUpdateForm(defaultValue.id,data);
            handleCloseForm();
        }
    };

    // Calculate whether the "Save" button should be disabled or not
    const isSaveButtonDisabled = Object.keys(errors).length > 0 || Object.values(data).some((value) => !value);

    return createPortal(
        <div className={showHideClassName} onClick={handleCloseForm}>
            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                <h4 className="header">Add New Budget</h4>
                <div className="form">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="title....."
                        name="title"
                        id="title"
                        value={data.title}
                        onChange={handleChange}
                        onBlur={() => validateField('title', data.title)}
                    ></input>
                    {errors.title && <p className="error">{errors.title}</p>}

                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="$amount"
                        name="amount"
                        id="amount"
                        value={data.amount}
                        onChange={handleChange}
                        onBlur={() => validateField('amount', data.amount)}
                    ></input>
                    {errors.amount && <p className="error">{errors.amount}</p>}

                    <div className="form-second-style">
                        <div className="input">
                            <label>Type</label>
                            <select
                                name="type"
                                id="type"
                                placeholder="type...."
                                value={data.type}
                                onChange={handleChange}
                                onBlur={() => validateField('type', data.type)}
                            >
                                <option value="income">Income</option>
                                <option value="expanse">expanse</option>
                            </select>
                            {errors.type && <p className="error">{errors.type}</p>}
                        </div>

                        <div className="input">
                            <label>Category</label>
                            <select
                                name="category"
                                id="Category"
                                placeholder="Category...."
                                value={data.category}
                                onChange={handleChange}
                                onBlur={() => validateField('category', data.category)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {' '}
                                        {cat.name}{' '}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="error">{errors.category}</p>}
                        </div>
                    </div>

                    <label>Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        placeholder="DD/MM/YY"
                        value={data.date}
                        onChange={handleChange}
                        onBlur={() => validateField('date', data.date)}
                    ></input>
                    {errors.date && <p className="error">{errors.date}</p>}

                    <button className="btn-save-form" onClick={handleSaveData} disabled={isSaveButtonDisabled}>
                        Save
                    </button>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default EditForm;
