from flask import Flask, request, jsonify
from groq import Groq
import requests
import PyPDF2
from io import BytesIO
from PyPDF2 import PdfReader
import requests
import re
import json
from twilio.rest import Client
import keys
from flask_cors import CORS # type: ignore
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import io

app = Flask(__name__)
CORS(app)
client = Groq(api_key="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")

# Load the trained malaria detection model
model = load_model('malaria_model.h5')

# Preprocess the image to match model input requirements
def preprocess_image(img):
    img = img.resize((224, 224))  # Resize to match model's expected input size
    img = np.array(img) / 255.0   # Rescale
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Route to handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))

    # Preprocess the image
    processed_img = preprocess_image(img)

    # Perform prediction using the model
    predictions = model.predict(processed_img)
    predicted_label = np.argmax(predictions, axis=1)

    # Return the result as a JSON response
    return jsonify({'label': int(predicted_label[0])})

def split_message_into_chunks(message, chunk_size=1500):
    return [message[i:i+chunk_size] for i in range(0, len(message), chunk_size)]

@app.route('/grade/<int:no>', methods=['POST'])
def grade(no):
    data = request.get_json()

    # Check if required fields are present
    if not data or 'pdf_url' not in data:
        return jsonify({"error": "Missing 'pdf_url' "}), 400

    pdf_url = data['pdf_url']

    try:
        # Download the PDF content
        response = requests.get(pdf_url)
        response.raise_for_status()  # Ensure the request was successful
        
        # Load the PDF content into memory using BytesIO
        file = BytesIO(response.content)
        
        # Use PyPDF2 to read and extract text from the PDF
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""  # Extract text from each page
    except requests.exceptions.RequestException as e:
        return f"Failed to download PDF: {str(e)}", 500
    except Exception as e:
        return f"Failed to extract text from PDF: {str(e)}", 500

    prompt = f"""
    You are a medical assistant. Summarize the following medical report into a concise and clear summary. Focus on the patient's condition, diagnosis, treatment plan, and any recommendations such that even a child can understand for every parameter.
    
    PDF text:
    {text}
    """

    # Create a completion request to summarize the report
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False
    )
    
    message_content = completion.choices[0].message.content  # Extract the message content
    
    # Split the message into chunks
    message_chunks = split_message_into_chunks(message_content)

    from twilio.rest import Client

    # Twilio account credentials
    account_sid = 'ACce2d804b345439286ca0054870068b3b'
    auth_token = '71fe0ac19a35635b5cb2e1af85dcadfc'  # Replace with your actual auth token

# Initialize Twilio client
    client1 = Client(account_sid, auth_token)

    # Create and send the message
    message = client1.messages.create(
    messaging_service_sid='MG08e2aafe4dd7b34afe888bf07db8d4c9',  # Messaging Service SID
    body=message_chunks,  # Message body
    to=f'+91{no}'  # Recipient phone number
    )

    # Print the message SID to confirm successful sending
    print(message.sid)

    # Return the summary as plain text
    return message_content, 200



def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""  # Handle potential None values
    return text



if __name__ == '__main__':
    app.run(debug=True)