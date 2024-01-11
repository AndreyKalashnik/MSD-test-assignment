'use client'

import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

interface ChartDataType {
  date: string;
  newCases: number;
  areaName: string;
}

const BarChart = (data: any) => {

  if (!data || !data.data) return <p>No data has been loaded</p>

  console.log({ data });

  useEffect(() => {

    const chart = new Chart({
      container: 'bar-chart-container',
      autoFit: true,
    });

    chart
      .interval()
      .data(data)
      .encode('x', '月份')
      .encode('y', '月均降雨量')
      .encode('color', 'name')
      .transform({ type: 'dodgeX' })
      .interaction('elementHighlight', { background: true });

    // Render visualization
    chart.render()

  }, [])

  return (
    <div id='bar-chart-container'></div>
  )
}

export default BarChart;
