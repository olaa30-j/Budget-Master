import React, { useContext, useState } from 'react';
import EditButton from '../Button/EditButton';
import RemoveButton from '../Button/RemoveButton';
import { MinusCircle, CurrencyCircleDollar } from 'phosphor-react';
import { transactionContext } from '../../../services/context/buget/transactionsContext';
import { CategoriesContext } from '../../../services/context/buget/categoriesContext';
import EditModal from '../../form/EditModal';
import './list.css';

const List = ({ eachTrans }) => {
    const { loading, error, handleDeleteTransaction, handleUpdateTransaction } = useContext(transactionContext);
    const { data: categoriesData } = useContext(CategoriesContext);

    const [show, setShow] = useState(false);

    const handleDeleteButton = (id) => {
        handleDeleteTransaction(id);
    };

    const handleModalForm = (transaction) => {
        setShow(true);
    };

    const handleCloseForm = () => {
        setShow(false);
    };

    const handleUpdateForm = async (id, updatedData) => {
        await handleUpdateTransaction(id, updatedData);
        setShow(false);
    };

    // Find the category for the transaction
    // eslint-disable-next-line eqeqeq
    const category = categoriesData.find((categoryItem) => categoryItem.id == eachTrans.category);
    return (
        <>
            <section className="main-container-transcations" key={eachTrans.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={`icon-transaction ${eachTrans.type === 'income' ? 'income' : 'expanse'}`}>
                        {eachTrans.type === 'income' ? <CurrencyCircleDollar size={36} /> : <MinusCircle size={36} />}
                    </div>
                    <div className='content-transaction'>
                        <h4 className='description-of-transaction text'>{eachTrans.title}</h4>
                        <div className='more-data'>
                            <small>{eachTrans.amount} || </small>
                            <small>{eachTrans.date} || </small>
                            <small>{category ? category.name : 'category'}</small>
                        </div>
                    </div>
                </div>
                <div className='transaction-controller'>
                    <EditButton handleModalForm={handleModalForm} defaultValue={eachTrans}/>
                    <RemoveButton handleDeleteButton={() => handleDeleteButton(eachTrans.id)} />
                </div>
            </section>
            {
                loading &&
                <p>Loading...</p>
            }

            {
                error && (
                    <p>{error}</p>
                )
            }

            {
                show && (
                    <EditModal
                        show={show}
                        handleCloseForm={handleCloseForm}
                        defaultValue={eachTrans} 
                        handleUpdateForm={handleUpdateForm} 
                    />
                )
            }
        </>
    );
}
export default List;
