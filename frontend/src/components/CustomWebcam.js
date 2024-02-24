import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useCallback

const CustomWebcam = ({ onHide }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const maxCount = 200


  const retake = () => {
    setImgSrc(null);
  };



// test
  useEffect(() => {
    const fetchData = async () => {
        console.log(count)
         if (count == maxCount) {
            setLoading(false)
            onHide()
         } else {
            setCount(count+1)
            try {
                const response = await fetch('https://0a9d-134-151-21-91.ngrok-free.app/',{
                    method:"POST",
                    body: JSON.stringify({ imageData: webcamRef.current.getScreenshot() }),
                    headers: {
                        "Content-type": "application/json"
                    }
                    }
                )
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        
        }
    }

    const intervalId = setInterval(() => {
        fetchData();
    }, 33);
    //  33 for 30fps

    return () => clearInterval(intervalId);
  })


// test
  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  return (
    <div className="container mt-5">

        <div class="row" id="display">
            <div class="col-6">
                    {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                ) : (
                    <>
                    {(count < maxCount) ? (
                    <div className="text-center">
                    <Webcam height={400} width={600} ref={webcamRef} class="camera" />
                    <p>Hold still for 8 seconds!</p>
                    </div>) : (<></>)}
                    </>

                )}

            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
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
      
    </div>
  );
};

export default CustomWebcam;