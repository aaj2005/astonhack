import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useCallback

const CustomWebcam = () => {
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
         if (count == maxCount) {
            setLoading(false)
         } else {
            setCount(count+1)
            try {
                const response = await fetch('https://0a9d-134-151-21-91.ngrok-free.app/',
                    {method:"POST",
                    
                    body: JSON.stringify({ imageData: webcamRef.current.getScreenshot() }),
                    headers: {
                        "Content-type": "application/json"
                    }
                
                    }
                )
            } catch (error) {
                console.error('Error fetching data:', error);
            } //finally {
                //setLoading(true)
            //}
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

        <div class="row">
            <div class="col-6">
                    {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                ) : (
                    <Webcam height={400} width={600} ref={webcamRef} class="camera" />
                )}
                {/* <div className="btn-container">
                    {imgSrc ? (
                    <button onClick={retake}>Retake photo</button>
                    ) : (
                    <button onClick={capture}>Capture photo</button>
                    )}
                </div> */}
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
                    {loading ? (
                        <div class="text-center">
                            <p>Capturing face...</p>
                            <p>Detecting mood...</p>
                            <p>Personalising feedback...</p>
                            {/* <div class="spinner-border text-center" role="status">
                            </div> */}
                        </div>
                    ):(
                        // <img src= />
                        <></>
                    )
                    }
            </div>
        </div>
      
    </div>
  );
};

export default CustomWebcam;