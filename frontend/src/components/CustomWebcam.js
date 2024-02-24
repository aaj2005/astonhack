import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useCallback
import socketIOClient from 'socket.io-client';

const CustomWebcam = ({ onHide }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const maxCount = 200
  const [data, setData] = useState(null)

  const socket = useRef(null)

  const retake = () => {
    setImgSrc(null);
  };



// test
  useEffect(() => {
    const socket = socketIOClient('http://localhost:2223');


    // Connection opened
    socket.on('connect', () => {
      console.log('Connected to server');
      // socket.emit('open', 'Connection established');
    });

    // Listen for messages
    socket.on('processed_frame', (event) => {
      // console.log('Message from server:', event);
      setData(event)  
      console.log(event)
      
    });


    const fetchData = async () => {
        console.log(count)
         if (count == maxCount) {
            setLoading(false)
            onHide()
         } else {
            setCount(count+1)
            try {
                // if (socket.current && socket.current.readyState === WebSocket.OPEN) {
                // console.log(webcamRef.current.getScreenshot())
                socket.emit('frame', webcamRef.current.getScreenshot());
                // }
                // const response = await fetch('http://127.0.0.1:2223/api/frame',{
                //     method:"POST",
                //     body: JSON.stringify({ imageData: webcamRef.current.getScreenshot() }),
                //     headers: {
                //         "Content-type": "application/json"
                //     }
                //     }
                // )
                // .then(response => response.json())
                // .then(data => {
                //   // Now 'data' contains the parsed JSON response
                //   setData(data);
                //   console.log(data)
                // })
                // // setData(response.json())
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        
        }
    }

    const intervalId = setInterval(() => {
        fetchData();  
    }, 300);
    //  33 for 30fps

    return () => clearInterval(intervalId);
  })

  const videoConstraints = {
    // Set facingMode to 'user' or 'environment' depending on the desired camera
    facingMode: 'user', // 'user' for the front camera, 'environment' for the back camera
    width: 600, // Set a small width
    height: 600, // Set a small height
  };


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
                    <Webcam videoConstraints={videoConstraints} ref={webcamRef} class="camera" />
                    {data ? (
                      <img src={`data:image/jpeg;base64,${data}`} width={300} height={300} />
                    ) : (
                      <p>No data to show :(</p>
                    )}
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