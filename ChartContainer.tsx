import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { DataPoint } from '../types';

Chart.register(...registerables);

interface ChartContainerProps {
  title: string;
  value: string;
  data: DataPoint[];
  chartType: 'line' | 'bar';
  color: string;
  borderColor: string;
  className?: string;
  fill?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  value, 
  data, 
  chartType, 
  color, 
  borderColor,
  className = "",
  fill = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // If a chart already exists, destroy it
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = data.map(point => {
      const date = new Date(point.timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const values = data.map(point => point.value);

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: 2,
            tension: 0.3,
            fill: fill,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(75, 85, 99, 0.3)',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(75, 85, 99, 0.2)',
            },
            ticks: {
              color: 'rgba(156, 163, 175, 0.8)',
              font: {
                size: 10,
              },
            },
          },
        },
        animation: {
          duration: 1000,
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, chartType, color, borderColor, fill, title]);

  return (
    <div className={`bg-gray-900 rounded-lg p-3 ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
      <div className="chart-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default ChartContainer;