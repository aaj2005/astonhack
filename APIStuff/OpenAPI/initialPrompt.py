from openai import OpenAI
import json

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

def formatOutput(str):
	# Split the string by the content=
	split_by_content = str.split("content=\"")
	# Get the content part
	content = split_by_content[1].split("\",")[0].strip("'")
	return content

def main(emotionArray):
	emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
	# example array
	# emotionArray = [0, 5, 3, 2, 1, 7, 3, 1] 
	prompt = readPrompt()
	userInput = createUserInput(emotionArray, emotion_dict)

	client = OpenAI(api_key="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")

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

print(main())