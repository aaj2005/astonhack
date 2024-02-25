from openai import OpenAI
import json

from dotenv import load_dotenv
import os

def readPrompt():
  
  prompt = '''You will be given two emotions, and you will provide mental health feedback depending on these emotions.
These emotions will be given as percentages of how much of each emotion they are feeling.
The amount of feedback for each emotion should be weighted depending on the average of that emotion. For example if the first emotion has an average of 80% and the second 20%, then 80% of the feedback should apply to the first emotion and 20% of the feedback for the second emotion.
If the emotions are positive, then feedback should be about how to stay positive, things to do when you're in a positive emotion, etc.
If the emotions are negative, then feedback should be about how to stop feeling that way and start being positive. For example, if the emotions are negative then you could provide breathing exercises to calm them down / refocus their mind, or other applicable feedback.
Provide your feedback with a break between paragraphs.
Only include 5 bullet points.
Do not write an introduction or conclusion.'''

#   with open('API Stuff\Open API\gptPrompt.txt', 'r') as file:
#     data = file.read().replace('\n', '')
  data = prompt.replace('\n', '')
  return data

def createUserInput(emotionArray, emotion_dict):
	maxVal = [0, 0]
	secondMaxVal = [0, 0]
	for i, j in enumerate(emotionArray):
		if j > maxVal[0] and j > secondMaxVal[0]: #If new val is higher than all previous values
			secondMaxVal = maxVal
			maxVal = [j, emotion_dict[i]]
		elif j > secondMaxVal[0]:
			secondMaxVal = [j, emotion_dict[i]]
	sumOfVals = maxVal[0] + secondMaxVal[0]
	first = maxVal[0] / sumOfVals
	second = secondMaxVal[0] / sumOfVals
	str = f'{round(first*100)}% {maxVal[1]}, {round(second*100)}% {secondMaxVal[1]}'
	return str

def formatOutput(str):
	# Split the string by the content=
	split_by_content = str.split("content=\"")
	# Get the content part
	content = split_by_content[1].split("\",")[0].strip("'")
	return content

def returnPromt(emotionArray):
	emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
	# example array
	# emotionArray = [0, 5, 3, 2, 1, 7, 3, 1] 
	prompt = readPrompt()
	userInput = createUserInput(emotionArray, emotion_dict)

	load_dotenv()




# Access the variables using the os.environ dictionary
	api_key = os.environ.get("API_KEY")

	client = OpenAI(api_key=api_key)

	completion = client.chat.completions.create(
		model="gpt-3.5-turbo",
		messages=[
			{"role": "system", "content": prompt},
			{"role": "user", "content": userInput}
		]
	)
	output = str(completion.choices[0].message)
	formattedOutput = formatOutput(output)
	return formattedOutput

# print(main())