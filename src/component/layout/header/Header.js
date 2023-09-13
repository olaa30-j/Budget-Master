import React, { useContext, useState } from 'react';
import ModalForm from '../../form/ModalForm';
import { transactionContext } from '../../../services/context/buget/transactionsContext';
import {Gear} from 'phosphor-react';
import DarkMode from '../../darkmode/DarkMode';
import './Header.css';

const Header = () => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(false);
  const {handleAddTransaction } = useContext(transactionContext);

  const handleModalForm = () => {
    setShow(true);
  };

  const handleCloseForm = () => {
    setShow(false);
  };

  const handleShowMode = () => {
    if (!mode) {
      setMode(true);
    } else {
      setMode(false); 
    }
  };
  const handleSubmitForm = async (data) => {
    console.log(data)
    await handleAddTransaction(data)
  };
 
  return (
    <header className="container">
      <div className="header-container">
        <span className="logo" href="#">
        </span>
        <div style={{display:'flex', alignItems:'center'}}>
          <button
            className="btn-form"
            type="submit"
            onClick={handleModalForm}
          >
            +
          </button>
          <span className='darkmode-gear' onClick={handleShowMode}>
            {mode ? (
              <span>
                <DarkMode/>
              </span>
            ) : (
              <Gear size={22} weight="fill" color='#616161'/>
            )}
          </span>
        </div>
        <ModalForm show={show} handleCloseForm={handleCloseForm} handleSubmitForm={handleSubmitForm}>
        </ModalForm>
      </div>
    </header>
  );
};

export default Header;
