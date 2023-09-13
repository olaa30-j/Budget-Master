import React, { useContext } from 'react'
import { transactionContext } from '../../services/context/buget/transactionsContext';
import ToDoList from '../ToDoList/ToDoList';
const SavingsCard = () => {
    const { data: transactions } = useContext(transactionContext);

    // eslint-disable-next-line eqeqeq
    const data = transactions.filter((trans)=> trans.category == 6 ? trans : undefined)

    const eachSavingTrans = data.map((savingTrans)=> savingTrans.amount)

    let totalSavings=()=>{
        const total = eachSavingTrans.reduce((acc, currentAmount) => acc + +currentAmount, 0);
        return total;
}

    console.log(totalSavings())
    return(
        <>
            <div>
                <ToDoList totalSavings={totalSavings}/>
            </div>
        </>
    )
}

export default SavingsCard