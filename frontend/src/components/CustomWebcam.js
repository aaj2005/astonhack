import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useCallback
import BoundingBox from "./BoundingBox";

const CustomWebcam = ({ onHide }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const maxCount = 500
  const [data, setData] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
        console.log(count)
         if (count == maxCount) {
            setLoading(false)
            onHide()
         } else {
            setCount(count+1)
            try {
               
                const response = await fetch('http://127.0.0.1:2223/api/frame',{
                    method:"POST",
                    body: JSON.stringify({ imageData: webcamRef.current.getScreenshot() }),
                    headers: {
                        "Content-type": "application/json"
                    }
                    }
                )
                .then(response => response.json())
                .then(data => {
                  // Now 'data' contains the parsed JSON response
                  console.log(data)
                  setData(data);
                })  
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        
        }
    }

    const intervalId = setInterval(() => {
        fetchData();  
    }, 10);
    //  33 for 30fps

    return () => clearInterval(intervalId);
  })

  const videoConstraints = {
    // Set facingMode to 'user' or 'environment' depending on the desired camera
    facingMode: 'user', // 'user' for the front camera, 'environment' for the back camera
    width: 1024, // Set a small width
    height: 576, // Set a small height
  };
  // 1024, 576



  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  return (
    <div className="container mt-5">

       
            <div class="">
                    {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                ) : (
                    <>
                    {(count < maxCount) ? (
                      <div className="text-center">
                    <div className="" style={{position: 'relative'}}>
                      <Webcam videoConstraints={videoConstraints} ref={webcamRef} class="camera"/>
                      {data && data[0] != 0 && <BoundingBox class="shift-to-center" boxData={data} />}
                      <p>Hold still for 8 seconds!</p>
                    </div></div>) : (<></>)}
                    
                    </>

                )}

            </div>
            <div class="">
                    {loading ? (
                        <div class="text-center">
                            <p>Capturing face...</p>
                            <p>Detecting mood...</p>
                            <p>Personalising feedback...</p>
                        </div>
                    ):(
                        <></>
                    )
                    }
            </div>
        
    </div>
  );
};

export default CustomWebcam;