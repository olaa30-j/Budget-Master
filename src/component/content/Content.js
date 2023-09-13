import React, { useContext, useState } from 'react';
import { Dropbutton } from '../ui';
import List from '../ui/list/List';
import { CategoriesContext } from '../../services/context/buget/categoriesContext';
import { transactionContext } from '../../services/context/buget/transactionsContext';
import './content.css';

const Content = () => {
  const { data: categories } = useContext(CategoriesContext);
  const newCategories = [
    {id:0, name:'categories'},
    ...categories
  ]

  const { data: transactions } = useContext(transactionContext);
  const typeFilter =[
    { name:'All', id:'All' },
    { name:'income', id:'income' },
    { name:'expanse', id:'expanse' }
  ]

  // const SortByFilter =[
  //   {id:1 , name:'price'},
  //   {id:2 , name:'date'},
  //   {id:3 , name:'type'},
  //   {id:4 , name:'category'}
  // ]



// handle filter bu category
const [selectedCategory, setSelectedCategory] = useState('categories');
const handleCategorySelection = (selectedOption) => {
  setSelectedCategory(selectedOption);
};

// eslint-disable-next-line eqeqeq
const filteredTransactions = selectedCategory === 'categories'? transactions : transactions.filter((trans) => trans.category == selectedCategory);




// handle filter by type
const [selectedType, setSelectedType] = useState('All');
const handleTypeSelection = (selectedOption) => {
  setSelectedType(selectedOption);
};

  const filteredType = selectedType === 'All' ? filteredTransactions : filteredTransactions.filter((trans) => trans.type === selectedType) ;





return (
  <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="header-transation">
      <h3>Recent Transactions</h3>
      <div className="filter-transactions">
        {/* <Dropbutton options={SortByFilter} onSelected={handleSortBySelection} /> */}
        <Dropbutton options={newCategories} onSelected={handleCategorySelection}/>
        <Dropbutton options={typeFilter} onSelected={handleTypeSelection} />
      </div>
    </div>



    
    {filteredType.map((eachTrans) => (
      <div key={eachTrans.id} className="transactions-container">
        <List eachTrans={eachTrans} />
      </div>
    ))}
  </div>
  );
};

export default Content;
