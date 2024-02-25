from AI.SpeedTesting import mainLoop
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from io import BytesIO
from flask_socketio import SocketIO
import json
import cv2
import base64
import numpy as np
from scipy import misc


#something
app = Flask(__name__)
# socketio = SocketIO(app, cors_allowed_origins="*")

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
	# print(test)
	# print(request.headers)
    data = request.json["imageData"]
    image = Image.open(BytesIO(data))
    numpy_array = np.array(image)

    webp_to_jpg(numpy_array)
	# print(jpg_original)
	# img = cv2.imdecode(jpg_as_np, flags=1)
	# print(img)
	# cv2.imwrite('./images.webp', img)

    return {"1":"hello world"}


# @socketio.on('frame')
# def imageProcess(frame_data):

#     encoded_data = frame_data.split(',', 1)
    
#     # padding = '=' * (4-(len(encoded_data[-1]) % 4))
#     # encoded_data[-1] += padding

#     # print("Length:" + str(len(encoded_data[-1])))
#     # print(encoded_data[-1])
    
#     binary_data = base64.b64decode(encoded_data[-1])

#     # Create a BytesIO buffer from the binary data
#     # buffer = BytesIO(binary_data)

#     image = Image.open(BytesIO(binary_data))
#     # print(image)

#     with BytesIO() as jpeg_buffer:
#         image.save(jpeg_buffer, format="JPEG")
#         jpeg_buffer.seek(0)
#         jpeg_image = Image.open(jpeg_buffer)
        
#         # Now convert the JPEG image to a NumPy array
#         numpy_array = np.array(jpeg_image)

#         # Here, numpy_array is ready and you can use it with mainLoop or any other function
#     newImg = mainLoop(numpy_array)

#     img_str = json.dumps(newImg)
#     # img_str = base64.b64encode(newImg).decode('utf-8')

#     socketio.emit('processed_frame', img_str)




# Latest socket version
# @socketio.on('frame')
# def imageProcess(frame_data):

#     encoded_data = frame_data.split(',', 1)
    
#     # padding = '=' * (4-(len(encoded_data[-1]) % 4))
#     # encoded_data[-1] += padding

#     # print("Length:" + str(len(encoded_data[-1])))
#     # print(encoded_data[-1])
    
#     binary_data = base64.b64decode(encoded_data[-1])

#     # Create a BytesIO buffer from the binary data
#     # buffer = BytesIO(binary_data)

#     image = Image.open(BytesIO(binary_data))
#     # print(image)

#     with BytesIO() as jpeg_buffer:
#         image.save(jpeg_buffer, format="JPEG")
#         jpeg_buffer.seek(0)
#         jpeg_image = Image.open(jpeg_buffer)
        
#         # Now convert the JPEG image to a NumPy array
#         numpy_array = np.array(jpeg_image)

#         # Here, numpy_array is ready and you can use it with mainLoop or any other function
#     newImg = mainLoop(numpy_array)
#     print(newImg)

#     img_str = base64.b64encode(newImg).decode('utf-8')

#     socketio.emit('processed_frame', img_str)








# Code without websocket
@app.route("/api/frame", methods=["POST"])
def imageProcess():
    
    
    base64_string = request.json["imageData"]

    _, data = base64_string.split(',', 1)

    # Decode the base64 data
    decoded_data = base64.b64decode(data)

    # Create a PIL Image
    image = Image.open(BytesIO(decoded_data))

    # print(image)

    with BytesIO() as jpeg_buffer:
        image.save(jpeg_buffer, format="JPEG")
        jpeg_buffer.seek(0)
        jpeg_image = Image.open(jpeg_buffer)
        
        # Now convert the JPEG image to a NumPy array
        numpy_array = np.array(jpeg_image)

        # Here, numpy_array is ready and you can use it with mainLoop or any other function
    newImg = list(map(str, mainLoop(numpy_array)))
    print(newImg,"jgifdgjdfigfidjifdidfjibfdmibmfdi")

    # newImg_list = newImg.tolist()
    img_str = json.dumps(newImg)
    print(type(img_str))
    # img_str = base64.b64encode(newImg).decode('utf-8')

    # Send as JSON
    return img_str



if __name__ == "__main__":
    app.run(port=2223)
    
    # socketio.run(app, port=2223, debug=True)
