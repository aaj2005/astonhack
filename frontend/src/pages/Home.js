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
                  setPrompt(data);
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


//     const jsonResponse = `
//   I'm sorry to hear that you're feeling predominantly sad. Here are some suggestions to help you cope with and address these negative emotions:

//   - Reach out for support: It's important to reach out to someone you trust, such as a friend, family member, or mental health professional, and let them know about your feelings. Sharing your emotions with others can provide comfort, understanding, and potential solutions.
//   - Engage in self-care: Prioritize self-care activities that promote your overall well-being. This may include getting enough rest, eating nutritious meals, engaging in physical activity, and practicing relaxation techniques like deep breathing or meditation.
//   - Express your emotions: Find healthy outlets to express and process your emotions, such as through journaling, art, or music. Allowing yourself to acknowledge and express your sadness can help you release some of the emotional burden.
//   - Seek professional help: If your feelings of sadness persist or interfere with your daily functioning, consider reaching out to a mental health professional. They can provide guidance, support, and therapeutic interventions tailored to your specific needs.
//   - Engage in activities that bring you joy: Although you're feeling mostly sad, try to incorporate activities into your routine that bring you moments of happiness or distraction. It could be listening to uplifting music, watching a favorite movie, or engaging in hobbies that you enjoy.
//   - Practice self-compassion: Be kind and gentle with yourself during this time. Remember that it's okay to feel sad, and it's a natural part of being human. Treat yourself with compassion, understanding that healing takes time.

//   It's important to note that these suggestions may not completely eliminate your sadness, but they can help you cope with and navigate through difficult emotions. Remember to be patient with yourself and reach out for professional help if needed. You don't have to face this alone, and there are resources available to support you.
// `;
    const getParagraphs = (input) => {
      setParagraphs(input.split('\n\n').filter(para => para.trim() !== ''))
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
            const paragraphLines = paragraph.split('- ').filter(line => line.trim() !== '');
    
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