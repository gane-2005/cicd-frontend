import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './style.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Customers', 'Companies', 'Leads', 'Orders'],
    datasets: [
      {
        label: 'CRM Data',
        data: [300, 50, 100, 120],
        backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
        borderColor: ['#fff', '#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>CRM Dashboard</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>Sales Data</h3>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h3>Data Overview</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
