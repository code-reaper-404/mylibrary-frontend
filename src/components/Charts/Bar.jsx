import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

function BarChart({ LabelTxt, data, titleTxt }) {
  const chartData = {
    labels: data.map(item => item.label), // X-axis
    datasets: [
      {
        label: LabelTxt,
        data: data.map(item => item.count), // Y-axis
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: titleTxt }
    },
    scales: {
      y: {
        beginAtZero: true // Start Y axis at 0
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
