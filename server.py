from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__)

CORS(app)



@app.route("/", methods=["POST"])
def index():
	return {"1":"hello world"}


if __name__ == "__main__":
	
	app.run(port=2222)