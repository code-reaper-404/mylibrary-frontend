import React from 'react'
import DataTable from '../components/DataTable/DataTable';
import { getHistory } from '../services/ApiService';
import './CSS/History.css'

const History = () => {
  const [historyData, setHistoryData] = React.useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistoryData(data.data);
    } catch (error) {
      console.log("Error fetching history data: ", error);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    { field: "action", headerName: "Action" },
    { field: "book.title", headerName: "Book Title" },
    { field: "createdAt", headerName: "Time" }
  ]


  return (
    <div className='history-sec'>
      <DataTable data={historyData} columns={columns} />
    </div>
  )
}

export default History