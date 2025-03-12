import { useState, useEffect } from 'react';
import '../Css/Summary.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Summary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const incomeResponse = await fetch('http://localhost:11000/income-sum');
        const incomeData = await incomeResponse.json();
        setTotalIncome(incomeData.totalIncome);

        // Fetch total expense
        const expenseResponse = await fetch('http://localhost:11000/expense-sum');
        const expenseData = await expenseResponse.json();
        setTotalExpense(expenseData.totalExpense);

        // Calculate total balance
        setTotalBalance(incomeData.totalIncome - expenseData.totalExpense);

        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading or error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Prepare the data for the graph
  const data = {
    labels: ['Total Income', 'Total Expense', 'Total Balance'], // x-axis labels
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalIncome, totalExpense, totalBalance], // values to plot
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'], // colors for the bars
        borderColor: ['#388e3c', '#d32f2f', '#1976d2'], // border color for the bars
        borderWidth: 1, // border width
      },
    ]
  };

  // Graph options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Financial Summary',
      },
      tooltip: {
        callbacks: {
          label: (tooltipdata) => {
            return `$${tooltipdata.raw.toFixed(2)}`; // Format the tooltip value to show with 2 decimal places
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at 0
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`, // Format y-axis labels as currency
        },
      },
    },
  };

  return (
    <div className="financial-summary-container">
      {/* Chart container */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      {/* Summary Items */}
      <div className="summary-items-container">
        <div className="summary-item income">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-item expense">
          <h3>Total Expense</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-item balance">
          <h3>Total Balance</h3>
          <p>${totalBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
