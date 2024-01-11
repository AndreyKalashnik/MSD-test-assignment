'use client'

import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

interface ChartDataType {
  date: string;
  newCases: number;
  areaName: string;
}


const DonutChart = (data: any) => {

  const casesByCountry = data.data.map((elem: ChartDataType) => elem.newCases);

  const totalCases = casesByCountry.reduce((accumulator: number, value: number) => {
    return accumulator + value;
  }, 0);

  console.log({ totalCases });

  const chartData = data.data.map((elem: ChartDataType) => {
    return { item: elem.areaName, count: elem.newCases, percent: ((elem.newCases * 100) / totalCases) / 100 }
  })

  console.log({ chartData });

  useEffect(() => {
    const chart = new Chart({
      // width: 600,
      // height: 400,
      container: 'donut-chart-container',
      autoFit: true,
    });

    chart
      .interval() // Create an Interval tag  
      .data(chartData) // Bind data
      .transform({ type: 'stackY' })
      .coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 })
      .encode('y', 'percent')
      .encode('color', 'item')
      .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
      .tooltip((data) => ({
        name: data.item,
        value: `${data.percent * 100}%`,
      }));

    // Render visualization
    chart.render()

  }, [])

  if (!data.data) return <p>No data has been loaded</p>

  return (
    <div id='donut-chart-container' />
  )
}

export default DonutChart;
