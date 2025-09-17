import React, { useEffect, useState } from 'react'
import DoughnutChart from '../components/Charts/Dougnut'
import DataCard from '../components/DataCard/DataCard';
import "./CSS/Dashboard.css"
import { IoLibrary } from 'react-icons/io5';
import { MdAttachMoney, MdBookmarkAdded, MdLibraryAdd } from 'react-icons/md';
import { RiBookMarkedFill, RiBookMarkedLine } from 'react-icons/ri';
import { FaNoteSticky, FaStar } from 'react-icons/fa6';
import { dashBoardData } from '../services/ApiService';
import Loader from '../components/Loader/Loader';

const Dashboard = () => {
  const [DashBoardCount, setDashBoardCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDbDataCount = async () => {
    try {
      const data = await dashBoardData();
      setDashBoardCount(data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false); // always stop loader
    }
  };

  useEffect(() => {
    fetchDbDataCount();
  }, []);

  const defaultColors = ["#2ec4b6", "#ff9f1c", "#f08080", "#a9def9"];
  let colorIndex = 0;

  const bookByGenreData = DashBoardCount?.booksByGenre?.map((item) => ({
    label: item.name || "Unknown",
    count: item.count || 0,
    color: item.color || defaultColors[colorIndex++ % defaultColors.length],
  })) || [];

  const statusLabels = {
    1: "To Read",
    2: "Reading",
    3: "Completed",
    4: "Dropped",
  };

  const bookByRead = DashBoardCount?.booksByStatus?.map((item, index) => ({
    label: statusLabels[item._id] || "Unknown",
    count: item.count || 0,
    color: defaultColors[index % defaultColors.length],
  })) || [];

  const languageColors = ["#f08080", "#2ec4b6", "#a9def9"];

  const bookByLanguage = DashBoardCount?.booksByLanguage?.map((item) => ({
    label: item._id,
    count: item.count || 0,
    color: item.color || languageColors[colorIndex++ % languageColors.length],
  })) || [];

  if (loading) return <Loader />;

  return (
    <div className='dashboard'>
      <div className='main-grid-1'>
        <div className="card div1">
          <DataCard icon={<IoLibrary />} count={DashBoardCount.allBooks || 0} label="Total Books" color="#06d6a0" />
        </div>
        <div className="card div2">
          <DataCard icon={<MdLibraryAdd />} count={DashBoardCount.wishlist || 0} label="Wishlist" color="#a9def9" />
        </div>
        <div className="card div3">
          <DataCard icon={<RiBookMarkedFill />} count={DashBoardCount.readed || 0} label="Readed" color="#fcb33ee3" />
        </div>
        <div className="card div4">
          <DataCard icon={<RiBookMarkedLine />} count={DashBoardCount.notreaded || 0} label="Not Readed" color="#f08080c7" />
        </div>
        <div className="card div5">
          <DataCard icon={<FaNoteSticky />} count={DashBoardCount.notes || 0} label="Total Notes" color="#ff9f1c" />
        </div>
      </div>
      <div className='main-grid-3'>
        <div className="card div1">
          <DataCard icon={<MdAttachMoney />} count={DashBoardCount.totalValue || 0} label="Total Value" color="#f08080" />
        </div>
        <div className="card div2">
          <DataCard icon={<FaStar />} text={DashBoardCount.topRated || "None"} label="Top Rated Book" color="#e7c6ff" />
        </div>
        <div className="card div3">
          <DataCard icon={<MdBookmarkAdded />} text={DashBoardCount.lastReaded || "None"} label="Last Finished Book" color="#2ec4b6" />
        </div>
      </div>
      <div className='main-grid-2'>
        <div className="gener-card donut card grid1">
          <DoughnutChart LabelTxt="Books" data={bookByGenreData} titleTxt="Book by Genre" />
        </div>
        <div className="status-card donut card grid2">
          <DoughnutChart LabelTxt="Books" data={bookByRead} titleTxt="Book by Status" />
        </div>
        <div className="status-card donut card grid3">
          <DoughnutChart LabelTxt="Books" data={bookByLanguage} titleTxt="Book by Language" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;