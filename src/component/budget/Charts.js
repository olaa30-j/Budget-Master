import React , {useContext, useMemo} from 'react'
import { transactionContext } from '../../services/context/buget/transactionsContext';
import { CategoriesContext } from '../../services/context/buget/categoriesContext';
import DougnutChart from '../ui/DountChart/DougnutChart';

const incomeColors = [
    '#3D246C',
    '#5C4B99',
    '#9F91CC',
    '#FFDBC3'
]

const expanseColors = [
    '#A73121',
    '#FFF3E2',
    '#E74646',
    '#DAD4B5',
    '#FA9884',
    '#952323',
    '#F2E8C6',
]


const Charts = () => {
    const { data: transactions } = useContext(transactionContext);
    const {data:categoriesData} = useContext(CategoriesContext)


    const chartData = useMemo(()=>{
        const data =[...transactions]
        const chartData = {income:null, expanse:null}

        if(transactions && transactions.length && categoriesData && categoriesData.length){
            chartData.expanse={}
            chartData.income={}

            data.forEach(dataa => {
                // eslint-disable-next-line eqeqeq
                let categoryName = categoriesData.find(cat => cat.id == dataa.category).name;

                console.log(categoryName)
                if(dataa.type === 'income'){
                    if(chartData.income[categoryName]){
                        chartData.income[categoryName] += +dataa.amount
                    }else{
                        chartData.income[categoryName]  = +dataa.amount
                    }
                }

                if(dataa.type === 'expanse'){
                    if(chartData.expanse[categoryName]){
                        chartData.expanse[categoryName] += +dataa.amount
                    }else{
                        chartData.expanse[categoryName]  = +dataa.amount
                    }
                }
            });
        }
        return chartData
    },[transactions, categoriesData])

  return (
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
        <DougnutChart data={chartData.expanse} colors={incomeColors}/>
        <DougnutChart data={chartData.income} colors={expanseColors}/>
    </div>
  )
}

export default Charts