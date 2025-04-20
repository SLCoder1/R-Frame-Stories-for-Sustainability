from flask import Flask, request, jsonify
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__)

template = """
Answer the question below, and make sure to keep it concise(under 100 words, it needs to be small),

Here is the conversation history: {context}

Question: {question}

Answer:
"""

model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    context = ""
    print("Welcome to the AI ChatBot, Type 'exit' to quit.")

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        result = chain.invoke({"context": context, "question": user_input})
        answer = response.get("answer", "Sorry, I couldn't process your request.")
        print("Bot: ", result)
        context += f"\nUser: {user_input}\nAI: {result}"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    question = data.get("question", "")
    context = data.get("context", "")
    if not question:
        return jsonify({"error": "What is your question?"})
    answer = chain.invoke({"context": context, "question": question})
    

    return jsonify({"response": answer})

if __name__ == "__main__":
    app.run()
