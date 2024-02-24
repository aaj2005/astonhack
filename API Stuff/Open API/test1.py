from openai import OpenAI
import math

def readPrompt():
  with open('API Stuff\Open API\gptPrompt.txt', 'r') as file:
    data = file.read().replace('\n', '')
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

def main():
	emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
	emotionArray = [0, 5, 3, 2, 1, 7, 3, 1]
	print(createUserInput(emotionArray, emotion_dict))
	print(readPrompt)
'''
	client = OpenAI(api_key="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")

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)
'''
main()