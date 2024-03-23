import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function BestProfessorsGraph() {
  const [professorsData, setProfessorsData] = useState([]);

  useEffect(() => {
    async function fetchProfessorsData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/professors/instructions`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfessorsData(data.professorsInstructions);
      } catch (error) {
        console.error("Error fetching professors data:", error);
      }
    }

    fetchProfessorsData();
  }, []);

 useEffect(() => {
    if (professorsData.length > 0) {
      renderChart();
    }
  }, [professorsData]);

  function renderChart() {
    const ctx = document.getElementById("professorsChart");
    const names = professorsData.map((professor) => `${professor.name} ${professor.surname}`);
    const counts = professorsData.map((professor) => professor.countInstructions);

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy(); 
    }
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: names,
        datasets: [
          {
            label: "Broj instrukcija",
            data: counts,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)', 
                'rgba(75, 192, 192, 0.2)', 
                'rgba(153, 102, 255, 0.2)', 
                'rgba(255, 159, 64, 0.2)', 
                'rgba(201, 203, 207, 0.2)' 
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 99, 132, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)', 
                'rgba(255, 159, 64, 1)', 
                'rgba(201, 203, 207, 1)' 
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  return (
        <div className="graph-container" style={{ textAlign: "center" }}> {/* Apply inline style for centering */}
          <h1>Profesori sa najviše održanih instrukcija:</h1>
          <canvas id="professorsChart" width="400" height="200"></canvas>
        </div>
  );
}

export default BestProfessorsGraph;