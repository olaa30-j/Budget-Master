import React from 'react'
import {Chart as ChartjS, ArcElement, Legend, Tooltip} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './DougnutChart.css'

ChartjS.register( ArcElement, Legend, Tooltip)

const options = {
  plugins:{
    legend:{
      labels:{
        color:'var(text-color)',
      }
    }
  }
}

const DougnutChart = ({data, colors}) => {
  const chartData ={
    labels: Object.keys(data),
    datasets:[{
      data: Object.values(data),
      backgroundColor: colors,
      borderColor: 'white',
      borderWidth:1,
    }]
  }
  return (
    <div className='dougnut-color'><Doughnut data={chartData} options={options}/></div>
  )
}

export default DougnutChart