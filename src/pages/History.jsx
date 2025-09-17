import React, { useState } from 'react'
import DataTable from '../components/DataTable/DataTable';
import { getHistory } from '../services/ApiService';
import Loader from '../components/Loader/Loader';
import './CSS/History.css'

const History = () => {
  const [historyData, setHistoryData] = React.useState([]);
  const [loading, setLoading] = useState(true);


  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistoryData(data.data);
    } catch (error) {
      console.log("Error fetching history data: ", error);
    } finally {
      setLoading(false); // always stop loader
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

  if (loading) return <Loader color={"#ff5400"} />;

  return (
    <div className='history-sec'>
      <DataTable data={historyData} columns={columns} />
    </div>
  )
}

export default History