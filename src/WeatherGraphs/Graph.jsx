import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ id, labels, data, label, color }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && labels.length > 0 && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Find minimum and maximum temperature values
      const minTemperature = Math.min(...data);
      const maxTemperature = Math.max(...data);

      // Set y-axis bounds with some padding
      const minY = Math.floor(minTemperature) - 1;
      const maxY = Math.ceil(maxTemperature) + 1;

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              borderColor: `rgb(${color})`,
              backgroundColor: `rgba(${color}, 0.2)`,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Set to false to adjust aspect ratio
          scales: {
            y: {
              min: minY,
              max: maxY
            }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data, label, color]);

  return <canvas id={id} ref={chartRef} />;
};

export default Graph;
