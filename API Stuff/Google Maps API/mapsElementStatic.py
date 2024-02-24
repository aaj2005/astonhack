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


def main(emotionArray):
    createUserInput(emotionArray, emotion_dict)