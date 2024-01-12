'use client'

import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

interface TransformedDataType {
  country: string;
  name: string;
  amount: number;
}

const BarChart = (data: any) => {
  const barChartData: TransformedDataType[] = [];

  data.data.forEach((country: any) => {
    ['newPeopleVaccinatedFirstDoseByPublishDate', 'newPeopleVaccinatedSecondDoseByPublishDate'].forEach((doseType: string) => {
      barChartData.push({
        country: country.areaName,
        name: doseType,
        amount: country[doseType]
      });
    });
  });

  useEffect(() => {
    const chart = new Chart({
      container: 'bar-chart-container',
      autoFit: true,
    });

    chart
      .interval()
      .data(barChartData)
      .encode('x', 'country')
      .encode('y', 'amount')
      .encode('color', 'name')
      .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
      .transform({ type: 'dodgeX' })
      .interaction('elementHighlight', { background: true })
      .tooltip((data) => ({
        name: data.name.replace(/([a-z])([A-Z])/g, '$1 $2'),
        value: data.amount,
      }));

    chart.render();

  }, []);

  if (!data || !data.data) return <p>No data has been loaded</p>

  return (
    <div id='bar-chart-container'></div>
  );
}

export default BarChart;
