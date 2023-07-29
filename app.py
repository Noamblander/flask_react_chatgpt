from flask import Flask, request, jsonify
import openai
from flask_cors import CORS 
openai.api_key = "sk-91J3LDTe08G6M8A278SGT3BlbkFJelExDQolzo5qqr454"  # Replace with your own key.

app = Flask(__name__)
CORS(app)


@app.route('/api/message', methods=['POST'])
def get_message():
    enquiry = request.json.get('message')
    if enquiry:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": enquiry }
            ]
        )
        return jsonify(message=response.choices[0].message['content'].strip())
    else:
        return jsonify(error='No message provided'), 400

if __name__ == '__main__':
    app.run(debug=True)
