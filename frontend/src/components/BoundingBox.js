import { useState, useEffect } from 'react';

const BoundingBox = ({ boxData }) => {
    const [ignore, x, y, width, height] = boxData;
  
    const emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
    const colour_dict = {0: "red", 1: "green", 2: "pink", 3: "yellow", 4: "white", 5: "blue", 6: "orange"}
    const colour = colour_dict[ignore]  
    const textStyle = {
      position: 'absolute',
      top: `${y-25}px`,
      left: `${x}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: colour,  // Customize text color
      fontSize: '16px',  // Customize font size
      fontWeight: 'bold',  // Customize font weight
    };

    
    return (
      <div>
        <div className='bounding-box'
          style={{
            top: `${y}px`,
            left: `${x}px`,
            left: `calc(8vw + ${x}px)`,
            width: `${width}px`,
            height: `${height}px`,
            borderColor: colour,
          }}
        ></div>
        <div className='bounding-text' style={textStyle}>{emotion_dict[ignore]}</div>
      </div>
    );
  };
export default BoundingBox