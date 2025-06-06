// src/app/analytics/components/Chart.tsx
"use client";
import { useEffect, useRef } from "react";
import { Chart, type ChartData } from "chart.js/auto";

type ChartProps = {
  data: ChartData<"bar">;
};

export default function ChartComponent({ data }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow">
      <canvas ref={chartRef} />
    </div>
  );
}
