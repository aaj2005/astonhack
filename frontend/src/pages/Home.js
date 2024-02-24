import React, { useState, useEffect } from 'react';
import CustomWebcam from '../components/CustomWebcam';
import Hero from '../components/Hero'

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
        <>
        <Hero/>
        <div class="container">
            <div className='text-center'>
                <h5 className='mt-5'>Mental health is important, and sometimes its hard to talk about how we feel.</h5>
                <h5>EmotionSense uses facial recognition to detect your mood, and provide personalised feedback to keep you in check.</h5>
                
            </div>
            {showButton ? (<button onClick={handleClick}>Detect Mood</button>):(<></>)}
            {detectMood ? (<CustomWebcam/>): (<></>)}
            
        </div>
        </>
       
    )
}

export default Home