import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function PieChart({ LabelTxt, data, titleTxt }) {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: LabelTxt,
        data: data.map(item => item.count),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: titleTxt }
    }
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
