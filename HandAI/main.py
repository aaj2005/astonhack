import mediapipe as mp
import cv2

topGesturesArray = [0,0,0,0] #up, down, palm, none
def mainLoop(numpy_image):
#     BaseOptions = mp.tasks.BaseOptions
#     GestureRecognizer = mp.tasks.vision.GestureRecognizer
#     GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
#     VisionRunningMode = mp.tasks.vision.RunningMode

#     # Create a gesture recognizer instance with the image mode:
#     options = GestureRecognizerOptions(
#         base_options=BaseOptions(model_asset_path='/path/to/model.task'),
#         running_mode=VisionRunningMode.IMAGE)
#     with GestureRecognizer.create_from_options(options) as recognizer:
#     # The detector is initialized. Use it here.
#     # ...
        
        

#     # # Load the input image from an image file.
#     # mp_image = mp.Image.create_from_file('/path/to/image')

#     # Load the input image from a numpy array.
#         mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=numpy_image)
#         # Perform gesture recognition on the provided single image.
# # The gesture recognizer must be created with the image mode.
#         gesture_recognition_result = recognizer.recognize(mp_image)
#     return gesture_recognition_result
        
        # STEP 1: Import the necessary modules.
    import mediapipe as mp
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision

    # STEP 2: Create an GestureRecognizer object.
    base_options = python.BaseOptions(model_asset_path='HandAI/gesture_recognizer.task')
    options = vision.GestureRecognizerOptions(base_options=base_options)
    recognizer = vision.GestureRecognizer.create_from_options(options)

    # STEP 3: Load the input image.
    image = mp.Image(image_format=mp.ImageFormat.SRGB, data=numpy_image)

    # STEP 4: Recognize gestures in the input image.
    recognition_result = recognizer.recognize(image)

    # STEP 5: Process the result. In this case, visualize it.

    if recognition_result.gestures != []:
        top_gesture = recognition_result.gestures[0][0].category_name
        if top_gesture == "None":
            topGesturesArray[3] += 1
        elif top_gesture == "Thumb_Up":
            topGesturesArray[0] += 1
        elif top_gesture == "Thumb_Down":
            topGesturesArray[1] += 1
        elif top_gesture == "Open_Palm":
            topGesturesArray[2] += 1
    # hand_landmarks = recognition_result.hand_landmarks
    # print(topGesturesArray)
    # print(hand_landmarks)
    return topGesturesArray

# #display_batch_of_images_with_gestures_and_hand_landmarks(images, results)
# cap = cv2.VideoCapture(0)
# while True:
#     ret, frame = cap.read()
#     # frame = cv2.resize(frame, (1024, 576))
#     print(mainLoop(frame))
#     cv2.imshow('Emotion Detection', frame)