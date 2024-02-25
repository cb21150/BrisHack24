from api import app
from flask import request, jsonify
import json
from openai import OpenAI

client = OpenAI()


@app.route('/')
def hello():
    return 'Hello, World!'

system_prompt = """
You are a medical triage nurse answering patient queries:
you have 3 options, Option A: Give medical advice, and recommend staying at home, 
Option B: Give medical advice, and recommend seeing GP at next available opportunity,
Option C: Give medical advice, and recommend going to A&E
"""

# This is the route that the frontend will use to send a message to the backend
@app.route('/api/generate_response', methods=['POST'])
def generate_response():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        return jsonify(data)
        print(data)

        # Extract the prompt from the JSON data
        request_prompt = data.get('prompt')

        if not request_prompt:
            return jsonify(error='Prompt is required'), 400

        completion = client.chat.completions.create(
          model="gpt-3.5-turbo",
          messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request_prompt}
          ]
        )
        # Extract the generated text from the OpenAI response
        generated_text = completion.choices[0].message

        # Return the generated response as JSON
        return jsonify(response=generated_text)

    except Exception as e:
        return jsonify(error=str(e)), 500