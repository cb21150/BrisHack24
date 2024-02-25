from api import app
from flask import request, jsonify
import json
from api.models import db, Patient
from openai import OpenAI
from sqlalchemy import desc

client = OpenAI()


@app.route('/')
def hello():
    return 'Hello, World!'


# get all patients
@app.route('/api/patients', methods=['GET'])
def get_patients():
    # patients = Patient.query.all()
    # sort patients by priority level descending order
    patients = Patient.query.order_by(desc(Patient.priority_level)).all()


    return jsonify([patient.to_json() for patient in patients])

@app.route('/api/submit_vitals', methods=['POST'])
def submit_vitals():
    try:
        data = request.get_json()

        patient_id = data.get('patientId')

        # get vitals from request
        systolic_blood_pressure = data.get('systolicBloodPressure')
        heart_rate = data.get('heartRate')
        respiratory_rate = data.get('respiratoryRate')
        oxygen_saturation = data.get('oxygenSaturation')
        has_supplementary_o2_device = data.get('hasSupplementaryO2Device')
        temperature = data.get('temperature')
        gcs = data.get('gcs')
        responsiveness = data.get('responsiveness')
        equal_pupils = data.get('equalPupils')
        responsive_to_light = data.get('responsiveToLight')
        heart_beat_rhythm = data.get('heartBeatRhythm')
        dehydration = data.get('dehydration')
        hemoglobin = data.get('hemoglobin')
        urine_output = data.get('urineOutput')

        patient = Patient.query.get(patient_id)
        # patient.conditions + the submitted vitals as prompt to the GPT-3 model
        completion = client.chat.completions.create(
          model="gpt-3.5-turbo",
          messages=[
            {"role": "system", "content": patient.conditions},
            {"role": "user", "content": f"""
             Systolic Blood Pressure: {systolic_blood_pressure},
             Heart Rate: {heart_rate},
             Respiratory Rate: {respiratory_rate},
             Oxygen Saturation: {oxygen_saturation},
             Has Supplementary O2 Device: {has_supplementary_o2_device},
             Temperature: {temperature},
             GCS: {gcs},
             Responsiveness: {responsiveness},
             Equal Pupils: {equal_pupils},
             Responsive to Light: {responsive_to_light},
             Heart Beat Rhythm: {heart_beat_rhythm},
             Dehydration: {dehydration},
             Hemoglobin: {hemoglobin},
             Urine Output: {urine_output}
          """}
          ]
        )

        return jsonify({"message": "Vitals submitted successfully"})

    except Exception as e:
        return jsonify(error=str(e)), 500


system_prompt = """
You are a triage assistant receiving input about the patient conditions who is in an A&E.
Diagnose him to the nurse. Use concise medical language. 
Then select only one of the following options of requiring the vital signs:
1.zero-urgency
2.low-urgency
3.medium-urgency
4.high-urgency
5.very high-urgency
generate a detailed diagnosis and a priority level of requiring the vital signs from the options above.
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

        # extract priority level from the generated response by looking for Priority Level: and the next word
        priority_level = generated_text.content.split("Priority Level: ")[1].split(" ")[0]

        generated_response = generated_text.content

        # Create a new patient object
        patient = Patient(
            name=patient_name,
            nhs_number=patient_nhs_number,
            is_form_for_self=patient_for_self,
            conditions=patient_conditions,
            generated_response=generated_response,
            priority_level=priority_level
        )

        # Add the patient to the database
        db.session.add(patient)
        db.session.commit()

        print(generated_text.content)

        # Return the generated response as JSON
        return jsonify({"message": "Your data has been submitted succesfully and will be reviews by a nurse soon"})

    except Exception as e:
        return jsonify(error=str(e)), 500