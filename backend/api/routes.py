from api import app
from flask import request, jsonify
import json
from api.models import db, Patient
from openai import OpenAI

client = OpenAI()


@app.route('/')
def hello():
    return 'Hello, World!'


# get all patients
@app.route('/api/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_json() for patient in patients])




system_prompt = """
You are a talking to a triage nurse answering patient queries based on given conditions: 
given the following patient conditions:
"""

# This is the route that the frontend will use to send a message to the backend
@app.route('/api/generate_response', methods=['POST'])
def generate_response():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # get patient data from request
        patient_name = data.get('patientName')

        patient_nhs_number = data.get('nhsNumber')
        # check if nhs number exists in the database
        if Patient.query.filter_by(nhs_number=patient_nhs_number).first():
            return jsonify(error="NHS number already exists"), 400

        patient_for_self = data.get('isFormForSelf')
        patient_conditions = data.get('conditions')

        completion = client.chat.completions.create(
          model="gpt-3.5-turbo",
          messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": patient_conditions}
          ]
        )
        # Extract the generated text from the OpenAI response
        generated_text = completion.choices[0].message

        generated_response = generated_text.content

        # Create a new patient object
        patient = Patient(
            name=patient_name,
            nhs_number=patient_nhs_number,
            is_form_for_self=patient_for_self,
            conditions=patient_conditions,
            generated_response=generated_response
        )

        # Add the patient to the database
        db.session.add(patient)
        db.session.commit()

        print(generated_text.content)

        # Return the generated response as JSON
        return jsonify({"message": "Your data has been submitted succesfully and will be reviews by a nurse soon"})

    except Exception as e:
        return jsonify(error=str(e)), 500