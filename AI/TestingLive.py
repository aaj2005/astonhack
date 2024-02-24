import cv2
import numpy as np
from keras.models import model_from_json
import time

emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}


# load json and create model
json_file = open("AI\model\emotion_model.json", 'r')
loaded_model_json = json_file.read()
json_file.close()
emotion_model = model_from_json(loaded_model_json)

# load weights into new model
emotion_model.load_weights("AI\model\emotion_model.h5")
print("Loaded model from disk")

# start the webcam feed
cap = cv2.VideoCapture(0)

# pass here your video path
# cap = cv2.VideoCapture("C:\\JustDoIt\\ML\\Sample_videos\\emotion_sample6.mp4")

def colourBasedEmotion(emotion):
    colourDict = {0: (0, 0, 255), 1: (0, 255, 0), 2: (255, 0, 255), 3: (0, 255, 255), 4: (255,255,255), 5: (255, 0, 0), 6: (0, 165, 255)}
    return colourDict[emotion]

def takeSinglePhoto(frame):
    # ret, frame = cap.read()
    # if not ret:
    #     return -1
    face_detector = cv2.CascadeClassifier('AI\haarcascade_frontalface_default.xml')
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)
    maxindex = -1
    x = -1
    y = -1
    w = -1
    h = -1
    for (x, y, w, h) in num_faces:
        roi_gray_frame = gray_frame[y:y + h, x:x + w]
        cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)

        # predict the emotions
        emotion_prediction = emotion_model.predict(cropped_img)
        maxindex = int(np.argmax(emotion_prediction))
        # arrayOfEmotions[maxindex] +=1
        # cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), colourBasedEmotion(maxindex), 4)
        # cv2.putText(frame, emotion_dict[maxindex], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, colourBasedEmotion(maxindex), 2, cv2.LINE_AA) 
    # cv2.imshow('Emotion Detection', frame)
    return [maxindex, x, y, w, h]

def mainLoop(frame, needArray=False):
    arrayOfEmotions = [0,0,0,0,0,0,0]
    while True:
        # Find haar cascade to draw bounding box around face
        frame = cv2.resize(frame, (1024, 576))

        maxindex, x, y, w, h = takeSinglePhoto(frame)
        if x != -1 and y != -1 and w != -1 and h != -1:
            frame = cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), colourBasedEmotion(maxindex), 4)
            if maxindex != -1:
                frame = cv2.putText(frame, emotion_dict[maxindex], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, colourBasedEmotion(maxindex), 2, cv2.LINE_AA)
            arrayOfEmotions[maxindex] +=1     
        # If more than 5 seconds have elapsed
        if needArray:
            return arrayOfEmotions
        return frame

# frame = cv2.imread("AI\img.jpg")
# frame = mainLoop(frame)
# cv2.imwrite("newImg.png", frame)

while True:
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    mainLoop(frame)
    cv2.imshow('Emotion Detection', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break