import React, { useContext }  from 'react';
import { transactionContext } from '../../services/context/buget/transactionsContext';
import { Vault, Coins, CreditCard } from 'phosphor-react';
import './Cards.css';

const Cards = () => {
    const { data: transactions } = useContext(transactionContext);

        const price = transactions.map((trans)=> trans.amount);
        const total = price.reduce((acc, currentAmount) => acc + +currentAmount, 0);

        const filterExpanse = () =>{
            const expanse = transactions.filter((trans)=> trans.type === 'expanse');
            const expansePrice = expanse.map((trans)=> trans.amount);
            const totalExpanse = expansePrice.reduce((acc, currentAmount) => acc + +currentAmount, 0);
            return totalExpanse;
        }

        const currentAmount = () =>{
            return total - filterExpanse()
        }

    return (
        <div>
            <div className='cards'>
                {/* Data Card */}
                <div className='card card-money'>
                    <div className='card-icon'>
                        <Vault size={46} />
                    </div>
                    <h4 className="text-center card-text">Data Card</h4>
                    <span className='amount' >Total: {currentAmount()}</span>
                </div>

                {/* Income Card */}
                <div className='card card-income'>
                <div className='card-icon'>
                        <Coins size={46} />
                    </div>
                    <h4 className="text-center card-text">Income Card</h4>
                    <span className='amount' >Total: {total}</span>
                </div>

                {/* expanse Card */}
                <div className='card card-expanse'>
                <div className='card-icon'>
                        <CreditCard size={46} />
                    </div>
                    <h4 className="text-center card-text">expanse Card</h4>
                    <span className='amount'>Total: {filterExpanse()}</span>
                </div>
            </div>
        </div>
    )
}

export default Cards