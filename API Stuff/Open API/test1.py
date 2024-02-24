from openai import OpenAI

def readPrompt():
  with open('API Stuff\Open API\gptPrompt.txt', 'r') as file:
    data = file.read().replace('\n', '')
  return data
  
client = OpenAI(api_key="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")

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": readPrompt()},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)