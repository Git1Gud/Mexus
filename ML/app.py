from flask import Flask, request, jsonify
from groq import Groq # type: ignore
import requests
import PyPDF2 # type: ignore
from io import BytesIO
from PyPDF2 import PdfReader # type: ignore
import requests
import re
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = Groq(api_key="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")

# GRADE API 

@app.route('/grade', methods=['POST'])
def grade():
    data = request.get_json()

    # Check if required fields are present
    if not data or 'pdf_url' not in data :
        return jsonify({"error": "Missing 'pdf_url' "}), 400


    pdf_url = data['pdf_url']

    # Download the PDF from the given URL

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
        text
    except requests.exceptions.RequestException as e:
        return f"Failed to download PDF: {str(e)}"
    except Exception as e:
        return f"Failed to extract text from PDF: {str(e)}"


    prompt = f"""
    You are a medical assistant. Summarize the following medical report into a concise and clear summary. Focus on the patient's condition, diagnosis, treatment plan, and any recommendations such that even a child can understand for every parameter.
    Your result should contain condition,diagnosis,recommendations ,treatment_plan
    
    Output the result in the following JSON format
    

    PDF text:
    {text}
    """

    # Create a completion request to grade the assignment
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
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )
    message_content = completion.choices[0].message.content    
    # If the content is in JSON format, parse it
    try:
        json_response = json.loads(message_content)  # Parse the string into a JSON object
        return jsonify(json_response)  # Return the JSON response
    except json.JSONDecodeError:
        return jsonify({"error": "Response is not valid JSON."}), 500

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""  # Handle potential None values
    return text



if __name__ == '__main__':
    app.run(debug=True)