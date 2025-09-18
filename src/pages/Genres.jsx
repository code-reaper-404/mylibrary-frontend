import React, { useEffect, useState } from 'react'
import './CSS/Genres.css'
import DataCard from '../components/DataCard/DataCard';
import { PiBookmarkFill } from 'react-icons/pi';
import { getGenre } from '../services/ApiService';
import AddGenre from '../components/AddGenre/AddGenre';
import Loader from '../components/Loader/Loader';


const Genres = () => {
    const [genreData, setGenreData] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchGenre = async () => {
                const data = await getGenre();
                setGenreData(data.data);
            }
            fetchGenre();
        } catch (error) {
            console.log("Error fetching genre: ", error);
        } finally {
            setLoading(false); // always stop loader
        }

    }, [])

    if (loading) return <Loader color={"#4cc9f0"} />;


    return (
        <div className='genres-section'>
            <button className='add-btn' onClick={() => setPopupVisible(true)}>Add Genre</button>
            {popupVisible && (
                <div className="add-genre-div">
                    <AddGenre>
                        <button className='add-btn' onClick={() => setPopupVisible(false)}> X </button>
                    </AddGenre>
                </div>

            )}
            <div className="main-grid genres">
                {
                    genreData && genreData.length > 0 ? (
                        genreData.map((genre) => (
                            <div className="card" key={genre._id}>
                                <DataCard icon={<PiBookmarkFill />} count={genre.count || 0} label={genre.name} color={genre.color} />
                            </div>
                        ))
                    ) :
                        (
                            <Loader color={"#dddf00"} />
                        )

                }
            </div>

        </div>
    )
}

export default Genres