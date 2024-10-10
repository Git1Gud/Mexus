from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests

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

if __name__ == '__main__':
    app.run(debug=True)
