import React, { useState, useEffect } from 'react';
import CustomWebcam from '../components/CustomWebcam';
const Home = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://0a9d-134-151-21-91.ngrok-free.app/', {method:"POST"}); 
        const result = await response.json();
        console.log(result)
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
    return (
        <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render your data here */}
          <p>{data["1"]}</p>
        </div>
      )}
      <CustomWebcam/>
    </div>
    )
}

export default Home