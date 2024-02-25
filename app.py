from AI.SpeedTesting import mainLoop, getCumulativeArray
from APIStuff.OpenAPI.initialPrompt import main
from flask import Flask, request
from flask_cors import CORS
from io import BytesIO
import json

import base64
import numpy as np



#somethin
app = Flask(__name__)

CORS(app)

import base64
from PIL import Image
from io import BytesIO

def webp_to_jpg(webp_base64_string, output_file_path='output.jpg'):
    # Remove the "data:image/webp;base64," prefix
    webp_base64_string = webp_base64_string.replace("data:image/webp;base64,", "")

    # Decode base64 string to binary data
    binary_data = base64.b64decode(webp_base64_string)

    # Open WebP image using Pillow
    with Image.open(BytesIO(binary_data)) as webp_image:
        # Save as JPG
        webp_image.convert('RGB').save(output_file_path, format='JPEG') 

# Example usage

@app.route("/", methods=["POST","GET"])
def index():
    if request.method == "GET":
        return "hello world"
	
    data = request.json["imageData"]
    image = Image.open(BytesIO(data))
    numpy_array = np.array(image)

    webp_to_jpg(numpy_array)
	

    return {"1":"hello world"}




@app.route("/api/frame", methods=["POST"])
def imageProcess():
    
    base64_string = request.json["imageData"]
    _, data = base64_string.split(',', 1)
    # Decode the base64 data
    decoded_data = base64.b64decode(data)
    # Create a PIL Image
    image = Image.open(BytesIO(decoded_data))

    with BytesIO() as jpeg_buffer:
        image.save(jpeg_buffer, format="JPEG")
        jpeg_buffer.seek(0)
        jpeg_image = Image.open(jpeg_buffer)
        
        # Now convert the JPEG image to a NumPy array
        numpy_array = np.array(jpeg_image)

        # Here, numpy_array is ready and you can use it with mainLoop or any other function
    newImg = list(map(str, mainLoop(numpy_array)))
    img_str = json.dumps(newImg)

    # Send as JSON
    return img_str


@app.route("/api/emotionsArray", methods=["POST"])
def getEmotionsArray():

    array = getCumulativeArray()
    array = main()

    newImg = list(map(str, array))
    img_str = json.dumps(newImg)

    return img_str

@app.route("/api/promt", methods=["POST"])
def getGPTOutput():

    # Get array from json request - might not work ahahahh loser
    jsonResponse = request.json()

    # Parse the JSON data
    parsedData = json.loads(jsonResponse)

    # Access the array
    dataArray = parsedData['data']

    prompt = main(dataArray)

    # newImg = list(map(str, array))
    # img_str = json.dumps(newImg)



    return img_str


    
    

if __name__ == "__main__":
    app.run(port=2223)
