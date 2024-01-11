'use client'

import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const DonutChart = () => {
  useEffect(() => {
    const chart = new Chart({
      width: 600,
      height: 400,
      container: 'donut-chart-container',
    });

    chart
      .interval() // Create an Interval tag
      .coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 })
      .data(data) // Bind data
      .encode('x', 'genre') // Encode x channel
      .encode('y', 'sold'); // Encode y channel

    // Render visualization
    chart.render()

  }, [data])

  return (
    <div id='donut-chart-container' />
  )
}

export default DonutChart;
