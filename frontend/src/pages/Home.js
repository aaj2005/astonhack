import React, { useState, useEffect } from 'react';
import CustomWebcam from '../components/CustomWebcam';
import Hero from '../components/Hero'

const Home = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detectMood, setDetection] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [showCameraSection, setShowCameraSection] = useState(false)
  const [emotionsArray, setEmotionsArray] = useState(null)
  const [prompt, setPrompt] = useState(null)
  const [paragraphs, setParagraphs] = useState(null)
  const handleClick = event => {
    setShowCameraSection(true);
    setShowButton(false)
  };

  const fetchEmotionsArray = async () => {
    try {
      const response = await fetch('http://127.0.0.1:2223/api/emotionsArray', {method:"POST"}); 
      const result = await response.json();
      console.log("emotions array result: " + Array.isArray(result))
      setEmotionsArray(result);
      fetchPrompt(result)
      
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };

  const fetchPrompt = async (inputArray) => {
    try {
      const stringArray = inputArray.map(value => String(value));
      const dataToSend = { dataArray: stringArray }
      const response = await fetch('http://127.0.0.1:2223/api/prompt',{
                    method:"POST",
                    body: JSON.stringify(dataToSend),
                    headers: {
                        "Content-type": "application/json"
                    } 
                    }
                )
                .then(response => response.json())
                .then(data => {
                  // Now 'data' contains the parsed JSON response
                  console.log(data)
                  setPrompt(data)
                  getParagraphs(data)
                })  
      const result = await response.json();
      console.log(result)
      setPrompt(result);
      getParagraphs(result)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleCameraHide = () => {
    setShowButton(false)
    setShowCameraSection(false)
    fetchEmotionsArray()
  }



    const getParagraphs = (input) => {
      const temp = input.split('\n\n').filter(para => para.trim() !== '')
      
      setParagraphs(temp)
      console.log(temp)
    }
    

    let currentList = [];

    return (
        <>
        <Hero/>
        <div class="container">
            <div className='text-center my-5'>
                <h5>Mental health is important, and sometimes it's hard to talk about how we feel.</h5>
                <h5 className='padding-yo'>EmotionSense uses facial recognition to detect your mood, and provide personalised feedback to keep you in check.</h5>
                
            </div>
            <div className="d-flex justify-content-center my-5 align-items-center" id="display">
            {showCameraSection ? (
                <CustomWebcam onHide={handleCameraHide} />
                ) : (
                showButton ? (
                    <div className="">
                    <button className="button" onClick={handleClick}>Detect Mood</button>
                    </div>
                ) : (
                    <></>
                )
                )}


            {/* {(!showCameraSection && !showButton) ? (     */}
            {paragraphs ? (
                <div>
                {paragraphs.map((paragraph, index) => {
            const paragraphLines = paragraph.split('\n\n').filter(line => line.trim() !== '');
    
            if (paragraphLines.length > 1) {
            
              currentList = paragraphLines.map((line, liIndex) => (
                <li key={`${index}-${liIndex}`}>{line}</li>
              ));
            } else {
             
              if (currentList.length > 0) {
                const list = <ul key={index}>{currentList}</ul>;
                currentList = []; // Reset the list
                return [list, <p key={index + 1}>{paragraph}</p>];
              }
     
              return <p key={index}>{paragraph}</p>;
            }   
            return null; 
          })}
          {currentList.length > 0 && <ul>{currentList}</ul>} 
    
            </div>)
            :
            (<></>)}
            </div>
            
        </div>
       
    </>
       
    )
}

export default Home