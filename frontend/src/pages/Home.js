import React, { useState, useEffect } from 'react';
import CustomWebcam from '../components/CustomWebcam';

const Home = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detectMood, setDetection] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const handleClick = event => {
    setDetection(true);
    setShowButton(false)
  };

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
        <div class="container">
            <div className='text-center'>
                <p className='mt-5'>Welcome to EmotionSense, your go-to mental health companion. Share your feelings without hesitation – just hit the button below to get started!</p>
                
            </div>
            {showButton ? (<button onClick={handleClick}>Detect Mood</button>):(<></>)}
            {detectMood ? (<CustomWebcam/>): (<></>)}
               
        </div>
       
    )
}

export default Home