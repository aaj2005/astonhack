from flask import Flask, request
# from flask_cors import CORS, cross_origin

import cv2
import base64
import numpy as np
from scipy import misc


app = Flask(__name__)

# CORS(app)

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


@app.route("/", methods=["POST"])
def index():
	# test = {'imageData': 'data:image/webp;base64,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'}
	# print(test)
	# print(request.headers)
	data = request.json["imageData"]
	webp_to_jpg(data)
	# print(jpg_original)
	# img = cv2.imdecode(jpg_as_np, flags=1)
	# print(img)
	# cv2.imwrite('./images.webp', img)

	return {"1":"hello world"}


if __name__ == "__main__":
	
	app.run(port=2222)